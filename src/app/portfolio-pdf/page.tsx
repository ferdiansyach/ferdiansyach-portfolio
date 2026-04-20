"use client";

import { useEffect, useState } from "react";
import { experiences, education } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";

export default function PortfolioPDF() {
  const [lang, setLang] = useState<"id" | "en">("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as "id" | "en";
    if (savedLang) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(savedLang);
    }
  }, []);

  const t = (textObj: { id: string; en: string } | string) => {
    if (typeof textObj === "string") return textObj;
    return textObj[lang];
  };

  // Show all experiences, top 3 projects, all certifications
  const topProjects = projects.slice(0, 3);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .cv-page * {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }

        .cv-section-title {
          font-size: 11px;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1.5px solid #334155;
          padding-bottom: 2px;
          margin-bottom: 6px;
        }

        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          .no-print {
            display: none !important;
          }

          .cv-page {
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .cv-inner {
            padding: 12mm 15mm !important;
          }

          a {
            color: #1d4ed8 !important;
            text-decoration: none !important;
          }

          .cv-page {
            page-break-after: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }

        @media screen {
          .cv-page {
            width: 210mm;
            min-height: 297mm;
            box-shadow:
              0 1px 3px rgba(0,0,0,0.04),
              0 8px 32px -4px rgba(0,0,0,0.12);
            margin: 24px auto 64px;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
          }
        }
      `}</style>

      <div className="bg-gray-100 min-h-screen">
        {/* ===== TOOLBAR ===== */}
        <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                CV
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-800">Resume Preview — 1 Page</h1>
                <p className="text-xs text-gray-500">Optimized for corporate (PT) applications</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "id" | "en")}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm shadow-sm flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition text-sm border border-gray-200"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* ===== A4 CV CONTENT ===== */}
        <div className="cv-page bg-white text-black antialiased">
          <div className="cv-inner" style={{ padding: '12mm 15mm' }}>

            {/* ===== HEADER ===== */}
            <header style={{ marginBottom: '10px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', margin: 0 }}>
                Ferdiansyach
              </h1>
              <div style={{ fontSize: '12px', color: '#1d4ed8', fontWeight: 600, marginTop: '3px' }}>
                Fullstack Developer & Data Analyst
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px 8px', fontSize: '9px', color: '#475569', marginTop: '6px', lineHeight: 1.4 }}>
                <span>Jakarta, Indonesia</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <a href="mailto:iyanferdiansyach30@gmail.com" style={{ color: '#1d4ed8' }}>iyanferdiansyach30@gmail.com</a>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>+62 888 6007 599</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://linkedin.com/in/ferdiansyach-845930246" style={{ color: '#1d4ed8' }}>linkedin.com/in/ferdiansyach</a>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://github.com/ferdiansyach" style={{ color: '#1d4ed8' }}>github.com/ferdiansyach</a>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://ferdiansyach-portfolio.vercel.app" style={{ color: '#1d4ed8' }}>ferdiansyach-portfolio.vercel.app</a>
              </div>
              <div style={{ borderBottom: '2px solid #1e293b', marginTop: '8px' }} />
            </header>

            {/* ===== PROFILE SUMMARY ===== */}
            <section style={{ marginBottom: '10px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROFIL" : "PROFILE SUMMARY"}
              </h2>
              <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: 1.55, textAlign: 'justify', margin: 0 }}>
                {lang === "id"
                  ? "Lulusan S1 Sistem Informasi (IPK 3.77) dengan pengalaman magang di Telkom Indonesia. Terampil membangun aplikasi web full-stack (React, Node.js, Next.js) dan model Machine Learning prediktif (Python, LSTM, XGBoost). Bersertifikasi BNSP Junior Web Developer dan IT Specialist Python. Memiliki pengalaman kepemimpinan organisasi dan kolaborasi tim lintas fungsi. Siap berkontribusi langsung pada pengembangan solusi teknologi di lingkungan profesional."
                  : "Information Systems graduate (GPA 3.77) with internship experience at Telkom Indonesia. Skilled in building full-stack web applications (React, Node.js, Next.js) and predictive Machine Learning models (Python, LSTM, XGBoost). BNSP-certified Junior Web Developer and Certiport IT Specialist in Python. Experienced in organizational leadership and cross-functional team collaboration. Ready to contribute directly to technology solutions in a professional environment."
                }
              </p>
            </section>

            {/* ===== EXPERIENCE — All 5 ===== */}
            <section style={{ marginBottom: '10px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENGALAMAN" : "EXPERIENCE"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{t(exp.role)}</h3>
                      <span style={{ fontSize: '8.5px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '9px', color: '#1d4ed8', fontWeight: 600 }}>{exp.company}</div>
                    <ul style={{ margin: '2px 0 0 14px', padding: 0, listStyleType: 'disc' }}>
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} style={{ fontSize: '9px', color: '#374151', lineHeight: 1.45, paddingLeft: '2px' }}>
                          {t(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== EDUCATION ===== */}
            <section style={{ marginBottom: '10px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENDIDIKAN" : "EDUCATION"}
              </h2>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{education.institution}</h3>
                  <span style={{ fontSize: '8.5px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{education.period}</span>
                </div>
                <div style={{ fontSize: '9.5px', color: '#1e293b', fontWeight: 600 }}>{t(education.degree)}</div>
                {education.gpa && (
                  <div style={{ fontSize: '9px', color: '#475569' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>IPK/GPA:</span> {education.gpa}
                  </div>
                )}
                {education.courses && (
                  <div style={{ fontSize: '9px', color: '#374151', marginTop: '2px' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "Mata Kuliah Relevan: " : "Relevant Coursework: "}</span>
                    {education.courses.map(c => t(c)).join(", ")}
                  </div>
                )}
              </div>
            </section>

            {/* ===== TECHNICAL SKILLS ===== */}
            <section style={{ marginBottom: '10px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "KEAHLIAN TEKNIS" : "TECHNICAL SKILLS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {skillCategories.map((cat, i) => (
                  <div key={i} style={{ fontSize: '9.5px', lineHeight: 1.6 }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{t(cat.title)}:</span>{" "}
                    <span style={{ color: '#374151' }}>
                      {cat.skills.map(s => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SELECTED PROJECTS — 3 projects ===== */}
            <section style={{ marginBottom: '10px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROYEK PILIHAN" : "SELECTED PROJECTS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {topProjects.map((proj) => (
                  <div key={proj.slug}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {typeof proj.title === 'string' ? proj.title : t(proj.title)}
                      </h3>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} style={{ fontSize: '8px', color: '#1d4ed8', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                          GitHub ↗
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: '9px', color: '#374151', lineHeight: 1.45, margin: '1px 0 0 0' }}>
                      {t(proj.description)}
                    </p>
                    <p style={{ fontSize: '8px', color: '#64748b', fontWeight: 500, fontFamily: "'SF Mono', 'Fira Code', monospace", marginTop: '2px' }}>
                      {proj.technologies.slice(0, 6).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== CERTIFICATIONS — All 6 ===== */}
            <section>
              <h2 className="cv-section-title">
                {lang === "id" ? "SERTIFIKASI" : "CERTIFICATIONS"}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 24px' }}>
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '9px', color: '#374151', lineHeight: 1.55 }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{t(cert.name)}</span>
                    {" — "}{cert.issuer} ({cert.date})
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
