// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://halfmage.github.io',
  base: '/squishy-game-ui',
  integrations: [
    // Material Symbols via Iconify. Only icons that are used get bundled.
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
