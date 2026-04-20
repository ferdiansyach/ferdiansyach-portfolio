"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { translations } from "@/data/translations";

const navItems = [
  { href: "#about", label: translations.nav.about },
  { href: "#skills", label: translations.nav.skills },
  { href: "#projects", label: translations.nav.projects },
  { href: "#experience", label: translations.nav.experience },
  { href: "#education", label: translations.nav.education },
  { href: "#certifications", label: translations.nav.certifications },
  { href: "#contact", label: translations.nav.contact },
];

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      // Active section detection
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.pageYOffset >= el.offsetTop - 150) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/30 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Ferdiansyach
        </Link>

        {/* Desktop nav */}
        <nav 
          className="hidden md:flex items-center gap-2 relative"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            const isHovered = hoveredSection === sectionId;

            return (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredSection(sectionId)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full z-10 ${
                  isActive || isHovered ? "text-rose-400" : "text-slate-300"
                }`}
              >
                {t(item.label)}
                {/* Active Underline */}
                {isActive && !isHovered && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover Pill */}
                {isHovered && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-rose-400/10 rounded-full -z-10 border border-rose-400/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:border-rose-400 hover:bg-rose-400/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleLang}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-slate-300 hover:border-rose-400 hover:bg-rose-400/10 transition-all duration-300 text-xs font-bold"
          >
            {lang === "id" ? "EN" : "ID"}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-slate-700 bg-slate-800/50 text-white"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 py-4 space-y-1 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/30">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-slate-300 hover:text-rose-400 transition-colors font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.05 }}
            >
              {t(item.label)}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </header>
  );
}
