"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const isProjectPage = pathname?.startsWith("/projects/");

  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);

      // Skip updating active section from scroll if we just clicked a menu item
      if (isClickScrollingRef.current) return;

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
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-canvas)]/80 backdrop-blur-md border-b border-[var(--color-hairline)]"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar - Reflect Violet */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-[var(--color-primary)] z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-serif font-bold text-[var(--color-primary)] hover:opacity-80 transition-opacity"
        >
          Ferdiansyach
        </Link>


        {/* Desktop nav — hidden on project detail pages */}
        {!isProjectPage && (
          <nav
            className="hidden lg:flex items-center gap-2 relative"
            onMouseLeave={() => setHoveredSection(null)}
          >
          {navItems.map((item) => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            const isHovered = hoveredSection === sectionId;

            const handleClick = () => {
              // Instantly update active state to clicked item
              setActiveSection(sectionId);
              isClickScrollingRef.current = true;

              // Clear any existing timeouts to reset the lock period
              if (clickScrollTimeoutRef.current) {
                clearTimeout(clickScrollTimeoutRef.current);
              }

              // Lock the scroll spy for 800ms while the browser smooth-scrolls
              clickScrollTimeoutRef.current = setTimeout(() => {
                isClickScrollingRef.current = false;
              }, 800);
            };

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleClick}
                onMouseEnter={() => setHoveredSection(sectionId)}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 z-10 ${
                  isActive || isHovered ? "text-[var(--color-primary)]" : "text-[var(--color-body)]"
                }`}
              >
                {t(item.label)}
                {/* Active Underline */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-4 right-4 h-1 bg-[var(--color-primary)] rounded-none"
                    transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                  />
                )}
                {/* Hover Pill */}
                {isHovered && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-[var(--color-primary)]/10 rounded-md -z-10 border border-[var(--color-primary)]/20"
                    transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
                  />
                )}
              </a>
            );
          })}
          </nav>
        )}

        {/* Toggle buttons */}
        <div className="flex items-center gap-2">
          {/* Back to Portfolio — only on project detail pages */}
          {isProjectPage && (
            <Link
              href="/#projects"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-sm font-semibold"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {t(translations.projectDetail.backBtn)}
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300 rounded-md"
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
            className="w-9 h-9 flex items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300 text-xs font-semibold rounded-md"
            aria-label={lang === "id" ? "Bahasa saat ini: Indonesia. Klik untuk ganti ke English" : "Current language: English. Click to switch to Indonesian"}
          >
            {lang === "id" ? "ID" : "EN"}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] rounded-md"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 py-4 space-y-1 bg-[var(--color-canvas)]/95 backdrop-blur-md border-t border-[var(--color-hairline)]">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[var(--color-body)] hover:text-[var(--color-primary)] transition-colors font-semibold"
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
