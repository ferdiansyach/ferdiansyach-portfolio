"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { education } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { AnimatedSection, AnimatedDiv, slideRight } from "@/components/ui/AnimatedSection";

export default function EducationSection() {
  const { t } = useLanguage();

  return (
    <AnimatedSection id="education" className="py-32 container mx-auto px-6">
      <AnimatedDiv>
        <SectionHeader label={translations.education.label} title={translations.education.title} />
      </AnimatedDiv>
      <AnimatedDiv className="max-w-3xl mx-auto" variants={slideRight}>
        <GlassCard delay={0} className="p-10 md:p-14">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* University icon */}
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{education.institution}</h3>
              <p className="text-sky-400 font-semibold mt-1">{t(education.degree)}</p>
              <p className="text-slate-400 text-sm mt-1">{education.period}</p>

              {education.gpa && (
                <div className="mt-4 inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 rounded-lg px-4 py-2">
                  <span className="text-sky-400 font-bold text-lg">{education.gpa}</span>
                  <span className="text-slate-400 text-sm">IPK / GPA</span>
                </div>
              )}

              {education.thesis && (
                <div className="mt-4">
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-semibold">Skripsi: </span>
                    {t(education.thesis)}
                  </p>
                </div>
              )}

              {/* Relevant courses */}
              {education.courses && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    {t(translations.education.relevantCourses)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {education.courses.map((course, i) => (
                      <span
                        key={i}
                        className="bg-slate-700/50 text-slate-300 border border-slate-600/50 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-sky-400/30 hover:text-sky-400 transition-colors duration-300 cursor-default"
                      >
                        {t(course)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </AnimatedDiv>
    </AnimatedSection>
  );
}
