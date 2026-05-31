"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillIcon from "@/components/ui/SkillIcon";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const categoryIcons: Record<string, string> = {
  Frontend: "⚡",
  "Backend & DB": "🗄️",
  "Data & Analisis": "📊",
  "Data & Analysis": "📊",
  "Machine Learning": "🤖",
  "DevOps & Tools": "🛠️",
};

const proficiencyConfig = {
  beginner: {
    label: { id: "Pemula", en: "Beginner" },
    dots: 1,
    color: "bg-[var(--color-body-strong)]",
    textColor: "text-[var(--color-body)]",
    badge: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  },
  intermediate: {
    label: { id: "Menengah", en: "Intermediate" },
    dots: 2,
    color: "bg-[var(--color-primary)]",
    textColor: "text-[var(--color-primary)]",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  advanced: {
    label: { id: "Mahir", en: "Advanced" },
    dots: 3,
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <AnimatedSection id="skills" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader
          label={translations.skills.label}
          title={translations.skills.title}
        />
      </AnimatedDiv>

      {/* Category Tabs */}
      <AnimatedDiv className="flex flex-wrap justify-center gap-2 mb-14">
        {skillCategories.map((category, i) => {
          const iconKey = category.title.en;
          const emoji = categoryIcons[iconKey] ?? "💡";
          return (
            <motion.button
              key={i}
              onClick={() => setActiveTab(i)}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className={`
                relative px-5 py-2.5 rounded-xl text-sm font-semibold
                transition-all duration-300 border cursor-pointer flex items-center gap-2
                ${
                  activeTab === i
                    ? "bg-[var(--color-primary)] text-white border-transparent shadow-lg shadow-[var(--color-primary)]/30"
                    : "border-[var(--color-hairline)] text-[var(--color-body)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-ink)] bg-[var(--color-surface)]"
                }
              `}
            >
              <span className="text-base">{emoji}</span>
              <span>{t(category.title)}</span>
              <span
                className={`
                  text-xs px-1.5 py-0.5 rounded-full font-bold ml-0.5
                  ${activeTab === i ? "bg-white/20 text-white" : "bg-[var(--color-hairline)] text-[var(--color-body)]"}
                `}
              >
                {category.skills.length}
              </span>
            </motion.button>
          );
        })}
      </AnimatedDiv>

      {/* Skills Grid */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Section Title Row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">
                {categoryIcons[skillCategories[activeTab].title.en] ?? "💡"}
              </span>
              <h3 className="text-xl font-bold text-[var(--color-ink)]">
                {t(skillCategories[activeTab].title)}
              </h3>
              <div className="flex-1 h-px bg-[var(--color-hairline)]" />
              <span className="text-sm text-[var(--color-body)] font-medium">
                {skillCategories[activeTab].skills.length}{" "}
                {t({ id: "teknologi", en: "technologies" })}
              </span>
            </div>

            {/* Skill Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories[activeTab].skills.map((skill, j) => {
                const prof = proficiencyConfig[skill.proficiency];
                const isHovered = hoveredSkill === skill.name;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: j * 0.07,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="relative group glass-card rounded-2xl p-5 cursor-default overflow-hidden border border-[var(--color-hairline)] hover:border-[var(--color-primary)]/40 transition-all duration-300"
                    style={{
                      boxShadow: isHovered
                        ? `0 8px 32px ${skill.color}18`
                        : undefined,
                    }}
                  >
                    {/* Glow bg on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at 10% 10%, ${skill.color}0d 0%, transparent 70%)`,
                      }}
                    />

                    {/* Top Row: Icon + Name + Badges */}
                    <div className="relative z-10 flex items-start gap-3 mb-4">
                      {/* Icon container */}
                      <motion.div
                        className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl border border-[var(--color-hairline)] bg-[var(--color-surface)] group-hover:border-opacity-60 transition-all duration-300"
                        style={{
                          boxShadow: isHovered
                            ? `0 0 12px ${skill.color}30`
                            : undefined,
                        }}
                        animate={
                          isHovered
                            ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                      >
                        <div className="w-6 h-6 flex items-center justify-center">
                          <SkillIcon icon={skill.icon} color={skill.color} />
                        </div>
                      </motion.div>

                      {/* Name + type label */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                          <span className="text-sm font-bold text-[var(--color-ink)] leading-tight">
                            {skill.name}
                          </span>
                          {skill.isLearning && (
                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                              {t(translations.skills.currentlyLearning)}
                            </span>
                          )}
                        </div>
                        {skill.typeLabel && (
                          <span className="text-[10px] font-medium tracking-wide text-[var(--color-body)] bg-[var(--color-surface)] border border-[var(--color-hairline)] px-1.5 py-0.5 rounded-md">
                            {t(skill.typeLabel)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Usage context */}
                    {skill.usageContext && (
                      <div className="relative z-10 mb-4">
                        <p className="text-[11px] text-[var(--color-body)] leading-relaxed line-clamp-2 group-hover:text-[var(--color-body-strong)] transition-colors">
                          {t(skill.usageContext)}
                        </p>
                      </div>
                    )}

                    {/* Proficiency section */}
                    <div className="relative z-10 flex items-center justify-between">
                      {/* Dot indicator */}
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3].map((dot) => (
                          <motion.div
                            key={dot}
                            className={`rounded-full transition-all duration-300 ${
                              dot <= prof.dots
                                ? prof.color
                                : "bg-[var(--color-hairline)]"
                            }`}
                            style={{
                              width: dot <= prof.dots ? 8 : 6,
                              height: dot <= prof.dots ? 8 : 6,
                            }}
                            animate={
                              isHovered && dot <= prof.dots
                                ? {
                                    scale: [1, 1.4, 1],
                                    transition: {
                                      delay: dot * 0.08,
                                      duration: 0.3,
                                    },
                                  }
                                : {}
                            }
                          />
                        ))}
                        <span
                          className={`text-[10px] font-semibold ml-1 ${prof.textColor}`}
                        >
                          {t(prof.label)}
                        </span>
                      </div>

                      {/* Subtle arrow on hover */}
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={
                          isHovered
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -4 }
                        }
                        className="text-[var(--color-primary)] text-xs"
                      >
                        ✦
                      </motion.div>
                    </div>

                    {/* Bottom color accent line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: "0%" }}
                      animate={isHovered ? { width: "100%" } : { width: "0%" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--color-body)]"
            >
              {Object.entries(proficiencyConfig).map(([key, conf]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full ${
                          dot <= conf.dots
                            ? conf.color
                            : "bg-[var(--color-hairline)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span>{t(conf.label)}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  {t(translations.skills.currentlyLearning)}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
