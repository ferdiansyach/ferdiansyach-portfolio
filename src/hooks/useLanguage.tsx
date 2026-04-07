"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { Language } from "@/types";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (obj: { id: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

/* ---------- localStorage as external store ---------- */
const langSubscribers = new Set<() => void>();

function emitLangChange() {
  langSubscribers.forEach((fn) => fn());
}

function subscribeLang(callback: () => void) {
  langSubscribers.add(callback);
  return () => {
    langSubscribers.delete(callback);
  };
}

function getLangSnapshot(): Language {
  return (localStorage.getItem("lang") as Language) || "id";
}

function getLangServerSnapshot(): Language {
  return "id";
}

/* ---------- Provider ---------- */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getLangServerSnapshot);

  const toggleLang = useCallback(() => {
    const next = lang === "id" ? "en" : "id";
    localStorage.setItem("lang", next);
    emitLangChange();
  }, [lang]);

  const t = useCallback((obj: { id: string; en: string }) => obj[lang], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
