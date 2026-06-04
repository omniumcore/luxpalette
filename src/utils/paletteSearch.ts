import { generatePalettes, type Palette, type ColorCategory } from '../data/palettes';

export function getPalettesByFilters(search: string, category: ColorCategory | null): Palette[] {
  const source = category
    ? generatePalettes(category, 500)
    : generatePalettes('pastel', 500); // Default for "All" - show first category

  if (!search.trim()) return source;

  const q = search.toLowerCase().trim();
  return source.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.colors.some(c => c.toLowerCase().includes(q))
  );
}
