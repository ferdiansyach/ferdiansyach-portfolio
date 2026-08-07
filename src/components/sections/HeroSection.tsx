"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import {
  MapPin,
  Sparkles,
  FileCode,
  Network,
  Cpu,
  CheckCircle2,
  Layers,
  ChevronDown,
} from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { HeroSocialConnect } from "@/components/ui/connect-with-us";

const roles = [
  { id: "Fullstack Developer", en: "Fullstack Developer" },
  { id: "Analis Data", en: "Data Analyst" },
  { id: "AI Engineer", en: "AI Engineer" },
];

export default function HeroSection() {
  const { t } = useLanguage();

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reflect Profile Window active tab
  const [activeTab, setActiveTab] = useState<"notes" | "ai" | "graph">("notes");

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = t(roles[roleIndex]);
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, t]);

  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 container mx-auto flex flex-col justify-between items-center overflow-hidden">
      {/* Three.js Fluid Shader & Ambient Color Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Three.js WebGL Fluid Shader */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none">
          <ShaderAnimation className="w-full h-full" />
        </div>

        {/* Ambient Radial Color Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid Dot Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      </div>

      <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide mb-6 shadow-sm backdrop-blur-xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t({ id: "🟢 Tersedia untuk Kerja", en: "🟢 Open to Work" })}</span>
        </motion.div>

        {/* Institution Sub-header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--color-primary)] font-bold mb-3"
        >
          {t({ id: "SISTEM INFORMASI — UNIVERSITAS NASIONAL", en: "INFORMATION SYSTEMS — UNIVERSITAS NASIONAL" })}
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-white mb-4 leading-tight"
        >
          {t({ id: "Halo, Saya ", en: "Hi, I'm " })}
          <span className="bg-gradient-to-r from-violet-400 via-[var(--color-primary)] to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
            Ferdiansyach
          </span>
        </motion.h1>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 flex items-center justify-center text-xl sm:text-2xl font-mono text-slate-300 font-semibold mb-6"
        >
          <span>{displayedText}</span>
          <span className="w-0.5 h-6 bg-[var(--color-primary)] ml-1 animate-pulse" />
        </motion.div>

        {/* Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mb-4"
        >
          {t({
            id: "Seorang Fullstack Developer, Analis Data & AI Engineer berpengalaman. Menyelesaikan 10+ proyek produksi dan model AI prediktif dengan akurasi 92%. Siap memberikan dampak nyata melalui solusi teknologi inovatif.",
            en: "An experienced Fullstack Developer, Data Analyst & AI Engineer. Delivered 10+ production projects and predictive AI models achieving 92% accuracy. Ready to drive real impact through innovative technology solutions.",
          })}
        </motion.p>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-mono mb-8"
        >
          <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          <span>Depok, West Java</span>
        </motion.div>

        {/* 3D Glowing Social Connect Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full mb-10"
        >
          <HeroSocialConnect />
        </motion.div>

        {/* ===== INTERACTIVE REFLECT AI PROFILE WINDOW ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full max-w-4xl rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)]/90 backdrop-blur-xl shadow-2xl overflow-hidden text-left"
        >
          {/* macOS Chrome Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-canvas)]/80 border-b border-[var(--color-hairline)]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="text-xs font-mono text-slate-300 tracking-wider font-semibold">
              reflect-workspace // ferdiansyach-profile
            </div>

            <div className="w-12" />
          </div>

          {/* Window Grid: Left Navigation Sidebar + Editor Panel */}
          <div className="grid md:grid-cols-12 min-h-[380px]">
            {/* Sidebar Tabs */}
            <div className="md:col-span-3 border-r border-[var(--color-hairline)] bg-[var(--color-canvas)]/50 p-3 space-y-1.5">
              {[
                { key: "notes", label: "Daily Notes", icon: <FileCode className="w-4 h-4 text-[var(--color-primary)]" /> },
                { key: "ai", label: "Reflect AI", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
                { key: "graph", label: "Graph View", icon: <Network className="w-4 h-4 text-sky-400" /> },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "notes" | "ai" | "graph")}
                    whileTap={{ scale: 0.97 }}
                    className={`relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? "text-[var(--color-primary)] font-semibold"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeroTerminalTab"
                        className="absolute inset-0 rounded-xl bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-9 p-5 sm:p-7 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {activeTab === "notes" && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Header Timestamp & Full Resume Hashtags */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-[var(--color-hairline)] pb-3">
                      <span className="text-violet-400 font-bold tracking-wider uppercase">
                        FRIDAY, AUGUST 7, 2026
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {["#fullstack", "#data-analyst", "#ai-engineer", "#python", "#web-gis"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px] font-mono hover:bg-indigo-500/20 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Window Main Title */}
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                      Ferdiansyach — Professional Profile
                    </h2>

                    {/* Profile Header Box */}
                    <div className="p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-hairline)] flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--color-primary)]/50 shrink-0">
                        <Image
                          src="/images/fotoprofil.jpeg"
                          alt="Ferdiansyach Profile"
                          fill
                          className="object-cover"
                          sizes="48px"
                          priority
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-white text-base">Ferdiansyach</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30">
                            Fullstack & Data
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Location: Depok, ID</p>
                      </div>
                    </div>

                    {/* Technical Bullets */}
                    <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[var(--color-primary)] font-bold mt-0.5">▪</span>
                        <span>
                          <strong className="text-white">Core Stack:</strong> Specialized in building fast Next.js/React applications, Node.js/Express & Go APIs, and Python-based analytics.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold mt-0.5">▪</span>
                        <span>
                          <strong className="text-white">Data & ML:</strong> Engineered predictive energy models (LSTM, XGBoost) with 92% accuracy and 7-year Google Earth Engine spatiotemporal analysis.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-sky-400 font-bold mt-0.5">▪</span>
                        <span>
                          <strong className="text-white">IEEE Research & QA:</strong> 1st-author presenter at IEEE ICETISI 2025; designed Jest/RTL unit testing pipelines reducing production bug rates by 60%.
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeTab === "ai" && (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-violet-400 border-b border-[var(--color-hairline)] pb-3">
                      <Cpu className="w-4 h-4" />
                      <span>REFLECT AI ENGINE // MODEL METRICS</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-white">
                      Predictive AI & Analytics Model Performance
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-hairline)]">
                        <span className="text-xs text-slate-400 block mb-1">Model Accuracy</span>
                        <span className="text-2xl font-mono font-bold text-emerald-400">92.4%</span>
                        <p className="text-[11px] text-slate-400 mt-1">Cross-validated classification score</p>
                      </div>

                      <div className="p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-hairline)]">
                        <span className="text-xs text-slate-400 block mb-1">Production Delivery</span>
                        <span className="text-2xl font-mono font-bold text-violet-400">10+ Apps</span>
                        <p className="text-[11px] text-slate-400 mt-1">Fullstack ML & Web deployments</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-xs text-slate-300 leading-relaxed">
                      <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        AI Engineering & Pipeline Capabilities
                      </p>
                      Automated feature processing, scikit-learn models, Python data processing, and seamless API integration into Next.js applications.
                    </div>
                  </motion.div>
                )}

                {activeTab === "graph" && (
                  <motion.div
                    key="graph"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-violet-400 border-b border-[var(--color-hairline)] pb-3">
                      <Layers className="w-4 h-4" />
                      <span>GRAPH VIEW // TECH ARCHITECTURE NODES</span>
                    </div>

                    <h2 className="text-lg font-serif font-bold text-white">
                      Fullstack & Data Systems Interconnections
                    </h2>

                    <div className="p-5 rounded-xl bg-[var(--color-canvas)] border border-[var(--color-hairline)] flex flex-wrap gap-2.5">
                      {[
                        "Next.js 16 (App Router)",
                        "React 19",
                        "TypeScript",
                        "Tailwind CSS 4",
                        "Python Analytics",
                        "scikit-learn",
                        "PostgreSQL / MySQL",
                        "WordPress / CMS",
                        "REST APIs",
                        "Vercel Deployment",
                      ].map((node, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-violet-300 text-xs font-mono hover:bg-[var(--color-primary)]/20 transition-all cursor-default"
                        >
                          ● {node}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Cue */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 0.6 },
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" },
        }}
        className="mt-12 flex flex-col items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
        aria-label="Scroll down to About section"
      >
        <span>SCROLL</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
}
