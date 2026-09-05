# Squishy Game UI playground

A small Astro + Tailwind v4 playground to develop game-style interface components.
One general style (rounded, 4px border, gradient, hard shadow, squish on press) with
color variants. Icons are Material Symbols Rounded via Iconify.

## Commands

| Command             | Action                                   |
| :------------------ | :--------------------------------------- |
| `npm install`       | Install dependencies                     |
| `npm run dev`       | Start dev server at `localhost:4321`     |
| `npx astro check`   | Type-check components and props          |
| `npm run build`     | Build the site to `./dist/`              |
| `npm run preview`   | Preview the build locally                |

## Structure

```
src/
  styles/global.css      Theme tokens (type scale, fonts, shadows), keyframes, all component classes
  styles/brands.css      Original one-off brand looks (press, deck, blocky, ...) for later
  components/palette.ts  Color variants. colorStyle() → --c-* vars. accentStyle() → --accent
  components/backgrounds.ts  Tiled SVG background patterns
  components/            Button, Icon, InputField, TextArea, Select, Checkbox, Radio, Toggle,
                         Slider, Heading, Background, BrandButton, PixelIcon
  stories/               One file per story. Each becomes a page + nav entry.
  layouts/Playground.astro   Shell with background + story nav
  pages/index.astro      Overview
  pages/[story].astro    Renders each story from src/stories
src/assets/fonts/        m6x11plus.ttf (bundled by Vite)
```

## Conventions

- **Type scale**: `text-ui-xs` 12px · `text-ui-sm` 18px · `text-ui-md` 22px · `text-ui-lg` 28px · `text-ui-xl` 36px · `text-ui-2xl` 48px.
- **Font**: m6x11plus is the only font. `font-pixel` and `font-sans` both map to it.
- **Colors**: `color="green"` etc. on components. Add a color in `palette.ts`.
- **Icons**: `<Icon name="settings" />` → `material-symbols:settings-rounded`.
  Browse: https://icon-sets.iconify.design/material-symbols/?suffixes=rounded
- **Sizes**: `size="sm" | "md" | "lg"` on Button.

## Add a component

1. Add a class to `src/styles/global.css`.
2. Add a component file in `src/components/`.
3. Add a story in `src/stories/<name>.astro` with `export const title = '...'` and
   optional `export const bg = 'dots'`. The nav and route update automatically.

## shadcn registry

The components are published as a [shadcn registry](https://ui.shadcn.com/docs/registry) so they
can be installed with the shadcn CLI into any Astro + Tailwind v4 project:

```
npx shadcn@latest add https://halfmage.github.io/squishy-game-ui/r/button.json
```

- `registry.json` lists every item. Items are `registry:item` with `registry:file` files and
  explicit `target` paths (`~/src/components/...`), so they work without a React setup.
- `npm run registry:build` writes `public/r/<item>.json` plus `public/r/registry.json`.
  Run it after you change a component, then commit `public/r`.
- `homepage` in `registry.json` is the deployed URL: https://halfmage.github.io/squishy-game-ui

### List it in the shadcn directory

1. The site deploys to GitHub Pages on every push to `main` (.github/workflows/deploy.yml).
   `https://halfmage.github.io/squishy-game-ui/r/registry.json` must be public.
2. Fork https://github.com/shadcn-ui/ui and add an entry to `apps/v4/registry/directory.json`:

   ```json
   {
     "name": "@squishy",
     "homepage": "https://halfmage.github.io/squishy-game-ui",
     "url": "https://halfmage.github.io/squishy-game-ui/r/{name}.json",
     "description": "Squishy game UI for Astro + Tailwind v4: pixel font, hard shadows, brand themes.",
     "logo": "<svg ...></svg>"
   }
   ```

3. Run `pnpm validate:registries` in the fork, then open a pull request.
