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
          font-size: 10.5px;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1.5px solid #334155;
          padding-bottom: 2px;
          margin-bottom: 5px;
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
            transform: none !important;
          }

          .cv-inner {
            padding: 10mm 15mm !important;
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

          .cert-grid {
            grid-template-columns: 1fr 1fr !important;
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

        /* ===== RESPONSIVE: Scale A4 on smaller screens ===== */
        @media screen and (max-width: 860px) {
          .cv-page {
            width: 100% !important;
            min-height: auto !important;
            margin: 0 auto 32px !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important;
          }

          .cv-inner {
            padding: 24px 20px !important;
          }
        }

        @media screen and (max-width: 480px) {
          .cv-inner {
            padding: 20px 16px !important;
          }

          .cv-section-title {
            font-size: 10.5px;
          }
        }

        /* ===== RESPONSIVE: Contact info wrapping ===== */
        .contact-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px 8px;
          font-size: 9px;
          color: #475569;
          margin-top: 6px;
          line-height: 1.4;
        }

        @media screen and (max-width: 560px) {
          .contact-row {
            gap: 3px 6px;
            font-size: 8.5px;
          }

          .contact-separator {
            display: none;
          }

          .contact-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
        }

        /* ===== RESPONSIVE: Certifications grid ===== */
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px 24px;
        }

        @media screen and (max-width: 560px) {
          .cert-grid {
            grid-template-columns: 1fr;
            gap: 3px;
          }
        }

        /* ===== RESPONSIVE: Experience row ===== */
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        @media screen and (max-width: 480px) {
          .exp-header {
            flex-direction: column;
            gap: 1px;
          }
        }

        /* ===== RESPONSIVE: Toolbar ===== */
        .toolbar-inner {
          max-width: 56rem;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        @media screen and (max-width: 560px) {
          .toolbar-inner {
            padding: 10px 16px;
            gap: 10px;
          }

          .toolbar-actions {
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 6px;
          }

          .toolbar-actions select,
          .toolbar-actions button {
            flex: 1;
            min-width: 0;
            justify-content: center;
            text-align: center;
          }

          .toolbar-title-main {
            font-size: 13px !important;
          }

          .toolbar-title-sub {
            font-size: 11px !important;
          }
        }

        @media screen and (max-width: 380px) {
          .toolbar-actions {
            flex-wrap: wrap;
          }

          .toolbar-actions select {
            flex: 1 1 100%;
          }

          .toolbar-actions button {
            flex: 1 1 45%;
          }
        }
      `}</style>

      <div className="bg-gray-100 min-h-screen">
        {/* ===== TOOLBAR ===== */}
        <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="toolbar-inner">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                CV
              </div>
              <div>
                <h1 className="toolbar-title-main" style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                  {lang === "id" ? "Pratinjau Resume — 1 Halaman" : "Resume Preview — 1 Page"}
                </h1>
                <p className="toolbar-title-sub" style={{ fontSize: '12px', color: '#64748b' }}>
                  {lang === "id" ? "Dioptimalkan untuk lamaran kerja korporat" : "Optimized for corporate job applications"}
                </p>
              </div>
            </div>
            <div className="toolbar-actions flex gap-2 items-center">
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
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium hover:bg-gray-200 transition text-sm border border-gray-200"
              >
                ← {lang === "id" ? "Kembali" : "Back"}
              </button>
            </div>
          </div>
        </div>

        {/* ===== A4 CV CONTENT ===== */}
        <div className="cv-page bg-white text-black antialiased">
          <div className="cv-inner" style={{ padding: '10mm 15mm' }}>

            {/* ===== HEADER ===== */}
            <header style={{ marginBottom: '6px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', margin: 0 }}>
                Ferdiansyach
              </h1>
              <div style={{ fontSize: '10px', color: '#1d4ed8', fontWeight: 600, marginTop: '3px', lineHeight: 1.3 }}>
                Full-Stack Developer (React/Next.js, Node.js) | ML for Energy Forecasting
              </div>
              <div className="contact-row">
                <span>Depok, Indonesia</span>
                <span className="contact-separator" style={{ color: '#cbd5e1' }}>|</span>
                <a href="mailto:iyanferdiansyach30@gmail.com" style={{ color: '#1d4ed8' }}>iyanferdiansyach30@gmail.com</a>
                <span className="contact-separator" style={{ color: '#cbd5e1' }}>|</span>
                <span>+62 888 6007 599</span>
                <span className="contact-separator" style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://linkedin.com/in/ferdiansyach-845930246" style={{ color: '#1d4ed8' }}>linkedin.com/in/ferdiansyach</a>
                <span className="contact-separator" style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://github.com/ferdiansyach" style={{ color: '#1d4ed8' }}>github.com/ferdiansyach</a>
                <span className="contact-separator" style={{ color: '#cbd5e1' }}>|</span>
                <a href="https://ferdiansyach-portfolio.vercel.app" style={{ color: '#1d4ed8' }}>ferdiansyach-portfolio.vercel.app</a>
              </div>
              <div style={{ borderBottom: '2px solid #1e293b', marginTop: '6px' }} />
            </header>

            {/* ===== PROFILE SUMMARY ===== */}
            <section style={{ marginBottom: '8px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROFIL PROFESIONAL" : "PROFESSIONAL SUMMARY"}
              </h2>
              <p style={{ fontSize: '9px', color: '#374151', lineHeight: 1.5, textAlign: 'justify', margin: 0 }}>
                {lang === "id"
                  ? "Full-Stack Developer dengan pengalaman membangun aplikasi web produksi end-to-end menggunakan React, Next.js, dan Node.js, mulai dari arsitektur frontend hingga REST API backend. Menyelesaikan 5+ proyek produksi dengan skor Lighthouse 90+ dan mengembangkan model AI prediktif dengan akurasi 92% yang memproses 50.000+ data poin di Telkom Indonesia. Memanfaatkan keahlian Python dan ML (LSTM, XGBoost) sebagai katalis data-driven untuk membangun solusi perangkat lunak yang lebih cerdas dan berdampak."
                  : "Full-Stack Developer with hands-on experience architecting and shipping production-grade web applications using React, Next.js, and Node.js across the full frontend-to-backend stack. Delivered 5+ production projects achieving Lighthouse scores of 90+ and engineered a predictive AI model with 92% accuracy processing 50,000+ data points at Telkom Indonesia. Leverages Python-based ML expertise (LSTM, XGBoost) as a data-driven catalyst to build smarter, more impactful software products."
                }
              </p>
            </section>

            {/* ===== EXPERIENCE — All 4 ===== */}
            <section style={{ marginBottom: '8px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENGALAMAN PROFESIONAL" : "PROFESSIONAL EXPERIENCE"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    {/* Role + Period */}
                    <div className="exp-header">
                      <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{t(exp.role)}</h3>
                      <span style={{ fontSize: '8.5px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{exp.period}</span>
                    </div>
                    {/* Company | Type | Location */}
                    <div style={{ fontSize: '8.5px', color: '#1d4ed8', fontWeight: 600, display: 'flex', flexWrap: 'wrap', gap: '0 4px', alignItems: 'center' }}>
                      <span>{exp.company}</span>
                      {exp.type && (
                        <>
                          <span style={{ color: '#cbd5e1', fontWeight: 400 }}>|</span>
                          <span style={{ color: '#475569', fontWeight: 500 }}>{exp.type}</span>
                        </>
                      )}
                      {exp.location && (
                        <>
                          <span style={{ color: '#cbd5e1', fontWeight: 400 }}>|</span>
                          <span style={{ color: '#475569', fontWeight: 500 }}>{exp.location}</span>
                        </>
                      )}
                    </div>
                    <ul style={{ margin: '2px 0 0 14px', padding: 0, listStyleType: 'disc' }}>
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} style={{ fontSize: '8.5px', color: '#374151', lineHeight: 1.35, paddingLeft: '2px' }}>
                          {t(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== EDUCATION ===== */}
            <section style={{ marginBottom: '8px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENDIDIKAN" : "EDUCATION"}
              </h2>
              <div>
                <div className="exp-header">
                  <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{education.institution}</h3>
                  <span style={{ fontSize: '8.5px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{education.period}</span>
                </div>
                <div style={{ fontSize: '9px', color: '#1e293b', fontWeight: 600 }}>{t(education.degree)}</div>
                {education.gpa && (
                  <div style={{ fontSize: '8.5px', color: '#475569' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "IPK:" : "GPA:"}</span> {education.gpa}
                  </div>
                )}
                <div style={{ fontSize: '8.5px', color: '#374151', marginTop: '2px' }}>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "Capstone Project: " : "Capstone Project: "}</span>
                  {lang === "id"
                    ? "Cloud-Based Coastal Water Quality Monitoring: Analisis Tren Spatiotemporal dan Unsupervised Spectral Clustering via Web-GIS"
                    : "Cloud-Based Coastal Water Quality Monitoring: Spatiotemporal Trend Analysis and Unsupervised Spectral Clustering via Web-GIS"
                  }
                </div>
                {education.courses && (
                  <div style={{ fontSize: '8.5px', color: '#374151', marginTop: '2px' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "Mata Kuliah Relevan: " : "Relevant Coursework: "}</span>
                    {education.courses.map(c => t(c)).join(", ")}
                  </div>
                )}
              </div>
            </section>

            {/* ===== TECHNICAL SKILLS ===== */}
            <section style={{ marginBottom: '8px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "KOMPETENSI TEKNIS" : "TECHNICAL SKILLS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {skillCategories.map((cat, i) => (
                  <div key={i} style={{ fontSize: '9px', lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{t(cat.title)}:</span>{" "}
                    <span style={{ color: '#374151' }}>
                      {cat.skills.map(s => s.name).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SELECTED PROJECTS — 3 projects ===== */}
            <section style={{ marginBottom: '8px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROYEK UNGGULAN" : "SELECTED PROJECTS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {topProjects.map((proj) => (
                  <div key={proj.slug}>
                    <div className="exp-header">
                      <h3 style={{ fontSize: '9.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {typeof proj.title === 'string' ? proj.title : t(proj.title)}
                      </h3>
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} style={{ fontSize: '8px', color: '#1d4ed8', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '8px' }}>
                          GitHub ↗
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: '8.5px', color: '#374151', lineHeight: 1.35, margin: '1px 0 0 0' }}>
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
                {lang === "id" ? "SERTIFIKASI & LISENSI" : "CERTIFICATIONS & LICENSES"}
              </h2>
              <div className="cert-grid">
                {certifications.map((cert) => (
                  <div key={cert.id} style={{ fontSize: '8.5px', color: '#374151', lineHeight: 1.4 }}>
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
