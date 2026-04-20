"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import { translations } from "@/data/translations";
import { getProjectBySlug } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import MagneticButton from "@/components/ui/MagneticButton";
import TiltCard from "@/components/ui/TiltCard";

function ProjectDetailContent({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <Link href="/" className="text-rose-400 hover:underline">← Back to Portfolio</Link>
      </main>
    );
  }

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as Variants;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  } as Variants;

  return (
    <>
      <main className="relative min-h-screen pb-20 overflow-hidden">
        
        {/* === PARALLAX HERO BANNER === */}
        <div className="relative w-full h-[70vh] min-h-[500px] flex items-end pb-16 pt-24 px-6 mt-16 md:mt-20">
          {/* Background Image Parallax */}
          <div 
            className="absolute inset-0 z-0"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover object-top opacity-60 mix-blend-overlay"
              priority
            />
            {/* Dark/Blur Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/40" />
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          </div>

          <div className="container max-w-5xl mx-auto relative z-10">
            <MagneticButton strength={20}>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-rose-400 hover:text-sky-300 hover:border-rose-400/50 shadow-lg backdrop-blur-md transition-all mb-8 group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t(translations.projectDetail.backBtn)}
              </Link>
            </MagneticButton>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map((tech, idx) => (
                  <motion.span 
                    key={tech} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="bg-rose-400/10 text-sky-300 border border-rose-400/30 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-medium leading-relaxed border-l-4 border-rose-400 pl-4 bg-slate-900/20 py-2">
                {t(project.description)}
              </p>
            </motion.div>
          </div>
        </div>

        {/* === CONTENT SECTION === */}
        <div className="container max-w-5xl mx-auto px-6 mt-16">
          <div className="grid md:grid-cols-5 gap-12 mb-20">
            
            {/* Left: Description & Challenges */}
            <motion.div 
              className="md:col-span-3 space-y-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={fadeUp} className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-10 hover:border-rose-400/30 transition-colors">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {t(translations.projectDetail.descriptionTitle)}
                  </h2>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{t(project.longDescription)}</p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 md:p-10 hover:border-indigo-400/30 transition-colors">
                <div className="flex items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-indigo-400">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {t(translations.projectDetail.challengesTitle)}
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{t(project.challenges)}</p>
              </motion.div>
            </motion.div>

            {/* Right: Actions / Meta */}
            <div className="md:col-span-2">
              <div className="sticky top-32 space-y-8">
                {/* Repository / Link Action */}
                {project.githubUrl && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <MagneticButton strength={15} className="w-full">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full p-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-3xl font-bold text-white shadow-xl shadow-fuchsia-500/20 hover:shadow-fuchsia-500/40 hover:-translate-y-1 transition-all group"
                      >
                        <span className="flex items-center gap-3 text-lg">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          {t(translations.projectDetail.viewCode)}
                        </span>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                        </div>
                      </a>
                    </MagneticButton>
                  </motion.div>
                )}
                
                {/* Visual Category Badge */}
                <motion.div 
                  className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 rounded-full bg-slate-700/50 border-2 border-slate-600 flex items-center justify-center text-rose-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest leading-none mb-1">Kategori</p>
                    <p className="text-lg font-bold text-white capitalize">{project.category}</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

          {/* === INTERACTIVE GALLERY === */}
          <motion.div 
            className="mb-8 p-10 bg-slate-900/50 rounded-[3rem] border border-slate-800"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-white inline-block relative">
                {t(translations.projectDetail.galleryTitle)}
                <span className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-rose-400 to-fuchsia-500 rounded-full" />
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.images.map((img, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <TiltCard maxTilt={5} glareEnabled={true}>
                    <div
                      className="group cursor-zoom-in relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800 shadow-lg hover:border-rose-400/50 transition-colors bg-white"
                      onClick={() => setLightboxImg(img.src)}
                    >
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={img.src}
                          alt={t(img.caption)}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
                        <h4 className="font-bold text-white text-base drop-shadow-md">{t(img.caption)}</h4>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* === FRAMER MOTION LIGHTBOX === */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[100] flex items-center justify-center cursor-zoom-out p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Image
                src={lightboxImg}
                alt="Preview"
                fill
                className="object-contain"
              />
              <button 
                className="absolute top-4 right-4 w-12 h-12 bg-slate-900/60 backdrop-blur-md text-white border border-slate-700 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImg(null);
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
