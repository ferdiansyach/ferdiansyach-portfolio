"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import { translations } from "@/data/translations";
import { getProjectBySlug } from "@/data/projects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";

function ProjectDetailContent({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <Link href="/" className="text-sky-400 hover:underline">← Back to Portfolio</Link>
      </main>
    );
  }

  return (
    <>
      <main className="container mx-auto px-6 py-12 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 transition mb-8 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t(translations.projectDetail.backBtn)}
          </Link>

          {/* Title */}
          <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-lg text-slate-400 mb-8">{t(project.description)}</p>
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-5 gap-8 mb-16">
            {/* Description */}
            <div className="md:col-span-3 text-slate-300 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-2 mb-4">
                  {t(translations.projectDetail.descriptionTitle)}
                </h2>
                <p className="leading-relaxed">{t(project.longDescription)}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white pt-4 mb-3">
                  {t(translations.projectDetail.challengesTitle)}
                </h3>
                <p className="leading-relaxed">{t(project.challenges)}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t(translations.projectDetail.techTitle)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-sky-400/10 text-sky-400 border border-sky-400/20 px-3 py-1 rounded-full text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {project.githubUrl && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {t(translations.projectDetail.linksTitle)}
                  </h3>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:underline"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t(translations.projectDetail.viewCode)}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Gallery */}
          <h2 className="text-3xl font-bold text-white border-b border-slate-700/50 pb-2 mb-8">
            {t(translations.projectDetail.galleryTitle)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((img, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                onClick={() => setLightboxImg(img.src)}
              >
                <div className="relative h-48">
                  <Image
                    src={img.src}
                    alt={t(img.caption)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-white text-sm">{t(img.caption)}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center cursor-zoom-out animate-[fadeIn_0.3s]"
          onClick={() => setLightboxImg(null)}
        >
          <Image
            src={lightboxImg}
            alt="Preview"
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <ProjectDetailContent slug={slug} />
        <Footer />
        <ScrollToTop />
      </LanguageProvider>
    </ThemeProvider>
  );
}
