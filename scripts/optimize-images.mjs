// Crops source images and writes responsive AVIF + WebP files to public/img.
// Usage: npm run images
// To add a new photo (e.g. the doctor's portrait or clinic photos), drop the
// original into images/ and add an entry below.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'images';
const OUT = 'public/img';
const WIDTHS = [800, 1600];

/** crop values are fractions of the original image (0–1). */
const jobs = [
  // Real photograph of Dr. Avinash Govind (supplied by the clinic). Never regenerate or retouch the face.
  { src: 'dr-avinash-govind.png', name: 'dr-avinash-govind', crop: { top: 0, left: 0, width: 1, height: 1 }, widths: [800, 1536], quality: { avif: 82, webp: 92 } },
  // Hero: generated with OpenArt (Nano Banana 2.1), full frame, no text in the image.
  { src: 'hero-openart.png', name: 'hero-care', crop: { top: 0, left: 0, width: 1, height: 1 }, widths: [1280, 1920, 2560, 3584], quality: { avif: 82, webp: 92 } },
  // Studio "pain region" set: crop the bottom 10% to remove the generator watermark.
  { src: 'Gemini_Generated_Image_j9uu1bj9uu1bj9uu (1).png', name: 'back', crop: { top: 0, left: 0, width: 1, height: 0.9 }, widths: [800, 1600, 2400], quality: { avif: 80, webp: 90 } },
  { src: 'Gemini_Generated_Image_j9uu1bj9uu1bj9uu (2).png', name: 'neck', crop: { top: 0, left: 0, width: 1, height: 0.9 }, widths: [800, 1600, 2400], quality: { avif: 80, webp: 90 } },
  { src: 'Gemini_Generated_Image_j9uu1bj9uu1bj9uu (3).png', name: 'ankle', crop: { top: 0, left: 0, width: 1, height: 0.9 }, widths: [800, 1600, 2400], quality: { avif: 80, webp: 90 } },
  { src: 'Gemini_Generated_Image_j9uu1bj9uu1bj9uu (4).png', name: 'shoulder', crop: { top: 0, left: 0, width: 1, height: 0.9 }, widths: [800, 1600, 2400], quality: { avif: 80, webp: 90 } },
  { src: 'Gemini_Generated_Image_j9uu1bj9uu1bj9uu.png', name: 'knee', crop: { top: 0, left: 0, width: 1, height: 0.9 }, widths: [800, 1600, 2400], quality: { avif: 80, webp: 90 } },
];

fs.mkdirSync(OUT, { recursive: true });
const manifest = {};

for (const job of jobs) {
  const file = path.join(SRC, job.src);
  if (!fs.existsSync(file)) { console.warn('missing', file); continue; }
  const meta = await sharp(file).metadata();
  const c = job.crop;
  const region = {
    left: Math.round(c.left * meta.width),
    top: Math.round(c.top * meta.height),
    width: Math.round(c.width * meta.width),
    height: Math.round(c.height * meta.height),
  };
  for (const w of job.widths ?? WIDTHS) {
    const base = sharp(file).extract(region).resize({ width: Math.min(w, region.width) });
    await base.clone().avif({ quality: job.quality?.avif ?? 52 }).toFile(`${OUT}/${job.name}-${w}.avif`);
    await base.clone().webp({ quality: job.quality?.webp ?? 78 }).toFile(`${OUT}/${job.name}-${w}.webp`);
  }
  manifest[job.name] = { width: region.width, height: region.height };
  console.log('✓', job.name, region.width, '×', region.height);
}

// Generated illustrations (services, corporate, approach): images/openart/gen/<name>.png → <name>-{800,1600}
for (const f of fs.existsSync('images/openart/gen') ? fs.readdirSync('images/openart/gen').filter((x) => x.endsWith('.png')) : []) {
  const name = f.replace(/\.png$/, '');
  const file = `images/openart/gen/${f}`;
  const meta = await sharp(file).metadata();
  for (const w of [800, 1600]) {
    const img = sharp(file).resize({ width: Math.min(w, meta.width) });
    await img.clone().avif({ quality: 78 }).toFile(`${OUT}/${name}-${w}.avif`);
    await img.clone().webp({ quality: 88 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  manifest[name] = { width: meta.width, height: meta.height };
  console.log('✓ gen', name);
}

// Real clinic photographs (supplied by the clinic): images/clinic/<name>.jpg → <name>-{640,1280}
for (const f of fs.existsSync('images/clinic') ? fs.readdirSync('images/clinic').filter((x) => /\.(jpe?g|png)$/i.test(x)) : []) {
  const name = f.replace(/\.(jpe?g|png)$/i, '');
  const file = `images/clinic/${f}`;
  const meta = await sharp(file).metadata();
  for (const w of [640, 1280]) {
    const img = sharp(file).rotate().resize({ width: Math.min(w, meta.width) });
    await img.clone().avif({ quality: 80 }).toFile(`${OUT}/${name}-${w}.avif`);
    await img.clone().webp({ quality: 90 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  manifest[name] = { width: meta.width, height: meta.height };
  console.log('✓ clinic', name, meta.width, meta.height);
}

// Transparent cut-outs for the Conditions section: trim empty edges, keep alpha.
for (const n of ['neck', 'shoulder', 'back', 'knee', 'ankle']) {
  const file = `images/openart/cutouts/${n}.png`;
  if (!fs.existsSync(file)) continue;
  const trimmed = await sharp(file).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  for (const h of [900, 1600]) {
    const img = sharp(trimmed.data).resize({ height: Math.min(h, height) });
    await img.clone().avif({ quality: 80 }).toFile(`${OUT}/cut-${n}-${h}.avif`);
    await img.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/cut-${n}-${h}.webp`);
  }
  manifest[`cut-${n}`] = { width, height };
  console.log('✓ cut', n, width, '×', height);
}

// "Relief" figure poses for the /app body map: transparent, NOT trimmed, so every
// pose shares the same canvas and the person stays in the same place between poses.
// Run `node scripts/key-relief.mjs` first to make them from the *-raw.png renders.
for (const f of fs.existsSync('images/openart/relief') ? fs.readdirSync('images/openart/relief').filter((x) => x.endsWith('.png') && !x.endsWith('-raw.png')) : []) {
  const n = f.replace('.png', '');
  const file = `images/openart/relief/${f}`;
  const { width, height } = await sharp(file).metadata();
  for (const w of [480, 900]) {
    const img = sharp(file).resize({ width: w });
    await img.clone().avif({ quality: 72 }).toFile(`${OUT}/relief-${n}-${w}.avif`);
    await img.clone().webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/relief-${n}-${w}.webp`);
  }
  manifest[`relief-${n}`] = { width, height };
  console.log('✓ relief', n);
}

fs.writeFileSync('src/content/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
