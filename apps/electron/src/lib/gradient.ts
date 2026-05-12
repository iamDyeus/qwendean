interface EllipseConfig {
  color: string;
  fx: number;
  scale: [number, number];
  skew: number;
  rotation: number;
  translation: [number, number];
}

const PALETTES = [
  ['#5135FF', '#FF5828', '#F69CFF', '#FFA50F'],
  ['#FE69B7', '#BC0A6F', '#00F5FF', '#7B68EE'],
  ['#FE69B7', '#BC0A6F', '#E6E6FA', '#6495ED'],
  ['#00C9FF', '#92FE9D', '#4facfe', '#00f2fe'],
  ['#a18cd1', '#fbc2eb', '#f093fb', '#f5576c'],
  ['#43e97b', '#38f9d7', '#4facfe', '#00f2fe'],
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateEllipse(rand: () => number, palette: string[]): EllipseConfig {
  return {
    color: palette[Math.floor(rand() * palette.length)],
    fx: 0.1 + rand() * 0.3,
    scale: [0.7 + rand() * 0.8, 0.7 + rand() * 0.8],
    skew: -10 + rand() * 20,
    rotation: rand() * 360,
    translation: [-250 + rand() * 500, -250 + rand() * 500],
  };
}

// Noise filter for Apple-like texture
const NOISE_FILTER = `
  <filter id="noise" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
    <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
    <feComposite in="blend" in2="SourceGraphic" operator="in"/>
  </filter>
`.trim();

export function generateGradientSVG(seed: number): string {
  const rand = seededRandom(seed);
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)];
  const baseColor = palette[0];
  const ellipses = Array.from({ length: 12 }, () => generateEllipse(rand, palette));

  const gradients = ellipses
    .map((e, i) => `<radialGradient id="g${i}" fx="${e.fx.toFixed(2)}" fy="0.5">
      <stop offset="0%" stop-color="${e.color}"/>
      <stop offset="100%" stop-color="${e.color}" stop-opacity="0"/>
    </radialGradient>`)
    .join('\n');

  const rects = ellipses
    .map((e, i) =>
      `<rect x="0" y="0" width="100%" height="100%" fill="url(#g${i})" filter="url(#noise)" transform="translate(300 300) scale(${e.scale[0].toFixed(2)} ${e.scale[1].toFixed(2)}) skewX(${e.skew.toFixed(1)}) rotate(${e.rotation.toFixed(1)}) translate(${e.translation[0].toFixed(1)} ${e.translation[1].toFixed(1)}) translate(-300 -300)"/>`
    )
    .join('\n');

  return `<svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;filter:saturate(130%)">
  <defs>
    ${gradients}
    ${NOISE_FILTER}
  </defs>
  <rect width="100%" height="100%" fill="${baseColor}"/>
  ${rects}
</svg>`;
}
