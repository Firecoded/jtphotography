// Copies each photo listed in content/photos.json from the exports folder into .photos/,
// stamps copyright metadata on the copy, and records its size in src/photos.generated.json.
//
//   npm run photos:prepare                      (reads ~/Desktop/exportpics)
//   EXPORT_DIR=/path/to/exports npm run photos:prepare
//
// Needs exiftool (brew install exiftool).

import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const exportDir = process.env.EXPORT_DIR ?? join(homedir(), "Desktop", "exportpics");
const stagingDir = join(root, ".photos");
const photos = JSON.parse(readFileSync(join(root, "content", "photos.json"), "utf8"));
const { places } = JSON.parse(readFileSync(join(root, "content", "places.json"), "utf8"));

const AUTHOR = "Jacob Taylor";
const NOTICE = `© ${AUTHOR}. All rights reserved.`;
const SITE = "https://jacobshoots.pictures";

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const problems = [];
const ids = new Set();
for (const photo of photos) {
    if (ids.has(photo.id)) problems.push(`duplicate id ${photo.id}`);
    ids.add(photo.id);
    if (!places[photo.place]) problems.push(`photo ${photo.id}: "${photo.place}" is missing from content/places.json`);
    if (!existsSync(join(exportDir, photo.original))) problems.push(`photo ${photo.id}: ${photo.original} not found`);
}
if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
}

const generated = {};
for (const photo of photos) {
    const key = `${slugify(photo.place)}/${photo.id}.jpg`;
    const source = join(exportDir, photo.original);
    const target = join(stagingDir, key);

    if (!existsSync(target) || statSync(source).mtimeMs > statSync(target).mtimeMs) {
        mkdirSync(dirname(target), { recursive: true });
        copyFileSync(source, target);
        execFileSync("exiftool", [
            "-q",
            "-overwrite_original",
            "-gps:all=",
            "-xmp:geotag=",
            `-EXIF:Artist=${AUTHOR}`,
            `-EXIF:Copyright=${NOTICE}`,
            `-IPTC:By-line=${AUTHOR}`,
            `-IPTC:CopyrightNotice=${NOTICE}`,
            `-XMP-dc:Creator=${AUTHOR}`,
            `-XMP-dc:Rights=${NOTICE}`,
            "-XMP-xmpRights:Marked=True",
            `-XMP-xmpRights:WebStatement=${SITE}`,
            `-XMP-iptcCore:CreatorWorkURL=${SITE}`,
            target,
        ]);
        console.log(`prepared ${key}`);
    }

    const [meta] = JSON.parse(
        execFileSync("exiftool", ["-j", "-n", "-ImageWidth", "-ImageHeight", "-Orientation", target], {
            encoding: "utf8",
        })
    );
    // EXIF orientations 5-8 are rotated 90 degrees, so the displayed size is swapped
    const rotated = meta.Orientation >= 5 && meta.Orientation <= 8;
    generated[photo.id] = {
        key,
        width: rotated ? meta.ImageHeight : meta.ImageWidth,
        height: rotated ? meta.ImageWidth : meta.ImageHeight,
    };
}

writeFileSync(join(root, "src", "photos.generated.json"), JSON.stringify(generated, null, 4) + "\n");
console.log(`${photos.length} photos ready in .photos/, sizes written to src/photos.generated.json`);
