// Removes the flat chroma-green background from the "Relief" figure poses.
// images/openart/relief/<pose>-raw.png  →  images/openart/relief/<pose>.png (transparent)
//
// Alpha comes from how much greener a pixel is than its red/blue channels, with
// a soft ramp for anti-aliased edges, then green spill is removed from the edges.
import fs from 'node:fs';
import sharp from 'sharp';

const DIR = 'images/openart/relief';
const LOW = 28; // greenness at or below this is fully opaque
const HIGH = 110; // greenness at or above this is fully transparent

for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('-raw.png'))) {
  const { data, info } = await sharp(`${DIR}/${f}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // Measure the actual background colour from the top corners.
  const px = (x, y) => { const i = (y * info.width + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
  const samples = [px(4, 4), px(info.width - 5, 4), px(4, 60), px(info.width - 5, 60)];
  const bg = [0, 1, 2].map((c) => samples.reduce((t, s) => t + s[c], 0) / samples.length);
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, o = 0; i < data.length; i += 3, o += 4) {
    let r = data[i], g = data[i + 1], b = data[i + 2];
    const spill = g - Math.max(r, b);
    let a = 1;
    if (spill >= HIGH) a = 0;
    else if (spill > LOW) a = 1 - (spill - LOW) / (HIGH - LOW);
    // Tighten the edge slightly so the outermost blended pixels drop out.
    a = Math.min(1, Math.max(0, (a - 0.12) / 0.88));
    if (a > 0 && a < 1) {
      // Un-mix: observed = a·subject + (1−a)·background  →  recover the subject colour.
      r = (r - (1 - a) * bg[0]) / a;
      g = (g - (1 - a) * bg[1]) / a;
      b = (b - (1 - a) * bg[2]) / a;
    }
    // Despill: no pixel may be greener than its brightest other channel.
    g = Math.min(g, Math.max(r, b));
    out[o] = Math.max(0, Math.min(255, r));
    out[o + 1] = Math.max(0, Math.min(255, g));
    out[o + 2] = Math.max(0, Math.min(255, b));
    out[o + 3] = Math.round(a * 255);
  }
  const keyed = await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  const name = f.replace('-raw.png', '.png');
  await sharp(keyed).toFile(`${DIR}/${name}`);
  console.log('keyed', name);
}
