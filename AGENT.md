# AGENT.md

## Purpose
This project is a static HTML/CSS/JS site. Keep it simple, semantic, and accessible. Favor clarity and maintainability over cleverness.

## Architecture (Industry-Standard for Static Sites)

### HTML
- Use semantic tags: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Maintain a single `h1` per page, then descend hierarchically (`h2`, `h3`, ...).
- Use meaningful `alt` text on images.
- Prefer lists (`ul`, `ol`) for repeated content.
- Use `data-*` attributes as hooks for JavaScript instead of classes used for styling.

### CSS
- Use a layered approach:
  - `:root` for design tokens (colors, spacing, font sizes).
  - `base` styles (body, headings, typography).
  - `layout` styles (grid, sections, page regions).
  - `components` (cards, buttons, tables).
  - `utilities` (single-purpose helpers like `.text-center`).
- Prefer class-based styling. Avoid styling by element + deep nesting.
- Use consistent naming: either BEM (`.card__title`) or clear utility names.
- Keep selectors shallow (max 2 levels) to avoid specificity wars.
- Use `rem` for font sizes and spacing to support accessibility.

### JavaScript
- Use ES modules: one entry file and small feature modules.
- Keep JS unobtrusive; enhance HTML rather than rewrite it.
- Bind behavior using `data-*` attributes.
- Use `DOMContentLoaded` for initialization when needed.

### Backend (Optional, If/When Added)
- Do not hard-code raw URLs inside methods.
- Centralize external service endpoints in config (e.g., env vars or `config/endpoints`).
- Use service client modules to encapsulate API calls.
- If applicable, keep endpoints environment-specific (dev/staging/prod).

## Project Structure (Recommended)
If the project grows, use this layout:

- `index.html`
- `assets/`
- `assets/images/`
- `assets/fonts/`
- `css/`
- `css/main.css`
- `js/`
- `js/main.js`
- `js/modules/`

For now, keep the existing flat structure unless complexity requires a split.

## Coding Standards

### HTML
- Indent with 2 or 4 spaces consistently.
- Keep attributes in a single line unless they become long.
- Use descriptive `class` and `id` names.

### CSS
- Define color palette and spacing in `:root` variables.
- Avoid inline styles.
- Group related rules together.
- Use media queries mobile-first.

### JS
- Avoid global variables.
- Prefer `const` and `let`.
- Keep functions small and named.

## Accessibility
- Ensure color contrast meets WCAG AA.
- Add `aria-label` only when semantic HTML is not enough.
- Tables require `th` with scopes for readability.

## Performance
- Optimize images (size and format).
- Avoid large background images if not needed.
- Defer non-critical JS.

## Deployment
- Static site: any static host works (GitHub Pages, Netlify, etc.).
- Keep assets relative, no absolute paths.

## When Changing This Project
- Keep the simple structure unless required by new features.
- If adding JS, create a `js/` folder and load scripts at the end of `body`.
- If CSS grows, move to `css/main.css` and update `link` in HTML.
