import { useEffect, useMemo, useState } from "react";
import "react-photo-album/rows.css";
import type { Photo } from "react-photo-album";
import clsx from "clsx";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

enum EPhotoKeywords {
    All = "All",
    Street = "Street",
    // Nature = "Nature",
    Landscape = "Landscape",
    Architecture = "Architecture",
    Portrait = "Portrait",
    Documentary = "Documentary",
}

enum ELocation {
    All = "All",
    Albania = "Albania",
    Austria = "Austria",
    Hungary = "Hungary",
    Italy = "Italy",
    Japan = "Japan",
    Morocco = "Morocco",
    Spain = "Spain",
    Thailand = "Thailand",
    Vietnam = "Vietnam",
}

interface IPhoto extends Photo {
    keywords?: EPhotoKeywords[];
    location?: ELocation[];
    thumbnail: string;
    rating: number;
}

const photoKeywords = Object.values(EPhotoKeywords);
const locations = Object.values(ELocation);

const photos: IPhoto[] = [
    {
        src: "/images/1.webp",
        width: 4240,
        height: 2832,
        alt: "Person on the side of a river",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/1_600px.webp",
        rating: 9,
    },
    {
        src: "/images/7.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/7_600px.webp",
        rating: 9,
    },
    {
        src: "/images/3.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/3_600px.webp",
        rating: 8,
    },
    {
        src: "/images/4.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/4_600px.webp",
        rating: 6,
    },
    {
        src: "/images/5.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/5_600px.webp",
        rating: 7,
    },
    {
        src: "/images/6.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/6_600px.webp",
        rating: 6,
    },
    {
        src: "/images/2.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Portrait],
        location: [ELocation.All, ELocation.Vietnam],
        thumbnail: "/images/thumbnails/2_600px.webp",
        rating: 6,
    },
    {
        src: "/images/8.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/8_600px.webp",
        rating: 5,
    },
    {
        src: "/images/9.webp",
        width: 1197,
        height: 1792,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Portrait],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/9_600px.webp",
        rating: 7,
    },
    {
        src: "/images/10.webp",
        width: 3381,
        height: 2259,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/10_600px.webp",
        rating: 7,
    },
    {
        src: "/images/11.webp",
        width: 3738,
        height: 2496,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/11_600px.webp",
        rating: 9,
    },
    {
        src: "/images/12.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/12_600px.webp",
        rating: 5,
    },
    {
        src: "/images/13.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/13_600px.webp",
        rating: 6,
    },
    {
        src: "/images/14.webp",
        width: 2586,
        height: 2586,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/14_600px.webp",
        rating: 7,
    },
    {
        src: "/images/15.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/15_600px.webp",
        rating: 5,
    },
    {
        src: "/images/16.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Morocco],
        thumbnail: "/images/thumbnails/16_600px.webp",
        rating: 5,
    },
    {
        src: "/images/17.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/17_600px.webp",
        rating: 4,
    },
    {
        src: "/images/18.webp",
        width: 2832,
        height: 4240,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/18_600px.webp",
        rating: 5,
    },
    {
        src: "/images/19.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/19_600px.webp",
        rating: 7,
    },
    {
        src: "/images/20.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/20_600px.webp",
        rating: 5,
    },
    {
        src: "/images/21.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/21_600px.webp",
        rating: 7,
    },
    {
        src: "/images/22.webp",
        width: 2238,
        height: 1494,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/22_600px.webp",
        rating: 8,
    },
    {
        src: "/images/23.webp",
        width: 2830,
        height: 1890,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/23_600px.webp",
        rating: 6,
    },
    {
        src: "/images/24.webp",
        width: 1986,
        height: 2974,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
        thumbnail: "/images/thumbnails/24_600px.webp",
        rating: 5,
    },
    // {
    //     src: "/images/25.webp",
    //     width: 3791,
    //     height: 2532,
    //     alt: "",
    //     keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
    //     location: [ELocation.All, ELocation.Italy],
    // },
    {
        src: "/images/26.webp",
        width: 3966,
        height: 2649,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
        thumbnail: "/images/thumbnails/26_600px.webp",
        rating: 7,
    },
    {
        src: "/images/27.webp",
        width: 3644,
        height: 2434,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
        thumbnail: "/images/thumbnails/27_600px.webp",
        rating: 8,
    },
    {
        src: "/images/28.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
        thumbnail: "/images/thumbnails/28_600px.webp",
        rating: 9,
    },
    {
        src: "/images/29.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Italy],
        thumbnail: "/images/thumbnails/29_600px.webp",
        rating: 5,
    },
    {
        src: "/images/30.webp",
        width: 4240,
        height: 2832,
        alt: "Night view of Budapest from the river",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Hungary],
        thumbnail: "/images/thumbnails/30_600px.webp",
        rating: 6,
    },
    {
        src: "/images/31.webp",
        width: 4240,
        height: 2832,
        alt: "Close-up of Hungarian Parliament dome",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Hungary],
        thumbnail: "/images/thumbnails/31_600px.webp",
        rating: 6,
    },
    {
        src: "/images/32.webp",
        width: 4240,
        height: 2832,
        alt: "Hungarian Parliament Building illuminated at night",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Hungary],
        thumbnail: "/images/thumbnails/32_600px.webp",
        rating: 7,
    },
    {
        src: "/images/33.webp",
        width: 4240,
        height: 2832,
        alt: "Hungarian Parliament Building",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Hungary],
        thumbnail: "/images/thumbnails/33_600px.webp",
        rating: 6,
    },
    {
        src: "/images/34.webp",
        width: 4240,
        height: 2832,
        alt: "Golden Garuda statues at the Grand Palace, Bangkok",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/34_600px.webp",
        rating: 5,
    },
    {
        src: "/images/35.webp",
        width: 4240,
        height: 2832,
        alt: "Mural paintings at the Grand Palace, Bangkok",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/35_600px.webp",
        rating: 5,
    },
    {
        src: "/images/36.webp",
        width: 4240,
        height: 2832,
        alt: "Guardian Yaksha statue at Wat Phra Kaew, Bangkok",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/36_600px.webp",
        rating: 6,
    },
    {
        src: "/images/37.webp",
        width: 4240,
        height: 2832,
        alt: "Intricate details of Wat Arun temple, Bangkok",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/37_600px.webp",
        rating: 5,
    },
    {
        src: "/images/38.webp",
        width: 4240,
        height: 2832,
        alt: "Woman in Thai traditional attire at Wat Arun",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Portrait, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/38_600px.webp",
        rating: 8,
    },
    {
        src: "/images/39.webp",
        width: 4240,
        height: 2832,
        alt: "Women dressed in Thai traditional clothing at Wat Arun",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Portrait, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/39_600px.webp",
        rating: 8,
    },
    {
        src: "/images/40.webp",
        width: 4240,
        height: 2832,
        alt: "Women in traditional Thai dresses posing for photos",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/40_600px.webp",
        rating: 6,
    },
    {
        src: "/images/41.webp",
        width: 4240,
        height: 2832,
        alt: "Man and child on a motorcycle in busy traffic, Thailand",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/41_600px.webp",
        rating: 6,
    },
    {
        src: "/images/42.webp",
        width: 4240,
        height: 2832,
        alt: "Street food vendor cooking at a night market, Thailand",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/42_600px.webp",
        rating: 5,
    },
    {
        src: "/images/43.webp",
        width: 4240,
        height: 2832,
        alt: "Two women running with pigeons flying at a historic brick wall",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Thailand],
        thumbnail: "/images/thumbnails/43_600px.webp",
        rating: 7,
    },
    {
        src: "/images/44.webp",
        width: 4240,
        height: 2832,
        alt: "Scenic lakeside village with mountains in the background, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/44_600px.webp",
        rating: 7,
    },
    {
        src: "/images/45.webp",
        width: 4240,
        height: 2832,
        alt: "Aerial view of a valley with a lake surrounded by mountains, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/45_600px.webp",
        rating: 5,
    },
    {
        src: "/images/46.webp",
        width: 4240,
        height: 2832,
        alt: "Rocky alpine terrain with distant snow-capped peaks, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/46_600px.webp",
        rating: 7,
    },
    {
        src: "/images/47.webp",
        width: 4240,
        height: 2832,
        alt: "Small boat on a lake with mountains and a village in the background, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/47_600px.webp",
        rating: 9,
    },
    {
        src: "/images/48.webp",
        width: 4240,
        height: 2832,
        alt: "Scenic overlook with a house and a viewing platform, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/48_600px.webp",
        rating: 8,
    },
    {
        src: "/images/49.webp",
        width: 4240,
        height: 2832,
        alt: "Lakeside village with traditional alpine houses, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/49_600px.webp",
        rating: 7,
    },
    {
        src: "/images/50.webp",
        width: 4240,
        height: 2832,
        alt: "People enjoying a lakeside view, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/50_600px.webp",
        rating: 7,
    },
    {
        src: "/images/51.webp",
        width: 4240,
        height: 2832,
        alt: "Traditional alpine houses reflecting in the lake, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/51_600px.webp",
        rating: 7,
    },
    {
        src: "/images/52.webp",
        width: 4240,
        height: 2832,
        alt: "Mountainous alpine landscape with distant snow peaks, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/52_600px.webp",
        rating: 6,
    },
    {
        src: "/images/53.webp",
        width: 4240,
        height: 2832,
        alt: "Colorful town square with people enjoying the scene, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/53_600px.webp",
        rating: 7,
    },
    {
        src: "/images/54.webp",
        width: 4240,
        height: 2832,
        alt: "Small stone chapel on a mountain plateau with a view of distant snow-capped peaks, Austria",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Austria],
        thumbnail: "/images/thumbnails/54_600px.webp",
        rating: 9,
    },
    {
        src: "/images/55.webp",
        width: 4240,
        height: 2832,
        alt: "Man walking on a sidewalk with shopping bags",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Albania],
        thumbnail: "/images/thumbnails/55_600px.webp",
        rating: 5,
    },
    {
        src: "/images/56.webp",
        width: 4240,
        height: 2832,
        alt: "Women wearing colorful kimonos, Japan",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Portrait, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/56_600px.webp",
        rating: 6,
    },
    {
        src: "/images/57.webp",
        width: 2832,
        height: 4240,
        alt: "Woman in a white kimono at a temple",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Portrait, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/57_600px.webp",
        rating: 8,
    },
    {
        src: "/images/58.webp",
        width: 2832,
        height: 4240,
        alt: "Busy street with Japanese signs and people walking",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/58_600px.webp",
        rating: 7,
    },
    {
        src: "/images/59.webp",
        width: 2832,
        height: 4240,
        alt: "Narrow alleyway in Japan with people walking",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/59_600px.webp",
        rating: 6,
    },
    {
        src: "/images/60.webp",
        width: 4240,
        height: 2832,
        alt: "Two women in traditional kimonos waiting for a train",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary, EPhotoKeywords.Portrait],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/60_600px.webp",
        rating: 8,
    },
    {
        src: "/images/61.webp",
        width: 4240,
        height: 2832,
        alt: "Osaka Castle with a clear blue sky",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/61_600px.webp",
        rating: 9,
    },
    {
        src: "/images/62.webp",
        width: 4240,
        height: 2832,
        alt: "Crowd crossing at Shibuya Crossing, Tokyo",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/62_600px.webp",
        rating: 7,
    },
    {
        src: "/images/63.webp",
        width: 4240,
        height: 2832,
        alt: "Fushimi Inari Shrine torii gates, Kyoto",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/63_600px.webp",
        rating: 7,
    },
    {
        src: "/images/64.webp",
        width: 4240,
        height: 2832,
        alt: "Cable car over a lush green valley",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Albania],
        thumbnail: "/images/thumbnails/64_600px.webp",
        rating: 6,
    },
    {
        src: "/images/65.webp",
        width: 2832,
        height: 4240,
        alt: "Pathway lined with orange torii gates in Japan",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/65_600px.webp",
        rating: 8,
    },
    {
        src: "/images/66.webp",
        width: 3620,
        height: 2418,
        alt: "Aerial view of Tokyo skyline with river at sunset",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Japan],
        thumbnail: "/images/thumbnails/66_600px.webp",
        rating: 7,
    },
]
    .map(({ src, alt, width, height, keywords, location, thumbnail, rating }) => ({
        src,
        alt,
        width,
        height,
        keywords,
        location,
        thumbnail,
        rating,
    }))
    .sort((a, b) => b.rating - a.rating);

const thumbnails = photos.map((photo) => ({ ...photo, src: photo?.thumbnail }));

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    const [activeKeyword, setActiveKeyword] = useState(EPhotoKeywords.All);
    const [activeLocation, setActiveLocation] = useState(ELocation.All);
    const filteredPhotos = photos.filter(
        (photo) => photo.keywords?.includes(activeKeyword) && photo.location?.includes(activeLocation)
    );
    const filteredThumbs = thumbnails.filter(
        (photo) => photo.keywords?.includes(activeKeyword) && photo.location?.includes(activeLocation)
    );

    // filter out keywords not relevant to activelocation
    const photosByLocation = useMemo(() => {
        return photos.filter((photo) => photo.location?.includes(activeLocation));
    }, [activeLocation]);
    const validKeywords = useMemo(() => {
        return Array.from(new Set(photosByLocation.flatMap((photo) => photo.keywords)));
    }, [photosByLocation]);

    useEffect(() => {
        if (!validKeywords.includes(activeKeyword)) {
            setActiveKeyword(EPhotoKeywords.All);
        }
    }, [validKeywords, activeKeyword, activeLocation]);

    return (
        <>
            <div className="mb-2 d-flex align-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-camera me-3"
                    viewBox="0 0 16 16"
                >
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                </svg>
                {photoKeywords.map((photoKeyword) => (
                    <span
                        key={photoKeyword}
                        className={clsx(
                            "pe-3 cursor-pointer",
                            activeKeyword === photoKeyword && "fw-bold",
                            !validKeywords.includes(photoKeyword) && "text-decoration-line-through cursor-not-allowed"
                        )}
                        onClick={() => {
                            if (validKeywords.includes(photoKeyword)) setActiveKeyword(photoKeyword);
                        }}
                    >
                        {photoKeyword}
                    </span>
                ))}
            </div>
            <div className="mb-4 d-flex align-items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt me-3"
                    viewBox="0 0 16 16"
                >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                {locations.map((location) => (
                    <span
                        key={location}
                        className={clsx("pe-3 cursor-pointer", activeLocation === location && "fw-bold")}
                        onClick={() => {
                            if (!validKeywords.includes(activeKeyword)) {
                                setActiveKeyword(EPhotoKeywords.All);
                            }
                            setActiveLocation(location);
                        }}
                    >
                        {location}
                    </span>
                ))}
            </div>
            <MasonryPhotoAlbum photos={filteredThumbs} onClick={({ index }) => setIndex(index)} spacing={10} />
            <Lightbox
                slides={filteredPhotos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                // enable optional lightbox plugins
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </>
    );
}
