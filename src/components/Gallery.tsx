import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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

import { ELocation, EPhotoKeywords, photos } from "../photoData";
import Filters from "./Filters";
import useIsMobile from "../useIsMobile";

const thumbnails = photos.map((photo) => ({ ...photo, src: photo?.thumbnail }));

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    const [activeKeyword, setActiveKeyword] = useState(EPhotoKeywords.All);
    const [activeLocation, setActiveLocation] = useState(ELocation.All);
    const [searchParams, setSearchParams] = useSearchParams();

    const isMobile = useIsMobile();

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

    useEffect(() => {
        // check photo query param on page load
        const photoId = searchParams.get("photo");
        if (photoId) {
            const idx = filteredPhotos.findIndex((p) => String(p.id) === photoId);
            if (idx !== -1) setIndex(idx);
        }
    }, [searchParams, filteredPhotos]);

    return (
        <>
            <Filters
                activeKeyword={activeKeyword}
                setActiveKeyword={setActiveKeyword}
                validKeywords={validKeywords}
                activeLocation={activeLocation}
                setActiveLocation={setActiveLocation}
            />
            <MasonryPhotoAlbum
                photos={filteredThumbs}
                onClick={({ index }) => {
                    setIndex(index);
                    const selectedPhoto = filteredPhotos[index];
                    if (selectedPhoto?.id) {
                        setSearchParams({ photo: String(selectedPhoto.id) });
                    }
                }}
                spacing={isMobile ? 5 : 10}
            />
            <Lightbox
                slides={filteredPhotos}
                open={index >= 0}
                index={index}
                on={{
                    view: ({ index: currentIndex }) => {
                        const selectedPhoto = filteredPhotos[currentIndex];
                        if (selectedPhoto?.id) {
                            setSearchParams({ photo: String(selectedPhoto.id) });
                        }
                    },
                }}
                close={() => {
                    setIndex(-1);
                    searchParams.delete("photo");
                    setSearchParams(searchParams);
                }}
                plugins={[
                    Fullscreen,
                    Slideshow,
                    Thumbnails,
                    // disabling for now
                    // Captions,
                    Zoom,
                ]}
                thumbnails={{ showToggle: true, hidden: true }}
                // captions={{ showToggle: true, hidden: true }}
            />
        </>
    );
}
