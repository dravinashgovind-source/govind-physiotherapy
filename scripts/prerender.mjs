// Runs after `vite build` and `vite build --ssr`. Writes a complete static HTML
// file for every route (full page content + title, description, canonical,
// Open Graph and schema.org JSON-LD), so Google and AI crawlers (ChatGPT,
// Perplexity, Claude, Gemini…) read the whole page without running JavaScript.
// The same code runs locally and on Vercel: no browser needed.
//
// Also writes sitemap.xml, robots.txt, llms.txt and 404.html.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve('dist');
const SSR = path.resolve('dist-ssr/entry-server.js');
const { render, seoPages, notFoundSeo, llmsTxt, SITE } = await import(pathToFileURL(SSR).href);

const shell = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (u) => (u.startsWith('http') ? u : SITE + u);
// JSON-LD must not contain a raw "</script>".
const ldJson = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function headFor(p) {
  const url = abs(p.noindex ? '/' : p.path);
  const robots = p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    p.noindex ? '' : `<link rel="canonical" href="${esc(abs(p.path))}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(abs(p.image))}" />`,
    `<meta property="og:image:alt" content="${esc(p.title)}" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${esc(abs(p.image))}" />`,
    ...p.jsonLd.map((o) => `<script type="application/ld+json" data-seo>${ldJson(o)}</script>`),
  ]
    .filter(Boolean)
    .map((l) => `    ${l}`)
    .join('\n');
}

function pageHtml(p, body) {
  let html = shell;
  // Drop the shell's generic tags; the page's own tags are inserted below.
  html = html.replace(/\s*<title>[\s\S]*?<\/title>/, '');
  html = html.replace(/\s*<meta name="(description|robots|twitter:title|twitter:description|twitter:image)"[^>]*>/g, '');
  html = html.replace(/\s*<meta property="og:(title|description|url|image|image:alt)"[^>]*>/g, '');
  html = html.replace(/\s*<link rel="canonical"[^>]*>/g, '');
  // Page tags go straight after the viewport meta so the title is near the top.
  html = html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n${headFor(p)}`);
  // Only the home page preloads the hero photo.
  if (p.path !== '/') html = html.replace(/\s*<link rel="preload" as="image"[^>]*>/, '');
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const outFile = (p) => path.join(DIST, p === '/' ? 'index.html' : p === '/404' ? '404.html' : `${p.slice(1)}/index.html`);
const write = (file, text) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
};

for (const p of [...seoPages, notFoundSeo]) {
  const body = await render(p.path === '/404' ? '/__not-found__' : p.path);
  write(outFile(p.path), pageHtml(p, body));
  console.log('prerendered', p.path);
}

// ---- sitemap.xml --------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${seoPages
  .map(
    (p) => `  <url>
    <loc>${abs(p.path)}</loc>
    <lastmod>${today}</lastmod>${p.changefreq ? `\n    <changefreq>${p.changefreq}</changefreq>` : ''}${p.priority != null ? `\n    <priority>${p.priority.toFixed(1)}</priority>` : ''}
    <image:image><image:loc>${esc(abs(p.image))}</image:loc></image:image>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write(path.join(DIST, 'sitemap.xml'), sitemap);

// ---- robots.txt: everyone welcome, including AI search & assistant crawlers ----
const aiBots = [
  'Googlebot',
  'Bingbot',
  'Google-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'DuckAssistBot',
  'CCBot',
];
const robots = `# ${SITE}
# All pages may be crawled and indexed, including by AI search and assistant crawlers.

User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;
write(path.join(DIST, 'robots.txt'), robots);

// ---- llms.txt: plain-text summary for AI assistants ----------------------------
write(path.join(DIST, 'llms.txt'), llmsTxt() + '\n');

console.log(`✓ ${seoPages.length + 1} pages prerendered for ${SITE}; sitemap.xml, robots.txt, llms.txt written`);
