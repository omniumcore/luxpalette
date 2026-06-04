import { useState, useCallback, useMemo, useEffect } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ColorWheelAdvanced from './components/ColorWheelAdvanced';
import SearchBar from './components/SearchBar';
import PaletteCard from './components/PaletteCard';
import ToastNotification from './components/ToastNotification';
import { generatePalettes } from './data/palettes';
import { type ColorCategory, PALETTE_CATEGORIES } from './data/palettes';
import { hsvToRgb, rgbToHex, hexToHsv, rgbToHsv } from './utils/color';

const PAGE_SIZE = 60;

type RgbKey = 'r' | 'g' | 'b';
type HsvKey = 'h' | 's' | 'v';

function hsvToTextState(h: number, s: number, v: number) {
  const rgb = hsvToRgb(h, s, v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  return {
    hex: hex.toUpperCase(),
    rgb: { r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) } as Record<RgbKey, string>,
    hsv: { h: String(h), s: String(s), v: String(v) } as Record<HsvKey, string>,
  };
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [triadMode, setTriadMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Track which input is focused so external updates don't overwrite while typing
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Raw text state for editable inputs (allows empty while typing)
  const init = hsvToTextState(0, 100, 100);
  const [hexText, setHexText] = useState(init.hex);
  const [rgbText, setRgbText] = useState(init.rgb);
  const [hsvText, setHsvText] = useState(init.hsv);

  // Sync text from HSV state when wheel changes (skip if user is typing in that field)
  useEffect(() => {
    const t = hsvToTextState(hue, saturation, brightness);
    if (activeInput !== 'hex') setHexText(t.hex);
    if (activeInput !== 'rgb') setRgbText(t.rgb);
    if (activeInput !== 'hsv') setHsvText(t.hsv);
  }, [hue, saturation, brightness, activeInput]);

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

  const currentRgb = hsvToRgb(hue, saturation, brightness);
  const currentHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);

  const triadHues = triadMode ? [hue, (hue + 120) % 360, (hue + 240) % 360] : [hue];
  const triadColors = triadHues.map(h => {
    const rgb = hsvToRgb(h, saturation, brightness);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  });

  // HEX input: free typing, commit valid hex on change
  const handleHexChange = (value: string) => {
    setHexText(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const hsv = hexToHsv(value);
      if (hsv) {
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
      }
    }
  };

  const handleHexBlur = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexText)) {
      setHexText(currentHex.toUpperCase());
    }
  };

  // RGB inputs: free typing, commit on blur
  const handleRgbChange = (ch: RgbKey, value: string) => {
    setRgbText(prev => ({ ...prev, [ch]: value.replace(/[^0-9]/g, '') }));
  };

  const handleRgbBlur = (ch: RgbKey) => {
    const num = parseInt(rgbText[ch]) || 0;
    const clamped = Math.max(0, Math.min(255, num));
    setRgbText(prev => ({ ...prev, [ch]: String(clamped) }));
    const r = ch === 'r' ? clamped : currentRgb.r;
    const g = ch === 'g' ? clamped : currentRgb.g;
    const b = ch === 'b' ? clamped : currentRgb.b;
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSaturation(hsv.s);
    setBrightness(hsv.v);
  };

  // HSV inputs: free typing, commit on blur
  const handleHsvChange = (ch: HsvKey, value: string) => {
    setHsvText(prev => ({ ...prev, [ch]: value.replace(/[^0-9]/g, '') }));
  };

  const handleHsvBlur = (ch: HsvKey) => {
    const maxVal = ch === 'h' ? 360 : 100;
    const num = parseInt(hsvText[ch]) || 0;
    const clamped = Math.max(0, Math.min(maxVal, num));
    setHsvText(prev => ({ ...prev, [ch]: String(clamped) }));
    if (ch === 'h') setHue(clamped);
    if (ch === 's') setSaturation(clamped);
    if (ch === 'v') setBrightness(clamped);
  };

  // Wheel callbacks
  const handleWheelHueChange = useCallback((newHue: number) => setHue(newHue), []);
  const handleWheelSaturationChange = useCallback((newSat: number) => setSaturation(newSat), []);
  const handleWheelBrightnessChange = useCallback((newBri: number) => setBrightness(newBri), []);

  const handleCategorySelect = useCallback((cat: ColorCategory | null) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setSearchQuery('');
  }, []);

  const handleColorCopy = useCallback(() => {
    setToastMessage('Copied to clipboard!');
  }, []);

  const currentCategoryLabel = selectedCategory
    ? PALETTE_CATEGORIES.find(c => c.id === selectedCategory)?.label
    : 'All';

  const inputCls = `w-full bg-gray-800 border border-gray-700 text-gray-300 font-mono text-xs px-2 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent`;
  const hsvCls = `w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-center`;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950" style={{ backgroundColor: '#0b131f' }}>
      <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Color Wheel Section */}
            <div className="lg:col-span-1">
              <div className="border border-gray-800 rounded-2xl p-6" style={{ backgroundColor: '#121e30' }}>
                <h2 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-5">
                  Selector de color
                </h2>

                {/* Mode Toggle */}
                <div className="flex gap-1 mb-4 bg-gray-900 rounded-lg p-1">
                  <button
                    onClick={() => setTriadMode(false)}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${
                      !triadMode ? 'bg-sky-500/20 text-sky-300' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Single Color
                  </button>
                  <button
                    onClick={() => setTriadMode(true)}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${
                      triadMode ? 'bg-sky-500/20 text-sky-300' : 'text-gray-400 hover:text-gray-200'
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
                        <div className="w-full h-8 rounded-lg border border-gray-700" style={{ backgroundColor: color }} />
                        <span className="text-xs font-mono text-gray-400">{color.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Info Panels */}
            <div className="lg:col-span-2 space-y-4">
              {/* Codigo del color */}
              <div className="border border-gray-800 rounded-2xl p-6" style={{ backgroundColor: '#121e30' }}>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Codigo del color
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    className="h-24 rounded-xl shadow-lg border-2"
                    style={{ backgroundColor: currentHex, borderColor: `${currentHex}40` }}
                  />
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">HEX</label>
                      <input
                        type="text"
                        value={hexText}
                        onChange={e => handleHexChange(e.target.value)}
                        onFocus={() => setActiveInput('hex')}
                        onBlur={() => { setActiveInput(null); handleHexBlur(); }}
                        className="w-full bg-gray-800 border border-gray-700 text-sky-400 font-mono text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">RGB</label>
                      <div className="flex gap-1.5">
                        {(['r', 'g', 'b'] as RgbKey[]).map(ch => (
                          <div key={ch} className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className={`text-xs font-bold ${ch === 'r' ? 'text-red-400' : ch === 'g' ? 'text-green-400' : 'text-blue-400'}`}>
                                {ch.toUpperCase()}
                              </span>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={rgbText[ch]}
                                onChange={e => handleRgbChange(ch, e.target.value)}
                                onFocus={() => setActiveInput('rgb')}
                                onBlur={() => { setActiveInput(null); handleRgbBlur(ch); }}
                                className={inputCls}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HSV Values */}
              <div className="border border-gray-800 rounded-2xl p-6" style={{ backgroundColor: '#121e30' }}>
                <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-4">
                  Valores HSV
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Matiz (H)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={hsvText.h}
                        onChange={e => handleHsvChange('h', e.target.value)}
                        onFocus={() => setActiveInput('hsv')}
                        onBlur={() => { setActiveInput(null); handleHsvBlur('h'); }}
                        className={hsvCls}
                      />
                      <span className="text-xs text-gray-500">°</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Saturacion (S)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={hsvText.s}
                        onChange={e => handleHsvChange('s', e.target.value)}
                        onFocus={() => setActiveInput('hsv')}
                        onBlur={() => { setActiveInput(null); handleHsvBlur('s'); }}
                        className={hsvCls}
                      />
                      <span className="text-xs text-gray-500">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Valor (V)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={hsvText.v}
                        onChange={e => handleHsvChange('v', e.target.value)}
                        onFocus={() => setActiveInput('hsv')}
                        onBlur={() => { setActiveInput(null); handleHsvBlur('v'); }}
                        className={hsvCls}
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
                {displayedPalettes.map(palette => (
                  <PaletteCard key={palette.id} palette={palette} onColorCopy={handleColorCopy} />
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
