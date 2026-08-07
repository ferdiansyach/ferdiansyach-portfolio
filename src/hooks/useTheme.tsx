"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { Theme } from "@/types";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

/* ---------- Locked Dark Mode Provider ---------- */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = "dark";

  useEffect(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = () => {
    // Theme locked to dark mode
  };

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
