<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Learned User Preferences

- Match Figma designs closely; do not redesign or replace the existing visual identity when adding features or motion.
- Prefer the user's provided Figma/SVG assets; do not generate replacement artwork or invent missing portraits—report missing assets instead.
- Motion work must preserve layout, typography, colors, spacing, and composition; avoid generic fade-up-everywhere patterns.
- Prefer inline SVG or React SVG components when internal SVG parts need independent animation (not plain `img`).
- Content should stay visible by default; entrance animations must not leave sections blank or unreadable on first paint.
- Keep the site fully responsive across desktop, tablet, and mobile.
- Header should be sticky: hide on scroll down, show on scroll up.
- Navigation menu should be full-screen with open/close animation matching Figma.
- When interactions or animations misbehave, fix the underlying logic before stacking more motion on top.
- Do not animate the same DOM element with both GSAP and Motion at once.

## Learned Workspace Facts

- Portfolio site for Masum Ahmed built with Next.js; primary Figma source is Masum-Portfolio (file key `T6l4utKNdl7qYR9bTUQRbF`).
- Visual identity uses an orange/black palette (accent roughly `#ff7340`, dark roughly `#1e1e1e`), thin border layouts, fonts including Vina Sans and Gugi, and a ~1920px max content width.
- Hero includes a vintage television with a continuously looping background video from the Figma prototype (not a static landscape image alone).
- Homepage Selected Projects is a GSAP ScrollTrigger pinned showcase that advances category letters C → H → K → W on scroll (Crafted Routes, Habibi Events, Kleaner Klub, Wellwick Relief).
- Site includes homepage sections (hero, projects, services, tools, pricing, footer) plus Projects archive, Project details, and About Me pages.
- An earlier notebook/zipper scroll experiment was discarded in favor of the current Figma-based hero; do not revive that approach unless asked.
- Dedicated `/contact` route exists; footer “START A PROJECT” should link there (arrow beside title per Figma), not a bare `mailto`.
- Footer social links use the `digimasumahmed` handle on Facebook, Instagram, LinkedIn, GitHub, and Dribbble.
- Selected Projects pins with ScrollTrigger on desktop (`lg+`); below that breakpoint, projects switch via letter taps without scroll pinning.
