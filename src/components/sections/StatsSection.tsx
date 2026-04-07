"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { AnimatedSection, AnimatedDiv, AnimatedCounter } from "@/components/ui/AnimatedSection";

interface StatItemProps {
  value: number;
  suffix: string;
  label: { id: string; en: string };
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const { t } = useLanguage();

  return (
    <AnimatedDiv className="text-center p-6">
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-slate-400 text-sm font-medium">{t(label)}</p>
    </AnimatedDiv>
  );
}

const stats = [
  { value: 5, suffix: "+", label: translations.stats.projects },
  { value: 1, suffix: "+", label: translations.stats.experience },
  { value: 12, suffix: "+", label: translations.stats.technologies },
  { value: 6, suffix: "", label: translations.stats.certifications },
];

export default function StatsSection() {
  return (
    <AnimatedSection className="py-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto glass-card p-4 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
