// Serves dist/ the way Vercel does (cleanUrls + 404.html) and checks every page
// hydrates without React errors on desktop and phone.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const DIST = path.resolve('dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.json': 'application/json', '.mp4': 'video/mp4', '.txt': 'text/plain', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const candidates = [u, path.join(u, 'index.html'), u + '.html'].map((c) => path.join(DIST, c));
  const f = candidates.find((c) => c.startsWith(DIST) && fs.existsSync(c) && fs.statSync(c).isFile());
  if (!f) {
    res.writeHead(404, { 'content-type': 'text/html' });
    return res.end(fs.readFileSync(path.join(DIST, '404.html')));
  }
  res.writeHead(200, { 'content-type': types[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4173, r));
const b = await chromium.launch({ channel: 'chrome' });
const routes = ['/', '/services/knee-pain-physiotherapy-kondhwa', '/corporate', '/app', '/privacy', '/nope'];
for (const vp of [{ width: 1280, height: 900 }, { width: 390, height: 844, isMobile: true, hasTouch: true }]) {
  const ctx = await b.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  for (const r of routes) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errs.push(m.text().slice(0, 220)));
    page.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message.slice(0, 220)));
    await page.goto('http://localhost:4173' + r, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const h1 = await page.locator('h1').first().innerText().catch(() => '-');
    console.log(vp.width, r, '|', h1.replace(/\n/g, ' '), '|', errs.length ? errs.join(' || ') : 'ok');
    await page.close();
  }
}
await b.close();
server.close();
