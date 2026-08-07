// Regenerates public/work/*.webp from assets/thumbnails-src/**.
// Runs automatically before every build (see package.json "prebuild") so any
// image dropped into assets/thumbnails-src/** is picked up with no manual step.
import { readdir, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIRS = ["assets/thumbnails-src/thumbnails", "assets/thumbnails-src/more-thumbnails"];
const OUT_DIR = path.join(ROOT, "public/work");
const MANIFEST_PATH = path.join(ROOT, "lib/work-images.generated.json");

// Single size — these only ever render as marquee tiles (max ~18rem wide),
// so one moderately-sized WebP covers it without a second "full" variant.
const WIDTH = 640;
const QUALITY = 72;

function slugify(filename) {
  return path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const slugs = [];
  const seen = new Set();

  for (const relDir of SRC_DIRS) {
    const dir = path.join(ROOT, relDir);
    const files = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f));

    for (const file of files) {
      const slug = slugify(file);
      if (seen.has(slug)) {
        throw new Error(`Duplicate slug "${slug}" from ${file} — rename the source file.`);
      }
      seen.add(slug);
      slugs.push(slug);

      const srcPath = path.join(dir, file);

      await sharp(srcPath)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(path.join(OUT_DIR, `${slug}.webp`));
    }
  }

  slugs.sort();
  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(slugs, null, 2) + "\n");

  console.log(`optimize-images: ${slugs.length} images -> public/work/, manifest written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
