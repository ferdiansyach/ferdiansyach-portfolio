"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import ParticleBackground from "@/components/ui/ParticleBackground";
import StatusBadge from "@/components/ui/StatusBadge";
import MagneticButton from "@/components/ui/MagneticButton";

const typingRoles = [
  { en: "Fullstack Developer", id: "Fullstack Developer" },
  { en: "Data Analyst", id: "Analis Data" },
  { en: "DevOps Engineer", id: "DevOps Engineer" },
  { en: "IT Support Specialist", id: "IT Support Specialist" },
  { en: "WordPress Developer", id: "WordPress Developer" },
];

const mockupTexts = {
  dailyNotes: {
    en: "Daily Notes",
    id: "Catatan Harian",
  },
  graphView: {
    en: "Graph View",
    id: "Visual Graf",
  },
  aiAssistant: {
    en: "Reflect AI",
    id: "Reflect AI",
  },
  journalTitle: {
    en: "Ferdiansyach — Professional Profile",
    id: "Ferdiansyach — Profil Profesional",
  },
  tagRole: {
    en: "Role",
    id: "Peran",
  },
  tagLocation: {
    en: "Location",
    id: "Lokasi",
  },
  bullet1Title: {
    en: "Core Stack",
    id: "Stack Utama",
  },
  bullet1Desc: {
    en: "Specialized in building fast Next.js/React applications, WordPress sites, and Python-based analytics.",
    id: "Spesialis dalam membangun aplikasi Next.js/React yang cepat, situs WordPress, dan analitik berbasis Python.",
  },
  bullet2Title: {
    en: "Data & ML",
    id: "Data & ML",
  },
  bullet2Desc: {
    en: "Experienced in machine learning models, statistical analysis, and data viz.",
    id: "Berpengalaman dalam model machine learning, analisis statistik, dan visualisasi data.",
  },
  bullet3Title: {
    en: "Approach",
    id: "Pendekatan",
  },
  bullet3Desc: {
    en: "Combining clean, responsive UI/UX with rigorous technical architecture and reliable system operations.",
    id: "Menggabungkan UI/UX bersih & responsif dengan arsitektur teknis yang kokoh dan operasional sistem yang andal.",
  },
  aiQuestion: {
    en: "Why hire Ferdiansyach?",
    id: "Mengapa merekrut Ferdiansyach?",
  },
  aiAnswer: {
    en: "He is a versatile Fullstack Developer, Data Analyst, DevOps Engineer, IT Support Specialist, and WordPress Developer. He writes clean React/Next.js code, uses Python to extract actionable insights from data, manages cloud infrastructure and deployment pipelines, and keeps systems running smoothly end to end.",
    id: "Dia adalah profesional serbaguna: Fullstack Developer, Analis Data, DevOps Engineer, IT Support Specialist, dan WordPress Developer. Dia menulis kode React/Next.js yang bersih, menggunakan Python untuk mengekstrak wawasan penting dari data, mengelola infrastruktur cloud dan pipeline deployment, serta menjaga sistem berjalan lancar dari ujung ke ujung.",
  }
};

/* ───── Animation variants ───── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const mockupVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

const statsItems = [
  { value: "5+", labelKey: "projects" as const },
  { value: "6", labelKey: "certifications" as const },
  { value: "12+", labelKey: "technologies" as const },
];

type ActiveTab = "daily" | "graph" | "ai";

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("daily");

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
      isDeleting ? 50 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, getCurrentText]);

  // Dynamic date for the daily notes mockup
  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(lang === "id" ? "id-ID" : "en-US", options);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-start pt-28 pb-16 overflow-hidden">
      {/* Particle canvas */}
      <ParticleBackground />

      {/* Animated soft gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,58,237,0.06),transparent_60%)] animate-mesh" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Header content */}
        <motion.div
          className="max-w-3xl flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants} className="mb-4">
            <StatusBadge />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-[var(--color-primary)] font-semibold text-xs sm:text-sm tracking-wider uppercase leading-snug mb-2 font-sans"
          >
            {t(translations.hero.subtitle)}
          </motion.p>

          {/* Name & Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[var(--color-ink)] leading-tight tracking-tight whitespace-normal"
          >
            {t(translations.hero.greeting)}{" "}
            <span className="text-[var(--color-primary)] relative">
              Ferdiansyach
            </span>
          </motion.h1>

          {/* Typing effect */}
          <motion.p
            variants={itemVariants}
            className="mt-3 text-base sm:text-xl md:text-2xl text-[var(--color-body)] font-medium h-8"
          >
            <span>{displayText}</span>
            <span className="border-r-[2.5px] border-[var(--color-primary)] animate-blink ml-0.5">&nbsp;</span>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm sm:text-base md:text-lg text-[var(--color-body)] max-w-2xl leading-relaxed"
          >
            {t(translations.hero.description)}
          </motion.p>

          {/* Location */}
          <motion.div
            variants={itemVariants}
            className="mt-3 flex items-center gap-2 text-[var(--color-muted)] text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{t(translations.hero.location)}</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white font-medium py-2.5 px-6 rounded-md hover:bg-[var(--color-primary-hover)] transition-all duration-300 shadow-md shadow-violet-600/15 text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t(translations.hero.contactBtn)}
              </a>
            </MagneticButton>

            {process.env.NODE_ENV === "development" && (
              <MagneticButton>
                <a
                  href="/portfolio-pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] font-medium py-2.5 px-6 rounded-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t(translations.hero.downloadCv)}
                </a>
              </MagneticButton>
            )}

            {process.env.NODE_ENV === "development" && (
              <MagneticButton>
                <a
                  href="/projects-pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] text-[var(--color-ink)] font-medium py-2.5 px-6 rounded-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300 text-sm"
                >
                  <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  {t(translations.hero.viewPortfolio)}
                </a>
              </MagneticButton>
            )}

            <div className="flex items-center gap-3">
              <MagneticButton strength={10}>
                <a
                  href="https://github.com/ferdiansyach"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center p-2.5 rounded-full border border-[var(--color-hairline)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
                  className="inline-flex items-center justify-center p-2.5 rounded-full border border-[var(--color-hairline)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Reflect-style Interactive Notebook Mockup */}
        <motion.div
          className="mt-16 w-full max-w-4xl rounded-xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] shadow-2xl text-left overflow-hidden relative flex flex-col md:flex-row h-[520px] sm:h-[480px]"
          variants={mockupVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sidebar Panel (Left) */}
          <div className="w-full md:w-1/4 border-r border-[var(--color-hairline)] p-4 flex md:flex-col gap-2 md:gap-1.5 overflow-x-auto md:overflow-x-visible shrink-0 bg-[var(--color-canvas)]/40">
            {/* Mock Mac Circles */}
            <div className="hidden md:flex gap-1.5 mb-6">
              <span className="w-3 h-3 rounded-full bg-rose-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-amber-500 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 opacity-80" />
            </div>

            {/* Menu Tabs */}
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-all duration-200 ${activeTab === "daily"
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
                : "text-[var(--color-body)] hover:bg-[var(--color-canvas-elevated)]"
                }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="whitespace-nowrap">{mockupTexts.dailyNotes[lang]}</span>
            </button>

            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-all duration-200 ${activeTab === "ai"
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
                : "text-[var(--color-body)] hover:bg-[var(--color-canvas-elevated)]"
                }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="whitespace-nowrap">{mockupTexts.aiAssistant[lang]}</span>
            </button>

            <button
              onClick={() => setActiveTab("graph")}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold w-full transition-all duration-200 ${activeTab === "graph"
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold"
                : "text-[var(--color-body)] hover:bg-[var(--color-canvas-elevated)]"
                }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <span className="whitespace-nowrap">{mockupTexts.graphView[lang]}</span>
            </button>
          </div>

          {/* Main Editor Canvas (Right) */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto bg-[var(--color-canvas-elevated)] relative">
            <AnimatePresence mode="wait">
              {/* Tab 1: Daily Notes (Journal page style) */}
              {activeTab === "daily" && (
                <motion.div
                  key="daily"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  {/* Journal Date Header */}
                  <div className="border-b border-[var(--color-hairline)] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[var(--color-primary)] text-xs font-semibold tracking-wider uppercase font-mono">
                      {getFormattedDate()}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">#fullstack</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">#data-analyst</span>
                    </div>
                  </div>

                  {/* Journal Title */}
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink)]">
                    {mockupTexts.journalTitle[lang]}
                  </h2>

                  {/* Inline Profile Card widget */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-canvas)]/30 border border-[var(--color-hairline)]">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                      <Image
                        src="/images/fotoprofil.jpeg"
                        alt="Ferdiansyach"
                        fill
                        className="rounded-full object-cover border border-[var(--color-hairline)]"
                        sizes="(max-width: 640px) 64px, 80px"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--color-ink)] leading-snug">
                        Ferdiansyach
                      </h4>
                      <p className="text-xs sm:text-sm text-[var(--color-body)] mt-0.5">
                        {mockupTexts.tagRole[lang]}: <span className="font-semibold text-[var(--color-primary)]">Fullstack & Data</span>
                      </p>
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">
                        {mockupTexts.tagLocation[lang]}: Depok, ID
                      </p>
                    </div>
                  </div>

                  {/* Document Body */}
                  <ul className="flex flex-col gap-3 text-sm text-[var(--color-body)] pl-4 list-disc marker:text-[var(--color-primary)]">
                    <li>
                      <strong>{mockupTexts.bullet1Title[lang]}:</strong> {mockupTexts.bullet1Desc[lang]}
                    </li>
                    <li>
                      <strong>{mockupTexts.bullet2Title[lang]}:</strong> {mockupTexts.bullet2Desc[lang]}
                    </li>
                    <li>
                      <strong>{mockupTexts.bullet3Title[lang]}:</strong> {mockupTexts.bullet3Desc[lang]}
                    </li>
                  </ul>

                  {/* Stats Summary tags */}
                  <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-hairline)] pt-4 mt-2">
                    {statsItems.map((stat, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-lg font-bold text-[var(--color-primary)]">{stat.value}</span>
                        <span className="text-[10px] text-[var(--color-muted)] font-medium leading-tight">
                          {t(translations.stats[stat.labelKey])}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Reflect AI Chat */}
              {activeTab === "ai" && (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full gap-4 justify-between"
                >
                  <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                    {/* Header */}
                    <div className="border-b border-[var(--color-hairline)] pb-3">
                      <span className="text-[var(--color-primary)] text-xs font-semibold tracking-wider uppercase font-mono">
                        Reflect AI Assistant
                      </span>
                    </div>

                    {/* Chat Bubble 1 (User) */}
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[10px] text-[var(--color-muted)] font-mono">User</span>
                      <div className="bg-[var(--color-canvas)]/60 text-[var(--color-ink)] px-3 py-2 rounded-lg rounded-tr-none text-xs sm:text-sm max-w-[85%] border border-[var(--color-hairline)]">
                        {mockupTexts.aiQuestion[lang]}
                      </div>
                    </div>

                    {/* Chat Bubble 2 (AI Response) */}
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-[10px] text-[var(--color-primary)] font-mono">Reflect AI</span>
                      <div className="bg-[var(--color-primary)]/10 text-[var(--color-ink)] px-3.5 py-2.5 rounded-lg rounded-tl-none text-xs sm:text-sm max-w-[85%] border border-[var(--color-primary)]/20 leading-relaxed shadow-sm">
                        {mockupTexts.aiAnswer[lang]}
                      </div>
                    </div>
                  </div>

                  {/* Mock Input Bar */}
                  <div className="border-t border-[var(--color-hairline)] pt-3 mt-4 flex gap-2">
                    <input
                      disabled
                      placeholder="Ask Reflect AI..."
                      type="text"
                      className="flex-1 bg-[var(--color-canvas)]/30 border border-[var(--color-hairline)] rounded-md px-3 py-1.5 text-xs text-[var(--color-body)] opacity-50"
                    />
                    <button disabled className="bg-[var(--color-primary)] opacity-50 text-white rounded-md px-3 py-1.5 text-xs font-semibold">
                      Send
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Graph View (Animated Network Nodes) */}
              {activeTab === "graph" && (
                <motion.div
                  key="graph"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full gap-4"
                >
                  {/* Header */}
                  <div className="border-b border-[var(--color-hairline)] pb-3">
                    <span className="text-[var(--color-primary)] text-xs font-semibold tracking-wider uppercase font-mono">
                      Knowledge Graph
                    </span>
                  </div>

                  {/* SVG Nodes Visualizer */}
                  <div className="flex-1 w-full relative flex items-center justify-center min-h-[280px]">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 280" preserveAspectRatio="none">
                      {/* Connecting lines — drawn in, then a looping dash-flow */}
                      {[
                        { d: "M200,140 L100,70", delay: 0 },
                        { d: "M200,140 L300,70", delay: 0.1 },
                        { d: "M200,140 L60,168", delay: 0.2 },
                        { d: "M200,140 L340,168", delay: 0.3 },
                        { d: "M200,140 L200,238", delay: 0.4 },
                      ].map((line, i) => (
                        <motion.path
                          key={i}
                          d={line.d}
                          fill="none"
                          stroke="var(--color-primary)"
                          strokeOpacity={0.3}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.7, delay: line.delay, ease: "easeOut" }}
                        />
                      ))}
                      {[
                        { d: "M200,140 L100,70", delay: 0.9 },
                        { d: "M200,140 L300,70", delay: 1.0 },
                        { d: "M200,140 L60,168", delay: 1.1 },
                        { d: "M200,140 L340,168", delay: 1.2 },
                        { d: "M200,140 L200,238", delay: 1.3 },
                      ].map((line, i) => (
                        <motion.path
                          key={`pulse-${i}`}
                          d={line.d}
                          fill="none"
                          stroke="var(--color-primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="6 30"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: [0, 0.9, 0],
                            strokeDashoffset: [36, -36],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                            delay: line.delay,
                            repeatDelay: 1.2,
                          }}
                        />
                      ))}
                    </svg>

                    {/* Nodes */}
                    {/* Center Node */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                      transition={{
                        opacity: { duration: 0.4 },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                      }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute z-10 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg shadow-[var(--color-primary)]/30 cursor-pointer"
                    >
                      Ferdiansyach
                    </motion.div>

                    {/* Surrounding Nodes */}
                    {[
                      { style: "top-[20%] left-[15%]", label: "React / Next.js", delay: 0.15 },
                      { style: "top-[20%] right-[15%]", label: "Python / ML", delay: 0.3 },
                      { style: "top-[55%] left-[5%]", label: "Web Apps", delay: 0.45 },
                      { style: "top-[55%] right-[5%]", label: "Data Analyst", delay: 0.6 },
                      { style: "bottom-[10%] left-[43%]", label: "SQL / databases", delay: 0.75 },
                    ].map((node, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: node.delay, duration: 0.4, ease: "easeOut" }}
                        whileHover={{ scale: 1.08, borderColor: "var(--color-primary)" }}
                        className={`absolute ${node.style} bg-[var(--color-canvas-elevated)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-[10px] px-2 py-1 rounded-md shadow-md cursor-pointer transition-colors`}
                      >
                        {node.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[var(--color-muted)] text-[10px] tracking-widest uppercase font-mono">Scroll</span>
          <svg className="w-4 h-4 text-[var(--color-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
