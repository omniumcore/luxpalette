import { useLang } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  const baseCls = 'px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-150';
  const activeCls = 'bg-sky-500/20 text-sky-300 border border-sky-500/30';
  const inactiveCls = 'text-gray-500 hover:text-gray-300 border border-transparent hover:bg-gray-800/50';

  return (
    <div className="flex gap-1 bg-gray-900/60 rounded-lg p-0.5 border border-gray-800">
      <button onClick={() => setLang('es')} className={`${baseCls} ${lang === 'es' ? activeCls : inactiveCls}`}>
        ES
      </button>
      <button onClick={() => setLang('en')} className={`${baseCls} ${lang === 'en' ? activeCls : inactiveCls}`}>
        EN
      </button>
    </div>
  );
}
