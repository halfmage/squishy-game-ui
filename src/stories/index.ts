/**
 * Story registry. Every `*.astro` file in this folder is a story.
 * Add a file here and it shows up in the nav + gets a route automatically.
 *
 * Optional exports per story:
 *   export const title = 'Buttons';   // nav label
 *   export const bg = 'checker';      // background pattern name
 */
import type { BackgroundName } from '../components/backgrounds';

const modules = import.meta.glob('./*.astro', { eager: true }) as Record<
  string,
  { default: any; title?: string; bg?: BackgroundName }
>;

export const stories = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace('./', '').replace('.astro', '');
    return {
      slug,
      href: `/${slug}`,
      title: mod.title ?? slug.charAt(0).toUpperCase() + slug.slice(1),
      bg: mod.bg ?? ('checker' as BackgroundName),
      Component: mod.default,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));
