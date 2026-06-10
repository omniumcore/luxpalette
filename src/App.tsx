/*
  ========================================================================
  CORE ARCHITECTURE & AUTHORSHIP REGISTRATION
  Lead System Engineer: Ancient of Light
  Production Label: OmniumCore

  This software logic is fully protected under the official MIT License.
  Any unauthorized distribution or claim of ownership without maintaining
  Original developer credits is strictly prohibited by digital copyright law.
  ========================================================================
*/
import { useState, useCallback, useMemo, useEffect } from 'react';
import CategorySidebar from './components/CategorySidebar';
import ColorWheelAdvanced from './components/ColorWheelAdvanced';
import SearchBar from './components/SearchBar';
import PaletteCard from './components/PaletteCard';
import ToastNotification from './components/ToastNotification';
import DonationModal from './components/DonationModal';
import LanguageToggle from './components/LanguageToggle';
import { useLang } from './i18n/LanguageContext';
import { CATEGORY_KEY_MAP } from './i18n/translations';
import { generatePalettes, PALETTE_CATEGORIES } from './data/palettes';
import { type ColorCategory, type Palette } from './data/palettes';
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
  const { t } = useLang();
  const [selectedCategory, setSelectedCategory] = useState<ColorCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [triadMode, setTriadMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [donationOpen, setDonationOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const init = hsvToTextState(0, 100, 100);
  const [hexText, setHexText] = useState(init.hex);
  const [rgbText, setRgbText] = useState(init.rgb);
  const [hsvText, setHsvText] = useState(init.hsv);

  useEffect(() => {
    const t2 = hsvToTextState(hue, saturation, brightness);
    if (activeInput !== 'hex') setHexText(t2.hex);
    if (activeInput !== 'rgb') setRgbText(t2.rgb);
    if (activeInput !== 'hsv') setHsvText(t2.hsv);
  }, [hue, saturation, brightness, activeInput]);

  const currentCategoryLabel = selectedCategory
    ? t(CATEGORY_KEY_MAP[selectedCategory] ?? ('cat_pastel' as never))
    : t('allCategories');

  const allPalettes = useMemo(() => {
    if (selectedCategory) {
      return generatePalettes(selectedCategory, 500);
    }
    const catArrays = PALETTE_CATEGORIES.map(cat =>
      generatePalettes(cat.id, 35)
    );
    const numCats = catArrays.length;
    const maxLen = Math.max(...catArrays.map(a => a.length));
    const interleaved: Palette[] = [];
    for (let i = 0; i < maxLen; i++) {
      for (let c = 0; c < numCats; c++) {
        if (i < catArrays[c].length) interleaved.push(catArrays[c][i]);
      }
    }
    let seed = 4907;
    const nextRand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = interleaved.length - 1; i > 0; i--) {
      const j = Math.floor(nextRand() * (i + 1));
      [interleaved[i], interleaved[j]] = [interleaved[j], interleaved[i]];
    }
    return interleaved;
  }, [selectedCategory]);

  const filteredPalettes = useMemo(() => {
    if (!searchQuery.trim()) return allPalettes;
    const q = searchQuery.toLowerCase().trim();
    return allPalettes.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t2 => t2.toLowerCase().includes(q)) ||
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

  const handleHexChange = (value: string) => {
    setHexText(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      const hsv = hexToHsv(value);
      if (hsv) { setHue(hsv.h); setSaturation(hsv.s); setBrightness(hsv.v); }
    }
  };

  const handleHexBlur = () => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(hexText)) setHexText(currentHex.toUpperCase());
  };

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
    setHue(hsv.h); setSaturation(hsv.s); setBrightness(hsv.v);
  };

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

  const handleWheelHueChange = useCallback((newHue: number) => setHue(newHue), []);
  const handleWheelSaturationChange = useCallback((newSat: number) => setSaturation(newSat), []);
  const handleWheelBrightnessChange = useCallback((newBri: number) => setBrightness(newBri), []);

  const handleCategorySelect = useCallback((cat: ColorCategory | null) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
    setSearchQuery('');
  }, []);

  const handleColorCopy = useCallback(() => {
    setToastMessage(t('copied') || 'Copiado al portapapeles');
    setTimeout(() => setToastMessage(null), 1800);
  }, [t]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950" style={{ backgroundColor: '#0b131f' }}>
      <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} onCoffeeClick={() => setDonationOpen(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-end mb-2">
            <LanguageToggle />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex gap-0.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  <span className="text-white">Lux</span>
                  <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">Palette</span>
                </h1>
              </div>
              <p className="text-xs text-gray-500 mt-1 tracking-wide">{t('tagline')}</p>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* CONTENEDOR DE LA RUEDA E INPUTS EN PARALELO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 bg-gray-900/10 p-6 rounded-2xl border border-gray-800/30">

            {/* PANEL IZQUIERDO: Botones arriba, Rueda abajo */}
            <div className="lg:col-span-4 flex flex-col items-center">

              {/* Botones de Selección en la parte superior */}
              <div className="flex items-center bg-gray-950 p-1 rounded-xl border border-gray-800 mb-4 w-full max-w-[280px]">
                <button
                  onClick={() => setTriadMode(false)}
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${!triadMode ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Color Único
                </button>
                <button
                  onClick={() => setTriadMode(true)}
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${triadMode ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  Tríada (3 colores)
                </button>
              </div>

              <ColorWheelAdvanced
                hue={hue}
                saturation={saturation}
                brightness={brightness}
                triadMode={triadMode}
                onHueChange={handleWheelHueChange}
                onSaturationChange={handleWheelSaturationChange}
                onBrightnessChange={handleWheelBrightnessChange}
              />
            </div>

            {/* PANEL DERECHO: Inputs numéricos */}
            <div className="lg:col-span-8 flex flex-col gap-4 w-full pt-4">

              {/* Top Card: CÓDIGO DEL COLOR */}
              <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 block">Código del Color</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div
                    className="w-20 h-20 rounded-lg border border-gray-700 shrink-0"
                    style={{ backgroundColor: currentHex }}
                  />
                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <div className="text-xs text-gray-500 font-mono mb-1">HEX</div>
                      <input
                        type="text"
                        value={hexText}
                        onChange={(e) => { handleHexChange(e.target.value); setActiveInput('hex'); }}
                        onBlur={() => { handleHexBlur(); setActiveInput(null); }}
                        className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="#000000"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="text-xs text-red-400 font-mono mb-1">R</div>
                        <input
                          type="text"
                          value={rgbText.r}
                          onChange={(e) => { handleRgbChange('r', e.target.value); setActiveInput('rgb'); }}
                          onBlur={() => { handleRgbBlur('r'); setActiveInput(null); }}
                          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-green-400 font-mono mb-1">G</div>
                        <input
                          type="text"
                          value={rgbText.g}
                          onChange={(e) => { handleRgbChange('g', e.target.value); setActiveInput('rgb'); }}
                          onBlur={() => { handleRgbBlur('g'); setActiveInput(null); }}
                          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-blue-400 font-mono mb-1">B</div>
                        <input
                          type="text"
                          value={rgbText.b}
                          onChange={(e) => { handleRgbChange('b', e.target.value); setActiveInput('rgb'); }}
                          onBlur={() => { handleRgbBlur('b'); setActiveInput(null); }}
                          className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card: VALORES HSV */}
              <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-800">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3 block">Valores HSV</label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xs text-cyan-400 font-mono mb-1">H</div>
                    <input
                      type="text"
                      value={hsvText.h}
                      onChange={(e) => { handleHsvChange('h', e.target.value); setActiveInput('hsv'); }}
                      onBlur={() => { handleHsvBlur('h'); setActiveInput(null); }}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-amber-400 font-mono mb-1">S</div>
                    <input
                      type="text"
                      value={hsvText.s}
                      onChange={(e) => { handleHsvChange('s', e.target.value); setActiveInput('hsv'); }}
                      onBlur={() => { handleHsvBlur('s'); setActiveInput(null); }}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-violet-400 font-mono mb-1">V</div>
                    <input
                      type="text"
                      value={hsvText.v}
                      onChange={(e) => { handleHsvChange('v', e.target.value); setActiveInput('hsv'); }}
                      onBlur={() => { handleHsvBlur('v'); setActiveInput(null); }}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 text-sm font-mono text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Triad Colors Display */}
          {triadMode && triadColors.length === 3 && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
              <span className="text-xs text-gray-400 font-medium">{t('triadColors') || 'Colores Tríada'}:</span>
              <div className="flex gap-2">
                {triadColors.map((color, idx) => {
                  const isLight = (0.299 * parseInt(color.slice(1, 3), 16) + 0.587 * parseInt(color.slice(3, 5), 16) + 0.114 * parseInt(color.slice(5, 7), 16)) / 255 > 0.5;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        navigator.clipboard.writeText(color);
                        handleColorCopy();
                      }}
                      className="w-14 h-14 rounded-lg border border-gray-700 hover:scale-105 transition-transform cursor-pointer flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: color }}
                      title={color.toUpperCase()}
                    >
                      <span
                        className="text-[10px] font-mono font-semibold px-1 text-center leading-tight"
                        style={{ color: isLight ? '#000000' : '#ffffff' }}
                      >
                        {color.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Label */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-200">{currentCategoryLabel}</h2>
            <p className="text-xs text-gray-500">{displayedPalettes.length} {t('palettesCount') || 'paletas'}</p>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {displayedPalettes.map(palette => (
              <PaletteCard key={palette.id} palette={palette} onColorCopy={handleColorCopy} />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                className="px-6 py-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded-lg hover:bg-sky-500/20 transition-colors text-sm font-medium"
              >
                {t('loadMore') || 'Cargar más'}
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && <ToastNotification message={toastMessage} />}

      {/* Donation Modal */}
      <DonationModal isOpen={donationOpen} onClose={() => setDonationOpen(false)} />
    </div>
  );
}
