# Image prompts (OpenArt or any generator)

The site works without these images. Each one upgrades a section that is currently typographic.

**Shared art direction.** Add this to every prompt:

> photorealistic, natural skin texture, Indian subject, soft north-window daylight or cool-grey seamless studio backdrop (#CBCAD1), muted wardrobe in navy / charcoal / white / sage, 50mm lens, shallow depth of field, calm and dignified, editorial health campaign. No text, no logos, no watermarks, no UI overlays, no glowing effects, no exaggerated expressions.

| ID | Where it goes | Prompt | Ratio |
|---|---|---|---|
| G1 | Hero (replaces the back-pain photo) | Indian woman in her 40s, side profile facing left, raising her right arm straight forward and up overhead (shoulder flexion), fitted charcoal t-shirt, standing tall, cool-grey seamless studio, generous empty space on the left of frame, framed from the knees up | 3:2 |
| G2 | Body explorer: Hip | Indian man in his 50s, standing, one hand resting on the side of his hip, mild discomfort, grey t-shirt and dark track pants, cool-grey seamless studio, full body, same lighting as a clean e-commerce studio set | 3:2 |
| G3 | Restore | Indian female physiotherapist in navy scrubs guiding an Indian man in his 30s through a hamstring stretch on a treatment table, bright clinic with daylight, hands-on but gentle | 4:5 |
| G4 | Rebuild | Indian man in his 30s doing a standing resistance-band row, focused expression, cool-grey studio, band anchored out of frame | 4:5 |
| G5 | Live | Indian grandmother in a cotton saree climbing the stairs at home, one hand on the rail, smiling slightly, morning light through a window | 16:9 |
| G6–G13 | Everyday cards (8) | 1. climbing stairs · 2. working at a laptop at a desk · 3. lifting a grocery bag from the floor · 4. sitting up from bed in the morning · 5. sitting cross-legged on the floor for a meal · 6. parent playing with a toddler on the floor · 7. cooking at a kitchen counter · 8. walking in a park in Pune. All Indian subjects, same daylight palette | 4:5 |

**Never generate:** Dr. Avinash Govind, the clinic interior, or patients presented as real people. Those must be real photographs.

## Adding images
1. Save the original into `images/`.
2. Add a line to `scripts/optimize-images.mjs` with `name` and `crop`.
3. Run `npm run images`.
4. Use `<Photo name="…" alt="…" />` in the section, or set `clinic.doctor.portrait` / `clinicPhotos`.
