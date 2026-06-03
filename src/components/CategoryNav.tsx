import { PALETTE_CATEGORIES, type ColorCategory } from '../data/palettes';

interface CategoryNavProps {
  selectedCategory: ColorCategory | null;
  onSelectCategory: (category: ColorCategory | null) => void;
}

export default function CategoryNav({ selectedCategory, onSelectCategory }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          selectedCategory === null
            ? 'bg-sky-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {PALETTE_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === cat.id
              ? 'bg-sky-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
