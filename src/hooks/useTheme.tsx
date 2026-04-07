"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/* ---------- localStorage as external store ---------- */
const themeSubscribers = new Set<() => void>();

function emitThemeChange() {
  themeSubscribers.forEach((fn) => fn());
}

function subscribeTheme(callback: () => void) {
  themeSubscribers.add(callback);
  return () => {
    themeSubscribers.delete(callback);
  };
}

function getThemeSnapshot(): Theme {
  return (localStorage.getItem("theme") as Theme) || "dark";
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

/* ---------- Provider ---------- */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  // Sync the class on <html> — this synchronises React state with the DOM (valid effect usage)
  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    emitThemeChange();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
