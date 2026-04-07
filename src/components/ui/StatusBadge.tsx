"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";

export default function StatusBadge() {
  const { t } = useLanguage();

  return (
    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <span className="text-emerald-400 text-sm font-semibold tracking-wide">
        {t(translations.hero.availableBadge)}
      </span>
    </div>
  );
}
