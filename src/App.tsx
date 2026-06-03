import { useState } from 'react';
import { Palette as PaletteIcon } from 'lucide-react';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import PaletteCard from './components/PaletteCard';
import ToastNotification from './components/ToastNotification';
import { getPalettesByFilters } from './utils/paletteSearch';
import { type ColorCategory } from './data/palettes';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredPalettes = getPalettesByFilters(searchQuery, selectedCategory);

  const handleColorCopy = (hex: string) => {
    setToastMessage('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900" style={{ backgroundColor: '#0b131f' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-800" style={{ backgroundColor: '#121e30' }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-sky-500 rounded-lg">
              <PaletteIcon size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Palette Studio</h1>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category Navigation */}
          <CategoryNav selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Showing <span className="font-semibold text-sky-400">{filteredPalettes.length}</span> palette
            {filteredPalettes.length !== 1 ? 's' : ''} ({filteredPalettes.length * 5} colors total)
          </p>
        </div>

        {/* Palette Grid */}
        {filteredPalettes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPalettes.map((palette) => (
              <PaletteCard key={palette.id} palette={palette} onColorCopy={handleColorCopy} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <PaletteIcon size={32} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">No palettes found</h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search query or category filter to find the perfect color palette.
            </p>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && <ToastNotification message={toastMessage} />}
    </div>
  );
}
