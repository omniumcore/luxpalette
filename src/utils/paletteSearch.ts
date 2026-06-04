import { PALETTES, type Palette, type ColorCategory } from '../data/palettes';

export function searchPalettes(query: string): Palette[] {
  if (!query.trim()) return PALETTES;
  const q = query.toLowerCase().trim();
  return PALETTES.filter((palette) => {
    if (palette.name.toLowerCase().includes(q)) return true;
    if (palette.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
    if (palette.categories.some((cat) => cat.toLowerCase().includes(q))) return true;
    if (palette.colors.some((color) => color.toLowerCase().includes(q))) return true;
    return false;
  });
}

export function filterByCategory(category: ColorCategory | null): Palette[] {
  if (!category) return PALETTES;
  return PALETTES.filter((palette) => palette.categories.includes(category));
}

export function getPalettesByFilters(search: string, category: ColorCategory | null): Palette[] {
  let filtered = PALETTES;

  if (category) {
    filtered = filtered.filter((palette) => palette.categories.includes(category));
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter((palette) => {
      if (palette.name.toLowerCase().includes(q)) return true;
      if (palette.tags.some((tag) => tag.toLowerCase().includes(q))) return true;
      if (palette.categories.some((cat) => cat.toLowerCase().includes(q))) return true;
      if (palette.colors.some((color) => color.toLowerCase().includes(q))) return true;
      return false;
    });
  }

  return filtered;
}
