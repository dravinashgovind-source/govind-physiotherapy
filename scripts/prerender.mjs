// Runs after `vite build`. Gives every route its own HTML file so the host
// (e.g. Vercel) serves real pages with the right title, description and link
// previews, and serves 404.html for unknown URLs. Also writes sitemap.xml.
//
// Two modes:
//  1. Full prerender: if Google Chrome is available (local machine), every page
//     is rendered with its full content.
//  2. Meta-only (fallback, e.g. on Vercel): each route gets a copy of index.html
//     with its own <title>, description, Open Graph tags, canonical and robots.
//     The page content is then rendered by the browser as normal.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = 4791;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '';
const siteUrl = (process.env.VITE_SITE_URL || vercelUrl || '').replace(/\/$/, '');
const BRAND = 'Govind’s Advanced Pain Management & Physiotherapy Centre';

// ---- Route metadata (read from the content files so it never drifts) --------
const regionsSrc = fs.readFileSync('src/content/regions.ts', 'utf8');
const regionMeta = [...regionsSrc.matchAll(/slug: '([^']+)',[\s\S]*?title: '([^']+)',\s*metaDescription:\s*\n?\s*(['"])([\s\S]*?)\3,/g)].map((m) => ({
  path: `/services/${m[1]}`,
  title: `${m[2]} | ${BRAND}`,
  description: m[4],
}));

const pages = [
  {
    path: '/',
    title: `${BRAND} | Physiotherapy in Kondhwa, Pune`,
    description:
      'Assessment-based physiotherapy and pain management with Dr. Avinash Govind in Tilekar Nagar, Kondhwa, Pune. Rated 5.0 on Google. Back, neck, knee, sports, post-surgery and paediatric physiotherapy.',
  },
  {
    path: '/corporate',
    title: `Corporate Wellness & Workplace Physiotherapy in Pune | ${BRAND}`,
    description: 'On-site physiotherapy camps, ergonomic assessments and back-care workshops for companies in Pune, by Govind’s Advanced Pain Management & Physiotherapy Centre, Kondhwa.',
    image: '/img/corp-hero-1600.webp',
  },
  {
    path: '/app',
    title: 'Govind’s Physiotherapy App | Book, routines & clinic info',
    description: 'Book appointments on WhatsApp, explore services, follow a daily mobility routine and find the clinic. Add the Govind’s app to your home screen.',
    image: '/img/app-hero-1600.webp',
  },
  { path: '/privacy', title: `Privacy | ${BRAND}`, description: `How ${BRAND} handles information you share through this website.` },
  ...regionMeta,
];
const notFound = { path: '/404', title: `Page not found | ${BRAND}`, description: 'This page could not be found.', noindex: true };

const outFile = (p) => path.join(DIST, p === '/' ? 'index.html' : p === '/404' ? '404.html' : `${p}/index.html`);
const write = (file, html) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

// ---- Meta-only templating ------------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const shellHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

function withMeta(html, p) {
  const abs = (u) => (siteUrl ? siteUrl + u : u);
  const set = (attr, key, value) => {
    const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
    const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
    html = re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
  };
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`);
  set('name', 'description', p.description);
  set('property', 'og:title', p.title);
  set('property', 'og:description', p.description);
  set('property', 'og:url', abs(p.path === '/404' ? '/' : p.path));
  if (p.image || siteUrl) set('property', 'og:image', abs(p.image ?? '/img/hero-care-1920.webp'));
  set('name', 'robots', p.noindex ? 'noindex' : 'index, follow');
  html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');
  if (siteUrl && !p.noindex) html = html.replace('</head>', `    <link rel="canonical" href="${abs(p.path)}" />\n  </head>`);
  return html;
}

// ---- Full prerender (optional) ------------------------------------------------
async function tryFullPrerender() {
  let chromium;
  try {
    ({ chromium } = await import('playwright-core'));
  } catch {
    return false;
  }
  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome' });
  } catch {
    return false;
  }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.txt': 'text/plain', '.json': 'application/json' };
  const server = http.createServer((req, res) => {
    const f = path.join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (f.startsWith(DIST) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { 'content-type': types[path.extname(f)] ?? 'application/octet-stream' });
      return fs.createReadStream(f).pipe(res);
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(shellHtml);
  });
  await new Promise((r) => server.listen(PORT, r));
  try {
    // Reduced motion renders every element in its final, visible state.
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    for (const p of [...pages, notFound]) {
      await page.goto(`http://localhost:${PORT}${p.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
      write(outFile(p.path), withMeta(await page.content(), p));
      console.log('prerendered', p.path);
    }
  } finally {
    await browser.close();
    server.close();
  }
  return true;
}

const full = process.env.SKIP_FULL_PRERENDER ? false : await tryFullPrerender();
if (!full) {
  console.log('Chrome not available: writing per-route HTML with page metadata.');
  for (const p of [...pages, notFound]) {
    write(outFile(p.path), withMeta(shellHtml, p));
    console.log('meta page', p.path);
  }
}

// ---- Sitemap -----------------------------------------------------------------
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log('sitemap.xml written for', siteUrl);
} else {
  console.warn('⚠ No site URL (VITE_SITE_URL / Vercel production URL): canonical tags and sitemap.xml skipped.');
}
console.log(`✓ ${pages.length + 1} pages written (${full ? 'full prerender' : 'meta-only'})`);
