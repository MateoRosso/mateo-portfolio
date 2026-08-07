# Portfolio redesign — "Monochrome Precision"

Status: approved pending final spec review
Date: 2026-08-06

## Goal

Full visual and structural renovation of the MateoGraphics portfolio (`site/`), applying the animation/design principles from `emilkowalski/skills` (`emil-design-eng`, `animate`, `apple-design`, `animation-vocabulary`). Secondary but mandatory goal: fix the ~66MB of unoptimized PNG thumbnails that make the site heavy.

## Visual identity

- **Palette**: background `#050505`, foreground `#f5f5f2`, single accent `#a3e635` (kept from the existing brand — the one thing carried over). Accent used only for interactive/focus moments, never as a fill.
- **Typography**: single family, Geist (already loaded via `next/font/google`, no extra network request). Orbitron and the runtime `@import` of Plus Jakarta Sans (currently fetched in `motion-footer.tsx`'s injected `<style>`) are removed — both are unnecessary weight/latency on top of the image problem. Hierarchy comes from weight + size + leading + tracking (negative tracking on large display text, near-zero on body), per the Apple typography rules in `apple-design/SKILL.md`.
- **Materials**: translucent layers (`backdrop-filter: blur()`) for nav and elevated cards instead of opaque panels, for depth without visual noise.

## Structure (sections, in order)

1. **Nav** — floating translucent bar, appears on scroll past the hero, anchor links to sections.
2. **Hero** — large headline + one-line subhead (placeholder copy, clearly marked for the user to replace) + two CTAs (ver trabajo / contacto) + the existing thumbnail marquee, restyled (kept — constant-motion marquee is the correct use of `linear` easing per the vocabulary skill).
3. **Trabajo** — inline curated grid of 8-10 featured thumbnails + "Ver todo" button opening the existing full-gallery modal (`work-gallery.tsx`), restyled to the new system.
4. **Proceso** — 3-4 step process (placeholder copy: Brief → Concepto → Diseño → Entrega), reusing/adapting `grid-feature-cards.tsx`.
5. **Stats** — thin strip with 3 placeholder metrics (e.g. "+150 miniaturas entregadas", "48h tiempo de entrega"). Marked as placeholder — user must replace with real numbers before shipping.
6. **Contacto** — existing cinematic footer, restyled to the monochrome system, same actions (WhatsApp, X, Discord copy, email copy).

No testimonials section (removed per user request — avoids fabricating quotes/names attributed to people).

All placeholder copy will be visually or textually flagged (e.g. obviously generic phrasing) so it's easy for the user to find and replace later.

## Motion system

Concrete values, sourced from `animate/SKILL.md` and `apple-design/SKILL.md` — no invented curves:

- Entrances/exits: `ease-out` → `cubic-bezier(0.23, 1, 0.32, 1)`
- On-screen movement: `ease-in-out` → `cubic-bezier(0.77, 0, 0.175, 1)`
- Constant motion (marquee): `linear`
- Springs: default `damping: 1.0` (critically damped, no overshoot) for entrances/UI; bounce (`~0.15-0.2`) reserved only for momentum-driven interactions (drag, magnetic hover button in the footer)
- Durations: button/tile press 100-160ms; nav/small popovers 125-200ms; gallery modal open/close 250-400ms; scroll-reveals 400-600ms (marketing-tier, can run longer) with 40-60ms stagger between siblings
- `:active` press feedback via `transform: scale(0.97)`, triggered on pointer-down, on every pressable element
- Only `transform`/`opacity` animate (plus `clip-path` for the gallery-open materialize effect); no `width`/`height`/`top`/`left` animation
- `prefers-reduced-motion` and `@media (hover: hover) and (pointer: fine)` gating on every animation, no exceptions
- Gallery modal materializes (blur + scale together) rather than a plain opacity fade, per the Apple "materialize, don't just fade" rule

## Image pipeline (fixes the weight problem)

Current state: `public/thumbnails` (46MB, 28 files) + `public/more-thumbnails` (20MB, 9 files), raw PNGs, `next.config.ts` has `images.unoptimized: true` (required for static export via `output: "export"`), so nothing is compressed today.

Plan:

1. Move the 37 source PNGs out of `public/` into a non-deployed source folder (`assets/thumbnails-src/`), so raw originals stay in the repo for future re-processing but are never shipped.
2. Add `sharp` as a devDependency.
3. Add `scripts/optimize-images.mjs`: for each source image, generate two WebP variants into `public/thumbnails/`:
   - `*.webp` — max width 480px, quality ~70, used in the hero marquee and the inline "Trabajo" grid.
   - `*-full.webp` — max width 1280px, quality ~78, used only in the gallery modal / lightbox.
4. Wire the script into `prebuild` so `next build` (and therefore `npm run deploy`) always regenerates from source — new thumbnails dropped into `assets/thumbnails-src/` get optimized automatically.
5. Update the image lists in `app/page.tsx` and the components consuming them to point at the new `.webp` paths and pick the right variant per context.
6. Delete unused dead assets found during investigation: `public/compilado miniaturas.png` (1.1MB), `app/logo transparente.png` (66KB), `public/icons/*.png` (~4MB, 3 files) — none are referenced anywhere in `app/` or `components/`, leftover from already-deleted components (`isometric-wave-grid-background.tsx`, `kinetic-scroll-gallery.tsx`, `scroll-tilted-grid.tsx`, `slide-tabs.tsx`).

Expected result: ~66MB of shipped image weight drops to roughly 3-6MB.

## Components touched

- `app/globals.css` — new palette/tokens, motion custom properties, remove old lime-heavy glass-pill styling in favor of the new material system.
- `app/layout.tsx` — drop Orbitron font import.
- `app/page.tsx` — new section composition, updated image lists (webp paths, thumb vs full split).
- `components/ui/animated-hero.tsx` — restyle hero + marquee to new system, remove Orbitron usage.
- `components/ui/work-gallery.tsx` — restyle grid/lightbox to new system, materialize-on-open.
- `components/ui/motion-footer.tsx` — restyle to monochrome system, remove runtime Google Fonts `@import`, keep magnetic-button/GSAP behavior (momentum-appropriate, spring bounce allowed here).
- `components/ui/grid-feature-cards.tsx` — restyle for the new "Proceso" section.
- New: nav component, stats strip component, process-step content.
- `components/ui/button.tsx` — unused today; adopted as the base primitive for the new nav/CTA buttons instead of the ad hoc `HeroButton`/inline button markup, since it's a standard shadcn primitive already wired to `cn()`.
- `components/ui/connect-with-us.tsx` — confirmed dead code (not imported anywhere, a superseded duplicate of the footer's social links). Deleted as part of cleanup, same bucket as the unused image assets.
- `next.config.ts` — unchanged (`unoptimized: true` stays correct for static export; optimization now happens at build-time via the script, not via next/image).

## Out of scope

- No rebrand of the accent color (kept lime `#a3e635` per explicit choice).
- No testimonials section.
- No pricing/services page.
- No CMS or dynamic content — copy stays hardcoded placeholder text/data in the components, same pattern as today.

## Testing / validation

- `npm run build` must succeed (static export).
- Run the dev server and visually verify each section, hover/press states, reduced-motion behavior (via OS setting or DevTools emulation), and the gallery open/close materialize effect.
- Confirm `du -sh public/` drops from ~71MB to single-digit MB after the image pipeline runs.
- Confirm no console errors and no remaining references to deleted assets or the removed Google Fonts import.
