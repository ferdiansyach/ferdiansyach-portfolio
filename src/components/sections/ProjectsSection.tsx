"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

type Filter = "all" | "webdev" | "datascience" | "wordpress";

const filterButtons: { key: Filter; label: { id: string; en: string } }[] = [
  { key: "all", label: translations.projects.filterAll },
  { key: "webdev", label: translations.projects.filterWebDev },
  { key: "datascience", label: translations.projects.filterDataScience },
  { key: "wordpress", label: translations.projects.filterWordPress },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <AnimatedSection id="projects" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.projects.label} title={translations.projects.title} />
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

      {/* Project grid with layout animation */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <TiltCard maxTilt={4} className="h-full">
                  <GlassCard delay={0} className="p-5 sm:p-8 overflow-hidden group cursor-pointer h-full border hover:border-rose-400/50 shadow-sm hover:shadow-rose-400/10">
                    <div className="relative overflow-hidden h-44 sm:h-52 rounded-lg sm:rounded-none mb-4 sm:mb-0">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                        <span className="bg-rose-400/20 backdrop-blur-sm text-white font-semibold text-sm px-4 py-2 rounded-full border border-rose-400/30">
                          {t(translations.projects.viewDetails)}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2 sm:p-6">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{t(project.description)}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-rose-400/10 text-rose-400 border border-rose-400/20 px-3 py-1 rounded-full text-xs font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
