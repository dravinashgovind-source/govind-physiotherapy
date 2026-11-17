// Mobile audit: overflow, small tap targets, tiny text, oversized images, per page.
import { chromium } from 'playwright-core';
const base = process.argv[2] ?? 'http://localhost:5317';
const pages = ['/', '/corporate', '/services/back-pain-sciatica-physiotherapy-kondhwa', '/privacy', '/nope'];
const b = await chromium.launch({ channel: 'chrome' });
for (const w of [360, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: 'networkidle' });
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(800);
    const r = await p.evaluate(() => {
      const vw = innerWidth;
      const vis = (el) => { const s = getComputedStyle(el); const rc = el.getBoundingClientRect(); return s.visibility !== 'hidden' && s.display !== 'none' && rc.width > 0 && rc.height > 0 && !el.closest('[aria-hidden="true"]'); };
      const small = [...document.querySelectorAll('a[href], button, select, input, textarea, label:has(input)')].filter(vis).filter((el) => {
        if (el.closest('p, li span, blockquote') && el.tagName === 'A' && getComputedStyle(el).display === 'inline') return false; // inline text links
        const rc = el.getBoundingClientRect(); return rc.height < 40 || rc.width < 40;
      }).map((el) => `${el.tagName}:${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 28)} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
      const tiny = [...document.querySelectorAll('body *')].filter((el) => el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && vis(el) && parseFloat(getComputedStyle(el).fontSize) < 11).map((el) => `${el.textContent.trim().slice(0, 30)} (${getComputedStyle(el).fontSize})`);
      const imgs = [...document.images].filter((i) => i.complete && i.naturalWidth && vis(i)).map((i) => ({ s: i.currentSrc.split('/').pop(), ratio: i.naturalWidth / (i.getBoundingClientRect().width * devicePixelRatio) })).filter((x) => x.ratio > 2.2).map((x) => `${x.s} ×${x.ratio.toFixed(1)}`);
      return { overflow: document.documentElement.scrollWidth - vw, small: [...new Set(small)].slice(0, 30), tiny: [...new Set(tiny)].slice(0, 12), bigImgs: [...new Set(imgs)].slice(0, 10) };
    });
    console.log(`\n### ${w}px ${path}  overflow=${r.overflow}`);
    if (r.small.length) console.log('  small taps:', r.small.join(' | '));
    if (r.tiny.length) console.log('  tiny text:', r.tiny.join(' | '));
    if (r.bigImgs.length) console.log('  oversized imgs:', r.bigImgs.join(' | '));
  }
  await ctx.close();
}
await b.close();
