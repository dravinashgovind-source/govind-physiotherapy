# Govind's Advanced Pain Management & Physiotherapy Centre: website

React 19 · Vite · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger (one pinned sequence) · Lucide.

## Commands
```bash
npm install
npm run dev                                             # http://localhost:5173
npm run build                                           # builds every route to static HTML + sitemap
npm run preview
npm run images                                          # re-generate AVIF/WebP from images/
node scripts/qa-functional.mjs http://localhost:5173    # 33 interaction checks (needs Google Chrome)
node scripts/qa-sections.mjs http://localhost:5173 ./shots 390 844   # section screenshots
```

## Where things live
| What | File |
|---|---|
| **All clinic facts** (phone, WhatsApp, address, hours, doctor details) | `src/config/clinic.ts` |
| Body explorer + service page content | `src/content/regions.ts` |
| Clinic photos & testimonials (empty until real ones are supplied) | `src/content/media.ts` |
| Homepage sections 01–13 | `src/sections/` |
| Design tokens (colours, fonts) | `src/styles/index.css` |
| Design strategy | `docs/DESIGN_STRATEGY.md` |
| Image prompts | `docs/ASSET_PROMPTS.md` |

Fields set to `null` or `[]` in the config are hidden on the site until they're filled in. Nothing is invented.

## Deploying on Vercel
1. On vercel.com → **Add New → Project** → import `dravinashgovind-source/govind-physiotherapy`.
2. Vercel reads `vercel.json` automatically (framework Vite, `npm run build`, output `dist`). No settings need changing.
3. Optional: once you have a domain, add it under **Settings → Domains**, then add the environment variable
   `VITE_SITE_URL = https://www.your-domain.in` and redeploy. Until then, the Vercel production URL is used for canonical tags and the sitemap.

Every route is built as its own HTML file, so Vercel serves `/corporate`, `/privacy` and `/services/...` directly, and unknown URLs get `404.html` with a real 404 status.
On a machine with Google Chrome, the build fully prerenders each page. On Vercel (no Chrome) it writes each page with its own title, description and link-preview tags, and the content renders in the browser.

## Booking form
The form has no backend. On submit it validates the input and opens WhatsApp with the enquiry pre-written to the clinic's number. The visitor presses send. To also receive enquiries by email, plug a form service such as Formspree or Web3Forms into `onSubmit` in `src/sections/FinalCta.tsx`.
