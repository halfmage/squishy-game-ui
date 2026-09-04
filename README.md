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
  styles/brands.css      Original one-off brand looks (press, balatro, minecraft, ...) for later
  components/palette.ts  Color variants. colorStyle() → --c-* vars. accentStyle() → --accent
  components/backgrounds.ts  Tiled SVG background patterns
  components/            Button, Icon, InputField, TextArea, Select, Checkbox, Radio, Toggle,
                         Slider, Heading, Background, BrandButton, PixelIcon
  stories/               One file per story. Each becomes a page + nav entry.
  layouts/Playground.astro   Shell with background + story nav
  pages/index.astro      Overview
  pages/[story].astro    Renders each story from src/stories
public/fonts/            m6x11plus.ttf and ThinSans.ttf
```

## Conventions

- **Type scale**: `text-ui-xs` 12px · `text-ui-sm` 18px · `text-ui-md` 22px · `text-ui-lg` 28px · `text-ui-xl` 36px · `text-ui-2xl` 48px.
- **Fonts**: `font-pixel` (m6x11plus) for controls, `font-sans` (Thin Sans) for body text.
- **Colors**: `color="green"` etc. on components. Add a color in `palette.ts`.
- **Icons**: `<Icon name="settings" />` → `material-symbols:settings-rounded`.
  Browse: https://icon-sets.iconify.design/material-symbols/?suffixes=rounded
- **Sizes**: `size="sm" | "md" | "lg"` on Button.

## Add a component

1. Add a class to `src/styles/global.css`.
2. Add a component file in `src/components/`.
3. Add a story in `src/stories/<name>.astro` with `export const title = '...'` and
   optional `export const bg = 'dots'`. The nav and route update automatically.
