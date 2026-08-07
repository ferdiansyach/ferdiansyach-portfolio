"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ project, isOpen, onClose }: ProjectDialogProps) {
  const { t } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Build complete list of images (ensure thumbnail is included if not in images array)
  const imagesList = project
    ? project.images && project.images.length > 0
      ? project.images.some((img) => img.src === project.thumbnail)
        ? project.images
        : [{ src: project.thumbnail, caption: { id: "Preview Utama", en: "Main Preview" } }, ...project.images]
      : [{ src: project.thumbnail, caption: { id: "Preview Utama", en: "Main Preview" } }]
    : [];

  const [prevSlug, setPrevSlug] = useState<string | undefined>(project?.slug);

  // Reset activeImageIndex when project changes during render
  if (project?.slug !== prevSlug) {
    setPrevSlug(project?.slug);
    setActiveImageIndex(0);
  }

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Keyboard navigation & Esc listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (imagesList.length > 1 && e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
      } else if (imagesList.length > 1 && e.key === "ArrowRight") {
        e.preventDefault();
        setActiveImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, imagesList.length, onClose]);

  if (!project) return null;

  const currentImage = imagesList[activeImageIndex] || imagesList[0] || { src: project.thumbnail, caption: null };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : imagesList.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < imagesList.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Dialog Content Box */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] p-6 sm:p-8 md:p-10 shadow-2xl text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-lg bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors cursor-pointer active:scale-95 z-20"
              aria-label="Close dialog"
            >
              <IoClose className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 px-3 py-1 rounded-md uppercase tracking-wider">
                  {project.category}
                </span>
                {project.period && (
                  <span className="text-xs text-[var(--color-muted)] font-medium">
                    {project.period}
                  </span>
                )}
              </div>
              <h2 id="dialog-title" className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink)]">
                {project.title}
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Image Slideshow / Carousel */}
              <div className="space-y-3">
                {/* Main Image Display */}
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--color-hairline)] bg-[var(--color-canvas)] group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentImage.src}
                        alt={currentImage.caption ? t(currentImage.caption) : project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Counter Badge */}
                  {imagesList.length > 1 && (
                    <div className="absolute top-2 right-2 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono tracking-wider">
                      {activeImageIndex + 1} / {imagesList.length}
                    </div>
                  )}

                  {/* Caption */}
                  {currentImage.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs font-medium z-10">
                      {t(currentImage.caption)}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  {imagesList.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-all backdrop-blur-xs opacity-90 sm:opacity-70 sm:group-hover:opacity-100 cursor-pointer z-20 active:scale-95"
                        aria-label="Previous image"
                      >
                        <FaChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-all backdrop-blur-xs opacity-90 sm:opacity-70 sm:group-hover:opacity-100 cursor-pointer z-20 active:scale-95"
                        aria-label="Next image"
                      >
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails list */}
                {imagesList.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
                    {imagesList.map((img, i) => {
                      const isActive = i === activeImageIndex;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`relative aspect-video overflow-hidden rounded-md border text-left transition-all cursor-pointer ${
                            isActive
                              ? "border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/50 scale-[1.02] opacity-100 z-10"
                              : "border-[var(--color-hairline)] opacity-60 hover:opacity-100 hover:border-slate-400"
                          }`}
                        >
                          <Image
                            src={img.src}
                            alt={img.caption ? t(img.caption) : `${project.title} screenshot ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Descriptions & Details */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-sm text-[var(--color-body)] leading-relaxed">
                  <div>
                    <h4 className="font-bold text-[var(--color-ink)] mb-1">
                      {t({ id: "Tentang Proyek", en: "About Project" })}
                    </h4>
                    <p>{t(project.longDescription)}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[var(--color-ink)] mb-1">
                      {t({ id: "Tantangan & Solusi", en: "Challenges & Solutions" })}
                    </h4>
                    <p>{t(project.challenges)}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[var(--color-ink)] mb-2">
                      {t({ id: "Teknologi", en: "Technologies" })}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 px-2.5 py-1 text-xs font-semibold rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Buttons */}
                <div className="space-y-2 pt-4 border-t border-[var(--color-hairline)]">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubNote ? "https://github.com/ferdiansyach" : project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] font-semibold py-2.5 px-4 rounded-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm cursor-pointer"
                      >
                        <FaGithub className="w-4 h-4" />
                        <span>{t({ id: "Kode GitHub", en: "GitHub Code" })}</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-semibold py-2.5 px-4 rounded-md hover:bg-[var(--color-primary-hover)] transition-all text-sm cursor-pointer"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        <span>{t({ id: "Demo Langsung", en: "Live Demo" })}</span>
                      </a>
                    )}
                  </div>
                  {project.githubUrl && project.githubNote && (
                    <p className="text-[var(--color-muted)] text-xs text-center italic">
                      * {t(project.githubNote)}
                    </p>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <p className="text-[var(--color-muted)] text-xs text-center italic">
                      * {t(translations.projects.privateProjectNote)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
