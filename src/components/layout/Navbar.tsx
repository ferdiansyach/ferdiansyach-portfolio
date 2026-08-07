"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
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

      // Active section detection (only on homepage)
      if (pathname === "/") {
        const sections = document.querySelectorAll("section[id]");
        let current = "home";
        sections.forEach((section) => {
          const el = section as HTMLElement;
          if (window.pageYOffset >= el.offsetTop - 150) {
            current = el.id;
          }
        });
        setActiveSection(current);
      } else {
        setActiveSection("");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickScrollTimeoutRef.current) {
        clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, [pathname]);

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
            const targetHref = pathname === "/" ? item.href : `/${item.href}`;

            const handleClick = () => {
              if (pathname === "/") {
                setActiveSection(sectionId);
                isClickScrollingRef.current = true;

                if (clickScrollTimeoutRef.current) {
                  clearTimeout(clickScrollTimeoutRef.current);
                }

                clickScrollTimeoutRef.current = setTimeout(() => {
                  isClickScrollingRef.current = false;
                }, 800);
              }
            };

            return (
              <a
                key={item.href}
                href={targetHref}
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
            onClick={toggleLang}
            className="w-11 h-11 flex items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-all duration-300 text-xs font-semibold rounded-md cursor-pointer active:scale-95"
            aria-label={lang === "id" ? "Bahasa saat ini: Indonesia. Klik untuk ganti ke English" : "Current language: English. Click to switch to Indonesian"}
          >
            {lang === "id" ? "ID" : "EN"}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden w-11 h-11 flex items-center justify-center border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] rounded-md cursor-pointer active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu with slide animation */}
      <motion.div
        id="mobile-menu"
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-5 py-4 space-y-1.5 bg-[var(--color-canvas)]/95 backdrop-blur-xl border-t border-[var(--color-hairline)] pb-6">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={pathname === "/" ? item.href : `/${item.href}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center min-h-[44px] px-4 py-2.5 rounded-xl text-[var(--color-body)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 active:bg-[var(--color-primary)]/20 active:text-[var(--color-primary)] transition-all font-semibold text-base touch-manipulation"
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
