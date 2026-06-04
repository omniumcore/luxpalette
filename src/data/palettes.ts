export type ColorCategory = 'pastel' | 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'brown' | 'pink' | 'grey' | 'purple' | 'white' | 'black' | 'metallic' | 'neon';

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  categories: ColorCategory[];
  tags: string[];
}

export const PALETTE_CATEGORIES: { id: ColorCategory; label: string }[] = [
  { id: 'pastel', label: 'Pastel' },
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'green', label: 'Green' },
  { id: 'orange', label: 'Orange' },
  { id: 'brown', label: 'Brown' },
  { id: 'pink', label: 'Pink' },
  { id: 'grey', label: 'Grey' },
  { id: 'purple', label: 'Purple' },
  { id: 'white', label: 'White' },
  { id: 'black', label: 'Black' },
  { id: 'metallic', label: 'Metallic' },
  { id: 'neon', label: 'Neon' },
];

// --- On-demand algorithmic palette generator ---

function hsvToHex(h: number, s: number, v: number): string {
  h = ((h % 360) + 360) % 360;
  const sN = Math.max(0, Math.min(100, s)) / 100;
  const vN = Math.max(0, Math.min(100, v)) / 100;
  const c = vN * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vN - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const hex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface CatCfg {
  hue: [number, number];
  sat: [number, number];
  val: [number, number];
  dH: number; dS: number; dV: number;
  pre: string[]; suf: string[];
}

const CFG: Record<ColorCategory, CatCfg> = {
  pastel:   { hue: [0,360],   sat: [15,40],  val: [82,98],  dH:25, dS:3,  dV:2,  pre:['Soft','Pale','Light','Muted','Gentle','Blush','Cloud','Whisper','Silk','Mist'], suf:['Bloom','Dream','Haze','Glow','Dawn','Sky','Petal','Breeze','Cloud','Wash'] },
  red:      { hue: [345,375], sat: [60,100], val: [35,95],  dH:5,  dS:5,  dV:8,  pre:['Crimson','Scarlet','Ruby','Cherry','Fire','Cardinal','Vermilion','Carmine','Garnet','Flame'], suf:['Blaze','Heart','Rose','Storm','Ember','Rush','Pulse','Fury','Star','Heat'] },
  blue:     { hue: [195,260], sat: [40,100], val: [30,95],  dH:8,  dS:5,  dV:8,  pre:['Ocean','Sky','Royal','Navy','Cobalt','Azure','Sapphire','Cerulean','Indigo','Steel'], suf:['Depth','Wave','Dream','Horizon','Mist','Cove','Surge','Calm','Night','Tide'] },
  yellow:   { hue: [40,70],   sat: [50,100], val: [50,98],  dH:4,  dS:5,  dV:7,  pre:['Golden','Lemon','Sunny','Honey','Amber','Canary','Dandelion','Topaz','Sunflower','Maize'], suf:['Glow','Light','Ray','Shine','Beam','Spark','Field','Dream','Warmth','Burst'] },
  green:    { hue: [85,165],  sat: [30,100], val: [25,95],  dH:10, dS:6,  dV:8,  pre:['Forest','Emerald','Sage','Mint','Jade','Olive','Moss','Fern','Pine','Lime'], suf:['Valley','Leaf','Grove','Trail','Garden','Canopy','Glade','Meadow','Spring','Creek'] },
  orange:   { hue: [15,45],   sat: [55,100], val: [45,95],  dH:4,  dS:5,  dV:7,  pre:['Tangerine','Coral','Peach','Apricot','Mango','Copper','Rust','Carrot','Nectarine','Papaya'], suf:['Glow','Sunset','Flame','Warmth','Blaze','Crisp','Harvest','Ember','Shade','Spice'] },
  brown:    { hue: [15,45],   sat: [20,65],  val: [15,60],  dH:4,  dS:4,  dV:6,  pre:['Chocolate','Coffee','Walnut','Cinnamon','Cedar','Mahogany','Chestnut','Pecan','Hazel','Driftwood'], suf:['Wood','Earth','Bark','Bean','Shell','Loaf','Oven','Harvest','Trail','Root'] },
  pink:     { hue: [320,350], sat: [30,100], val: [50,98],  dH:4,  dS:5,  dV:7,  pre:['Rose','Bubblegum','Flamingo','Sakura','Blush','Fuchsia','Carnation','Peony','Magenta','Coral'], suf:['Bloom','Petal','Kiss','Dream','Glow','Heart','Charm','Dance','Breeze','Dew'] },
  grey:     { hue: [200,220], sat: [0,12],   val: [20,90],  dH:15, dS:1,  dV:10, pre:['Silver','Slate','Pewter','Ash','Granite','Iron','Smoke','Fog','Pebble','Graphite'], suf:['Stone','Mist','Shadow','Veil','Cloud','Wall','Path','Step','Line','Dust'] },
  purple:   { hue: [260,310], sat: [25,100], val: [25,90],  dH:6,  dS:7,  dV:8,  pre:['Violet','Lavender','Plum','Amethyst','Orchid','Grape','Royal','Iris','Lilac','Mauve'], suf:['Magic','Mist','Night','Dream','Spell','Aura','Haze','Glow','Veil','Dusk'] },
  white:    { hue: [0,360],   sat: [0,10],   val: [90,100], dH:30, dS:1,  dV:1,  pre:['Pearl','Ivory','Snow','Cloud','Cotton','Crystal','Lily','Vanilla','Cream','Moon'], suf:['White','Light','Frost','Purity','Mist','Glow','Silk','Feather','Dew','Star'] },
  black:    { hue: [0,360],   sat: [0,30],   val: [0,25],   dH:20, dS:3,  dV:3,  pre:['Midnight','Obsidian','Raven','Onyx','Shadow','Void','Abyss','Carbon','Ebony','Jet'], suf:['Night','Dark','Deep','Soul','Core','Fall','Hole','Veil','Shade','Depth'] },
  metallic: { hue: [30,55],   sat: [40,80],  val: [40,85],  dH:3,  dS:5,  dV:8,  pre:['Gold','Silver','Bronze','Copper','Platinum','Chrome','Brass','Titanium','Steel','Rose Gold'], suf:['Shine','Luster','Mirror','Leaf','Forged','Polish','Plate','Gleam','Cast','Alloy'] },
  neon:     { hue: [0,360],   sat: [90,100], val: [80,100], dH:30, dS:2,  dV:2,  pre:['Electric','Cyber','Ultraviolet','Plasma','Laser','Quantum','Neon','Volt','Pulse','Photon'], suf:['Flash','Glow','Surge','Burst','Beam','Spark','Wave','Arc','Strike','Blaze'] },
};

export function generatePalettes(category: ColorCategory, count: number): Palette[] {
  const c = CFG[category];
  const hSpan = c.hue[1] - c.hue[0];
  const sSpan = c.sat[1] - c.sat[0];
  const vSpan = c.val[1] - c.val[0];
  const out: Palette[] = [];

  for (let i = 0; i < count; i++) {
    const s = i + 1;
    const baseH = (c.hue[0] + rand(s * 7 + 1) * hSpan) % 360;
    const baseS = c.sat[0] + rand(s * 13 + 2) * sSpan;
    const baseV = c.val[0] + rand(s * 17 + 3) * vSpan;

    const colors: string[] = [];
    for (let j = 0; j < 5; j++) {
      const rJ = rand(s * 31 + j * 37);
      const rJ2 = rand(s * 41 + j * 43);
      const rJ3 = rand(s * 47 + j * 53);
      const h = ((baseH + (j - 2) * c.dH + (rJ - 0.5) * c.dH * 0.5) % 360 + 360) % 360;
      const sv = Math.max(c.sat[0], Math.min(c.sat[1] + 10, baseS + (j - 2) * c.dS + (rJ2 - 0.5) * c.dS * 0.3));
      const vv = Math.max(c.val[0], Math.min(c.val[1] + 5, baseV + (j - 2) * c.dV + (rJ3 - 0.5) * c.dV * 0.3));
      colors.push(hsvToHex(h, sv, vv));
    }

    const pre = c.pre[Math.floor(rand(s * 23 + 4) * c.pre.length)];
    const suf = c.suf[Math.floor(rand(s * 29 + 5) * c.suf.length)];

    out.push({
      id: `${category.slice(0, 3)}${i + 1}`,
      name: `${pre} ${suf}`,
      colors,
      categories: [category],
      tags: [pre.toLowerCase(), suf.toLowerCase(), category],
    });
  }
  return out;
}

// No static array. All generation is on-demand.
export const PALETTES: Palette[] = [];
