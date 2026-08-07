"use client";

import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { TimelineContent } from "../ui/timeline-animation";
import { VerticalCutReveal } from "../ui/vertical-cut-reveal";
import { InfoCard } from "@/components/ui/info-card";
import GridBackground from "@/components/ui/GridBackground";
import { Boxes } from "@/components/ui/background-boxes";

export default function AboutSection() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 150, y: 150 });

  const handleShowcaseMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: Math.min((i % 4) * 0.05, 0.2),
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    hidden: {
      filter: "blur(6px)",
      y: 12,
      opacity: 0,
    },
  };

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: Math.min((i % 3) * 0.05, 0.15),
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    hidden: {
      filter: "blur(6px)",
      opacity: 0,
    },
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // HR-tailored Why Me Cards (Harmonized for proportional height & alignment)
  const aboutInfoCards = [
    {
      title: t({
        id: "Fullstack Engineering & Arsitektur Web",
        en: "Fullstack Engineering & Web Architecture",
      }),
      desc: t({
        id: "Membangun aplikasi web produksi yang cepat dan responsif berbasis Next.js 16, React 19, Go, dan Node.js dengan standar performa 90+ Lighthouse, manajemen state global, dan integrasi payment gateway.",
        en: "Building fast, responsive production web applications with Next.js 16, React 19, Go, and Node.js with 90+ Lighthouse performance standards, global state management, and payment gateway integrations.",
      }),
      tags: ["Next.js 16", "React 19", "Go Gin", "Node.js", "Lighthouse 90+"],
      borderColor: "#7c3aed",
      effectBgColor: "#7c3aed",
      iconBgGradient: "from-purple-600/30 to-purple-900/20",
      icon: (
        <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: t({
        id: "AI Prediktif & Machine Learning Engineering",
        en: "Predictive AI & Machine Learning Engineering",
      }),
      desc: t({
        id: "Merancang pipeline AI prediktif berbasis PyTorch, XGBoost, LSTM, dan YOLOv11 dengan akurasi 92.4%. Menggabungkan ketelitian riset publikasi IEEE dengan implementasi nyata pada industri dan pemerintahan.",
        en: "Architecting predictive AI pipelines with PyTorch, XGBoost, LSTM, and YOLOv11 achieving 92.4% accuracy. Combining IEEE publication research rigor with real-world industry and public sector deployments.",
      }),
      tags: ["PyTorch", "XGBoost", "LSTM", "YOLOv11", "IEEE Research"],
      borderColor: "#10b981",
      effectBgColor: "#10b981",
      iconBgGradient: "from-emerald-600/30 to-emerald-900/20",
      icon: (
        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: t({
        id: "Analisis Data Spasial & Web-GIS Dashboard",
        en: "Spatial Data Analytics & Web-GIS Dashboards",
      }),
      desc: t({
        id: "Mengolah dataset spasial multi-sensor (Sentinel-2, Landsat-8, GEE) dan data time-series energi enterprise menjadi dashboard analitik interaktif Streamlit untuk pengambilan keputusan bisnis strategis.",
        en: "Processing multi-sensor spatial satellite datasets (Sentinel-2, Landsat-8, GEE) and enterprise time-series data into interactive Streamlit analytics dashboards for strategic business decision-making.",
      }),
      tags: ["Sentinel-2", "GEE", "Streamlit", "Web-GIS", "Python"],
      borderColor: "#0284c7",
      effectBgColor: "#0284c7",
      iconBgGradient: "from-sky-600/30 to-sky-900/20",
      icon: (
        <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[var(--color-canvas)] relative overflow-hidden"
      ref={heroRef}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-12">
          {/* Header */}
          <div className="flex items-center gap-2 text-xl mb-6">
            <span className="text-[var(--color-primary)] animate-spin">✱</span>
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[var(--color-primary)]"
            >
              {t(translations.about.label)}
            </TimelineContent>
          </div>

          {/* Interactive Showcase Box with Hover Matrix & Cursor Spotlight */}
          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            onMouseMove={handleShowcaseMouseMove}
            className="relative group rounded-3xl overflow-hidden border border-[var(--color-hairline)] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 shadow-2xl min-h-[300px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center text-center cursor-pointer"
          >
            {/* Interactive Hover Boxes Matrix Grid */}
            <div className="absolute inset-0 opacity-25 overflow-hidden">
              <Boxes />
            </div>

            {/* Grid Matrix Layer */}
            <GridBackground className="opacity-20" />

            {/* Interactive Mouse Tracking Spotlight Orb */}
            <div
              className="absolute w-[350px] h-[350px] bg-gradient-to-r from-purple-500/30 via-violet-500/25 to-indigo-500/20 rounded-full blur-[90px] pointer-events-none transition-transform duration-100 ease-out z-0"
              style={{
                left: `${mousePos.x - 175}px`,
                top: `${mousePos.y - 175}px`,
              }}
            />

            {/* Ambient Aurora Glow Orbs */}
            <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-purple-600/20 via-violet-600/15 to-transparent blur-[110px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-500/20 via-sky-500/15 to-transparent blur-[100px] rounded-full pointer-events-none" />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-canvas)] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Center Showcase Interactive Badge */}
            <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-[var(--color-canvas-elevated)]/80 backdrop-blur-xl border border-white/10 shadow-2xl max-w-md mx-4 pointer-events-none">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  ENGINEERING & AI EXECUTION
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                Ferdiansyach
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {t({
                  id: "Fullstack Developer | Data Analyst | AI Engineer",
                  en: "Fullstack Developer | Data Analyst | AI Engineer",
                })}
              </p>
            </div>
          </TimelineContent>
        </div>

        {/* Headline & HR Bio Narrative Grid */}
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mt-6 mb-16">
          <div className="md:col-span-2 text-left">
            <h2 className="sm:text-3xl md:text-4xl text-2xl !leading-[120%] font-serif font-bold text-white mb-6">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                {t({
                  id: "Mentransformasi Kebutuhan Bisnis Kompleks menjadi Aplikasi Web & Sistem AI Produksi yang Cepat, Aman, dan Terukur.",
                  en: "Transforming Complex Business Requirements into Fast, Secure & Scalable Production Web Apps & AI Systems.",
                })}
              </VerticalCutReveal>
            </h2>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid md:grid-cols-2 gap-6 sm:gap-8 text-slate-300"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs leading-relaxed"
              >
                <p className="text-justify">
                  {t({
                    id: "Sebagai lulusan Sistem Informasi Universitas Nasional (IPK 3.77 / Cum Laude), saya memadukan keahlian teknik perangkat lunak fullstack (Next.js 16, Go Gin, Node.js) dengan eksekusi produk nyata. Saya berpengalaman membangun 10+ proyek produksi berskala besar dari rancangan awal hingga rilis.",
                    en: "As an Information Systems graduate from Universitas Nasional (GPA 3.77 / Cum Laude), I blend fullstack software engineering (Next.js 16, Go Gin, Node.js) with real product execution. Proven experience delivering 10+ production applications from initial architecture to live deployment.",
                  })}
                </p>
              </TimelineContent>

              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs leading-relaxed"
              >
                <p className="text-justify">
                  {t({
                    id: "Di bidang sains data & AI, saya mengembangkan model prediktif (XGBoost, LSTM, YOLOv11) dengan akurasi 92.4% serta riset spasial GEE yang terpublikasi di IEEE. Saya fokus menciptakan solusi teknologi yang berorientasi pada nilai bisnis dan dampak positif bagi tim.",
                    en: "In Data Science & AI, I engineer predictive ML models (XGBoost, LSTM, YOLOv11) achieving 92.4% accuracy alongside IEEE-published spatial GEE research. Dedicated to delivering high-impact technological solutions aligned with strategic business goals.",
                  })}
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          {/* Profile Callout Box */}
          <div className="md:col-span-1">
            <div className="text-left md:text-right p-6 sm:p-8 rounded-2xl bg-[var(--color-canvas-elevated)] border border-[var(--color-hairline)] shadow-xl flex flex-col justify-between h-full">
              <div>
                <TimelineContent
                  as="div"
                  animationNum={12}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-[var(--color-primary)] text-2xl font-serif font-bold tracking-tight mb-1"
                >
                  FERDIANSYACH
                </TimelineContent>

                <TimelineContent
                  as="div"
                  animationNum={13}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-slate-400 text-xs font-mono mb-6"
                >
                  Fullstack Developer | Data Analyst | AI Engineer
                </TimelineContent>

                <TimelineContent
                  as="div"
                  animationNum={14}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="mb-8"
                >
                  <p className="text-slate-200 font-medium text-sm sm:text-base leading-snug">
                    {t({
                      id: "Mencari kandidat teknologi yang siap memberikan hasil kerja produksi nyata bagi tim Anda?",
                      en: "Looking for a tech candidate ready to deliver real production impact for your engineering team?",
                    })}
                  </p>
                </TimelineContent>
              </div>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                onClick={scrollToContact}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary)]/30 inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 ease-in-out text-white px-5 py-3 rounded-xl cursor-pointer font-semibold text-sm w-fit md:ml-auto active:scale-95 touch-manipulation"
              >
                <span>{t({ id: "MARI BERKOLABORASI", en: "LET'S COLLABORATE" })}</span>
                <ArrowRight className="w-4 h-4" />
              </TimelineContent>
            </div>
          </div>
        </div>

        {/* ===== INTERACTIVE 3D ROTATING CONIC VERTICAL RECTANGULAR INFO CARDS ===== */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aboutInfoCards.map((card, i) => (
            <TimelineContent
              key={i}
              as="div"
              animationNum={i}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="h-full flex justify-center"
            >
              <InfoCard
                icon={card.icon}
                title={card.title}
                description={card.desc}
                tags={card.tags}
                borderColor={card.borderColor}
                effectBgColor={card.effectBgColor}
                iconBgGradient={card.iconBgGradient}
                cardBgColor="var(--color-canvas-elevated,#18181b)"
                borderBgColor="var(--color-hairline,#2a2a2e)"
                textColor="#f5f5f5"
                hoverTextColor="#ffffff"
              />
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
}
