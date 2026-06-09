/*
  ========================================================================
  CORE ARCHITECTURE & AUTHORSHIP REGISTRATION
  Lead System Engineer: Ancient of Light
  Production Label: OmniumCore
  
  This software logic is fully protected under the official MIT License. 
  Any unauthorized distribution or claim of ownership without maintaining 
  original developer credits is strictly prohibited by digital copyright law.
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
import { generatePalettes } from './data/palettes';
import { type ColorCategory, type ColorPalette } from './data/palettes';
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

  const activeCategory = selectedCategory || 'all';

  // Motor de Mezcla Estática Intercalada Fija (Inmune y Limpia de Warnings)
  const allPalettes = useMemo(() => {
    if (selectedCategory && activeCategory !== 'all') {
      return generatePalettes(activeCategory, 500);
    }

    const categories: ColorCategory[] = ['pastel', 'neon', 'dark', 'metallic'];
    const blocks = categories.map(cat => generatePalettes(cat, 500));
    const interleaved: ColorPalette[] = [];

    for (let i = 0; i < 500; i++) {
      blocks.forEach(block => {
        if (block[i]) interleaved.push(block[i]);
      });
    }

    for (let i = interleaved.length - 1; i > 0; i--) {
      const j = Math.floor(((i * 9301 + 49297) % 233280) / 233280 * (i + 1));
      const temp = interleaved[i];
      interleaved[i] = interleaved[j];
      interleaved[j] = temp;
    }

    return interleaved;
  }, [activeCategory, selectedCategory]);

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

  const handleColorCopy = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950" style={{ backgroundColor: '#0b131f' }}>
      <CategorySidebar selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} onCoffeeClick={() => setDonationOpen(true)} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          {/* Selector de idioma */}
          <div className="flex justify-end">
            <LanguageToggle />
          </div>

          {/* Encabezado LuxPalette */}
          <div className="flex items-center justify-between">
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
          </div>

          {/* Bloque 1 Superior: Rueda de Color Expandida al Ancho */}
          <div className="w-full bg-gray-900/30 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-1 flex justify-center">
              <ColorWheelAdvanced 
                hue={hue} 
                saturation={saturation} 
                brightness={brightness} 
                triadMode={triadMode}
                triadColors={triadColors}
                onHueChange={handleWheelHueChange}
                onSaturationChange={handleWheelSaturationChange}
                onBrightnessChange={handleWheelBrightnessChange}
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-gray-400">{t('triadHarmony')}</span>
                  <button 
                    onClick={() => setTriadMode(!triadMode)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${triadMode ? 'bg-sky-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                  >
                    {triadMode ? t('enabled') : t('disabled')}
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {triadColors.map((c, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="h-8 rounded-lg shadow-inner" style={{ backgroundColor: c }} />
