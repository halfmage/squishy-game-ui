/**
 * Background pattern registry.
 *
 * Each pattern is one square SVG tile. `tile` is the rendered tile size in px,
 * `viewBox` is the SVG coordinate size, and `body` is the SVG inner markup.
 * The scroll animation always moves by exactly one tile (see `.bg-pattern`
 * in global.css), so the loop is seamless for every pattern.
 *
 * Add a pattern: add an entry here. It shows up on /backgrounds automatically.
 */
export interface BackgroundPattern {
  /** Base background color */
  color: string;
  /** Fill color of the SVG shapes */
  fill: string;
  /** Rendered tile size in px (width = height) */
  tile: number;
  /** SVG viewBox size (width = height) */
  viewBox: number;
  /** Inner SVG markup (paths, circles, ...) */
  body: string;
}

export const backgrounds = {
  stripes: {
    color: '#4f46e5',
    fill: 'rgba(0,0,0,.25)',
    tile: 240,
    viewBox: 40,
    body: `<path d='M0 40L40 0H20L0 20M40 40V20L20 40'/>`,
  },
  checker: {
    color: '#047857',
    fill: '#064e3b',
    tile: 160,
    viewBox: 80,
    body: `<path d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/>`,
  },
  dots: {
    color: '#db2777',
    fill: 'rgba(0,0,0,.25)',
    tile: 160,
    viewBox: 40,
    body: `<circle cx='10' cy='10' r='4'/><circle cx='30' cy='30' r='4'/>`,
  },
  grid: {
    color: '#0284c7',
    fill: 'rgba(0,0,0,.25)',
    tile: 120,
    viewBox: 40,
    body: `<path d='M0 0h40v2H0zM0 0h2v40H0z'/>`,
  },
  plus: {
    color: '#ea580c',
    fill: 'rgba(0,0,0,.25)',
    tile: 120,
    viewBox: 40,
    body: `<path d='M18 10h4v8h8v4h-8v8h-4v-8h-8v-4h8z'/>`,
  },
  zigzag: {
    color: '#7c3aed',
    fill: 'rgba(0,0,0,.25)',
    tile: 160,
    viewBox: 40,
    body: `<path d='M0 10L10 0L20 10L30 0L40 10V14L30 4L20 14L10 4L0 14ZM0 30L10 20L20 30L30 20L40 30V34L30 24L20 34L10 24L0 34Z'/>`,
  },
  bricks: {
    color: '#b91c1c',
    fill: 'rgba(0,0,0,.3)',
    tile: 160,
    viewBox: 40,
    body: `<path d='M0 0h40v2H0zM0 10h40v2H0zM0 20h40v2H0zM0 30h40v2H0zM19 0h2v10h-2zM0 10h1v10H0zM39 10h1v10h-1zM19 20h2v10h-2zM0 30h1v10H0zM39 30h1v10h-1z'/>`,
  },
  triangles: {
    color: '#ca8a04',
    fill: 'rgba(0,0,0,.25)',
    tile: 160,
    viewBox: 40,
    body: `<path d='M10 4l8 14H2zM30 24l8 14H22z'/>`,
  },
  waves: {
    color: '#0f766e',
    fill: 'rgba(0,0,0,.25)',
    tile: 160,
    viewBox: 40,
    body: `<path d='M0 10c10 0 10-8 20-8s10 8 20 8v4c-10 0-10-8-20-8S10 14 0 14zM0 30c10 0 10-8 20-8s10 8 20 8v4c-10 0-10-8-20-8S10 34 0 34z'/>`,
  },
  pixels: {
    color: '#374151',
    fill: 'rgba(255,255,255,.08)',
    tile: 120,
    viewBox: 40,
    body: `<path d='M0 0h8v8H0zM16 8h8v8h-8zM32 0h8v8h-8zM8 24h8v8H8zM24 32h8v8h-8zM32 16h8v8h-8z'/>`,
  },
} satisfies Record<string, BackgroundPattern>;

export type BackgroundName = keyof typeof backgrounds;

export const backgroundNames = Object.keys(backgrounds) as BackgroundName[];

/** Build the data URI for one pattern. */
export function backgroundImage(name: BackgroundName): string {
  const { tile, viewBox, fill, body } = backgrounds[name];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${tile}' height='${tile}' viewBox='0 0 ${viewBox} ${viewBox}'><g fill='${fill}' fill-rule='evenodd'>${body}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Inline style for an element with the `bg-pattern` class. */
export function backgroundStyle(name: BackgroundName, speed = '4s'): string {
  const { color, tile } = backgrounds[name];
  return [
    `--bg-color: ${color}`,
    `--bg-image: ${backgroundImage(name)}`,
    `--bg-tile: ${tile}px`,
    `--bg-speed: ${speed}`,
  ].join('; ');
}
