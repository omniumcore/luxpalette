import { ColorFamily, ColorShade } from '../types';

export const COLOR_FAMILIES: ColorFamily[] = [
  {
    id: 'red',
    label: 'Rojo',
    baseHex: '#ef4444',
    hue: 0,
    shades: [
      { name: '50', hex: '#fef2f2', rgb: { r: 254, g: 242, b: 242 } },
      { name: '100', hex: '#fee2e2', rgb: { r: 254, g: 226, b: 226 } },
      { name: '200', hex: '#fecaca', rgb: { r: 254, g: 202, b: 202 } },
      { name: '300', hex: '#fca5a5', rgb: { r: 252, g: 165, b: 165 } },
      { name: '400', hex: '#f87171', rgb: { r: 248, g: 113, b: 113 } },
      { name: '500', hex: '#ef4444', rgb: { r: 239, g: 68, b: 68 } },
      { name: '600', hex: '#dc2626', rgb: { r: 220, g: 38, b: 38 } },
      { name: '700', hex: '#b91c1c', rgb: { r: 185, g: 28, b: 28 } },
      { name: '800', hex: '#991b1b', rgb: { r: 153, g: 27, b: 27 } },
      { name: '900', hex: '#7f1d1d', rgb: { r: 127, g: 29, b: 29 } },
      { name: '950', hex: '#450a0a', rgb: { r: 69, g: 10, b: 10 } },
    ],
  },
  {
    id: 'orange',
    label: 'Naranja',
    baseHex: '#f97316',
    hue: 25,
    shades: [
      { name: '50', hex: '#fff7ed', rgb: { r: 255, g: 247, b: 237 } },
      { name: '100', hex: '#ffedd5', rgb: { r: 255, g: 237, b: 213 } },
      { name: '200', hex: '#fed7aa', rgb: { r: 254, g: 215, b: 170 } },
      { name: '300', hex: '#fdba74', rgb: { r: 253, g: 186, b: 116 } },
      { name: '400', hex: '#fb923c', rgb: { r: 251, g: 146, b: 60 } },
      { name: '500', hex: '#f97316', rgb: { r: 249, g: 115, b: 22 } },
      { name: '600', hex: '#ea580c', rgb: { r: 234, g: 88, b: 12 } },
      { name: '700', hex: '#c2410c', rgb: { r: 194, g: 65, b: 12 } },
      { name: '800', hex: '#9a3412', rgb: { r: 154, g: 52, b: 18 } },
      { name: '900', hex: '#7c2d12', rgb: { r: 124, g: 45, b: 18 } },
      { name: '950', hex: '#431407', rgb: { r: 67, g: 20, b: 7 } },
    ],
  },
  {
    id: 'yellow',
    label: 'Amarillo',
    baseHex: '#eab308',
    hue: 48,
    shades: [
      { name: '50', hex: '#fefce8', rgb: { r: 254, g: 252, b: 232 } },
      { name: '100', hex: '#fef9c3', rgb: { r: 254, g: 249, b: 195 } },
      { name: '200', hex: '#fef08a', rgb: { r: 254, g: 240, b: 138 } },
      { name: '300', hex: '#fde047', rgb: { r: 253, g: 224, b: 71 } },
      { name: '400', hex: '#facc15', rgb: { r: 250, g: 204, b: 21 } },
      { name: '500', hex: '#eab308', rgb: { r: 234, g: 179, b: 8 } },
      { name: '600', hex: '#ca8a04', rgb: { r: 202, g: 138, b: 4 } },
      { name: '700', hex: '#a16207', rgb: { r: 161, g: 98, b: 7 } },
      { name: '800', hex: '#854d0e', rgb: { r: 133, g: 77, b: 14 } },
      { name: '900', hex: '#713f12', rgb: { r: 113, g: 63, b: 18 } },
      { name: '950', hex: '#422006', rgb: { r: 66, g: 32, b: 6 } },
    ],
  },
  {
    id: 'green',
    label: 'Verde',
    baseHex: '#22c55e',
    hue: 142,
    shades: [
      { name: '50', hex: '#f0fdf4', rgb: { r: 240, g: 253, b: 244 } },
      { name: '100', hex: '#dcfce7', rgb: { r: 220, g: 252, b: 231 } },
      { name: '200', hex: '#bbf7d0', rgb: { r: 187, g: 247, b: 208 } },
      { name: '300', hex: '#86efac', rgb: { r: 134, g: 239, b: 172 } },
      { name: '400', hex: '#4ade80', rgb: { r: 74, g: 222, b: 128 } },
      { name: '500', hex: '#22c55e', rgb: { r: 34, g: 197, b: 94 } },
      { name: '600', hex: '#16a34a', rgb: { r: 22, g: 163, b: 74 } },
      { name: '700', hex: '#15803d', rgb: { r: 21, g: 128, b: 61 } },
      { name: '800', hex: '#166534', rgb: { r: 22, g: 101, b: 52 } },
      { name: '900', hex: '#14532d', rgb: { r: 20, g: 83, b: 45 } },
      { name: '950', hex: '#052e16', rgb: { r: 5, g: 46, b: 22 } },
    ],
  },
  {
    id: 'teal',
    label: 'Verde azulado',
    baseHex: '#14b8a6',
    hue: 174,
    shades: [
      { name: '50', hex: '#f0fdfa', rgb: { r: 240, g: 253, b: 250 } },
      { name: '100', hex: '#ccfbf1', rgb: { r: 204, g: 251, b: 241 } },
      { name: '200', hex: '#99f6e4', rgb: { r: 153, g: 246, b: 228 } },
      { name: '300', hex: '#5eead4', rgb: { r: 94, g: 234, b: 212 } },
      { name: '400', hex: '#2dd4bf', rgb: { r: 45, g: 212, b: 191 } },
      { name: '500', hex: '#14b8a6', rgb: { r: 20, g: 184, b: 166 } },
      { name: '600', hex: '#0d9488', rgb: { r: 13, g: 148, b: 136 } },
      { name: '700', hex: '#0f766e', rgb: { r: 15, g: 118, b: 110 } },
      { name: '800', hex: '#115e59', rgb: { r: 17, g: 94, b: 89 } },
      { name: '900', hex: '#134e4a', rgb: { r: 19, g: 78, b: 74 } },
      { name: '950', hex: '#042f2e', rgb: { r: 4, g: 47, b: 46 } },
    ],
  },
  {
    id: 'blue',
    label: 'Azul',
    baseHex: '#3b82f6',
    hue: 217,
    shades: [
      { name: '50', hex: '#eff6ff', rgb: { r: 239, g: 246, b: 255 } },
      { name: '100', hex: '#dbeafe', rgb: { r: 219, g: 234, b: 254 } },
      { name: '200', hex: '#bfdbfe', rgb: { r: 191, g: 219, b: 254 } },
      { name: '300', hex: '#93c5fd', rgb: { r: 147, g: 197, b: 253 } },
      { name: '400', hex: '#60a5fa', rgb: { r: 96, g: 165, b: 250 } },
      { name: '500', hex: '#3b82f6', rgb: { r: 59, g: 130, b: 246 } },
      { name: '600', hex: '#2563eb', rgb: { r: 37, g: 99, b: 235 } },
      { name: '700', hex: '#1d4ed8', rgb: { r: 29, g: 78, b: 216 } },
      { name: '800', hex: '#1e40af', rgb: { r: 30, g: 64, b: 175 } },
      { name: '900', hex: '#1e3a8a', rgb: { r: 30, g: 58, b: 138 } },
      { name: '950', hex: '#172554', rgb: { r: 23, g: 37, b: 84 } },
    ],
  },
  {
    id: 'cyan',
    label: 'Cian',
    baseHex: '#06b6d4',
    hue: 189,
    shades: [
      { name: '50', hex: '#ecfeff', rgb: { r: 236, g: 254, b: 255 } },
      { name: '100', hex: '#cffafe', rgb: { r: 207, g: 250, b: 254 } },
      { name: '200', hex: '#a5f3fc', rgb: { r: 165, g: 243, b: 252 } },
      { name: '300', hex: '#67e8f9', rgb: { r: 103, g: 232, b: 249 } },
      { name: '400', hex: '#22d3ee', rgb: { r: 34, g: 211, b: 238 } },
      { name: '500', hex: '#06b6d4', rgb: { r: 6, g: 182, b: 212 } },
      { name: '600', hex: '#0891b2', rgb: { r: 8, g: 145, b: 178 } },
      { name: '700', hex: '#0e7490', rgb: { r: 14, g: 116, b: 144 } },
      { name: '800', hex: '#155e75', rgb: { r: 21, g: 94, b: 117 } },
      { name: '900', hex: '#164e63', rgb: { r: 22, g: 78, b: 99 } },
      { name: '950', hex: '#083344', rgb: { r: 8, g: 51, b: 68 } },
    ],
  },
  {
    id: 'pink',
    label: 'Rosa',
    baseHex: '#ec4899',
    hue: 330,
    shades: [
      { name: '50', hex: '#fdf2f8', rgb: { r: 253, g: 242, b: 248 } },
      { name: '100', hex: '#fce7f3', rgb: { r: 252, g: 231, b: 243 } },
      { name: '200', hex: '#fbcfe8', rgb: { r: 251, g: 207, b: 232 } },
      { name: '300', hex: '#f9a8d4', rgb: { r: 249, g: 168, b: 212 } },
      { name: '400', hex: '#f472b6', rgb: { r: 244, g: 114, b: 182 } },
      { name: '500', hex: '#ec4899', rgb: { r: 236, g: 72, b: 153 } },
      { name: '600', hex: '#db2777', rgb: { r: 219, g: 39, b: 119 } },
      { name: '700', hex: '#be185d', rgb: { r: 190, g: 24, b: 93 } },
      { name: '800', hex: '#9d174d', rgb: { r: 157, g: 23, b: 77 } },
      { name: '900', hex: '#831843', rgb: { r: 131, g: 24, b: 67 } },
      { name: '950', hex: '#500724', rgb: { r: 80, g: 7, b: 36 } },
    ],
  },
  {
    id: 'rose',
    label: 'Rosado',
    baseHex: '#f43f5e',
    hue: 350,
    shades: [
      { name: '50', hex: '#fff1f2', rgb: { r: 255, g: 241, b: 242 } },
      { name: '100', hex: '#ffe4e6', rgb: { r: 255, g: 228, b: 230 } },
      { name: '200', hex: '#fecdd3', rgb: { r: 254, g: 205, b: 211 } },
      { name: '300', hex: '#fda4af', rgb: { r: 253, g: 164, b: 175 } },
      { name: '400', hex: '#fb7185', rgb: { r: 251, g: 113, b: 133 } },
      { name: '500', hex: '#f43f5e', rgb: { r: 244, g: 63, b: 94 } },
      { name: '600', hex: '#e11d48', rgb: { r: 225, g: 29, b: 72 } },
      { name: '700', hex: '#be123c', rgb: { r: 190, g: 18, b: 60 } },
      { name: '800', hex: '#9f1239', rgb: { r: 159, g: 18, b: 57 } },
      { name: '900', hex: '#881337', rgb: { r: 136, g: 19, b: 55 } },
      { name: '950', hex: '#4c0519', rgb: { r: 76, g: 5, b: 25 } },
    ],
  },
  {
    id: 'gray',
    label: 'Gris',
    baseHex: '#6b7280',
    hue: 220,
    shades: [
      { name: '50', hex: '#f9fafb', rgb: { r: 249, g: 250, b: 251 } },
      { name: '100', hex: '#f3f4f6', rgb: { r: 243, g: 244, b: 246 } },
      { name: '200', hex: '#e5e7eb', rgb: { r: 229, g: 231, b: 235 } },
      { name: '300', hex: '#d1d5db', rgb: { r: 209, g: 213, b: 219 } },
      { name: '400', hex: '#9ca3af', rgb: { r: 156, g: 163, b: 175 } },
      { name: '500', hex: '#6b7280', rgb: { r: 107, g: 114, b: 128 } },
      { name: '600', hex: '#4b5563', rgb: { r: 75, g: 85, b: 99 } },
      { name: '700', hex: '#374151', rgb: { r: 55, g: 65, b: 81 } },
      { name: '800', hex: '#1f2937', rgb: { r: 31, g: 41, b: 55 } },
      { name: '900', hex: '#111827', rgb: { r: 17, g: 24, b: 39 } },
      { name: '950', hex: '#030712', rgb: { r: 3, g: 7, b: 18 } },
    ],
  },
];

export function findColorByHex(hex: string): { family: ColorFamily; shade: ColorShade } | null {
  const normalized = hex.toLowerCase().trim().replace(/^#/, '');
  for (const family of COLOR_FAMILIES) {
    for (const shade of family.shades) {
      if (shade.hex.replace('#', '').toLowerCase() === normalized) {
        return { family, shade };
      }
    }
  }
  return null;
}

export function findColorsByName(query: string): { family: ColorFamily; shade: ColorShade }[] {
  const q = query.toLowerCase().trim();
  const results: { family: ColorFamily; shade: ColorShade }[] = [];
  for (const family of COLOR_FAMILIES) {
    if (family.label.toLowerCase().includes(q) || family.id.toLowerCase().includes(q)) {
      results.push({ family, shade: family.shades[5] });
    }
  }
  return results;
}
