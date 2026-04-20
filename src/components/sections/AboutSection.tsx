"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv, fadeUp } from "@/components/ui/AnimatedSection";

const aboutCards = [
  {
    title: translations.about.card1Title,
    desc: translations.about.card1Desc,
    icon: (
      <svg className="w-7 h-7 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    gradient: "from-rose-500/20 to-fuchsia-500/20",
    borderHover: "hover:border-rose-400/40",
  },
  {
    title: translations.about.card2Title,
    desc: translations.about.card2Desc,
    icon: (
      <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: "from-fuchsia-500/20 to-violet-500/20",
    borderHover: "hover:border-indigo-400/40",
  },
  {
    title: translations.about.card3Title,
    desc: translations.about.card3Desc,
    icon: (
      <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: "from-emerald-500/20 to-rose-500/20",
    borderHover: "hover:border-emerald-400/40",
  },
];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="about" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.about.label} title={translations.about.title} />
      </AnimatedDiv>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {aboutCards.map((card, i) => (
          <AnimatedDiv key={i} variants={fadeUp}>
            <TiltCard maxTilt={6}>
              <GlassCard delay={0} className={`p-6 sm:p-8 md:p-12 text-left h-full ${card.borderHover} transition-all duration-500 group`}>
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-8 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 origin-bottom-left`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-5">{t(card.title)}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{t(card.desc)}</p>
              </GlassCard>
            </TiltCard>
          </AnimatedDiv>
        ))}
      </div>
    </AnimatedSection>
  );
}
