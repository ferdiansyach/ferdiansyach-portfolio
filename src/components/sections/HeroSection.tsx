"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import ParticleBackground from "@/components/ui/ParticleBackground";
import StatusBadge from "@/components/ui/StatusBadge";
import MagneticButton from "@/components/ui/MagneticButton";

const typingRoles = [
  { en: "Fullstack Developer", id: "Fullstack Developer" },
  { en: "Data Analyst", id: "Analis Data" },
  { en: "System Developer", id: "System Developer" },
  { en: "WordPress Developer", id: "WordPress Developer" },
];

/* ───── Animation variants ───── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 1 + delay * 0.2, type: "spring", stiffness: 200 },
  }),
};

const statsItems = [
  { value: "5+", labelKey: "projects" as const },
  { value: "6", labelKey: "certifications" as const },
  { value: "12+", labelKey: "technologies" as const },
];

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fix React 19 lint: reset typing on lang change using render-time state derivation
  const [prevLang, setPrevLang] = useState(lang);
  if (prevLang !== lang) {
    setPrevLang(lang);
    setDisplayText("");
    setIsDeleting(false);
  }

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
      isDeleting ? 60 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, getCurrentText]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Particle canvas */}
      <ParticleBackground />

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_600px_600px_at_20%_50%,rgba(251,113,133,0.12),transparent),radial-gradient(ellipse_500px_500px_at_80%_20%,rgba(217,70,239,0.10),transparent),radial-gradient(ellipse_400px_400px_at_60%_80%,rgba(139,92,246,0.07),transparent)] animate-mesh" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
        {/* Text content: staggered entrance */}
        <motion.div
          className="w-full md:w-3/5 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-4 flex justify-start">
            <StatusBadge />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-rose-400 font-semibold text-xs sm:text-sm md:text-lg tracking-normal sm:tracking-wide uppercase leading-snug"
          >
            {t(translations.hero.subtitle)}
          </motion.p>

          {/* Name — gradient text with shimmer */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight mt-2 sm:mt-3 tracking-tighter sm:tracking-normal whitespace-normal"
          >
            <span className="text-white">{t(translations.hero.greeting)} </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent">
                Ferdiansyach
              </span>
              {/* Animated shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-clip-text text-transparent pointer-events-none"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 100%" }}
              />
            </span>
          </motion.h1>

          {/* Typing effect */}
          <motion.p
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-base sm:text-xl md:text-3xl text-slate-300 font-semibold h-10"
          >
            <span>{displayText}</span>
            <span className="border-r-[3px] border-rose-400 animate-blink ml-0.5">&nbsp;</span>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-base md:text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            {t(translations.hero.description)}
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="mt-4 flex items-center gap-2 justify-start text-slate-500 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t(translations.hero.location)}</span>
          </motion.div>

          {/* Mini stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-start gap-x-4 gap-y-3 sm:gap-6 md:gap-8"
          >
            {statsItems.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-500">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 font-medium leading-tight">
                  {t(translations.stats[stat.labelKey])}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={2}
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-start gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t(translations.hero.contactBtn)}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="/portfolio-pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t(translations.hero.downloadCv)}
              </a>
            </MagneticButton>
            <div className="flex items-center gap-3 md:ml-2">
              <MagneticButton strength={10}>
                <a
                  href="https://github.com/ferdiansyach"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center p-3 rounded-xl border-2 border-slate-700 text-slate-300 hover:border-rose-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </MagneticButton>
              <MagneticButton strength={10}>
                <a
                  href="https://www.linkedin.com/in/ferdiansyach-845930246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center p-3 rounded-xl border-2 border-slate-700 text-slate-300 hover:border-rose-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Profile image with animated ring */}
        <motion.div
          className="w-full md:w-2/5 flex justify-center md:justify-end"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative group">
            {/* Animated ring */}
            <motion.div
              className="absolute -inset-2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 opacity-75 blur-sm"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-full bg-slate-900 dark:bg-slate-900" />
            <Image
              src="/images/fotoprofil.jpeg"
              alt="Ferdiansyach — Fullstack Developer & Data Analyst"
              width={320}
              height={320}
              className="relative z-10 rounded-full w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
            />

            {/* Floating tech badges — spring entrance */}
            <motion.div
              custom={0}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="hero-badge absolute -top-2 -right-4 z-20 hidden sm:block rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-400 animate-float-slow shadow-lg"
            >
              ⚛️ React
            </motion.div>
            <motion.div
              custom={1}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="hero-badge absolute top-1/2 -left-8 z-20 hidden sm:block rounded-lg px-3 py-1.5 text-xs font-semibold text-green-400 animate-float-medium shadow-lg"
            >
              🐍 Python
            </motion.div>
            <motion.div
              custom={2}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              className="hero-badge absolute -bottom-2 right-4 z-20 hidden sm:block rounded-lg px-3 py-1.5 text-xs font-semibold text-indigo-400 animate-float-fast shadow-lg"
            >
              ▲ Next.js
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
