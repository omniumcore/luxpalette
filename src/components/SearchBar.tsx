import { Search } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLang();

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full pl-12 pr-4 py-2.5 bg-gray-900 border border-gray-800 text-gray-100 placeholder-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
