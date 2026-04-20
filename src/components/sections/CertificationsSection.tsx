"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { certifications } from "@/data/certifications";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

type CertFilter = "all" | "technical" | "cloud" | "methodology" | "data";

const filterButtons: { key: CertFilter; label: { id: string; en: string } }[] = [
  { key: "all", label: translations.certifications.filterAll },
  { key: "technical", label: translations.certifications.filterTechnical },
  { key: "cloud", label: translations.certifications.filterCloud },
  { key: "methodology", label: translations.certifications.filterMethodology },
  { key: "data", label: translations.certifications.filterData },
];

export default function CertificationsSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<CertFilter>("all");

  const filtered = filter === "all" ? certifications : certifications.filter((c) => c.category === filter);

  return (
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
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
              filter === btn.key
                ? "bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white border-transparent shadow-lg shadow-rose-500/20"
                : "border-slate-600 text-slate-400 hover:border-rose-400 hover:text-rose-400"
            }`}
          >
            {t(btn.label)}
          </button>
        ))}
      </AnimatedDiv>

      {/* Cert grid */}
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
                <GlassCard delay={0} className="p-8 md:p-10 group h-full hover:border-rose-400/40">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {cert.badge}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white leading-tight mb-1 group-hover:text-rose-400 transition-colors">
                        {t(cert.name)}
                      </h3>
                      <p className="text-slate-400 text-sm">{cert.issuer}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-slate-500 font-medium">{cert.date}</span>
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {t(translations.certifications.verified)}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
