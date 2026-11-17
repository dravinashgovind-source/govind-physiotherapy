// Builds transparent logo assets from images/logo-original.jpg (white background → alpha).
import sharp from 'sharp';
const SRC = 'images/logo-original.jpg';

async function toTransparent(region, out, height) {
  const { data, info } = await sharp(SRC).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    // pure white → transparent, near-white edges → partial alpha (keeps anti-aliasing smooth)
    const a = min >= 248 ? 0 : min <= 200 ? 255 : Math.round(((248 - min) / 48) * 255);
    data[i + 3] = Math.min(data[i + 3], a);
  }
  const img = sharp(data, { raw: info }).trim({ threshold: 1 });
  await img.clone().resize({ height }).png({ compressionLevel: 9 }).toFile(`public/img/${out}.png`);
  await img.clone().resize({ height }).webp({ quality: 92, alphaQuality: 100 }).toFile(`public/img/${out}.webp`);
  console.log('✓', out);
}

const meta = await sharp(SRC).metadata();
console.log(meta.width, meta.height);
// Emblem only (figure + spine + leaves)
await toTransparent({ left: 440, top: 20, width: 660, height: 545 }, 'logo-mark', 256);
// Small header size (2× the 48px display height)
await sharp('public/img/logo-mark.png').resize({ height: 104 }).webp({ quality: 92, alphaQuality: 100 }).toFile('public/img/logo-mark-104.webp');
await sharp('public/img/logo-mark.png').resize({ height: 104 }).png({ compressionLevel: 9 }).toFile('public/img/logo-mark-104.png');
// Full lockup
await toTransparent({ left: 0, top: 0, width: meta.width, height: meta.height }, 'logo-full', 480);
// Favicon (emblem on white rounded square)
const mark = await sharp('public/img/logo-mark.png').resize({ width: 52, height: 52, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp({ create: { width: 64, height: 64, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
  .composite([{ input: mark, left: 6, top: 6 }]).png().toFile('public/favicon.png');
const big = await sharp('public/img/logo-mark.png').resize({ width: 156, height: 156, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } } })
  .composite([{ input: big, left: 12, top: 12 }]).png().toFile('public/apple-touch-icon.png');
console.log('✓ favicons');
