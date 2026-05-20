"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { certifications } from "@/data/certifications";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

type CertFilter = "all" | "technical" | "methodology" | "data";

const certIconMap: Record<string, React.ReactNode> = {
  "bnsp-web": (
    <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  "certiport-python": (
    <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.585 11.692h4.328s2.432.942 2.432-2.35V5.05S16.714 2 12.304 2C7.896 2 7.714 4.664 7.714 4.664l.006 2.76h4.682v.828H6.654S4 7.902 4 12.206c0 4.307 2.315 4.153 2.315 4.153h1.382v-2.896s-.074-2.315 2.278-2.315l.006.002h-.002l.006-.002zM9.4 4.42a.77.77 0 110 1.54.77.77 0 010-1.54z" />
      <path d="M14.415 12.308h-4.328s-2.432-.942-2.432 2.35v4.292S7.286 22 11.696 22c4.408 0 4.59-2.664 4.59-2.664l-.006-2.76h-4.682v-.828h5.748S20 16.098 20 11.794c0-4.307-2.315-4.153-2.315-4.153h-1.382v2.896s.074 2.315-2.278 2.315l-.006-.002h.002l-.006.002zM14.6 19.58a.77.77 0 110-1.54.77.77 0 010 1.54z" />
    </svg>
  ),
  "scrum": (
    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  "iot": (
    <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
    </svg>
  ),
  "dqlab-r": (
    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const filterButtons: { key: CertFilter; label: { id: string; en: string } }[] = [
  { key: "all", label: translations.certifications.filterAll },
  { key: "technical", label: translations.certifications.filterTechnical },
  { key: "methodology", label: translations.certifications.filterMethodology },
  { key: "data", label: translations.certifications.filterData },
];

export default function CertificationsSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<CertFilter>("all");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  const filtered = filter === "all" ? certifications : certifications.filter((c) => c.category === filter);

  return (
    <>
      <AnimatedSection id="certifications" className="py-32 container mx-auto px-6">
        <AnimatedDiv>
          <SectionHeader label={translations.certifications.label} title={translations.certifications.title} />
        </AnimatedDiv>

        {/* Filter tabs */}
        <AnimatedDiv className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border cursor-pointer ${
                filter === btn.key
                  ? "bg-linear-to-r from-rose-500 to-fuchsia-500 text-white border-transparent shadow-lg shadow-rose-500/20"
                  : "border-slate-600 text-slate-400 hover:border-rose-400 hover:text-rose-400"
              }`}
            >
              {t(btn.label)}
            </button>
          ))}
        </AnimatedDiv>

        <CertificationGrid filtered={filtered} setLightbox={setLightbox} t={t} />
      </AnimatedSection>

      {/* ===== LIGHTBOX MODAL ===== */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-sm rounded-t-2xl border border-slate-700/50 border-b-0">
                <h3 className="text-white font-semibold text-sm truncate pr-4">{lightbox.title}</h3>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-500/80 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image */}
              <div className="overflow-auto rounded-b-2xl border border-slate-700/50 border-t-0 bg-slate-950 relative" style={{ minHeight: "300px" }}>
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CertificationGrid({ 
  filtered, 
  setLightbox, 
  t 
}: { 
  filtered: typeof certifications; 
  setLightbox: (val: { src: string; title: string }) => void;
  t: (val: { id: string; en: string }) => string;
}) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filtered.map((cert, i) => (
          <motion.div
            key={cert.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <TiltCard maxTilt={4} className="h-full">
              <GlassCard delay={0} className="p-0 group h-full hover:border-rose-400/40 overflow-hidden">
                {/* Certificate Image Preview */}
                {cert.image && (
                  <div
                    className="relative w-full h-40 overflow-hidden cursor-pointer"
                    onClick={() => setLightbox({ src: cert.image!, title: t(cert.name) })}
                  >
                    <Image
                      src={cert.image}
                      alt={t(cert.name)}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        {t({ id: "Lihat Sertifikat", en: "View Certificate" })}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-linear-to-br from-rose-500/20 to-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {certIconMap[cert.id] || (
                        <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-rose-400 transition-colors">
                        {t(cert.name)}
                      </h3>
                      <p className="text-slate-400 text-xs">{cert.issuer}</p>
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-[11px] text-slate-500 font-medium">{cert.date}</span>
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {t(translations.certifications.verified)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
