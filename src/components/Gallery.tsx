import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

// light box
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { LikeButton } from "../likes";
import { CATEGORIES, photos, regions, slugify } from "../photos";
import Filters from "./Filters";
import useIsMobile from "../useIsMobile";

// Touch devices get an edge-to-edge viewer; browser fullscreen stays opt-in there because Android shows a "swipe to exit" toast.
const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
// the home-screen app already runs fullscreen, so its fullscreen button would do nothing
const isInstalledApp =
    typeof window !== "undefined" &&
    window.matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches;

const fromSlug = <T extends string>(options: readonly T[], slug: string | null) =>
    options.find((option) => slugify(option) === slug);

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [chromeHidden, setChromeHidden] = useState(isTouch);
    // true when this tab pushed the ?photo entry, so closing can pop it and Back closes the viewer
    const pushedHistory = useRef(false);

    const isMobile = useIsMobile();

    const region = regions.find((r) => slugify(r.name) === searchParams.get("region"));
    const place = region && fromSlug(region.places, searchParams.get("place"));
    const category = fromSlug(CATEGORIES, searchParams.get("type"));

    const photosInArea = useMemo(
        () => photos.filter((p) => (place ? p.place === place : !region || p.region === region.name)),
        [region, place]
    );
    const validCategories = useMemo(() => new Set(photosInArea.flatMap((p) => p.keywords)), [photosInArea]);
    const activeCategory = category && validCategories.has(category) ? category : undefined;
    const filteredPhotos = useMemo(
        () => (activeCategory ? photosInArea.filter((p) => p.keywords.includes(activeCategory)) : photosInArea),
        [photosInArea, activeCategory]
    );

    const updateParams = (changes: Record<string, string | undefined>, push = false) => {
        const next = new URLSearchParams(searchParams);
        for (const [key, value] of Object.entries(changes)) {
            if (value) next.set(key, value);
            else next.delete(key);
        }
        setSearchParams(next, { replace: !push });
    };

    useEffect(() => {
        const photoId = searchParams.get("photo");
        const idx = photoId ? filteredPhotos.findIndex((p) => String(p.id) === photoId) : -1;
        if (idx === -1) pushedHistory.current = false;
        setIndex(idx);
    }, [searchParams, filteredPhotos]);

    return (
        <>
            <Filters
                region={region?.name}
                place={place}
                category={activeCategory}
                validCategories={validCategories}
                onRegion={(name) => updateParams({ region: name && slugify(name), place: undefined })}
                onPlace={(name) => updateParams({ place: name && slugify(name) })}
                onCategory={(name) => updateParams({ type: name && slugify(name) })}
            />
            <MasonryPhotoAlbum
                photos={filteredPhotos}
                onClick={({ index }) => {
                    setChromeHidden(isTouch);
                    pushedHistory.current = true;
                    updateParams({ photo: String(filteredPhotos[index].id) }, true);
                }}
                spacing={isMobile ? 5 : 10}
            />
            <Lightbox
                slides={filteredPhotos}
                open={index >= 0}
                index={index}
                className={chromeHidden ? "lightbox-chrome-hidden" : undefined}
                on={{
                    view: ({ index: currentIndex }) => {
                        const photo = filteredPhotos[currentIndex];
                        if (photo && searchParams.get("photo") !== String(photo.id)) {
                            updateParams({ photo: String(photo.id) });
                        }
                    },
                    click: () => isTouch && setChromeHidden((hidden) => !hidden),
                }}
                close={() => {
                    setIndex(-1);
                    if (pushedHistory.current) {
                        pushedHistory.current = false;
                        history.back();
                    } else {
                        updateParams({ photo: undefined });
                    }
                }}
                plugins={isInstalledApp ? [Slideshow, Thumbnails, Zoom] : [Fullscreen, Slideshow, Thumbnails, Zoom]}
                carousel={{ padding: isTouch ? 0 : "16px", preload: isTouch ? 1 : 2 }}
                controller={{ closeOnPullDown: true, closeOnBackdropClick: !isTouch }}
                render={isTouch ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
                styles={{ container: { backgroundColor: "#000" } }}
                thumbnails={{ showToggle: true, hidden: true }}
                toolbar={{ buttons: [<LikeButton key="like" />, "close"] }}
            />
        </>
    );
}
