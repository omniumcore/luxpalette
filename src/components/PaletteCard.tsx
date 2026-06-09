import { useLang } from '../i18n/LanguageContext';
import { type ColorPalette } from '../data/palettes';

interface PaletteCardProps {
  palette: ColorPalette;
  onCopy: (message: string) => void;
  currentHex?: string;    // Propiedad opcional para evitar conflictos
  triadColors?: string[]; // Propiedad opcional para evitar conflictos
}

export default function PaletteCard({ 
  palette, 
  onCopy,
  currentHex,
  triadColors 
}: PaletteCardProps) {
  const { t } = useLang();

  const handleColorClick = (color: string) => {
    navigator.clipboard.writeText(color);
    onCopy(`${t('copied') || 'Copiado'}: ${color}`);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-4 hover:border-gray-700 transition-all duration-200 shadow-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-200 truncate">{palette.name}</h3>
      </div>

      {/* Barra de colores de la paleta */}
      <div className="flex h-12 w-full rounded-xl overflow-hidden shadow-inner border border-gray-950">
        {palette.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className="flex-1 h-full transition-transform hover:scale-105 relative group"
            style={{ backgroundColor: color }}
            title={color}
          >
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-black opacity-0 group-hover:opacity-40 bg-white/20 transition-opacity">
              {color}
            </span>
          </button>
        ))}
      </div>

      {/* Etiquetas / Tags de la paleta */}
      <div className="flex flex-wrap gap-1.5">
        {palette.tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-[10px] px-2 py-0.5 bg-gray-950 text-gray-400 rounded-md border border-gray-800/40"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
