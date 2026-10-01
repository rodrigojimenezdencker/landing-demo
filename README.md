# Orbit landing page (concept demo)

A landing page for a fictional travel planner, built to practise motion work with GSAP and Framer Motion. Orbit is not a real product.

- GSAP: hero headline timeline (word-by-word entrance) and an infinite marquee
- Framer Motion: scroll-triggered reveals and a scroll-linked parallax blob
- Respects `prefers-reduced-motion`
- Responsive, no layout overflow at 390px

## Limits

Checked in headless Chromium screenshots (final frames); animation timing and performance were not profiled. Uses the system font stack.

## Run

    npm install
    npm run dev
