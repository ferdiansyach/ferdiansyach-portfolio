"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences, education } from "@/data/experience";
import { certifications } from "@/data/certifications";

const categoryMeta: Record<string, { label: { id: string; en: string }; icon: string; color: string }> = {
  webdev:      { label: { id: "Web Dev",           en: "Web Dev"           }, icon: "🌐", color: "#4f46e5" },
  datascience: { label: { id: "ML / Data Science", en: "ML / Data Science" }, icon: "🤖", color: "#0891b2" },
  wordpress:   { label: { id: "CMS / WordPress",   en: "CMS / WordPress"   }, icon: "📝", color: "#16a34a" },
};

export default function ProjectsPDF() {
  const router = useRouter();
  const [lang, setLang] = useState<"id" | "en">("id");
  const [role, setRole] = useState<"fullstack" | "data" | "general" | "generalist">("general");

  useEffect(() => {
    // Redirect to home if accessed in production
    if (process.env.NODE_ENV === "production") {
      router.replace("/");
      return;
    }
    const savedLang = localStorage.getItem("lang") as "id" | "en";
    if (savedLang) {
      setTimeout(() => {
        setLang(savedLang);
      }, 0);
    }
    const savedRole = localStorage.getItem("cvRole") as "fullstack" | "data" | "general" | "generalist";
    if (savedRole) {
      setTimeout(() => {
        setRole(savedRole);
      }, 0);
    }
  }, [router]);

  const t = (textObj: { id: string; en: string } | string) => {
    if (typeof textObj === "string") return textObj;
    return textObj[lang];
  };

  // Sort projects newest → oldest based on the last year in the period string
  const getLatestYear = (period?: string) => {
    if (!period) return 0;
    const years = period.match(/\d{4}/g);
    return years ? Math.max(...years.map(Number)) : 0;
  };

  // Select projects based on role, matching logic from portfolio-pdf/page.tsx
  const getSortedProjects = () => {
    const sortedProjects = [...projects];
    if (role === "generalist") {
      // Broad diversity: indosaji (web), smart-meter (data/ML), himasi (CMS/org)
      sortedProjects.sort((a, b) => {
        const order = { "indosaji": 1, "smart-meter": 2, "himasi": 3 };
        const aOrder = order[a.slug as keyof typeof order] || 99;
        const bOrder = order[b.slug as keyof typeof order] || 99;
        return aOrder - bOrder;
      });
    } else if (role === "general") {
      // Prioritize: unasfest (testing/QA), indosaji (full-stack web), smart-meter (data & modeling)
      sortedProjects.sort((a, b) => {
        const order = { "unasfest": 1, "indosaji": 2, "smart-meter": 3 };
        const aOrder = order[a.slug as keyof typeof order] || 99;
        const bOrder = order[b.slug as keyof typeof order] || 99;
        return aOrder - bOrder;
      });
    } else if (role === "data") {
      // Prioritize datascience projects
      sortedProjects.sort((a, b) => {
        if (a.category === "datascience" && b.category !== "datascience") return -1;
        if (a.category !== "datascience" && b.category === "datascience") return 1;
        return 0;
      });
    } else {
      // fullstack: Prioritize webdev projects
      sortedProjects.sort((a, b) => {
        if (a.category === "webdev" && b.category !== "webdev") return -1;
        if (a.category !== "webdev" && b.category === "webdev") return 1;
        return 0;
      });
    }
    // Then sort by year (newest first) for the selected group
    return sortedProjects.sort((a, b) => getLatestYear(b.period) - getLatestYear(a.period));
  };
  const currentProjects = getSortedProjects();

  // Role-based skills for fullstack/data: filter Redis & Figma, reorder for data
  const getFilteredSkills = () => {
    const EXCLUDE = ["Redis", "Figma"];
    const filtered = skillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.filter(s => !EXCLUDE.includes(s.name)),
    }));
    if (role === "data") {
      // Reorder: Data & Analysis, Machine Learning, Backend & DB, Frontend, DevOps & Tools
      const order = ["Data & Analysis", "Machine Learning", "Backend & DB", "Frontend", "DevOps & Tools"];
      filtered.sort((a, b) => {
        const aIdx = order.indexOf(a.title.en);
        const bIdx = order.indexOf(b.title.en);
        return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
      });
    }
    return filtered;
  };

  const getGeneralSkills = () => {
    if (lang === "id") {
      return [
        { title: "Pengujian & QA (Testing)", skills: "Manual Testing, API Testing (Postman), Unit & Component Testing (Jest & RTL), Web Developer Tools" },
        { title: "Bahasa & Framework", skills: "HTML/CSS, TypeScript, Python, React, Next.js, Node.js, Express.js, GIS, spatial analysis, clustering, unsupervised learning" },
        { title: "Basis Data & Tools", skills: "MySQL / SQL, MongoDB, Git & GitHub, GitHub Actions, Agile Scrum" },
        { title: "IT Support & Troubleshooting", skills: "Pemeliharaan Lab Komputer, Konfigurasi Sistem, Troubleshooting Hardware & OS" }
      ];
    } else {
      return [
        { title: "Software Testing & QA", skills: "Manual Testing, API Testing (Postman), Unit & Component Testing (Jest & RTL), Web Developer Tools" },
        { title: "Languages & Frameworks", skills: "HTML/CSS, TypeScript, Python, React, Next.js, Node.js, Express.js, GIS, spatial analysis, clustering, unsupervised learning" },
        { title: "Database & Tools", skills: "MySQL / SQL, MongoDB, Git & GitHub, GitHub Actions, Agile Scrum" },
        { title: "IT Support & Troubleshooting", skills: "Lab Maintenance, System Configuration, Hardware & OS Troubleshooting" }
      ];
    }
  };

  const getGeneralistSkills = () => {
    if (lang === "id") {
      return [
        { title: "Pengembangan Web", skills: "HTML/CSS, JavaScript, TypeScript, Tailwind CSS, React, Next.js, Node.js, Express.js, REST API, GraphQL, Prisma, WordPress" },
        { title: "Analisis Data & ML", skills: "Python, NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, NLTK, Jupyter Notebook, Streamlit, Tableau, Google Earth Engine, GIS, spatial analysis, clustering, unsupervised learning" },
        { title: "Basis Data & DevOps", skills: "MySQL / SQL, PostgreSQL, MongoDB, Docker, GCP, Git & GitHub, GitHub Actions, CI/CD" },
        { title: "Metodologi & Soft Skills", skills: "Agile Scrum, SDLC, Jira, Manual & API Testing, Postman, Dokumentasi Teknis, Kerja Tim Lintas Fungsi" },
        { title: "IT Support & Administrasi", skills: "Pemeliharaan Lab, Konfigurasi Sistem, Administrasi Windows & Linux, Troubleshooting Hardware/OS, Dasar Jaringan, Microsoft Office" }
      ];
    } else {
      return [
        { title: "Web Development", skills: "HTML/CSS, JavaScript, TypeScript, Tailwind CSS, React, Next.js, Node.js, Express.js, REST API, GraphQL, Prisma, WordPress" },
        { title: "Data Analysis & ML", skills: "Python, NumPy, Pandas, Matplotlib, Scikit-learn, TensorFlow, NLTK, Jupyter Notebook, Streamlit, Tableau, Google Earth Engine, GIS, spatial analysis, clustering, unsupervised learning" },
        { title: "Database & DevOps", skills: "MySQL / SQL, PostgreSQL, MongoDB, Docker, GCP, Git & GitHub, GitHub Actions, CI/CD" },
        { title: "Methodology & Soft Skills", skills: "Agile Scrum, SDLC, Jira, Manual & API Testing, Postman, Technical Documentation, Cross-functional Teamwork" },
        { title: "IT Support & Administration", skills: "Lab Maintenance, System Configuration, Windows & Linux Administration, Hardware/OS Troubleshooting, Networking Basics, Microsoft Office" }
      ];
    }
  };

  const currentAllTech = [...new Set(currentProjects.flatMap((p) => p.technologies))];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .pdf-page * {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
          box-sizing: border-box;
        }

        /* ===== PRINT ===== */
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
            margin: 6mm 0 8mm 0;
            @bottom-center {
              content: counter(page) " / " counter(pages);
              font-family: 'Inter', sans-serif;
              font-size: 8px;
              color: #94a3b8;
            }
          }
          .no-print { display: none !important; }
          .pdf-page {
            width: 210mm !important;
            min-height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
          }
          .pdf-inner { padding: 5mm 13mm 6mm !important; }
          a { color: #1d4ed8 !important; text-decoration: none !important; }
          .project-card { page-break-inside: avoid; break-inside: avoid; }
          .section-block { page-break-inside: avoid; break-inside: avoid; }
          .pdf-footer-screen { display: none !important; }
          .pdf-footer-print { display: block !important; }
        }

        /* ===== SCREEN ===== */
        @media screen {
          .pdf-page {
            width: 210mm;
            min-height: 297mm;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px -4px rgba(0,0,0,0.12);
            margin: 24px auto 64px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
            background: white;
          }
          .pdf-inner { padding: 12mm 15mm; }
        }

        @media screen and (max-width: 860px) {
          .pdf-page {
            width: 100% !important;
            min-height: auto !important;
            margin: 0 auto 32px !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
          }
          .pdf-inner { padding: 20px 16px !important; }
          .project-card { flex-direction: column !important; }
          .project-image { width: 100% !important; height: auto !important; aspect-ratio: 16/9; }
          .two-col-layout { flex-direction: column !important; }
          .two-col-layout > div { flex: 1 !important; }
        }

        /* ===== COMPONENTS ===== */
        .contact-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px 8px;
          font-size: 9.5px;
          color: #475569;
          margin-top: 5px;
          line-height: 1.4;
        }

        .project-card {
          display: flex;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 6px;
          border: 1px solid #e8ecf1;
          background: #ffffff;
          transition: box-shadow 0.15s;
        }
        .project-card:nth-child(even) {
          background: #f8fafc;
        }

        .project-image {
          width: 140px;
          height: 85px;
          object-fit: cover;
          border-radius: 5px;
          border: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .project-content { flex: 1; min-width: 0; }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 8px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 99px;
          border-width: 1px;
          border-style: solid;
          margin-bottom: 3px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .bullet-list {
          margin: 4px 0 0 12px;
          padding: 0;
          list-style-type: disc;
        }
        .bullet-list li {
          font-size: 9.5px;
          color: #334155;
          line-height: 1.4;
          padding-left: 2px;
          margin-bottom: 1.5px;
        }

        .section-divider {
          border: none;
          border-top: 2px solid #0f172a;
          margin: 6px 0 8px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 5px;
          padding-bottom: 3px;
          border-bottom: 1.5px solid #e2e8f0;
        }
        .section-header-bar {
          width: 3px;
          height: 14px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .section-header h2 {
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
        }

        .highlight-card {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 6px;
          background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%);
          border: 1px solid #e0e7ff;
        }
        .highlight-number {
          font-size: 16px;
          font-weight: 900;
          color: #4f46e5;
          line-height: 1;
        }
        .highlight-label {
          font-size: 8px;
          color: #64748b;
          font-weight: 600;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .skill-tag {
          display: inline-block;
          font-size: 8.5px;
          background: #f1f5f9;
          color: #334155;
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 500;
        }

        .cert-item {
          padding: 4px 0;
          border-bottom: 1px dashed #f1f5f9;
        }
        .cert-item:last-child { border-bottom: none; }

        .pdf-footer-screen {
          text-align: center;
          padding: 8px 0 4px;
          font-size: 7.5px;
          color: #94a3b8;
          border-top: 1px solid #f1f5f9;
          margin-top: 12px;
        }

        .pdf-footer-print {
          display: none;
          text-align: center;
          padding: 6px 0 0;
          font-size: 8px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          margin-top: 8px;
        }
      `}</style>

      <div className="bg-gray-100 min-h-screen">
        {/* ===== TOOLBAR ===== */}
        <div className="no-print bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                PRJ
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-800">
                  {lang === "id" ? "Pratinjau Portofolio Proyek" : "Project Portfolio Preview"}
                </h1>
                <p className="text-xs text-slate-500">
                  {lang === "id" ? "Format PDF (A4)" : "PDF Format (A4)"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as "id" | "en")}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button
                onClick={() => window.print()}
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition text-sm flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download PDF
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

        {/* ===== A4 CONTENT ===== */}
        <div className="pdf-page text-black antialiased">
          <div className="pdf-inner">

            {/* ===== HEADER ===== */}
            <header style={{ marginBottom: "2px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.1, textTransform: "uppercase", margin: 0 }}>
                    Ferdiansyach
                  </h1>
                  <div style={{ fontSize: "9.5px", color: "#4f46e5", fontWeight: 700, marginTop: "3px", letterSpacing: "0.08em" }}>
                    {lang === "id" ? "PORTOFOLIO PROYEK" : "PROJECT PORTFOLIO"}
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "8px", color: "#94a3b8", lineHeight: 1.5, marginTop: "4px" }}>
                  {lang === "id" ? "Terakhir diperbarui" : "Last updated"}<br />
                  <span style={{ fontWeight: 700, color: "#64748b" }}>
                    {new Date().toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
              <div className="contact-row">
                <span>Depok, Indonesia</span>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <a href="mailto:iyanferdiansyach30@gmail.com" style={{ color: "#4f46e5" }}>iyanferdiansyach30@gmail.com</a>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <span>+62 888 6007 599</span>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <a href="https://linkedin.com/in/ferdiansyach-845930246" style={{ color: "#4f46e5" }}>linkedin.com/in/ferdiansyach</a>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <a href="https://github.com/ferdiansyach" style={{ color: "#4f46e5" }}>github.com/ferdiansyach</a>
                <span style={{ color: "#cbd5e1" }}>|</span>
                <a href="https://ferdiansyach-portfolio.vercel.app" style={{ color: "#4f46e5" }}>ferdiansyach-portfolio.vercel.app</a>
              </div>
              <hr className="section-divider" />
            </header>

            {/* ===== IMPACT HIGHLIGHTS ===== */}
            <section style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <div className="highlight-card">
                  <div className="highlight-number">{currentProjects.length}</div>
                  <div className="highlight-label">{lang === "id" ? "Proyek\nUnggulan" : "Featured\nProjects"}</div>
                </div>
                <div className="highlight-card">
                  <div className="highlight-number">92%</div>
                  <div className="highlight-label">{lang === "id" ? "Akurasi\nModel ML" : "ML Model\nAccuracy"}</div>
                </div>
                <div className="highlight-card">
                  <div className="highlight-number">{currentAllTech.length}+</div>
                  <div className="highlight-label">{lang === "id" ? "Teknologi\nDikuasai" : "Technologies\nUsed"}</div>
                </div>
                <div className="highlight-card">
                  <div className="highlight-number">3</div>
                  <div className="highlight-label">{lang === "id" ? "Domain\nKeahlian" : "Expertise\nDomains"}</div>
                </div>
              </div>
            </section>

            {/* ===== PROFESSIONAL SUMMARY ===== */}
            <section style={{ marginBottom: "8px" }}>
              <p style={{ fontSize: "9.5px", color: "#374151", lineHeight: 1.55, margin: 0, textAlign: "justify" }}>
                {role === "generalist"
                  ? lang === "id"
                    ? "Lulusan Sistem Informasi (IPK 3.77) dengan pengalaman langsung di pengembangan web, analisis data, dan IT support. Membangun 3+ aplikasi web produksi (React, Next.js, Node.js) sekaligus merancang model prediktif ML (LSTM, XGBoost) dengan akurasi 92% di Telkom Indonesia. Terampil mengelola infrastruktur IT laboratorium dengan tingkat ketersediaan 98%, serta berpengalaman dalam metodologi Agile/Scrum. Mampu beradaptasi cepat di berbagai peran teknologi dan siap memberikan kontribusi lintas fungsi di lingkungan kerja yang dinamis."
                    : "Information Systems graduate (GPA 3.77) with hands-on experience spanning web development, data analysis, and IT support. Built 3+ production web applications (React, Next.js, Node.js) while engineering predictive ML models (LSTM, XGBoost) achieving 92% accuracy at Telkom Indonesia. Skilled in managing IT lab infrastructure with 98% device availability, and well-practiced in Agile/Scrum methodologies. A fast-adapting professional ready to contribute across diverse technology roles in dynamic work environments."
                  : role === "general"
                    ? lang === "id"
                      ? "Lulusan Sistem Informasi dengan kompetensi luas di bidang Quality Assurance (QA/Testing), rekayasa perangkat lunak, dan IT support. Terbukti memiliki ketelitian tinggi dalam mendeteksi bug dan mengoptimalkan performa sistem, termasuk merancang pipeline pengujian (Jest/RTL) yang memangkas bug rate sebesar 60% dan mempertahankan ketersediaan unit lab komputer sebesar 98%. Menguasai metodologi SDLC (Agile/Scrum), pengujian manual (API/Web), serta analisis data. Siap berkontribusi secara fleksibel di berbagai peran teknologi."
                      : "Information Systems graduate with broad competencies in Quality Assurance (QA/Testing), software engineering, and IT support. Proven track record of high attention to detail in bug detection and system optimization, including engineering a testing pipeline (Jest/RTL) that slashed production bug rate by 60% and maintaining 98% device availability in computer labs. Well-versed in SDLC (Agile/Scrum) methodologies, manual testing (API/Web), and data analysis. Ready to contribute flexibly across diverse IT roles."
                    : role === "fullstack"
                      ? lang === "id"
                        ? "Fullstack Developer & AI Engineer yang mengkhususkan diri dalam aplikasi berbasis data. Merancang dan meluncurkan 3+ aplikasi web produksi (React, Next.js, Node.js) dengan skor Lighthouse 90+. Merancang pipeline data end-to-end dan model ML prediktif (LSTM, XGBoost) mencapai akurasi 92% pada 50.000+ data poin di Telkom Indonesia. Menggabungkan keahlian web development, data engineering, dan AI untuk membangun produk perangkat lunak yang intelligent dan scalable."
                        : "Fullstack Developer & AI Engineer specializing in data-informed applications. Architected and shipped 3+ production web applications (React, Next.js, Node.js) with Lighthouse 90+ performance. Engineered end-to-end data pipelines and predictive ML models (LSTM, XGBoost) achieving 92% accuracy on 50,000+ data points at Telkom Indonesia. Leverages web development, data engineering, and AI expertise to build intelligent, scalable software products."
                      : lang === "id"
                        ? "Data Analyst & AI Engineer dengan keahlian kuat dalam Python, SQL, dan analisis geospasial. Merancang pipeline data end-to-end dan model ML prediktif (LSTM, XGBoost) mencapai akurasi 92% pada 50.000+ data poin di Telkom Indonesia. Berpengalaman membangun sistem monitoring kualitas air pesisir menggunakan Google Earth Engine dengan uji statistik Mann-Kendall. Ahli dalam mengubah dataset mentah dan time-series menjadi insight bisnis yang actionable melalui dashboard interaktif (Streamlit)."
                        : "Data Analyst & AI Engineer with strong expertise in Python, SQL, and geospatial analysis. Engineered end-to-end data pipelines and predictive ML models (LSTM, XGBoost) achieving 92% accuracy on 50,000+ data points at Telkom Indonesia. Experienced in building coastal water quality monitoring systems using Google Earth Engine with Mann-Kendall statistical tests. Adept at transforming raw, time-series datasets into actionable business insights through interactive dashboards (Streamlit)."
                }
              </p>
            </section>

            {/* ===== PROJECTS LIST ===== */}
            <section style={{ marginBottom: "8px" }}>
              <div className="section-header">
                <div className="section-header-bar" style={{ backgroundColor: "#4f46e5" }} />
                <h2>{lang === "id" ? "Proyek Unggulan" : "Featured Projects"}</h2>
                <span style={{ marginLeft: "auto", fontSize: "7.5px", color: "#94a3b8", fontWeight: 500 }}>
                  {lang === "id" ? "Diurutkan terbaru" : "Sorted newest first"}
                </span>
              </div>

              {currentProjects.map((proj) => {
                const meta = categoryMeta[proj.category];
                return (
                  <div key={proj.slug} className="project-card">
                    {proj.thumbnail && (
                      <img
                        src={proj.thumbnail}
                        alt={typeof proj.title === "string" ? proj.title : t(proj.title)}
                        className="project-image"
                      />
                    )}
                    <div className="project-content">
                      {/* Category badge */}
                      <div>
                        <span
                          className="category-badge"
                          style={{ color: meta.color, borderColor: meta.color, backgroundColor: `${meta.color}12` }}
                        >
                          {meta.icon} {t(meta.label)}
                        </span>
                      </div>

                      {/* Title row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px" }}>
                        <h3 style={{ fontSize: "12.5px", fontWeight: 800, color: "#0f172a", margin: "0 0 1px 0" }}>
                          {typeof proj.title === "string" ? proj.title : t(proj.title)}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                          {proj.period && (
                            <span style={{ fontSize: "8px", color: "#64748b", fontWeight: 600, backgroundColor: "#f1f5f9", padding: "1px 6px", borderRadius: "3px" }}>{proj.period}</span>
                          )}
                          {proj.githubUrl && (
                            <a href={proj.githubNote ? "https://github.com/ferdiansyach" : proj.githubUrl} style={{ fontSize: "8.5px", color: "#4f46e5", fontWeight: 600, textDecoration: "none" }} target="_blank" rel="noreferrer">
                              Code ↗
                            </a>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} style={{ fontSize: "8.5px", color: "#0891b2", fontWeight: 600, textDecoration: "none" }} target="_blank" rel="noreferrer">
                              Demo ↗
                            </a>
                          )}
                          <a href={`https://ferdiansyach-portfolio.vercel.app/projects/${proj.slug}`} style={{ fontSize: "8.5px", color: "#16a34a", fontWeight: 600, textDecoration: "none" }} target="_blank" rel="noreferrer">
                            Detail ↗
                          </a>
                        </div>
                      </div>

                      {/* My Role */}
                      {proj.role && (
                        <div style={{ fontSize: "8.5px", color: "#4f46e5", fontWeight: 600, marginTop: "1px", fontStyle: "italic" }}>
                          {lang === "id" ? "Peran:" : "Role:"} {t(proj.role)}
                        </div>
                      )}

                      {/* Tech stack */}
                      <div style={{ fontSize: "8.5px", color: "#64748b", fontWeight: 600, fontFamily: "'SF Mono','Fira Code',monospace", marginBottom: "3px", marginTop: "1px" }}>
                        {proj.technologies.join(" · ")}
                      </div>

                      {/* Bullets (PRAQ style) or fallback to description */}
                      {proj.pdfBullets ? (
                        <ul className="bullet-list">
                          {proj.pdfBullets.map((b, i) => (
                            <li key={i}>{t(b)}</li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ fontSize: "9.5px", color: "#334155", lineHeight: 1.5, margin: 0, textAlign: "justify" }}>
                          {t(proj.description)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>

            {/* ===== TWO-COLUMN: EXPERIENCE + SKILLS ===== */}
            <div className="two-col-layout" style={{ display: "flex", gap: "18px" }}>

              {/* ===== LEFT COLUMN: WORK EXPERIENCE & EDUCATION ===== */}
              <div style={{ flex: "1.8" }}>
                {/* WORK EXPERIENCE */}
                <section className="section-block" style={{ marginBottom: "8px" }}>
                  <div className="section-header">
                    <div className="section-header-bar" style={{ backgroundColor: "#0891b2" }} />
                    <h2>{lang === "id" ? "Pengalaman Kerja" : "Work Experience"}</h2>
                  </div>
                  {experiences.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: "5px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h3 style={{ fontSize: "10.5px", fontWeight: 800, color: "#0f172a", margin: "0" }}>
                          {t(exp.role)} <span style={{ fontWeight: 500, color: "#64748b", fontSize: "9.5px" }}>— {exp.company}</span>
                        </h3>
                        <span style={{ fontSize: "8px", color: "#64748b", fontWeight: 600, backgroundColor: "#f1f5f9", padding: "1px 6px", borderRadius: "3px", flexShrink: 0 }}>{exp.period}</span>
                      </div>
                      <ul className="bullet-list" style={{ marginTop: "2px" }}>
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{t(b)}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* EDUCATION */}
                <section className="section-block" style={{ marginBottom: "8px" }}>
                  <div className="section-header">
                    <div className="section-header-bar" style={{ backgroundColor: "#16a34a" }} />
                    <h2>{lang === "id" ? "Pendidikan" : "Education"}</h2>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "10.5px", fontWeight: 800, color: "#0f172a", margin: "0" }}>
                      {education.institution}
                    </h3>
                    <span style={{ fontSize: "8px", color: "#64748b", fontWeight: 600, backgroundColor: "#f1f5f9", padding: "1px 6px", borderRadius: "3px" }}>{education.period}</span>
                  </div>
                  <div style={{ fontSize: "9.5px", color: "#374151", fontWeight: 500, marginTop: "2px" }}>
                    {t(education.degree)} <span style={{ color: "#cbd5e1", margin: "0 4px" }}>|</span> <span style={{ fontWeight: 700, color: "#4f46e5" }}>{lang === "id" ? "IPK:" : "GPA:"} {education.gpa}</span>
                  </div>
                </section>
              </div>

              {/* ===== RIGHT COLUMN: SKILLS & CERTIFICATIONS ===== */}
              <div style={{ flex: "1" }}>
                {/* TECHNICAL SKILLS */}
                <section className="section-block" style={{ marginBottom: "8px" }}>
                  <div className="section-header">
                    <div className="section-header-bar" style={{ backgroundColor: "#f59e0b" }} />
                    <h2>{lang === "id" ? "Keahlian Teknis" : "Technical Skills"}</h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {(role === "general" || role === "generalist")
                      ? (role === "generalist" ? getGeneralistSkills() : getGeneralSkills()).map((cat, i) => (
                        <div key={i}>
                          <div style={{ fontSize: "8.5px", fontWeight: 700, color: "#475569", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.title}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                            {cat.skills.split(', ').map((s) => (
                              <span key={s} className="skill-tag">{s}</span>
                            ))}
                          </div>
                        </div>
                      ))
                      : getFilteredSkills().map((cat) => (
                        <div key={cat.title.en}>
                          <div style={{ fontSize: "8.5px", fontWeight: 700, color: "#475569", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t(cat.title)}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
                            {cat.skills.map((s) => (
                              <span key={s.name} className="skill-tag">{s.name}</span>
                            ))}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </section>

                {/* CERTIFICATIONS */}
                <section className="section-block">
                  <div className="section-header">
                    <div className="section-header-bar" style={{ backgroundColor: "#dc2626" }} />
                    <h2>{lang === "id" ? "Sertifikasi" : "Certifications"}</h2>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {certifications.map((cert) => (
                      <div key={cert.id} className="cert-item">
                        <div style={{ fontSize: "9.5px", fontWeight: 700, color: "#0f172a", lineHeight: 1.3 }}>
                          {cert.badge} {t(cert.name)}
                        </div>
                        <div style={{ fontSize: "8.5px", color: "#64748b", lineHeight: 1.3 }}>
                          {cert.issuer} <span style={{ color: "#cbd5e1", margin: "0 2px" }}>·</span> {cert.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* ===== SCREEN-ONLY FOOTER ===== */}
            <div className="pdf-footer-screen">
              Ferdiansyach · Project Portfolio · ferdiansyach-portfolio.vercel.app
            </div>

            {/* ===== PRINT-ONLY FOOTER ===== */}
            <div className="pdf-footer-print">
              Ferdiansyach · {lang === "id" ? "Portofolio Proyek" : "Project Portfolio"} · ferdiansyach-portfolio.vercel.app
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
