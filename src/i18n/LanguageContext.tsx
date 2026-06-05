import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Lang, type TranslationKey, t } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const translate = useCallback((key: TranslationKey) => t(key, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
