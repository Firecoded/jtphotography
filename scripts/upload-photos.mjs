// Uploads prepared photos from .photos/ to the R2 bucket, skipping files that haven't changed.
//
//   npm run photos:upload
//   R2_BUCKET=other-bucket npm run photos:upload
//
// Run `npx wrangler login` once first.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bucket = process.env.R2_BUCKET ?? "jacobshoots-photos";
const generated = JSON.parse(readFileSync(join(root, "src", "photos.generated.json"), "utf8"));
const ledgerPath = join(root, ".photos", "uploaded.json");
const ledger = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, "utf8")) : {};

let uploaded = 0;
for (const { key } of Object.values(generated)) {
    const file = join(root, ".photos", key);
    const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
    if (ledger[key] === hash) continue;

    for (let attempt = 1; ; attempt++) {
        try {
            execFileSync(
                "npx",
                [
                    "wrangler",
                    "r2",
                    "object",
                    "put",
                    `${bucket}/${key}`,
                    "--file",
                    file,
                    "--content-type",
                    "image/jpeg",
                    "--cache-control",
                    "public, max-age=31536000",
                    "--remote",
                ],
                { stdio: "inherit" }
            );
            break;
        } catch (error) {
            // wrangler's uploads occasionally drop on flaky connections
            if (attempt === 3) throw error;
            console.warn(`retrying ${key} (attempt ${attempt + 1} of 3)`);
        }
    }
    ledger[key] = hash;
    writeFileSync(ledgerPath, JSON.stringify(ledger, null, 4) + "\n");
    uploaded++;
}
console.log(uploaded ? `uploaded ${uploaded} photos to ${bucket}` : "everything already uploaded");
