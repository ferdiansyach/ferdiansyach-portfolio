"use client";

import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";
import { GalleryGridBlock } from "@/components/ui/gallery-grid-block-shadcnui";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="projects" className="py-20">
      <GalleryGridBlock />

      {/* Portfolio PDF CTA — only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <AnimatedDiv className="mt-8 flex justify-center container mx-auto px-6">
          <a
            href="/projects-pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[var(--color-primary)] text-white font-semibold py-3 px-8 rounded-md hover:bg-[var(--color-primary-hover)] transition-all duration-300 hover:-translate-y-0.5 group shadow-md text-sm"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t(translations.projects.viewPortfolioPdf)}
          </a>
        </AnimatedDiv>
      )}
    </AnimatedSection>
  );
}
