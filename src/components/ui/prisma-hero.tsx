"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] text-[var(--color-primary)]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- PrismaHero (Portfolio Adapted) ---------------- */
const typingRoles = [
  { en: "Fullstack Developer", id: "Fullstack Developer" },
  { en: "Data Analyst", id: "Analis Data" },
  { en: "AI Engineer", id: "AI Engineer" },
  { en: "DevOps Engineer", id: "DevOps Engineer" },
  { en: "WordPress Developer", id: "WordPress Developer" },
];

export const PrismaHero = () => {
  const { t, lang } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const getCurrentText = useCallback(() => {
    return typingRoles[roleIndex][lang];
  }, [roleIndex, lang]);

  useEffect(() => {
    const fullText = getCurrentText();
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          if (displayText.length + 1 === fullText.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(fullText.substring(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % typingRoles.length);
          }
        }
      },
      isDeleting ? 40 : 70
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, getCurrentText]);

  const navItems = [
    { label: t(translations.nav.about), href: "#about" },
    { label: t(translations.nav.skills), href: "#skills" },
    { label: t(translations.nav.projects), href: "#projects" },
    { label: t(translations.nav.experience), href: "#experience" },
    { label: t(translations.nav.contact), href: "#contact" },
  ];

  return (
    <section className="relative min-h-screen w-full pt-16 pb-6 px-3 sm:px-6">
      <div className="relative h-[88vh] min-h-[580px] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-2xl">
        
        {/* Background video / Ambient Canvas */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity scale-105"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-overlay" />

        {/* Dynamic Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

        {/* Top Floating Mini Navbar */}
        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black/80 backdrop-blur-md border-x border-b border-white/10 px-4 py-2 sm:gap-6 md:gap-8 md:rounded-b-3xl md:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[10px] sm:text-xs md:text-sm font-semibold transition-colors text-slate-300 hover:text-[var(--color-primary)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Availability Badge */}
        <div className="absolute top-6 left-6 z-10 hidden sm:block">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t(translations.hero.availableBadge)}
          </div>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-8 md:px-12 z-10">
          <div className="grid grid-cols-12 items-end gap-4">
            
            {/* Title / Name */}
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm md:text-lg font-mono text-[var(--color-primary)] font-bold">
                  {t(translations.hero.greeting)}
                </span>
                <span className="text-sm md:text-lg font-mono text-slate-300 font-bold border-l border-slate-700 pl-2">
                  {displayText}<span className="animate-pulse">|</span>
                </span>
              </div>

              <h1
                className="font-black leading-[0.85] tracking-[-0.05em] text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[11vw] xl:text-[10vw] text-white drop-shadow-2xl font-serif select-none"
              >
                <WordsPullUp text="Ferdiansyach" showAsterisk />
              </h1>
            </div>

            {/* Subtitle / Bio & Actions */}
            <div className="col-span-12 flex flex-col gap-4 pb-2 lg:col-span-4 lg:pb-4">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed drop-shadow-sm bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10"
              >
                {t(translations.hero.description)}
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="#projects"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] py-1.5 pl-5 pr-1.5 text-xs sm:text-sm font-bold text-white transition-all hover:gap-3 shadow-lg shadow-[var(--color-primary)]/20 hover:bg-[var(--color-primary-hover)] cursor-pointer"
                >
                  {t(translations.projects.label)}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </span>
                </motion.a>

                <motion.a
                  href="/cv/cv_ferdiansyach.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 px-4 text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-md cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  {t(translations.hero.downloadCv)}
                </motion.a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
