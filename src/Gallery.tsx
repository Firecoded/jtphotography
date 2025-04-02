import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import "react-photo-album/masonry.css";

// light box
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "yet-another-react-lightbox/plugins/captions.css";

import { ELocation, EPhotoKeywords, locations, photoKeywords, photos } from "./photoData";

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

    // filter out photo types not applying to selected location
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
            <div className="mb-2 d-flex align-items-center flex-wrap">
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
                            "me-3 cursor-pointer",
                            activeKeyword === photoKeyword
                                ? "border-bottom border-2 border-black"
                                : "border-bottom border-2 border-transparent",
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
            <div className="mb-4 d-flex align-items-center flex-wrap">
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
                        className={clsx(
                            "me-3 cursor-pointer",
                            activeLocation === location
                                ? "border-bottom border-2 border-black"
                                : "border-bottom border-2 border-transparent"
                        )}
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
                plugins={[
                    Fullscreen,
                    Slideshow,
                    Thumbnails,
                    // disabling for now
                    // Captions,
                    Zoom,
                ]}
                thumbnails={{ showToggle: true }}
                // captions={{ showToggle: true, hidden: true }}
            />
        </>
    );
}
