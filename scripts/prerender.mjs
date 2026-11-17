// Renders every route to static HTML after `vite build`, so search engines and
// link previews get real content. Also writes 404.html and, if VITE_SITE_URL is
// set, sitemap.xml plus a Sitemap line in robots.txt.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const DIST = path.resolve('dist');
const PORT = 4791;
const siteUrl = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

const slugs = [...fs.readFileSync('src/content/regions.ts', 'utf8').matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const routes = ['/', '/privacy', '/corporate', ...slugs.map((s) => `/services/${s}`)];

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.txt': 'text/plain', '.json': 'application/json' };
const shell = fs.readFileSync(path.join(DIST, 'index.html'));
const server = http.createServer((req, res) => {
  const p = path.join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (p.startsWith(DIST) && fs.existsSync(p) && fs.statSync(p).isFile()) {
    res.writeHead(200, { 'content-type': types[path.extname(p)] ?? 'application/octet-stream' });
    return fs.createReadStream(p).pipe(res);
  }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(shell);
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch({ channel: 'chrome' });
// Reduced motion renders every element in its final, visible state, with no pinned sections.
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });

async function render(route, outFile) {
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  let html = await page.content();
  html = html.replace(/<style[^>]*data-emotion[^>]*>.*?<\/style>/gs, '');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log('prerendered', route, '→', path.relative(DIST, outFile));
}

for (const r of routes) await render(r, path.join(DIST, r === '/' ? 'index.html' : `${r}/index.html`));
await render('/404', path.join(DIST, '404.html'));

await browser.close();
server.close();

if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${siteUrl}${r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  fs.appendFileSync(path.join(DIST, 'robots.txt'), `\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log('sitemap.xml written for', siteUrl);
} else {
  console.warn('\n⚠ VITE_SITE_URL is not set: canonical tags and sitemap.xml were skipped.\n  Build with e.g. VITE_SITE_URL=https://www.example.in npm run build\n');
}
