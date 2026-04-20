"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";

interface SectionHeaderProps {
  label: { id: string; en: string };
  title: { id: string; en: string };
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useLanguage();

  return (
    <div
      ref={ref}
      className={`text-center mb-10 sm:mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <p className="text-rose-400 font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase mb-2 sm:mb-3">
        {t(label)}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-white light:text-slate-900">
        {t(title)}
      </h2>
      <div className="mt-4 sm:mt-6 mx-auto w-16 sm:w-20 h-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-500 rounded-full" />
    </div>
  );
}
