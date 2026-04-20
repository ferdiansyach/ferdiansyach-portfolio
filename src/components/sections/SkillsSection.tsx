"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { skillCategories } from "@/data/skills";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import SkillIcon from "@/components/ui/SkillIcon";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const proficiencyWidth = {
  beginner: "33%",
  intermediate: "66%",
  advanced: "100%",
};

const proficiencyColor = {
  beginner: "from-amber-400 to-orange-500",
  intermediate: "from-rose-400 to-fuchsia-500",
  advanced: "from-emerald-400 to-rose-500",
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <AnimatedSection id="skills" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.skills.label} title={translations.skills.title} />
      </AnimatedDiv>

      {/* Category tabs */}
      <AnimatedDiv className="flex flex-wrap justify-center gap-3 mb-12">
        {skillCategories.map((category, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveTab(i)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border ${
              activeTab === i
                ? "bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white border-transparent shadow-lg shadow-rose-500/20"
                : "border-slate-600 text-slate-400 hover:border-rose-400 hover:text-rose-400"
            }`}
          >
            {t(category.title)}
          </motion.button>
        ))}
      </AnimatedDiv>

      {/* Skills grid with AnimatePresence for tab switching */}
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard delay={0} className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                {t(skillCategories[activeTab].title)}
              </h3>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {skillCategories[activeTab].skills.map((skill, j) => (
                  <SkillRow key={skill.name} skill={skill} index={j} />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

function SkillRow({ skill, index }: { skill: typeof skillCategories[0]["skills"][0]; index: number }) {
  const { t } = useLanguage();
  const profLabel = translations.skills.proficiency[skill.proficiency];

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-1.5">
        <div className="w-8 h-8 shrink-0 flex items-center justify-center">
          <SkillIcon icon={skill.icon} color={skill.color} />
        </div>
        <span className="text-sm font-medium text-white flex-1">{skill.name}</span>
        <div className="flex items-center gap-2">
          {skill.isLearning && (
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {t(translations.skills.currentlyLearning)}
            </span>
          )}
          <span className="text-xs text-slate-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            {t(profLabel)}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${proficiencyColor[skill.proficiency]} rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: proficiencyWidth[skill.proficiency] }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
