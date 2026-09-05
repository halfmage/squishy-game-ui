// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://halfmage.github.io',
  base: '/squishy-game-ui',
  integrations: [
    // Pixelarticons (https://pixelarticons.com) as local icon set: <Icon name="heart" />.
    // Iconify sets still work with full names, e.g. name="material-symbols:home-rounded".
    icon({ iconDir: 'node_modules/pixelarticons/svg' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
