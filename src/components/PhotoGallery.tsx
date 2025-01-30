import { useState } from "react";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import type { Photo } from "react-photo-album";

enum EPhotoKeywords {
    Street = "Street",
    Nature = "Nature",
    Landscape = "Landscape",
    Architecture = "Architecture",
    Portrait = "Portrait",
    Documentary = "Documentary",
}

interface IPhoto extends Photo {
    asset?: string;
    width: number;
    height: number;
    alt?: string | undefined;
    keywords?: EPhotoKeywords[];
}

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos: IPhoto[] = [
    {
        asset: "/images/1.webp",
        width: 4240,
        height: 2832,
        alt: "Person on the side of a river",
        keywords: [EPhotoKeywords.Documentary, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
    {
        asset: "/images/2.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Portrait],
    },
    {
        asset: "/images/3.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
    {
        asset: "/images/4.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
    {
        asset: "/images/5.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
    {
        asset: "/images/6.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
    {
        asset: "/images/7.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
    },
].map(
    ({ asset, alt, width, height }) =>
        ({
            src: asset,
            alt,
            width,
            height,
            srcSet: breakpoints.map((breakpoint) => ({
                src: asset,
                width: breakpoint,
                height: Math.round((height / width) * breakpoint),
            })),
        }) as Photo
);

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    return (
        <div className="container">
            <RowsPhotoAlbum photos={photos} targetRowHeight={300} onClick={({ index }) => setIndex(index)} />

            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </div>
    );
}
