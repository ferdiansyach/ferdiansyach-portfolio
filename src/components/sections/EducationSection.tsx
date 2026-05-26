"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { education } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

export default function EducationSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="education" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.education.label} title={translations.education.title} />
      </AnimatedDiv>
      
      <AnimatedDiv className="max-w-4xl mx-auto mt-12">
        <TiltCard maxTilt={3} glareEnabled={true}>
          <div className="relative group overflow-hidden rounded-xl bg-[var(--color-canvas-elevated)] border border-[var(--color-hairline)] dark:from-slate-800/80 dark:to-slate-900/90 shadow-md transition-colors duration-300">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-[var(--color-primary)]/10 blur-[100px] rounded-full z-0 group-hover:bg-[var(--color-primary)]/20 transition-colors duration-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-[var(--color-primary)]/5 blur-[100px] rounded-full z-0 group-hover:bg-[var(--color-primary)]/10 transition-colors duration-700 pointer-events-none" />
            
            <div className="relative z-10 p-5 sm:p-8 md:p-14">
              
              {/* Header / Spotlight Area */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-10 border-b border-[var(--color-hairline)] transition-colors duration-300">
                <div className="flex items-center gap-6">
                  {/* Glowing Cap Icon */}
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl bg-linear-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shrink-0">
                    <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-serif font-black text-[var(--color-ink)] mb-2 tracking-tight transition-colors duration-300">
                      {education.institution}
                    </h3>
                    <p className="text-sm sm:text-xl text-[var(--color-primary)] font-semibold">{t(education.degree)}</p>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="px-5 py-2.5 rounded-md bg-[var(--color-canvas)] border border-[var(--color-hairline)] shadow-sm shrink-0 whitespace-nowrap transition-colors duration-300">
                  <span className="text-sm font-semibold text-[var(--color-body)]">
                    {education.period}
                  </span>
                </div>
              </div>

              {/* Dashboard Content Grid */}
              <div className="grid md:grid-cols-12 gap-8">
                
                {/* Highlights Panel */}
                <div className="md:col-span-5 space-y-4">
                  {education.gpa && (
                    <div className="bg-[var(--color-canvas)] hover:bg-[var(--color-canvas)]/80 transition-colors duration-300 rounded-xl p-5 border border-[var(--color-hairline)] flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--color-body)] font-semibold mb-0.5">IPK / GPA</p>
                        <p className="text-2xl font-black text-[var(--color-ink)]">{education.gpa}</p>
                      </div>
                    </div>
                  )}

                  {education.thesis && (
                    <div className="bg-[var(--color-canvas)] hover:bg-[var(--color-canvas)]/80 transition-colors duration-300 rounded-xl p-5 border border-[var(--color-hairline)]">
                      <p className="text-xs text-[var(--color-body)] font-semibold mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Skripsi / Thesis
                      </p>
                      <p className="text-sm text-[var(--color-body)] font-medium leading-relaxed italic">
                        &quot;{t(education.thesis)}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Courses Panel */}
                <div className="md:col-span-7 bg-[var(--color-canvas)] rounded-xl p-6 border border-[var(--color-hairline)] transition-colors duration-300">
                  <h4 className="text-sm font-serif font-bold text-[var(--color-ink)] mb-5 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {t(translations.education.relevantCourses)}
                  </h4>
                  {education.courses && (
                    <div className="flex flex-wrap gap-2.5">
                      {education.courses.map((course, i) => (
                        <div
                          key={i}
                          className="group/course relative px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-md hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/20 transition-all duration-300 cursor-default overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-primary)]/0 -translate-x-full group-hover/course:animate-[shine_1s_ease-in-out_inherit]" />
                          <span className="relative z-10 text-xs font-medium text-[var(--color-primary)] transition-colors">
                            {t(course)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </TiltCard>
      </AnimatedDiv>
    </AnimatedSection>
  );
}

