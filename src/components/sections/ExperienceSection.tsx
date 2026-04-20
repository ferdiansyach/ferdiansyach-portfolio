"use client";

import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { experiences } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { t } = useLanguage();

  return (
    <motion.div
      custom={index}
      variants={timelineItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative pl-10 pb-14 group"
    >
      {/* Timeline dot with pulse */}
      <div className="absolute left-[-7px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-[3px] border-rose-400 shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]">
        <span className="absolute inset-0 rounded-full bg-rose-400/30 animate-ping" />
      </div>

      {/* Card */}
      <div className="glass-card p-10 md:p-12 border-l-[3px] border-l-rose-400 hover:translate-x-1 hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.15)] transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-rose-400 text-xs font-semibold tracking-wide">{exp.period}</span>
          {exp.isCurrent && (
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
              {t(translations.experience.current)}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white mt-2">{t(exp.role)}</h3>
        <p className="text-slate-400 text-sm mb-4">{exp.company}</p>
        <ul className="space-y-3">
          {exp.bullets.map((bullet, j) => (
            <li key={j} className="flex gap-2 text-slate-400 text-sm">
              <span className="text-rose-400 mt-0.5 shrink-0">›</span>
              <span>{t(bullet)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <AnimatedSection id="experience" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.experience.label} title={translations.experience.title} />
      </AnimatedDiv>
      <div className="max-w-3xl mx-auto">
        <div className="relative ml-2">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-rose-400 to-fuchsia-500 rounded-full origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
