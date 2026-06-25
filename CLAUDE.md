# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm start            # Dev server at http://localhost:3006 (hot reload enabled)
npm run build        # Production build → dist/
ANALYZE=true npm run build  # Production build with bundle analyzer
```

No test suite is configured (`npm test` exits with error).

## Architecture

This is a **multi-page static website** for Keells Food Cuisine, built with Webpack 5. Each cuisine category is a separate HTML page with its own JS entry point, all sharing a single compiled stylesheet.

### Data layer

All product and dish data lives in [`src/js/constants.js`](src/js/constants.js) as plain ES module exports:
- `products` — keyed by cuisine (e.g., `products.italian`, `products.indian`)
- `dishes` — keyed by cuisine + `dishitems` suffix (e.g., `dishes.Indiandishitems`)

Each dish object has `title`, `filepath`, `videopath`, `spiceLevel`, `fullnessLevel`, `description`, `Ingredients`, and `steps` (with optional `substeps`).

### Shared rendering layer

Two shared modules handle all DOM work:

- [`src/js/shared-renderers.js`](src/js/shared-renderers.js) — `renderProducts`, `renderDishes`, `renderModalContent`. Also contains the global `window.openVideoModal` function which handles YouTube/Vimeo via iframe embed and TikTok via popup window.
- [`src/js/shared-utils.js`](src/js/shared-utils.js) — `HeaderAnimations` class, `initializeModalHandlers`, `initializeMobileMenu`, `initializePage`.

### Cuisine page pattern

Each cuisine JS file (e.g., [`src/js/indian.js`](src/js/indian.js)) is a thin wrapper:
1. Imports cuisine-specific data slices from `constants.js`
2. Imports shared rendering/utility functions
3. Calls `initializePage(renderProducts, renderDishes, initModalHandlers)`

The homepage [`src/js/index.js`](src/js/index.js) is different — it handles the landing page with `ParallaxEffects`, `ScrollAnimations`, `HeaderAnimations`, and `PerformanceOptimizer` classes using GSAP + ScrollTrigger.

### Webpack entry points

Each page has its own JS chunk plus the shared `styles` chunk. The webpack config in [`webpack.config.js`](webpack.config.js) maps each HTML template to its chunk via `HtmlWebpackPlugin`. Production builds use content hashes; dev builds use plain names.

### Styles

All SCSS is compiled as a single bundle through [`src/styles/main.scss`](src/styles/main.scss). Variables are in [`src/styles/_variables.scss`](src/styles/_variables.scss). Each cuisine has its own partial (e.g., `_indian.scss`). Bootstrap 5 is imported via SCSS.

### Animation system

- **GSAP + ScrollTrigger**: Used for all scroll-based reveal animations, parallax effects, header hide/show, and progress ring animations on dish cards.
- **Slick Carousel**: Mobile product and dish sliders. Initialized inside `renderProducts` and `renderDishes` after DOM injection.
- Progress rings (spice/fullness levels) animate via `IntersectionObserver` when dish cards scroll into view.

### Adding a new cuisine page

1. Add product and dish arrays to `constants.js`
2. Create `src/js/<cuisine>.js` following the existing cuisine page pattern
3. Create `src/<cuisine>.html` using an existing cuisine HTML as a template
4. Add the entry and `HtmlWebpackPlugin` instance to `webpack.config.js`
5. Create `src/styles/_<cuisine>.scss` and `@use` it in `main.scss`
