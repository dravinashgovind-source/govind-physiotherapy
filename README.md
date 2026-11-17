# Govind's Advanced Pain Management & Physiotherapy Centre: website

React 19 · Vite · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger (one pinned sequence) · Lucide.

## Commands
```bash
npm install
npm run dev                                             # http://localhost:5173
VITE_SITE_URL=https://your-domain.in npm run build      # builds + prerenders every route to static HTML
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

## Deploying
`dist/` is fully static. Each route has its own `index.html`, plus a `404.html`. It works on Netlify (a `_redirects` file is included), Vercel, Cloudflare Pages or any static host. Set `VITE_SITE_URL` at build time so canonical tags and `sitemap.xml` are generated.

## Booking form
The form has no backend. On submit it validates the input and opens WhatsApp with the enquiry pre-written to the clinic's number. The visitor presses send. To also receive enquiries by email, plug a form service such as Formspree or Web3Forms into `onSubmit` in `src/sections/FinalCta.tsx`.
