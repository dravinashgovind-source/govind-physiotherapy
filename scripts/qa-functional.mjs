// Functional QA: node scripts/qa-functional.mjs <baseUrl>
import { chromium } from 'playwright-core';
const base = process.argv[2] ?? 'http://localhost:5317';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`);
const errors = [];

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return { ctx, page };
}

// ---- Desktop
{
  const { ctx, page } = await newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  check('Home title', (await page.title()).includes('Kondhwa'));
  check('Single h1', (await page.locator('h1').count()) === 1);
  check('JSON-LD present', (await page.locator('script[type="application/ld+json"]').count()) >= 1);
  const tel = await page.locator('a[href^="tel:"]').first().getAttribute('href');
  check('Click-to-call href', tel === 'tel:+918881868518', tel);
  const wa = await page.locator('a[href^="https://wa.me/"]').first().getAttribute('href');
  check('WhatsApp href', wa?.startsWith('https://wa.me/918881868518?text='), wa);

  // nav: minimal (logo only) over the hero, full links after scrolling
  await page.getByRole('link', { name: 'Services', exact: true }).first().click();
  await page.waitForTimeout(1800);
  const apTop = await page.evaluate(() => document.getElementById('services').getBoundingClientRect().top);
  check('Nav anchor scrolls to services', Math.abs(apTop) < 140, `top=${Math.round(apTop)}`);
  check('8 service cards', (await page.locator('#services article').count()) === 8);
  // conditions pinned scroll
  check('Conditions section present', (await page.locator('#conditions').count()) === 1);
  // doctor photo
  check('Doctor photo loads', await page.evaluate(async () => { const i = document.querySelector('#doctor img'); i.scrollIntoView(); await new Promise(r => setTimeout(r, 800)); return i.complete && i.naturalWidth > 0; }));
  // video: click play → youtube-nocookie iframe
  await page.locator('#videos').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /Play video: Post-OP/ }).click();
  await page.waitForTimeout(800);
  check('Video plays inline', (await page.locator('#videos iframe[src*="youtube-nocookie.com/embed/dzYrsgf1NTs"]').count()) === 1);
  check('Channel link', (await page.locator('#videos a[href*="youtube.com/@dr.avinashgovind"]').count()) === 1);
  // reviews
  check('Google reviews shown', (await page.locator('#patients figure').count()) >= 8);
  check('Hero Google badge', (await page.locator('main section').first().locator('a[aria-label*="on Google"]').count()) === 1);

  // approach pinned
  // clinic tour lightbox
  await page.locator('#tour').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'View photo: Consultation room' }).click();
  await page.waitForTimeout(500);
  check('Tour lightbox opens', await page.getByRole('dialog', { name: /Clinic photo/ }).isVisible());
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(400);
  check('Tour lightbox arrow nav', (await page.getByRole('dialog').getAttribute('aria-label')).includes('Private treatment room'));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  check('Tour lightbox closes', (await page.getByRole('dialog').count()) === 0);
  check('Button colour #2463EB', (await page.evaluate(() => getComputedStyle(document.querySelector('header a[href="/#book"]')).backgroundColor)) === 'rgb(36, 99, 235)');
  // FAQ accordion
  await page.locator('#faq').scrollIntoViewIfNeeded();
  const q2 = page.locator('#faq button[aria-expanded]').nth(1);
  await q2.click();
  check('FAQ opens', (await q2.getAttribute('aria-expanded')) === 'true');

  // map lazy
  await page.getByRole('button', { name: /Show map/ }).click();
  check('Map loads on request', (await page.locator('#clinic iframe').count()) === 1);

  // form validation
  const form = page.getByRole('form', { name: 'Appointment enquiry' });
  await form.getByRole('button', { name: /Send enquiry/ }).click();
  const errCount = await form.locator('[aria-invalid="true"]').count();
  check('Form: empty submit shows errors', errCount >= 4, `invalid=${errCount}`);
  check('Form: focus moves to first error', await page.evaluate(() => document.activeElement?.getAttribute('name') === 'name'));
  await form.getByLabel('Full name').fill('Test Patient');
  await form.getByLabel('Mobile number').fill('12345');
  await form.getByLabel('What do you need help with?').selectOption('Knee pain');
  await form.getByText('Evening').click();
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: /Send enquiry/ }).click();
  check('Form: invalid phone rejected', (await form.getByText('valid 10-digit').count()) === 1);
  await form.getByLabel('Mobile number').fill('+91 98765 43210');
  const popupP = ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null);
  await form.getByRole('button', { name: /Send enquiry/ }).click();
  const popup = await popupP;
  const popupUrl = popup ? popup.url() : '';
  check('Form: opens WhatsApp with message', /wa\.me|whatsapp/.test(popupUrl) && decodeURIComponent(popupUrl.replace(/\+/g, ' ')).includes('Test Patient'), popupUrl.slice(0, 90));
  await page.waitForTimeout(800);
  check('Form: success state shown', (await page.getByText('Almost done!').count()) === 1);
  await ctx.close();
}

// ---- Mobile nav
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open menu' }).click();
  check('Mobile menu opens', await page.getByRole('dialog', { name: 'Menu' }).isVisible());
  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);
  check('Mobile menu closes on Esc', (await page.getByRole('dialog').count()) === 0);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('dialog').getByRole('link', { name: /Doctor/ }).click();
  await page.waitForTimeout(1500);
  const top = await page.evaluate(() => document.getElementById('doctor').getBoundingClientRect().top);
  check('Mobile menu link navigates + closes', Math.abs(top) < 120 && (await page.getByRole('dialog').count()) === 0, `top=${Math.round(top)}`);
  check('Mobile: no horizontal overflow', (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) === 0);
  await ctx.close();
}

// ---- Reduced motion
{
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  const t = await page.evaluate(() => getComputedStyle(document.querySelector('h1 > span')).transform);
  check('Reduced motion: hero headline static', t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)', t);
  await page.locator('#approach').scrollIntoViewIfNeeded();
  const t2 = await page.evaluate(() => getComputedStyle(document.querySelector('#approach h2').parentElement.parentElement).opacity);
  check('Reduced motion: section headline visible', t2 === '1', t2);
  await ctx.close();
}

// ---- Routes
{
  const { ctx, page } = await newPage();
  await page.goto(base + '/services/knee-pain-physiotherapy-kondhwa', { waitUntil: 'networkidle' });
  check('Service page renders', (await page.locator('h1').innerText()).toLowerCase().includes('knee'));
  check('Service page title', (await page.title()).includes('Knee'));
  await page.goto(base + '/services/does-not-exist', { waitUntil: 'networkidle' });
  check('Unknown service → 404', (await page.getByText('out of range.').count()) === 1);
  await page.goto(base + '/totally/missing', { waitUntil: 'networkidle' });
  check('Unknown route → 404 + noindex', (await page.getByText('out of range.').count()) === 1 && (await page.locator('meta[name=robots]').getAttribute('content')) ?.startsWith('noindex'));
  await page.goto(base + '/corporate', { waitUntil: 'networkidle' });
  check('Corporate page renders', (await page.locator('h1').innerText()).includes('Healthy Teams'));
  const cf = page.getByRole('form', { name: 'Corporate wellness enquiry' });
  await cf.getByRole('button', { name: /Send enquiry/ }).click();
  check('Corporate form validates', (await cf.locator('[aria-invalid="true"]').count()) === 4);
  await page.goto(base + '/privacy', { waitUntil: 'networkidle' });
  check('Privacy page renders', (await page.locator('h1').innerText()).length > 0);
  // keyboard skip link
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  check('Skip link is first tab stop', (await page.evaluate(() => document.activeElement?.textContent)) === 'Skip to content');
  await ctx.close();
}

// ---- App page (phone)
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(base + '/app', { waitUntil: 'networkidle' });
  check('App: hero renders', (await page.locator('h1').count()) === 1 && (await page.getByText('Live Better.', { exact: true }).isVisible()));
  check('App: hero video plays', await page.evaluate(async () => { const v = document.querySelector('main video'); await new Promise((r) => setTimeout(r, 1500)); return !!v && !v.paused && v.currentTime > 0; }));
  await page.getByRole('button', { name: 'Pause clinic video' }).click();
  check('App: video can be paused', await page.evaluate(() => document.querySelector('main video').paused));
  check('App: site header hidden', !(await page.locator('header nav[aria-label="Main"]').isVisible()));
  await page.getByRole('button', { name: 'Pain Relief' }).click();
  await page.waitForTimeout(700);
  check('App: quick action opens Services', (await page.getByText('How we can help').count()) === 1);
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await page.waitForTimeout(500);
  check('App: 5 campaign banners', (await page.locator('#app-banners').locator('xpath=../following-sibling::ul[1]/li').count()) === 5);
  check('App: videos row', (await page.getByRole('button', { name: /Play video:/ }).count()) === 4);
  check('App: reviews row', (await page.locator('#app-reviews').locator('xpath=../following-sibling::ul[1]/li').count()) >= 8);
  await page.getByRole('button', { name: 'Appointment', exact: true }).click();
  await page.waitForTimeout(500);
  check('App: appointment tab form', (await page.getByRole('form', { name: 'Appointment tab booking form' }).count()) === 1);
  check('App: routine tab removed', (await page.getByRole('button', { name: 'Routine', exact: true }).count()) === 0);
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await page.getByRole('button', { name: /Book Appointment/ }).click();
  await page.waitForTimeout(600);
  const sheet = page.getByRole('form', { name: 'App booking form' });
  await sheet.getByRole('button', { name: /Send via WhatsApp/ }).click();
  check('App: booking validates', (await sheet.locator('[aria-invalid="true"]').count()) === 3);
  const manifest = await page.evaluate(() => fetch('/manifest.webmanifest').then((r) => r.json()));
  check('App: web manifest', manifest.start_url === '/app' && manifest.icons.length === 3);
  await ctx.close();
}

console.log(results.join('\n'));
console.log('Console/page errors:', errors.length ? errors : 'none');
await browser.close();
