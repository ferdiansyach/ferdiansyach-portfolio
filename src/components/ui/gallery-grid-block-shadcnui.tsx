"use client";

import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid, X, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { projects } from "@/data/projects";
import ProjectDialog from "@/components/ui/ProjectDialog";
import { Project } from "@/types";

export function GalleryGridBlock() {
  const { t } = useLanguage();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [selectedDialogProject, setSelectedDialogProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ["All", "webdev", "datascience", "wordpress"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  const handleNext = () => {
    if (selectedSlug !== null) {
      const currentIndex = filteredProjects.findIndex((p) => p.slug === selectedSlug);
      const nextIndex = (currentIndex + 1) % filteredProjects.length;
      setSelectedSlug(filteredProjects[nextIndex].slug);
    }
  };

  const handlePrev = () => {
    if (selectedSlug !== null) {
      const currentIndex = filteredProjects.findIndex((p) => p.slug === selectedSlug);
      const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setSelectedSlug(filteredProjects[prevIndex].slug);
    }
  };

  const selectedProjectData = projects.find((p) => p.slug === selectedSlug);

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    slug: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const proj = projects.find((p) => p.slug === slug);
      if (proj) {
        setSelectedDialogProject(proj);
        setIsDialogOpen(true);
      }
    }
  };

  const categoryLabels: Record<string, string> = {
    All: t(translations.projects.filterAll),
    webdev: t(translations.projects.filterWebDev),
    datascience: t(translations.projects.filterDataScience),
    wordpress: t(translations.projects.filterWordPress),
  };

  return (
    <>
      <section
        className="w-full bg-[var(--color-canvas)] px-4 py-16"
        aria-labelledby="gallery-heading"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
            role="region"
            aria-labelledby="gallery-heading"
          >
            <Badge className="mb-4" variant="secondary">
              <Grid className="mr-1 h-3 w-3" />
              {t(translations.projects.label)}
            </Badge>
            <h2
              id="gallery-heading"
              className="mb-4 text-3xl md:text-5xl font-serif font-bold tracking-tight text-[var(--color-ink)]"
            >
              {t(translations.projects.title)}
            </h2>
            <p className="mx-auto max-w-2xl text-[var(--color-body)] text-sm md:text-base">
              {t({
                id: "Jelajahi koleksi proyek unggulan fullstack, analitik data, dan aplikasi AI saya.",
                en: "Explore my collection of featured fullstack projects, data analytics, and AI applications.",
              })}
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto no-scrollbar pb-2"
            role="group"
            aria-label="Gallery categories"
          >
            {categories.map((category) => {
              const isActive = filter === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ y: -1 }}
                  aria-pressed={isActive}
                  className={`relative shrink-0 font-medium cursor-pointer min-h-[44px] px-5 py-2.5 rounded-xl text-sm transition-colors duration-300 border touch-manipulation flex items-center justify-center ${
                    isActive
                      ? "text-white border-transparent shadow-lg shadow-[var(--color-primary)]/30 font-semibold"
                      : "border-[var(--color-hairline)] text-[var(--color-body)] hover:border-[var(--color-primary)]/60 hover:text-[var(--color-ink)] bg-[var(--color-surface)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilterPill"
                      className="absolute inset-0 rounded-xl bg-[var(--color-primary)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{categoryLabels[category] || category}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Gallery Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 text-center max-w-md mx-auto rounded-2xl bg-[var(--color-canvas-elevated)] border border-[var(--color-hairline)] space-y-4"
            >
              <div className="text-4xl">🔍</div>
              <p className="text-[var(--color-ink)] font-semibold text-base">
                {t(translations.projects.noProjectsFound)}
              </p>
              <button
                type="button"
                onClick={() => setFilter("All")}
                className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-xs font-semibold hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer"
              >
                {t(translations.projects.resetFilter)}
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
              role="list"
              aria-label="Gallery items"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  role="listitem"
                >
                  <Card
                    className="group relative cursor-pointer overflow-hidden border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] transition-all hover:border-[var(--color-primary)] hover:shadow-xl rounded-xl"
                    onClick={() => {
                      setSelectedDialogProject(project);
                      setIsDialogOpen(true);
                    }}
                    onKeyDown={(event) => handleCardKeyDown(event, project.slug)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${project.title}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs p-4 text-center"
                        aria-hidden="true"
                      >
                        <ZoomIn className="mb-2 h-8 w-8 text-[var(--color-primary)]" />
                        <h3 className="mb-2 text-center text-lg font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap justify-center gap-1.5 mb-2">
                          <Badge variant="secondary" className="capitalize">
                            {project.category}
                          </Badge>
                          {project.period && (
                            <Badge variant="outline" className="text-white border-white/30">
                              {project.period}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 px-2">
                          {t(project.description)}
                        </p>
                      </motion.div>
                    </div>

                    {/* Card Footer Info */}
                    <div className="p-4 border-t border-[var(--color-hairline)]">
                      <h4 className="font-bold text-[var(--color-ink)] text-base group-hover:text-[var(--color-primary)] transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-[var(--color-body)] line-clamp-2 mt-1">
                        {t(project.description)}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}

          {/* Lightbox */}
          <AnimatePresence>
            {selectedSlug !== null && selectedProjectData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                onClick={() => setSelectedSlug(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="gallery-dialog-title"
                aria-describedby="gallery-dialog-description"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] p-6 shadow-2xl text-left"
                >
                  {/* Close Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-4 text-[var(--color-body)] hover:text-white hover:bg-white/10 z-10"
                    onClick={() => setSelectedSlug(null)}
                    aria-label="Close gallery dialog"
                  >
                    <X className="h-6 w-6" />
                  </Button>

                  {/* Navigation Buttons */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 z-10 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="View previous image"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 z-10 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="View next image"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>

                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      key={selectedSlug}
                      src={selectedProjectData.thumbnail}
                      alt={selectedProjectData.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Image Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 text-center"
                    id="gallery-dialog-description"
                  >
                    <h3
                      className="mb-2 text-xl font-serif font-bold text-[var(--color-ink)]"
                      id="gallery-dialog-title"
                    >
                      {selectedProjectData.title}
                    </h3>
                    <Badge variant="secondary">
                      {selectedProjectData.category}
                    </Badge>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDialog
        project={selectedDialogProject}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
