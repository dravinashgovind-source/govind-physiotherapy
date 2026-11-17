// QA: scroll through the pinned conditions section and report which condition is shown at each step.
import { chromium } from 'playwright-core';
const [url = 'http://localhost:5317/', out = '.'] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
p.on('pageerror', (e) => errors.push(e.message));
await p.goto(url, { waitUntil: 'networkidle' });
const { top, h } = await p.evaluate(() => { const s = document.getElementById('conditions'); return { top: s.getBoundingClientRect().top + scrollY, h: s.offsetHeight }; });
const travel = h - 900;
for (let i = 0; i < 5; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), top + (travel * (i + 0.5)) / 5);
  await p.waitForTimeout(1300);
  const title = await p.evaluate(() => document.querySelector('#conditions h3')?.textContent);
  console.log(i, title);
  if (i === 0 || i === 2) await p.screenshot({ path: `${out}/cond-${i}.png` });
}
console.log('errors', errors, 'overflow', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
await b.close();
