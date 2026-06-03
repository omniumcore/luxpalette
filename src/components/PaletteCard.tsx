import { useState } from 'react';
import { Copy } from 'lucide-react';
import { Palette } from '../data/palettes';
import { isLightColor } from '../utils/paletteSearch';

interface PaletteCardProps {
  palette: Palette;
  onColorCopy: (hex: string) => void;
}

export default function PaletteCard({ palette, onColorCopy }: PaletteCardProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorClick = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    onColorCopy(hex);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all duration-200 group">
      {/* Color strips */}
      <div className="flex h-28 overflow-hidden">
        {palette.colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => handleColorClick(color)}
            className="flex-1 transition-all duration-150 hover:flex-[1.1] cursor-pointer relative group/color"
            style={{ backgroundColor: color }}
            title={`Click to copy ${color}`}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/color:opacity-100 transition-opacity flex items-center justify-center">
              <Copy size={16} className="text-white opacity-80" />
            </div>
          </button>
        ))}
      </div>

      {/* Palette info */}
      <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-800/50">
        <h3 className="text-sm font-semibold text-gray-100 mb-3 truncate">{palette.name}</h3>

        {/* Hex codes */}
        <div className="grid grid-cols-5 gap-1.5">
          {palette.colors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => handleColorClick(color)}
              className={`text-xs font-mono px-2 py-1 rounded transition-all duration-150 cursor-pointer ${
                copiedColor === color
                  ? 'bg-green-900/40 text-green-300 border border-green-500/50'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200 hover:border-gray-600'
              }`}
              title="Click to copy"
            >
              {color.slice(1).toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tags */}
        {palette.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {palette.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-800/50 text-gray-400 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
