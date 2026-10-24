import type { Photo } from "react-photo-album";
import photoEntries from "../content/photos.json";
import placeConfig from "../content/places.json";
import generated from "./photos.generated.json";

export const CATEGORIES = ["Street", "Landscape", "Architecture", "Portrait", "Documentary"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface SitePhoto extends Photo {
    id: number;
    place: string;
    region: string;
    keywords: Category[];
    rating: number;
    alt: string;
    srcSet: { src: string; width: number; height: number }[];
}

// e.g. https://img.jacobshoots.pictures; without it the site serves the WebP copies in public/images
const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE?.replace(/\/$/, "");
const WIDTHS = [400, 800, 1200, 1600, 2000, 2800];

export const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const places: Record<string, { region: string }> = placeConfig.places;
const sizes: Record<string, { key: string; width: number; height: number }> = generated;

function sourcesFor(id: number, key: string, width: number, height: number) {
    const sized = (w: number) => ({ width: w, height: Math.round((height * w) / width) });
    if (!IMAGE_BASE) {
        return [
            { src: `/images/thumbnails/${id}_600px.webp`, ...sized(600) },
            { src: `/images/${id}.webp`, width, height },
        ];
    }
    return [...WIDTHS.filter((w) => w < width), width].map((w) => ({
        src: `${IMAGE_BASE}/cdn-cgi/image/width=${w},quality=85,format=auto/${key}`,
        ...sized(w),
    }));
}

export const photos: SitePhoto[] = photoEntries
    .map((entry) => {
        const { key, width, height } = sizes[entry.id];
        const srcSet = sourcesFor(entry.id, key, width, height);
        return {
            ...entry,
            keywords: entry.keywords as Category[],
            region: places[entry.place].region,
            src: (srcSet.filter((s) => s.width <= 2000).pop() ?? srcSet[0]).src,
            width,
            height,
            srcSet,
        };
    })
    .sort((a, b) => b.rating - a.rating);

const usedPlaces = new Set(photos.map((p) => p.place));

// Regions and places only appear once they have photos.
export const regions = placeConfig.regions
    .map((region) => ({
        name: region,
        places: Object.keys(places)
            .filter((place) => places[place].region === region && usedPlaces.has(place))
            .sort(),
    }))
    .filter((region) => region.places.length > 0);
