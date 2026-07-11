"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ project, isOpen, onClose }: ProjectDialogProps) {
  const { t } = useLanguage();

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

  if (!project) return null;

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-xl border border-[var(--color-hairline)] bg-[var(--color-canvas-elevated)] p-6 sm:p-8 md:p-10 shadow-2xl text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-body)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
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
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-ink)]">
                {project.title}
              </h2>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Image Slideshow / Carousel */}
              <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--color-hairline)] bg-[var(--color-canvas)]">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2">
                    {project.images.slice(0, 4).map((img, i) => (
                      <div key={i} className="relative aspect-video overflow-hidden rounded-md border border-[var(--color-hairline)] bg-[var(--color-canvas)]">
                        <Image
                          src={img.src}
                          alt={t(img.caption)}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </div>
                    ))}
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
                <div className="flex gap-4 pt-4 border-t border-[var(--color-hairline)]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 border border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-ink)] font-semibold py-2.5 px-4 rounded-md hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm cursor-pointer"
                    >
                      <FaGithub className="w-4 h-4" />
                      GitHub Code
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
                      Live Demo
                    </a>
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
