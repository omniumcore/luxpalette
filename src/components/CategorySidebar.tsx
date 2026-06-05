import { Coffee } from 'lucide-react';
import { PALETTE_CATEGORIES, type ColorCategory } from '../data/palettes';
import { useLang } from '../i18n/LanguageContext';
import { CATEGORY_KEY_MAP, type TranslationKey } from '../i18n/translations';

interface CategorySidebarProps {
  selectedCategory: ColorCategory | null;
  onSelectCategory: (category: ColorCategory | null) => void;
  onCoffeeClick: () => void;
}

export default function CategorySidebar({ selectedCategory, onSelectCategory, onCoffeeClick }: CategorySidebarProps) {
  const { t } = useLang();

  return (
    <aside className="w-40 shrink-0 bg-gray-950 border-r border-gray-800 flex flex-col h-full">
      <div className="px-4 py-5 border-b border-gray-800">
        <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest">{t('sidebarTitle')}</h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
            selectedCategory === null
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
          }`}
        >
          {t('allCategories')}
        </button>
        {PALETTE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
              selectedCategory === cat.id
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-transparent'
            }`}
          >
            {t((CATEGORY_KEY_MAP[cat.id] ?? 'cat_pastel') as TranslationKey)}
          </button>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-gray-800" style={{ backgroundColor: '#121e30' }}>
        <button
          onClick={onCoffeeClick}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-150"
        >
          <Coffee size={14} />
          <span>{t('coffeeButton')}</span>
        </button>
        <p className="text-[10px] text-gray-600 text-center mt-2.5 leading-tight">
          {t('authorCredits')}
        </p>
      </div>
    </aside>
  );
}
