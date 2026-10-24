# Minimal Photo Gallery

Built this project in order to display some travel photography as well as explore some different react tools and packages.

Built with:

- React + TypeScript + Vite
- Bootstrap 5
- react-photo-album
- yet-another-react-lightbox

[Live Demo - jacobshoots.pictures](https://jacobshoots.pictures)

## Adding photos

1. Export the photo into the exports folder (`~/Desktop/exportpics` by default, or set `EXPORT_DIR`).
2. Add an entry to `content/photos.json` with the next unused `id`, its `place`, `keywords`, `rating`, `alt`, and the `original` path inside the exports folder. Higher ratings show first.
3. If it's a new country, add it to `content/places.json` with its region. Regions and countries only appear on the site once they have photos.
4. `npm run photos:prepare` copies the originals into `.photos/`, stamps copyright metadata, and records each photo's size.
5. `npm run photos:upload` sends new or changed photos to the R2 bucket.

## Images

With `VITE_IMAGE_BASE` set (e.g. `https://img.jacobshoots.pictures`), photos load from Cloudflare R2 and are resized on the fly to AVIF or WebP. Without it, the site falls back to the WebP copies in `public/images`.

## Likes

The like button talks to a small Cloudflare Worker in `worker/` backed by a D1 database. Set `VITE_LIKES_API` to the Worker URL to show it. For local development, run `npx wrangler dev` in `worker/` and put `VITE_LIKES_API=http://localhost:8787` in `.env.development.local`.
