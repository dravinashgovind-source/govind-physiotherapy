import { chromium } from 'playwright-core';
const [url, expr, w='1440', h='900'] = process.argv.slice(2);
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto(url, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(expr), null, 1));
await b.close();
