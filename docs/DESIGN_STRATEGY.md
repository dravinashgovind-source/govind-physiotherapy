# Govind's Advanced Pain Management & Physiotherapy: Audit & Design Strategy

Status: Phase A (audit) and Phase B (strategy) are done. Implementation is waiting on the open questions in §9.

---

## 1. Project audit (Phase A)

| Item | Finding |
|---|---|
| Framework / code | None. The folder holds only `images/`. This is a new build, so there's no existing functionality to break. |
| Routes, backend, integrations | None. |
| Branding | No logo files. The mockups use a teal "figure" mark and the name "Dr. Avinash Govind Physiotherapy". |
| Location | Only "Kondhwa, Pune", taken from mockup `574b7ad4…png`. **Not yet verified.** |
| Contact details | None supplied. |
| Doctor photograph | **None supplied.** The doctor in the mockups is AI-generated and must not be used as Dr. Govind. |
| Clinic photographs | **None supplied.** |
| Testimonials | **None supplied.** The quotes, names, star ratings and stats in the mockups and the UX Pilot PDF ("5.0 / 1,280 reviews", "72% pain reduced", "12,400+ patients", Dr. Ananya Rao, etc.) are invented and will not be used. |
| OpenArt | Not connected in this Claude Code session. I can't see any OpenArt tool or skill, so I can't generate images from here yet. |

### Image inventory

| File(s) | What it is | Use? |
|---|---|---|
| `Gemini…j9uu…` (5 files) | Indian models on a cool-grey seamless backdrop with a red glow marking back, neck, ankle, shoulder and knee pain. Consistent lighting, 2400×1792. | **Yes.** These are the Body Explorer / RECOVER set. Each needs the Gemini ✦ watermark cropped from the bottom-right. Hip is missing. |
| `Gemini…ujnn…` (portrait), `Gemini…sq7u…` | Dark, moody shot of a man stretching his shoulder, with fake glass UI cards | Partial. Only usable with a tight crop that removes the UI cards. Mood reference. |
| `Gemini…1voc…` (3 files) | Western physio and an older patient, bright clinic | No. Western stock look and not Indian patients. |
| `Gemini…nlsk…` | Sprinter with neon UI | No. Generic fitness look the brief rules out. |
| `Gemini…ipso…`, `Gemini…liatz…`, `2c579a6b…`, `6ed268bf…`, `Five Modern…`, `Modern Physiotherapy Care Collage`, `Move Pain-Free…`, `Move Better, Live Stronger…`, `Pastel…`, `thumbnail…webp`, `uxpilot…pdf` | Mockups and concept boards with text baked in | Reference only. |
| `574b7ad4…png` | Full homepage mockup with the 13-section structure | **Primary structural reference.** Section order is kept; the layouts are redesigned. |

---

## 2. What we take from the Noise reference

The Noise Rep page sells a tracker with this sequence: aspirational hook → "Better Performance starts now" → "Invest once. Track for life." → **"Your body, in three scores"** → science → "insights that adapt to you" → proof → specs and FAQ.

What we borrow:
- **One idea per screen.** Each section gets a single short headline broken across two lines.
- **Scores as a visual system.** Their Sleep / Recovery / Effort becomes our Pain / Mobility / Strength. On our page these are educational dials. They are never numbers about the visitor.
- **Hard cuts between dark and light chapters** for a cinematic rhythm.
- **Science as credibility.** Ours is shown through anatomical line work instead of sensor diagrams.

What we leave out: product-commerce patterns, competitor comparisons and spec tables.

---

## 3. Three hero concepts

### A: "Line of Pull" (anatomical overlay)
A dark navy studio. One real Indian patient is photographed from behind, waist up, with one arm raised. A fine single-weight SVG drawing of the shoulder muscles and spine draws itself over the body on load, and teal joint markers pulse once. The headline is set in huge condensed capitals, stacked left, with the figure overlapping the word "MOVEMENT".
- Strength: clinical and precise, and reads as "movement science".
- Risk: drifts toward the glowing-skeleton cliché unless the line work stays very restrained.

### B: "Range of Motion" (goniometer) ★ recommended
A warm-white page and a cool-grey seamless backdrop. One Indian woman in her 40s stands in profile, raising her arm through shoulder flexion. Behind her, a large thin **goniometer arc** (the physio's protractor) sweeps from 0° to 180° on load. Tick marks and degree labels set in a mono face follow her arm, and the arc ends on a teal marker. The headline wraps around the arc: **BETTER / MOVEMENT / STARTS NOW.** A small caption reads "Shoulder flexion · 0–180° · normal active range."
- Strength: no other clinic owns this image. The goniometer is a physiotherapist's own instrument, so the concept says "assessment and recovery", not "gym". It's calm, premium and readable, and works on mobile because the arc scales and the figure crops to the shoulder.
- Risk: needs one strong commissioned or generated photograph. The page is designed so a cropped interim image still works.

### C: "Two Hands" (human care)
A full-bleed, cinematic, low-key close-up of a physiotherapist's hands guiding a patient's knee. The headline is set in white over a dark gradient, with a slow push-in.
- Strength: warm and human.
- Risk: it's the most common physio hero there is, and it says little about expertise.

**Decision: B, with A's line work reused in the Body Explorer (§6).** B gives the brand a signature motif (arcs, degrees, measured progress) that repeats through the page: section indicators become small arcs, the pillars become arc dials, and the four-step journey runs along an arc.

---

## 4. Design system

### Colour tokens
| Token | Hex | Role |
|---|---|---|
| `--navy` | #123B63 | Primary ink on light, dark chapter background |
| `--teal` | #0B9F9A | Accent, active states, arcs, focus rings |
| `--green` | #65B83C | Progress / "rebuild" only, used sparingly |
| `--paper` | #FAFBFA | Page background |
| `--mist` | #E8EDF1 | Studio grey, panels, rules |
| `--charcoal` | #202B37 | Body text, deep dark chapters |
| `--navy-ink` | #0B2540 | Derived: darkest chapter background |
| `--signal` | #E4572E | Derived: used **only** for the pain-region glow in photos and explorer highlights, never for UI chrome |

Contrast: charcoal on paper and navy on mist both pass AA. Teal on paper is 3.4:1, so it's used for large text and graphics only. Body links use navy with a teal underline.

### Typography
- **Display: Archivo** (variable, `wdth` 62–125, `wght` 800). Set in condensed capitals for headlines and expanded for numerals. The width axis lets the headline "breathe" on scroll without a second font.
- **Human accent: Instrument Serif Italic.** One or two words per section (*your body*, *everyday*) add warmth against the clinical sans.
- **Text: Instrument Sans** (400/500/600) for body copy and UI.
- **Data: JetBrains Mono** (400) for degree labels, section numbers and captions. It's subset to digits and basic Latin.

Scale: fluid `clamp()` from 14 → 18px for body and 64 → 220px for the hero display. Line length 60–70ch.

### Layout principles
1. A 12-column grid with a 16px gutter on mobile and 24px on desktop. Edges are asymmetric: text hugs column 2 and imagery bleeds off the opposite edge.
2. Every section gets one **index label**, `02 — RECOVER`, set in mono, plus a small arc indicator.
3. Light and dark chapters alternate in a set rhythm: paper → navy → paper → mist → charcoal …
4. Corners: images are sharp (0px). Only buttons get a 999px pill, and inputs get 4px. No card grids with drop shadows.
5. Rules (1px, mist or navy at 20%) organise content in place of boxes.

---

## 5. Homepage wireframe

```
01 HERO          paper    | goniometer arc + profile figure | BETTER MOVEMENT STARTS NOW | Book · Call
                          | nav: logo · Explore · Approach · Doctor · Clinic · [Book]   footer strip: Kondhwa, Pune
02 RECOVER       navy     | sticky left: oversized "RECOVER" + 3 short lines about listening to discomfort
                          | right: scrolling column of 2 studio photos (back, neck) with a red glow
03 RESTORE       paper    | full-bleed image clip-reveals from a thin arc slit → guided mobility photo, caption in mono
04 REBUILD       mist     | split: progressive-load ladder (Week 1 → 6 as rising bars, illustrative only) + band-training photo
05 LIVE          charcoal | wide cinematic photo (grandparent + child / climbing stairs), single line of serif italic
06 BODY EXPLORER paper    | left: line-art body (front) with 6 tappable joints | right: panel → about · common difficulties · services
                          | permanent note: "Educational only — not a diagnosis. Book an assessment."
07 THREE PILLARS navy     | three arc dials (Pain / Mobility / Strength), each one a tab; selecting one swaps the explanation + photo
08 EVERYDAY      paper    | horizontal editorial strip of 8 activity photos with mono captions (drag/scroll, keyboard arrows)
09 APPROACH      mist     | pinned (GSAP) on desktop: an arc fills 0→100% through 01 Assess · 02 Plan · 03 Rehabilitate · 04 Progress
                          | mobile: plain vertical list, no pin
10 DOCTOR        paper    | real photo (large, unretouched), verified credentials only, short philosophy quote (if he supplies one)
11 CLINIC        charcoal | asymmetric gallery of real clinic photos with keyboard lightbox
12 PATIENTS      paper    | only real, permitted testimonials, or a "Read our Google reviews" link if none are supplied
13 FINAL CTA     navy     | YOUR NEXT MOVE STARTS HERE. | enquiry form | Call · WhatsApp · Directions
FOOTER           navy-ink | address, hours, map link, legal, "information is educational" disclaimer
```

Additional routes: `/services/{back-pain,neck-pain,shoulder,knee,hip,ankle,sports-injury,post-surgery}` (SEO service pages, one shared template), `/privacy` and `404`.

---

## 6. Body Explorer

- An original SVG figure drawn as anatomical line art in navy at 1.25px stroke. It isn't a cartoon. Six hit areas are real `<button>` elements with labels, laid out in a roving-tabindex group (arrow keys move, Enter selects).
- On selection, the region glows (teal ring + signal halo) and the panel shows:
  - **About this area**: what the joint does, in plain language.
  - **Movements people often find difficult**: for example, "reaching overhead".
  - **How physiotherapy may help**: links to the matching service page.
  - A fixed footer: "This is general information, not a diagnosis. Only an in-person assessment can identify the cause."
- On mobile, the figure sits above a segmented control and the panel below it.

---

## 7. Photography and asset requirements

**Art direction for every generated image:** cool-grey seamless studio or soft north-window daylight; muted wardrobe in navy, grey, white and sage; Indian subjects aged 25–70; natural skin texture; a 50mm look; no text, logos, UI overlays, glow effects or watermarks. Pain is shown through posture and expression. The red glow is added in CSS where needed, so it stays consistent.

### From the client (must be real — cannot be generated)
1. **Dr. Avinash Govind portrait.** At least 2000px, natural light, plus one of him treating a patient if possible.
2. **Clinic photos.** 6–10 of them: reception, treatment room, equipment, exterior/signage.
3. **Testimonials** with written patient consent, or the Google Business Profile link.
4. **Logo** (SVG if one exists; otherwise I'll design a wordmark).

### To generate with OpenArt (prompts below are ready to paste)
| # | Slot | Prompt summary |
|---|---|---|
| G1 | Hero (B) | Indian woman, ~40s, side profile, arm raised in shoulder flexion, fitted navy top, cool-grey seamless studio, soft key light from left, lots of negative space on the left, full body to the knees, 3:2 and 4:5 crops |
| G2 | Hip (explorer) | Indian man, ~50s, standing, hand on side of hip, mild discomfort, grey t-shirt, cool-grey seamless studio, matching the existing j9uu set |
| G3 | RESTORE | Physiotherapist guiding a patient's hamstring stretch on a treatment table, Indian subjects, daylight clinic, calm |
| G4 | REBUILD | Indian man, ~30s, resistance-band row, focused, cool-grey studio |
| G5 | LIVE | Indian grandmother climbing stairs at home holding the rail, smiling, morning light |
| G6–G13 | EVERYDAY (8) | Desk work posture, climbing stairs, lifting a grocery bag, getting out of bed, walking in a park, playing with a child on the floor, cooking at a counter, cycling. All Indian subjects, same daylight palette, 4:5 |
| G14–16 | PILLARS | Close details: hand pressing lower back (Pain), shoulder in overhead reach (Mobility), hands gripping a dumbbell (Strength). Cool grey, macro |

Full prompts will go in `docs/ASSET_PROMPTS.md` once the direction is approved. Until the generated images arrive, each slot shows a neutral, labelled "Image pending" frame. No unrelated stock images are used as filler.

---

## 8. Animation strategy

| Effect | Tool | Where |
|---|---|---|
| Arc sweep, line-art draw-on, joint pulse | CSS / SVG `stroke-dashoffset` | Hero, explorer |
| Headline line reveals, image clip reveals | Framer Motion `whileInView` (once) | All sections |
| Pinned 4-step journey | GSAP ScrollTrigger | Approach, desktop only |
| Light parallax (≤40px) | Framer `useScroll` | Restore, Live |
| Smooth scroll | Lenis off by default. Native `scroll-behavior` is used, which keeps browser history, find-in-page and assistive tech intact | — |

`prefers-reduced-motion`: all transforms are removed, the arcs render complete, and the GSAP pin is disabled so the section shows as a static list.

---

## 9. Open questions (needed before or during build)

1. **Phone number** for click-to-call, and **WhatsApp number**.
2. **Full clinic address** and Google Maps link. Is Kondhwa, Pune correct?
3. **Opening hours.**
4. **Dr. Govind's verified details**: degrees (BPT/MPT?), registration, years of experience, specialisations, memberships.
5. **Doctor photo, clinic photos and logo** (see §7).
6. **Testimonials or Google review link.**
7. **Where enquiry form submissions should go**: email via Formspree/Web3Forms, a Google Sheet, or a pre-filled WhatsApp message (needs no backend).
8. **Domain**, for canonical URLs, sitemap and Open Graph tags.
9. **Services actually offered**, to confirm the service-page list in §5.
10. **OpenArt**: it isn't connected to this session. Either connect it as an MCP server, or generate the images from §7 yourself and drop them in `images/`.
