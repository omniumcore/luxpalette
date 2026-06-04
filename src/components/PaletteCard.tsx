import { useState } from 'react';
import { Palette } from '../data/palettes';
import { hexToRgb, rgbToHsv, getColorName } from '../utils/color';

interface PaletteCardProps {
  palette: Palette;
  onColorCopy: (message: string) => void;
}

function ColorRow({ hex, onColorCopy }: { hex: string; onColorCopy: (msg: string) => void }) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const rgb = hexToRgb(hex);
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;
  const name = getColorName(hex);

  const copy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    onColorCopy(`Copied ${type}!`);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 800);
  };

  const lineBase = 'text-xs font-mono px-1.5 py-0.5 rounded cursor-pointer transition-colors hover:bg-gray-700/60 truncate';
  const activeCls = (type: string) => copiedType === type ? 'text-green-300 bg-green-900/40' : 'text-gray-400';

  return (
    <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1.5 space-y-0.5">
      <div className="text-xs text-gray-500 truncate">{name}</div>
      <button onClick={() => copy(hex.toUpperCase(), 'HEX')} className={`${lineBase} ${activeCls('HEX')} block w-full text-left`}>
        <span className="text-gray-600 mr-1">HEX:</span>{hex.toUpperCase()}
      </button>
      {rgb && (
        <button onClick={() => copy(`${rgb.r}, ${rgb.g}, ${rgb.b}`, 'RGB')} className={`${lineBase} ${activeCls('RGB')} block w-full text-left`}>
          <span className="text-gray-600 mr-1">RGB:</span>{rgb.r}, {rgb.g}, {rgb.b}
        </button>
      )}
      {hsv && (
        <button onClick={() => copy(`${hsv.h}, ${hsv.s}, ${hsv.v}`, 'HSV')} className={`${lineBase} ${activeCls('HSV')} block w-full text-left`}>
          <span className="text-gray-600 mr-1">HSV:</span>{hsv.h}, {hsv.s}, {hsv.v}
        </button>
      )}
    </div>
  );
}

export default function PaletteCard({ palette, onColorCopy }: PaletteCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200 group">
      {/* Color strips */}
      <div className="flex h-16 overflow-hidden">
        {palette.colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => {
              navigator.clipboard.writeText(color);
              onColorCopy(`Copied HEX!`);
            }}
            className="flex-1 transition-all duration-150 hover:flex-[1.1] cursor-pointer relative group/color"
            style={{ backgroundColor: color }}
            title={`Click to copy ${color}`}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/color:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-mono opacity-80">{color.toUpperCase()}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="p-2.5 bg-gradient-to-b from-gray-900 to-gray-800/50">
        <h3 className="text-xs font-semibold text-gray-100 mb-2 truncate">{palette.name}</h3>
        <div className="space-y-1">
          {palette.colors.map((color, idx) => (
            <ColorRow key={idx} hex={color} onColorCopy={onColorCopy} />
          ))}
        </div>
      </div>
    </div>
  );
}
