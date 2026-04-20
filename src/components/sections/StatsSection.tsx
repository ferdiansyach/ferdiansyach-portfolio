"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { AnimatedSection, AnimatedDiv, AnimatedCounter } from "@/components/ui/AnimatedSection";

interface StatItemProps {
  value: number;
  suffix: string;
  label: { id: string; en: string };
  icon: React.ReactNode;
}

function StatItem({ value, suffix, label, icon }: StatItemProps) {
  const { t } = useLanguage();

  return (
    <AnimatedDiv className="flex flex-col items-center text-center p-6 group">
      <div className="w-14 h-14 mb-4 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-400/10 transition-all duration-300">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-fuchsia-500 mb-2">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <p className="text-slate-400 text-sm font-medium">{t(label)}</p>
    </AnimatedDiv>
  );
}

const stats = [
  {
    value: 5,
    suffix: "+",
    label: translations.stats.projects,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    value: 1,
    suffix: "+",
    label: translations.stats.experience,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: 12,
    suffix: "+",
    label: translations.stats.technologies,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    value: 6,
    suffix: "",
    label: translations.stats.certifications,
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <AnimatedSection className="py-20 container mx-auto px-6">
      <div className="max-w-5xl mx-auto glass-card p-4 md:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
