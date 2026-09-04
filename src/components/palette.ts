/**
 * Color palette for the general style. One entry = one color variant.
 * `from`/`to` make the vertical gradient, `text` is the text color.
 * Light colors get no text shadow.
 */
export interface PaletteColor {
  from: string;
  to: string;
  text: string;
  /** true for light backgrounds → dark text, no shadows */
  light?: boolean;
}

export const colors = {
  zinc: { from: '#71717a', to: '#52525b', text: '#ffffff' },
  light: { from: '#f4f4f5', to: '#d4d4d8', text: '#27272a', light: true },
  dark: { from: '#27272a', to: '#18181b', text: '#ffffff' },
  green: { from: '#22c55e', to: '#16a34a', text: '#ffffff' },
  red: { from: '#ef4444', to: '#dc2626', text: '#ffffff' },
  blue: { from: '#3b82f6', to: '#2563eb', text: '#ffffff' },
  pink: { from: '#ec4899', to: '#db2777', text: '#ffffff' },
  yellow: { from: '#eab308', to: '#ca8a04', text: '#ffffff' },
  purple: { from: '#a855f7', to: '#9333ea', text: '#ffffff' },
  orange: { from: '#f97316', to: '#ea580c', text: '#ffffff' },
  cyan: { from: '#06b6d4', to: '#0891b2', text: '#ffffff' },
} satisfies Record<string, PaletteColor>;

export type ColorName = keyof typeof colors;
export const colorNames = Object.keys(colors) as ColorName[];

/** Accent colors (checkbox, radio, toggle, slider). Same names, minus the neutrals. */
export type AccentName = Exclude<ColorName, 'light' | 'dark' | 'zinc'>;
export const accentNames = colorNames.filter(
  (c): c is AccentName => !['light', 'dark', 'zinc'].includes(c),
);

/** Inline style with the `--c-*` variables that `.btn`, `.panel`, `.badge`, ... read. */
export function colorStyle(name: ColorName): string {
  const c: PaletteColor = colors[name];
  const shadow = c.light ? 'none' : '3px 3px 0 rgba(0,0,0,.5)';
  return [
    `--c-from: ${c.from}`,
    `--c-to: ${c.to}`,
    `--c-text: ${c.text}`,
    `--c-text-shadow: ${shadow}`,
    `--c-icon-shadow: ${shadow}`,
    `--accent: ${c.from}`,
  ].join('; ');
}

/** Inline style for choice controls that only need `--accent`. */
export function accentStyle(name: AccentName): string {
  return `--accent: ${colors[name].from}`;
}
