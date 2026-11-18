// QA helper: contact sheet of relief poses. node scripts/relief-sheet.mjs out.png suffix name...
import sharp from 'sharp';
const [out, suffix, ...names] = process.argv.slice(2);
const W = 300, H = 533;
const tiles = await Promise.all(names.map((n) => sharp(`images/openart/relief/${n}${suffix}.png`).resize(W, H).flatten({ background: '#0B1E4A' }).toBuffer()));
await sharp({ create: { width: W * names.length, height: H, channels: 3, background: '#0B1E4A' } }).composite(tiles.map((t, i) => ({ input: t, left: i * W, top: 0 }))).png().toFile(out);
