// QA helper: draws every relief pain spot on its pose. node scripts/relief-spots.mjs out.png
import fs from 'node:fs';
import sharp from 'sharp';
const src = fs.readFileSync('src/content/relief.ts', 'utf8');
const items = [...src.matchAll(/label: '([^']+)', pose: '(\w+)', x: ([\d.]+), y: ([\d.]+)/g)].map((m) => ({ label: m[1], pose: m[2], x: +m[3], y: +m[4] }));
const poses = [...new Set(items.map((i) => i.pose))];
const W = 1008, H = 1792, S = 0.42;
const tiles = [];
for (const p of poses) {
  const dots = items.filter((i) => i.pose === p).map((i, k) => `<circle cx="${i.x * W}" cy="${i.y * H}" r="16" fill="red" stroke="white" stroke-width="4"/><text x="${i.x * W + 22}" y="${i.y * H + 8 + k * 26}" font-size="26" fill="yellow" font-family="Arial">${i.label}</text>`).join('');
  const svg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${dots}</svg>`);
  tiles.push(await sharp(`images/openart/relief/${p}.png`).flatten({ background: '#0B1E4A' }).composite([{ input: svg }]).png().toBuffer().then((b) => sharp(b).resize(Math.round(W * S)).toBuffer()));
}
const tw = Math.round(W * S), th = Math.round(H * S);
await sharp({ create: { width: tw * 4, height: th * 2, channels: 3, background: '#0B1E4A' } }).composite(tiles.map((t, i) => ({ input: t, left: (i % 4) * tw, top: Math.floor(i / 4) * th }))).png().toFile(process.argv[2]);
