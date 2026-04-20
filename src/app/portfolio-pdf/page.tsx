"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { experiences, education } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";

export default function PortfolioPDF() {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    // Sync language from localStorage if available
    const savedLang = localStorage.getItem("lang") as "id" | "en";
    if (savedLang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(savedLang);
    }

    // Provide a small delay before triggering print so fonts load
    // Commented out automatic print so user can preview before printing
    // setTimeout(() => window.print(), 1000);
  }, []);

  const t = (textObj: { id: string; en: string } | string) => {
    if (typeof textObj === "string") return textObj;
    return textObj[lang];
  };

  return (
    <div className="bg-white min-h-screen text-black print:bg-white print:text-black antialiased font-sans">
      <Head>
        <title>Ferdiansyach - Professional Portfolio</title>
      </Head>

      <div className="max-w-4xl mx-auto p-8 md:p-12 print:p-0 print:max-w-none">

        {/* Controls (Hidden on Print) */}
        <div className="no-print flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Print Preview</h1>
            <p className="text-sm text-gray-500">Press Ctrl+P or the button to save as A4 PDF.</p>
          </div>
          <div className="flex gap-4">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as "id" | "en")}
              className="border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Download PDF
            </button>
            <button
              onClick={() => window.close()}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded font-semibold hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>

        {/* --- PDF CONTENT START --- */}
        <div className="print-content">
          {/* Header */}
          <header className="border-b-2 border-gray-800 pb-4 mb-6">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Ferdiansyach</h1>
            <div className="text-lg text-blue-700 font-semibold mb-3">
              Fullstack Developer & Data Analyst
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 font-medium">
              <span>Jakarta, Indonesia</span>
              <span className="text-gray-400">&bull;</span>
              <a href="mailto:iyanferdiansyach30@gmail.com" className="text-blue-700 hover:underline">iyanferdiansyach30@gmail.com</a>
              <span className="text-gray-400">&bull;</span>
              <span>+62 888 6007 599</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 font-medium mt-1">
              <a href="https://www.linkedin.com/in/ferdiansyach-845930246" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">linkedin.com/in/ferdiansyach-845930246</a>
              <span className="text-gray-400">&bull;</span>
              <a href="https://github.com/ferdiansyach" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">github.com/ferdiansyach</a>
              <span className="text-gray-400">&bull;</span>
              <a href="https://ferdiansyach-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">ferdiansyach-portfolio.vercel.app</a>
            </div>
          </header>

          {/* Profile Summary */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Profil" : "Profile Summary"}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {lang === "id"
                ? "Fullstack Developer dan Data Analyst dengan dedikasi tinggi. Memiliki fondasi kuat dalam membangun aplikasi web yang responsif serta merancang model Machine Learning (AI) yang prediktif. Terbiasa bekerja dalam tim, terstruktur dalam manajemen proyek, dan antusias untuk berkontribusi secara langsung pada solusi teknologi masa depan."
                : "A highly dedicated Fullstack Developer and Data Analyst. Possesses a strong foundation in building responsive web applications and designing predictive Machine Learning (AI) models. Accustomed to working in teams, structured in project management, and enthusiastic to contribute directly to future technological solutions."
              }
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Pengalaman" : "Experience"}
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{t(exp.role)}</h3>
                    <span className="text-sm font-semibold text-gray-600 whitespace-nowrap ml-4">{exp.period}</span>
                  </div>
                  <div className="text-sm text-blue-700 font-medium mb-1">{exp.company}</div>
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-gray-700 leading-snug pl-1">
                        {t(bullet)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Pendidikan" : "Education"}
            </h2>
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-bold text-gray-900">{education.institution}</h3>
                <span className="text-sm font-semibold text-gray-600 whitespace-nowrap ml-4">{education.period}</span>
              </div>
              <div className="text-sm text-gray-800 font-medium mb-1">{t(education.degree)}</div>
              {education.gpa && (
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">GPA (IPK):</span> {education.gpa}
                </div>
              )}
              {education.courses && (
                <div className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold text-gray-800">{lang === "id" ? "Mata Kuliah Relevan: " : "Relevant Coursework: "}</span>
                  {education.courses.map(c => t(c)).join(", ")}
                </div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Keahlian" : "Skills"}
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {skillCategories.map((cat, i) => (
                <div key={i} className="text-sm">
                  <span className="font-bold text-gray-900 block mb-1">{t(cat.title)}</span>
                  <span className="text-gray-700">
                    {cat.skills.map(s => s.name).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Proyek Pilihan" : "Selected Projects"}
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 3).map((proj) => (
                <div key={proj.slug}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-gray-900">{t(proj.title)}</h3>
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mb-1">{t(proj.description)}</p>
                  <p className="text-xs text-gray-500 font-medium font-mono">
                    [{proj.technologies.slice(0, 5).join(" • ")}]
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Overview */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1 uppercase tracking-wide">
              {lang === "id" ? "Sertifikasi Profesional" : "Professional Certifications"}
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1">
              {certifications.slice(0, 4).map((cert) => (
                <li key={cert.id} className="text-sm text-gray-700 pl-1">
                  <span className="font-semibold text-gray-900">{t(cert.name)}</span> — {cert.issuer} ({cert.date})
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
