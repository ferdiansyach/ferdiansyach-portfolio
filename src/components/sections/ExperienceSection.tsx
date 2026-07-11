"use client";

import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { experiences } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import TracingBeam from "@/components/ui/TracingBeam";

const timelineItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
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
      className="relative pb-14 group"
    >
      {/* Timeline dot aligned with TracingBeam */}
      <div className="absolute -left-[33px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-canvas-elevated)] border-[3px] border-[var(--color-primary)] shadow-[0_0_12px_rgba(124,58,237,0.4)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] z-10">
        <span className="absolute inset-0 rounded-full bg-[var(--color-primary)]/30 animate-ping" />
      </div>

      {/* Card */}
      <div className="glass-card p-6 sm:p-8 md:p-12 border-l-[3px] border-l-[var(--color-primary)] hover:translate-x-1 transition-all duration-300 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[var(--color-primary)] text-xs font-semibold tracking-wide">{exp.period}</span>
          {exp.isCurrent && (
            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
              {t(translations.experience.current)}
            </span>
          )}
        </div>
        <h3 className="text-lg font-serif font-bold text-[var(--color-ink)] mt-2">{t(exp.role)}</h3>
        <p className="text-[var(--color-body)] text-sm mb-4">{exp.company}</p>
        <ul className="space-y-3">
          {exp.bullets.map((bullet, j) => (
            <li key={j} className="flex gap-2 text-[var(--color-body)] text-sm">
              <span className="text-[var(--color-primary)] mt-0.5 shrink-0">›</span>
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
          <TracingBeam>
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.id} exp={exp} index={i} />
            ))}
          </TracingBeam>
        </div>
      </div>
    </AnimatedSection>
  );
}
