// QA helper: node scripts/shot.mjs <url> <out.png> [width] [height] [scrollY] [reduce] [fullPage]
import { chromium } from 'playwright-core';
const [url, out, w = '1440', h = '900', scrollY = '0', reduce = '', full = ''] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, reducedMotion: reduce === 'reduce' ? 'reduce' : 'no-preference' });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(url, { waitUntil: 'networkidle' });
if (+scrollY) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), +scrollY); }
await page.waitForTimeout(3200);
await page.screenshot({ path: out, fullPage: full === 'full' });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(JSON.stringify({ errors, overflow }));
await browser.close();
