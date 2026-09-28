'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Language } from '@/types';

const STORAGE_KEY = 'cleopatra-spa-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initialLanguage: Language =
      saved === 'en' || saved === 'es' ? saved : 'es';
    document.documentElement.lang = initialLanguage;

    if (initialLanguage !== 'es') {
      // one-time sync from localStorage on mount; SSR/first client render always start at "es"
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(initialLanguage);
    }
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
