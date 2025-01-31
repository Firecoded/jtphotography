import { useState } from "react";
import "react-photo-album/rows.css";
import type { Photo } from "react-photo-album";

import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import clsx from "clsx";
// import { motion, AnimatePresence } from "framer-motion";

enum EPhotoKeywords {
    All = "All",
    Street = "Street",
    Nature = "Nature",
    Landscape = "Landscape",
    Architecture = "Architecture",
    Portrait = "Portrait",
    Documentary = "Documentary",
}

enum ELocation {
    All = "All",
    Vietnam = "Vietnam",
    Morocco = "Morocco",
    Spain = "Spain",
    Italy = "Italy",
}

interface IPhoto {
    src: string;
    width: number;
    height: number;
    alt?: string | undefined;
    keywords?: EPhotoKeywords[];
    location?: ELocation[];
}

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
const photoKeywords = Object.values(EPhotoKeywords);

const photos: IPhoto[] = [
    {
        src: "/images/1.webp",
        width: 4240,
        height: 2832,
        alt: "Person on the side of a river",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/2.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Portrait],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/3.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/4.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/5.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/6.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/7.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Vietnam],
    },
    {
        src: "/images/8.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/9.webp",
        width: 1197,
        height: 1792,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Portrait],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/10.webp",
        width: 3381,
        height: 2259,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/11.webp",
        width: 3738,
        height: 2496,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/12.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/13.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/14.webp",
        width: 2586,
        height: 2586,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Street, EPhotoKeywords.Documentary],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/15.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Documentary, EPhotoKeywords.Street],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/16.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Morocco],
    },
    {
        src: "/images/17.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/18.webp",
        width: 2832,
        height: 4240,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/19.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/20.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/21.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/22.webp",
        width: 2238,
        height: 1494,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/23.webp",
        width: 2830,
        height: 1890,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape, EPhotoKeywords.Nature],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/24.webp",
        width: 1986,
        height: 2974,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Spain],
    },
    {
        src: "/images/25.webp",
        width: 3791,
        height: 2532,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
    },
    {
        src: "/images/26.webp",
        width: 3966,
        height: 2649,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
    },
    {
        src: "/images/27.webp",
        width: 3644,
        height: 2434,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
    },
    {
        src: "/images/28.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Landscape],
        location: [ELocation.All, ELocation.Italy],
    },
    {
        src: "/images/29.webp",
        width: 4240,
        height: 2832,
        alt: "",
        keywords: [EPhotoKeywords.All, EPhotoKeywords.Architecture],
        location: [ELocation.All, ELocation.Italy],
    },
].map(
    ({ src, alt, width, height, keywords, location }) =>
        ({
            src,
            alt,
            width,
            height,
            keywords,
            location,
            srcSet: breakpoints.map((breakpoint) => ({
                src,
                width: breakpoint,
                height: Math.round((height / width) * breakpoint),
            })),
        }) as Photo
);

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    const [activeKeyword, setActiveKeyword] = useState(EPhotoKeywords.All);
    const filteredPhotos =
        activeKeyword === EPhotoKeywords.All
            ? photos
            : photos.filter((photo) => photo.keywords?.includes(activeKeyword));
    console.log(filteredPhotos, activeKeyword, photos);
    return (
        <>
            <div className="mb-4 ">
                {photoKeywords.map((pk) => (
                    <span
                        key={pk}
                        className={clsx("pe-3 rounded cursor-pointer", activeKeyword === pk && "fw-bold")}
                        onClick={() => setActiveKeyword(pk)}
                    >
                        {pk}
                    </span>
                ))}
            </div>
            <MasonryPhotoAlbum photos={filteredPhotos} onClick={({ index }) => setIndex(index)} spacing={10} />
            {/* <div
                className="d-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "10px",
                }}
            >
                <AnimatePresence>
                    {filteredPhotos.map((photo, idx) => (
                        <motion.div
                            key={photo.src}
                            layout
                            initial={{ transform: "scale(0)" }}
                            animate={{ transform: "scale(1)" }}
                            exit={{ transform: "scale(0)" }}
                            onClick={() => setIndex(idx)}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt || "Gallery Image"}
                                className="img-fluid shadow-sm"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                }}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div> */}
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
