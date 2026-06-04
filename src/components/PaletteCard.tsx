import { useState } from 'react';
import { Palette } from '../data/palettes';
import { hexToRgb, rgbToHsv, getColorName } from '../utils/color';

interface PaletteCardProps {
  palette: Palette;
  onColorCopy: (hex: string) => void;
}

function ColorRow({ hex, onCopy }: { hex: string; onCopy: (hex: string) => void }) {
  const [copied, setCopied] = useState(false);
  const rgb = hexToRgb(hex);
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;
  const name = getColorName(hex);

  const handleClick = () => {
    navigator.clipboard.writeText(hex);
    onCopy(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-2 py-1.5 rounded transition-all duration-150 cursor-pointer border ${
        copied
          ? 'bg-green-900/40 border-green-500/50'
          : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
      }`}
      title="Click to copy HEX"
    >
      <div className={`text-xs font-mono ${copied ? 'text-green-300' : 'text-gray-400'}`}>
        <span className="text-gray-500">HEX:</span> {hex.toUpperCase()}
      </div>
      {rgb && (
        <div className={`text-xs font-mono ${copied ? 'text-green-300' : 'text-gray-400'}`}>
          <span className="text-gray-500">RGB:</span> {rgb.r}, {rgb.g}, {rgb.b}
        </div>
      )}
      {hsv && (
        <div className={`text-xs font-mono ${copied ? 'text-green-300' : 'text-gray-400'}`}>
          <span className="text-gray-500">HSV:</span> {hsv.h}°, {hsv.s}%, {hsv.v}%
        </div>
      )}
      <div className={`text-xs ${copied ? 'text-green-400' : 'text-gray-500'}`}>
        {name}
      </div>
    </button>
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
              onColorCopy(color);
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
            <ColorRow key={idx} hex={color} onCopy={onColorCopy} />
          ))}
        </div>
      </div>
    </div>
  );
}
