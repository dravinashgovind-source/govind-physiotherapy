// QA: on a phone, each swipe in the Conditions section should move exactly one condition.
import { chromium } from 'playwright-core';
const [url = 'http://localhost:5317/', out = '.'] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await p.goto(url, { waitUntil: 'networkidle' });
const label = () => p.evaluate(() => document.querySelector('#conditions [aria-live] p')?.textContent?.slice(0, 22));
async function swipe(dy) {
  const x = 200, y0 = dy > 0 ? 650 : 250;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: y0 }] });
  for (let k = 1; k <= 8; k++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y0 - (dy * k) / 8 }] });
    await p.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await p.waitForTimeout(1300);
}
// pin the card on condition 1
await p.evaluate(() => {
  const t = document.querySelector('.conditions-track');
  window.scrollTo(0, t.getBoundingClientRect().top + scrollY + (t.offsetHeight - innerHeight) * 0.1);
});
await p.waitForTimeout(1200);
await p.screenshot({ path: `${out}/swipe-0.png` });
const log = [`start: ${await label()}`];
for (const [name, dy] of [['short swipe up', 80], ['long swipe up', 380], ['long swipe up', 380], ['short swipe up', 80], ['swipe down (back)', -200]]) {
  await swipe(dy);
  log.push(`${name}: ${await label()}`);
}
await p.screenshot({ path: `${out}/swipe-end.png` });
await swipe(300); await swipe(300);
const after = await p.evaluate(() => document.querySelector('.conditions-track').getBoundingClientRect().bottom < innerHeight);
log.push(`past last card, page continues: ${after}`);
console.log(log.join('\n'));
await b.close();
