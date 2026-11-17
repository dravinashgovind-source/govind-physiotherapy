// QA: scroll through the homepage like a visitor and screenshot each section.
// node scripts/qa-sections.mjs <baseUrl> <outDir> [width] [height] [reduce]
import { chromium } from 'playwright-core';
const [base, out, w = '1440', h = '900', reduce = ''] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(e.message));
const failed = [];
page.on('requestfailed', (r) => failed.push(r.url()));
page.on('response', (r) => r.status() >= 400 && failed.push(r.status() + ' ' + r.url()));
await page.goto(base, { waitUntil: 'networkidle' });
// slow scroll to trigger reveals
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(60); }
await page.waitForTimeout(1200);
const ids = await page.evaluate(() => [...document.querySelectorAll('main section')].map((s, i) => s.id || 'hero'));
for (const id of ids) {
  const sel = id === 'hero' ? 'main section:first-of-type' : `#${id}`;
  const el = page.locator(sel).first();
  const box = await el.boundingBox();
  if (!box) continue;
  await page.evaluate((y) => window.scrollTo(0, y), box.y + (await page.evaluate(() => scrollY)) - 0);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  // limit very tall sections
  await el.screenshot({ path: `${out}/${w}-${id}.png` }).catch(async () => {});
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
const imgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
console.log(JSON.stringify({ ids, errors, failed, overflow, brokenImages: imgs, height: total }, null, 1));
await browser.close();
