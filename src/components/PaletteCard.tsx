import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Palette } from '../data/palettes';
import { hexToRgb, rgbToHsv } from '../utils/color';

interface PaletteCardProps {
  palette: Palette;
  onColorCopy: (hex: string) => void;
}

function formatColorLabel(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  return `${hex.toUpperCase()} | RGB(${rgb.r},${rgb.g},${rgb.b}) | HSV(${hsv.h},${hsv.s},${hsv.v})`;
}

export default function PaletteCard({ palette, onColorCopy }: PaletteCardProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorClick = (hex: string) => {
    navigator.clipboard.writeText(hex);
    onColorCopy(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200 group">
      {/* Color strips */}
      <div className="flex h-20 overflow-hidden">
        {palette.colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleColorClick(color)}
            className="flex-1 transition-all duration-150 hover:flex-[1.1] cursor-pointer relative group/color"
            style={{ backgroundColor: color }}
            title={`Click to copy ${color}`}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/color:opacity-100 transition-opacity flex items-center justify-center">
              <Copy size={14} className="text-white opacity-80" />
            </div>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="p-3 bg-gradient-to-b from-gray-900 to-gray-800/50">
        <h3 className="text-xs font-semibold text-gray-100 mb-2 truncate">{palette.name}</h3>

        {/* Color data labels: HEX | RGB | HSV */}
        <div className="space-y-1">
          {palette.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleColorClick(color)}
              className={`w-full text-left text-xs font-mono px-2 py-1.5 rounded transition-all duration-150 cursor-pointer truncate ${
                copiedColor === color
                  ? 'bg-green-900/40 text-green-300 border border-green-500/50'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200 hover:border-gray-600'
              }`}
              title="Click to copy"
            >
              {formatColorLabel(color)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
