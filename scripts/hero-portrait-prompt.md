# Hero Portrait — Image Generation Prompt

## Current asset (to replace)
`public/imgs/pfp-regenerated.png` — stylized hooded figure with face mask, generic “C programmer / hacker” aesthetic. Reads as stock AI art, not a credible Senior AI Engineer portrait.

## Target asset
- **Path:** `public/imgs/pfp-regenerated.png` (+ derived `public/imgs/pfp.webp`)
- **Use:** Hero portrait on code5717.github.io, OG/social preview
- **Dimensions:** 2048×2048 px (square), sharp at retina; subject centered with safe crop margins
- **Format:** PNG master, then WebP derivative

---

## Detailed image description (generation prompt)

**Subject:** Professional portrait of a young South Asian / Middle Eastern man in his mid-20s, confident and approachable. Short dark wavy hair, light stubble, clear rectangular glasses with thin frames. Wearing a matte black pullover hoodie (no logos, no face mask, hood down). Direct eye contact with camera; neutral-to-slight smile. Realistic skin texture, natural proportions — not uncanny, not cartoon.

**Setting:** Modern developer workspace at night. Shallow depth of field. Behind him, softly blurred:
- Left: monitor with dark IDE theme and faint syntax-highlighted code (Python/TypeScript tones, not C)
- Right: large window with out-of-focus city bokeh (warm amber + cool blue lights)

**Lighting & color (match portfolio):**
- Dominant palette: deep charcoal, near-black, cool cyan/teal rim light on hair and shoulder
- Secondary accent: subtle lime-green specular (portfolio accent `#b7f43b`) as a thin edge light, not dominant
- Soft key light on face; no harsh flash; cinematic contrast
- Mood: senior engineer, production systems, credible — not hacker cosplay

**Composition:**
- Medium close-up (head + upper chest)
- Subject slightly off-center (rule of thirds)
- Clean negative space for site frame overlays
- No text, watermarks, hex logos, coffee mugs, books, or meme props

**Style:** Photorealistic editorial portrait. High-end LinkedIn-meets-tech-portfolio. 85mm lens look, f/1.8 bokeh, subtle film grain, 4K clarity.

**Avoid:** Hood up, face mask, anonymous silhouette, neon hacker clichés, “The C Programming Language” book, glowing C logos, cartoon/3D render look, oversaturated cyberpunk, extra fingers, distorted glasses.

---

## Negative prompt
hooded anonymous hacker, face mask, balaclava, glowing C logo, programming book props, cartoon, illustration, 3D render, low resolution, blurry face, distorted hands, watermark, text overlay, oversaturated neon

---

## Reference direction
Closer to the recovered `hero-portrait.png` (realistic engineer at desk, city night) than the current masked hooded illustration.
