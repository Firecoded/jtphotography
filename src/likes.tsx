import clsx from "clsx";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLightboxState } from "yet-another-react-lightbox";

// e.g. https://jacobshoots-likes.<account>.workers.dev; without it the like button is hidden
const LIKES_API = import.meta.env.VITE_LIKES_API?.replace(/\/$/, "");

const STORAGE_KEY = "jacobshoots:likes";

function readStorage<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function writeStorage(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // private mode or storage disabled: likes still work for this page view
    }
}

function visitorId() {
    const existing = readStorage<string | null>(`${STORAGE_KEY}:visitor`, null);
    if (existing) return existing;
    const id = crypto.randomUUID();
    writeStorage(`${STORAGE_KEY}:visitor`, id);
    return id;
}

interface LikesContextValue {
    counts: Record<number, number>;
    liked: Set<number>;
    toggle: (photoId: number) => void;
}

const LikesContext = createContext<LikesContextValue | null>(null);

export function LikesProvider({ children }: { children: React.ReactNode }) {
    const [counts, setCounts] = useState<Record<number, number>>({});
    const [liked, setLiked] = useState(() => new Set(readStorage<number[]>(STORAGE_KEY, [])));

    useEffect(() => {
        if (!LIKES_API) return;
        fetch(`${LIKES_API}/likes`)
            .then((res) => res.json())
            .then((data: { counts: Record<number, number> }) => setCounts(data.counts))
            .catch(() => {});
    }, []);

    const toggle = useCallback(
        (photoId: number) => {
            const wasLiked = liked.has(photoId);
            const nextLiked = new Set(liked);
            if (wasLiked) nextLiked.delete(photoId);
            else nextLiked.add(photoId);
            setLiked(nextLiked);
            writeStorage(STORAGE_KEY, [...nextLiked]);
            setCounts((c) => ({ ...c, [photoId]: Math.max(0, (c[photoId] ?? 0) + (wasLiked ? -1 : 1)) }));

            fetch(`${LIKES_API}/likes/${photoId}`, {
                method: wasLiked ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ visitor: visitorId() }),
            })
                .then((res) => (res.ok ? res.json() : Promise.reject(res)))
                .then((data: { count: number }) => setCounts((c) => ({ ...c, [photoId]: data.count })))
                .catch(() => {});
        },
        [liked]
    );

    const value = useMemo(() => ({ counts, liked, toggle }), [counts, liked, toggle]);
    return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
}

const HEART_OUTLINE =
    "M12 20.3 10.6 19C5.4 14.4 2 11.3 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 3.8-3.4 6.9-8.6 11.5L12 20.3zM7.5 4C5.5 4 4 5.5 4 7.5c0 2.9 3 5.6 7.6 9.7l.4.4.4-.4C17 13.1 20 10.4 20 7.5 20 5.5 18.5 4 16.5 4c-1.5 0-3 1-3.6 2.4h-1.8C10.5 5 9 4 7.5 4z";
const HEART_FILLED =
    "M12 20.3 10.6 19C5.4 14.4 2 11.3 2 7.5 2 4.4 4.4 2 7.5 2c1.7 0 3.4.8 4.5 2.1C13.1 2.8 14.8 2 16.5 2 19.6 2 22 4.4 22 7.5c0 3.8-3.4 6.9-8.6 11.5L12 20.3z";

export function LikeButton() {
    const likes = useContext(LikesContext);
    const { currentSlide } = useLightboxState();
    const photoId = (currentSlide as { id?: number } | undefined)?.id;
    if (!LIKES_API || !likes || photoId === undefined) return null;

    const isLiked = likes.liked.has(photoId);
    const count = likes.counts[photoId] ?? 0;
    return (
        <div className="like-button">
            <button
                type="button"
                className={clsx("yarl__button", isLiked && "like-button-on")}
                aria-label={isLiked ? "Unlike photo" : "Like photo"}
                aria-pressed={isLiked}
                onClick={() => likes.toggle(photoId)}
            >
                <svg
                    className="yarl__icon"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path fill="currentColor" d={isLiked ? HEART_FILLED : HEART_OUTLINE} />
                </svg>
            </button>
            {count > 0 && <span className="like-count">{count}</span>}
        </div>
    );
}
