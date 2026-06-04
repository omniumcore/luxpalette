import { useState, useCallback, useMemo } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ColorWheelAdvanced from './components/ColorWheelAdvanced';
import SearchBar from './components/SearchBar';
import PaletteCard from './components/PaletteCard';
import ToastNotification from './components/ToastNotification';
import { generatePalettes } from './data/palettes';
import { type ColorCategory, PALETTE_CATEGORIES } from './data/palettes';
import { hsvToRgb, rgbToHex, hexToHsv, rgbToHsv } from './utils/color';

const PAGE_SIZE = 60;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [triadMode, setTriadMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeCategory = selectedCategory || 'pastel';

  const allPalettes = useMemo(
    () => generatePalettes(activeCategory, 500),
    [activeCategory]
  );

  const filteredPalettes = useMemo(() => {
    if (!searchQuery.trim()) return allPalettes;
    const q = searchQuery.toLowerCase().trim();
    return allPalettes.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.colors.some(c => c.toLowerCase().includes(q))
    );
  }, [allPalettes, searchQuery]);

  const displayedPalettes = useMemo(
    () => filteredPalettes.slice(0, visibleCount),
    [filteredPalettes, visibleCount]
  );

  const hasMore = visibleCount < filteredPalettes.length;

  // Derived color values from HSV state
  const currentRgb = hsvToRgb(hue, saturation, brightness);
  const currentHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);

  const triadHues = triadMode ? [hue, (hue + 120) % 360, (hue + 240) % 360] : [hue];
  const triadColors = triadHues.map(h => {
    const rgb = hsvToRgb(h, saturation, brightness);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });

  // Input handlers
  const handleHexInput = (value: string) => {
    const clean = value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      const hsv = hexToHsv(clean);
      if (hsv) {
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
      }
    }
  };

  const handleRgbInput = (channel: 'r' | 'g' | 'b', value: string) => {
    const num = parseInt(value) || 0;
    const clamped = Math.max(0, Math.min(255, num));
    const r = channel === 'r' ? clamped : currentRgb.r;
    const g = channel === 'g' ? clamped : currentRgb.g;
    const b = channel === 'b' ? clamped : currentRgb.b;
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);
  };

  const handleHsvInput = (channel: 'h' | 's' | 'v', value: string) => {
    const num = parseInt(value) || 0;
    if (channel === 'h') setHue(Math.max(0, Math.min(360, num)));
    if (channel === 's') setSaturation(Math.max(0, Math.min(100, num)));
    if (channel === 'v') setBrightness(Math.max(0, Math.min(100, num)));
  };

  const handleWheelHueChange = useCallback((newHue: number) => {
    setHue(newHue);
  }, []);

  const handleWheelSaturationChange = useCallback((newSaturation: number) => {
    setSaturation(newSaturation);
  }, []);

  const handleWheelBrightnessChange = useCallback((newBrightness: number) => {
    setBrightness(newBrightness);
  }, []);

  const handleCategorySelect = useCallback((cat: ColorCategory | null) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setSearchQuery('');
  }, []);

  // Palette card: only copy to clipboard, do NOT update color picker
  const handleColorCopy = () => {
    setToastMessage('Copied to clipboard!');
  };

  const currentCategoryLabel = selectedCategory
    ? PALETTE_CATEGORIES.find((c) => c.id === selectedCategory)?.label
    : 'All';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950" style={{ backgroundColor: '#0b131f' }}>
      <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Color Wheel Section */}
            <div className="lg:col-span-1">
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-5">
                  Selector de color
                </h2>

                {/* Mode Toggle */}
                <div className="flex gap-1 mb-4 bg-gray-900 rounded-lg p-1">
                  <button
                    onClick={() => setTriadMode(false)}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${
                      !triadMode
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Single Color
                  </button>
                  <button
                    onClick={() => setTriadMode(true)}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${
                      triadMode
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Triad (3 Colors)
                  </button>
                </div>

                <ColorWheelAdvanced
                  hue={hue}
                  brightness={brightness}
                  saturation={saturation}
                  triadMode={triadMode}
                  onHueChange={handleWheelHueChange}
                  onSaturationChange={handleWheelSaturationChange}
                  onBrightnessChange={handleWheelBrightnessChange}
                />

                {/* Triad color previews */}
                {triadMode && (
                  <div className="mt-4 flex gap-2">
                    {triadColors.map((color, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full h-8 rounded-lg border border-gray-700"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs font-mono text-gray-400">{color.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Panels */}
            <div className="lg:col-span-2 space-y-4">
              {/*Codigo del color */}
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Codigo del color
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="h-24 rounded-xl shadow-lg border-2"
                    style={{
                      backgroundColor: currentHex,
                      borderColor: `${currentHex}40`,
                    }}
                  />
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        HEX
                      </label>
                      <input
                        type="text"
                        value={currentHex.toUpperCase()}
                        onChange={(e) => handleHexInput(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        RGB
                      </label>
                      <div className="flex gap-1.5">
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-red-400 font-bold">R</span>
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={currentRgb.r}
                              onChange={(e) => handleRgbInput('r', e.target.value)}
                              className="w-full bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-green-400 font-bold">G</span>
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={currentRgb.g}
                              onChange={(e) => handleRgbInput('g', e.target.value)}
                              className="w-full bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-blue-400 font-bold">B</span>
                            <input
                              type="number"
                              min="0"
                              max="255"
                              value={currentRgb.b}
                              onChange={(e) => handleRgbInput('b', e.target.value)}
                              className="w-full bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HSV Values */}
              <div
                className="border border-gray-800 rounded-2xl p-6"
                style={{ backgroundColor: '#121e30' }}
              >
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Valores HSV
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Matiz (H)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="360"
                        value={hue}
                        onChange={(e) => handleHsvInput('h', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs text-gray-500">°</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Saturacion (S)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={saturation}
                        onChange={(e) => handleHsvInput('s', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                      Valor (V)
                    </label>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={brightness}
                        onChange={(e) => handleHsvInput('v', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs text-gray-500">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={(q) => { setSearchQuery(q); setVisibleCount(PAGE_SIZE); }} />
          </div>

          {/* Grid Info */}
          <div className="mb-4">
            <p className="text-sm text-gray-400">
              Showing <span className="font-semibold text-sky-400">{displayedPalettes.length}</span> of{' '}
              <span className="font-semibold text-sky-400">{filteredPalettes.length}</span> palette
              {filteredPalettes.length !== 1 ? 's' : ''} ({filteredPalettes.length * 5} colors total) from{' '}
              <span className="font-semibold text-sky-400">{currentCategoryLabel}</span>
            </p>
          </div>

          {/* Palette Grid */}
          {displayedPalettes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {displayedPalettes.map((palette) => (
                  <PaletteCard
                    key={palette.id}
                    palette={palette}
                    onColorCopy={handleColorCopy}
                  />
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mb-12">
                  <button
                    onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                    className="px-6 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-sm font-medium rounded-lg border border-sky-500/30 transition-all"
                  >
                    Load More ({filteredPalettes.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">No palettes found</h3>
              <p className="text-gray-500 max-w-md">
                Try adjusting your search query or category filter to find the perfect color palette.
              </p>
            </div>
          )}
        </div>
      </main>

      {toastMessage && <ToastNotification message={toastMessage} />}
    </div>
  );
}
