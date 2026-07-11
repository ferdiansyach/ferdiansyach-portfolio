"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { projects } from "@/data/projects";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProjectDialog from "@/components/ui/ProjectDialog";
import { Project } from "@/types";

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            className={`px-5 py-2 text-sm font-medium transition-all duration-300 border cursor-pointer rounded-md ${
              filter === btn.key
                ? "bg-[var(--color-primary)] text-white border-transparent shadow-md"
                : "border-[var(--color-hairline)] text-[var(--color-body)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            }`}
          >
            {t(btn.label)}
          </button>
        ))}
      </AnimatedDiv>

      {/* Project grid with layout animation - Ferrari precision grid */}
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
              <div 
                onClick={() => {
                  setSelectedProject(project);
                  setIsDialogOpen(true);
                }}
                className="cursor-pointer h-full"
              >
                <TiltCard maxTilt={4} className="h-full">
                  <SpotlightCard className="p-0 overflow-hidden group h-full border border-[var(--color-hairline)] hover:border-[var(--color-primary)]/50 shadow-sm hover:shadow-[var(--color-primary)]/10 rounded-xl bg-[var(--color-canvas-elevated)]">
                    <div className="relative overflow-hidden h-44 sm:h-52 mb-4 sm:mb-0 rounded-t-lg">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[var(--color-canvas)]/95 via-[var(--color-canvas)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                        <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-semibold text-sm px-4 py-2 border border-[var(--color-primary)]/30 rounded-md">
                          {t(translations.projects.viewDetails)}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-8 pt-2 sm:pt-6">
                      <h3 className="text-lg font-serif font-bold text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">{project.title}</h3>
                      <p className="text-[var(--color-body)] text-sm mb-4 line-clamp-2">{t(project.description)}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-3 py-1 text-xs font-medium rounded-md">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Portfolio PDF CTA — only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <AnimatedDiv className="mt-14 flex justify-center">
          <a
            href="/projects-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[var(--color-primary)] text-white font-semibold py-3 px-8 rounded-md hover:bg-[var(--color-primary-hover)] transition-all duration-300 hover:-translate-y-0.5 group shadow-md"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t(translations.projects.viewPortfolioPdf)}
          </a>
        </AnimatedDiv>
      )}

      {/* Project Details Modal */}
      <ProjectDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </AnimatedSection>
  );
}
