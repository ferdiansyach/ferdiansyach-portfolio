"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { experiences, education } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";

export default function PortfolioPDF() {
  const router = useRouter();
  const [lang, setLang] = useState<"id" | "en">("id");
  const [role, setRole] = useState<"fullstack" | "data" | "general" | "generalist">("general");

  useEffect(() => {
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

  const handleLangChange = (newLang: "id" | "en") => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const handleRoleChange = (newRole: "fullstack" | "data" | "general" | "generalist") => {
    setRole(newRole);
    localStorage.setItem("cvRole", newRole);
  };

  const t = (textObj: { id: string; en: string } | string) => {
    if (typeof textObj === "string") return textObj;
    return textObj[lang];
  };

  const typeMap: Record<string, { id: string; en: string }> = {
    "Internship": { id: "Magang", en: "Internship" },
    "Student Organization": { id: "Organisasi Mahasiswa", en: "Student Organization" },
    "Freelance": { id: "Lepas", en: "Freelance" },
    "Full-time": { id: "Penuh Waktu", en: "Full-time" },
    "Part-time": { id: "Paruh Waktu", en: "Part-time" },
    "Volunteering": { id: "Kegiatan Sosial", en: "Volunteering" },
  };
  const tType = (type: string) => typeMap[type]?.[lang] ?? type;

  // Show all experiences, all certifications
  // Sort and select top 3 projects based on role
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
      // Prioritize QA & Testing projects: unasfest (testing/QA), magangtracking (API/Auth), indosaji (Payment/E-commerce)
      sortedProjects.sort((a, b) => {
        const order: Record<string, number> = {
          "unasfest": 1,
          "magangtracking": 2,
          "indosaji": 3,
        };
        const aOrder = order[a.slug] ?? 99;
        const bOrder = order[b.slug] ?? 99;
        return aOrder - bOrder;
      });
    } else if (role === "data") {
      // Prioritize top Data Science & ML projects: coastal-water-quality, smart-meter, waste-classification-pkm
      sortedProjects.sort((a, b) => {
        const order: Record<string, number> = {
          "coastal-water-quality": 1,
          "smart-meter": 2,
          "waste-classification-pkm": 3,
        };
        const aOrder = order[a.slug] ?? 99;
        const bOrder = order[b.slug] ?? 99;
        return aOrder - bOrder;
      });
    } else {
      // Fullstack: explicitly prioritize the best fullstack showcase projects
      sortedProjects.sort((a, b) => {
        const order: Record<string, number> = {
          "waste-classification-app": 1,
          "magangtracking": 2,
          "indosaji": 3,
          "unasfest": 4,
        };
        const aOrder = order[a.slug] ?? 99;
        const bOrder = order[b.slug] ?? 99;
        return aOrder - bOrder;
      });
    }
    return sortedProjects.slice(0, 3);
  };
  const topProjects = getSortedProjects();

  // Role-based experience ordering + bullet modifications
  // Mirrors the logic in generate_docx.py ordered_experiences
  const getOrderedExperiences = () => {
    const exps = experiences.map(exp => ({
      ...exp,
      bullets: exp.bullets.map(b => ({ ...b })),
    }));
    // exps order: [0]=telkom, [1]=labassist, [2]=unasfest, [3]=pkm, [4]=himasi

    let ordered = [...exps];

    if (role === "fullstack") {
      // Kronologis tahun murni: Telkom → Lab Assist → UNAS FEST → PKM → HIMASI
      ordered = [exps[0], exps[1], exps[2], exps[3], exps[4]];
    } else if (role === "data") {
      // Kronologis tahun murni: Telkom → Lab Assist → UNAS FEST → PKM → HIMASI
      ordered = [exps[0], exps[1], exps[2], exps[3], exps[4]];
    } else if (role === "general") {
      // Kronologis tahun murni: Telkom → Lab Assist → UNAS FEST → PKM → HIMASI
      ordered = [exps[0], exps[1], exps[2], exps[3], exps[4]];
    }
    // generalist: keep default chronological order

    // Fullstack only: enrich Telkom web platform bullet with tech stack
    if (role === "fullstack" && ordered[0].id === "telkom" && ordered[0].bullets.length === 3) {
      const enrichedWebBullet = {
        id: "Mengembangkan platform manajemen magang berbasis web fullstack (Next.js frontend, Node.js/Express API, MySQL database) bekerja sama dengan 3 divisi lintas fungsi, melayani 100+ peserta aktif dan mengurangi overhead koordinasi onboarding sebesar 30%.",
        en: "Developed a fullstack internship management web platform (Next.js frontend, Node.js/Express API, MySQL database) in collaboration with 3 cross-functional divisions, serving 100+ active interns and reducing onboarding coordination overhead by 30%.",
      };
      ordered[0] = {
        ...ordered[0],
        bullets: [enrichedWebBullet, ordered[0].bullets[0], ordered[0].bullets[1]],
      };
    }

    // General (Manual Testing) only: split UNAS FEST bullet + reframe Lab bullets
    if (role === "general") {
      ordered = ordered.map(exp => {
        if (exp.company === "UNAS FEST | Universitas Nasional Festival") {
          return {
            ...exp,
            bullets: [
              exp.bullets[0], // bullet 1 tetap
              {
                id: "Membangun API Routes Next.js untuk integrasi registrasi peserta dan database pada portal festival resmi.",
                en: "Built Next.js API Routes for attendee registration and database integration on the official festival portal.",
              },
              {
                id: "Merancang dan mengeksekusi pipeline pengujian unit/komponen menggunakan Jest dan React Testing Library, menulis test case pada alur registrasi kritikal yang mengidentifikasi dan mencegah bug berulang — memangkas bug rate produksi sebesar 60% sebelum festival diluncurkan.",
                en: "Designed and executed a component/unit testing pipeline using Jest and React Testing Library, writing test cases across critical registration flows that identified and prevented recurring bugs — slashing production bug rate by 60% prior to festival launch.",
              },
            ],
          };
        }
        if (exp.company === "Lab Data Monetize | Universitas Nasional") {
          return {
            ...exp,
            bullets: [
              {
                id: "Mendiagnosis dan menyelesaikan masalah hardware/software berulang pada 30+ unit lab melalui troubleshooting sistematis dan verifikasi pasca-perbaikan, mempertahankan ketersediaan perangkat 98% dan meminimalkan downtime sesi untuk 200+ mahasiswa per semester.",
                en: "Diagnosed and resolved recurring hardware/software issues across 30+ lab units through systematic troubleshooting and post-fix verification, sustaining 98% device availability and minimizing session downtime for 200+ students per semester.",
              },
              {
                id: "Mendokumentasikan dan menstandarisasi prosedur instalasi/konfigurasi software menjadi checklist pemeliharaan yang dapat diulang, mengurangi kesalahan konfigurasi berulang pada sesi lab untuk 200+ mahasiswa per semester.",
                en: "Documented and standardized software installation/configuration procedures into repeatable maintenance checklists, reducing recurring configuration errors across lab sessions for 200+ students per semester.",
              },
            ],
          };
        }
        return exp;
      });
    }

    return ordered;
  };
  const orderedExperiences = getOrderedExperiences();

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

  return (
    <>
      <style>{`
        .cv-page * {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        }

        .cv-section-title {
          font-size: 11px;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1.5px solid #334155;
          padding-bottom: 2px;
          margin-bottom: 4px;
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
            margin: 8mm 10mm;
          }

          .no-print {
            display: none !important;
          }

          .cv-page {
            width: 100% !important;
            max-width: 210mm !important;
            height: auto !important;
            min-height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            transform: none !important;
          }

          .cv-inner {
            padding: 0 !important;
          }

          a {
            color: #1d4ed8 !important;
            text-decoration: none !important;
          }

          .cv-page {
            page-break-after: auto;
            page-break-inside: auto;
            break-inside: auto;
          }

          /* Prevent break inside individual content blocks */
          .cv-section,
          .exp-item,
          .project-card,
          .cert-item,
          .skills-block {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .cv-section-title,
          .section-header,
          h1, h2, h3 {
            break-after: avoid !important;
            page-break-after: avoid !important;
          }

          .cert-grid {
            grid-template-columns: 1fr !important;
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
          font-size: 9.5px;
          color: #475569;
          margin-top: 4px;
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
          grid-template-columns: 1fr;
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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
                CV
              </div>
              <div>
                <h1 className="toolbar-title-main" style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                  {lang === "id" ? "Pratinjau Resume - 1 Halaman" : "Resume Preview - 1 Page"}
                </h1>
                <p className="toolbar-title-sub" style={{ fontSize: '12px', color: '#64748b' }}>
                  {lang === "id" ? "Dioptimalkan untuk lamaran kerja korporat" : "Optimized for corporate job applications"}
                </p>
              </div>
            </div>
            <div className="toolbar-actions flex gap-2 items-center">
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as "fullstack" | "data" | "general" | "generalist")}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="general">⚙️ General / QA & Testing</option>
                <option value="fullstack">💻 Full-Stack</option>
                <option value="data">📊 Data Analyst</option>
                <option value="generalist">🌐 Generalist (Umum)</option>
              </select>
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value as "id" | "en")}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="id">🇮🇩 Indonesia</option>
                <option value="en">🇬🇧 English</option>
              </select>
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm shadow-sm flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
              <a
                href={`/cv/Ferdiansyach_CV_${{
                  generalist: "Generalist",
                  general: "Manual_Testing",
                  fullstack: "Fullstack",
                  data: "Data",
                }[role]}_${lang.toUpperCase()}.docx`}
                download
                className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-emerald-700 transition text-sm shadow-sm flex items-center gap-1.5 no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                <span className="hidden sm:inline">Download DOCX</span>
                <span className="sm:hidden">DOCX</span>
              </a>
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
          <div className="cv-inner" style={{ padding: '8mm 12mm' }}>

            {/* ===== HEADER ===== */}
            <header style={{ marginBottom: '5px' }}>
              <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1, textTransform: 'uppercase', margin: 0 }}>
                Ferdiansyach
              </h1>
              <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600, marginTop: '2px', lineHeight: 1.3 }}>
                {role === "generalist"
                  ? "Information Systems Graduate | Versatile IT Professional | Web, Data & IT Support"
                  : role === "general"
                    ? "IT Specialist | Quality Assurance & Manual Testing | Software Developer"
                    : role === "fullstack"
                      ? "Full-Stack Developer (React/Next.js · Node.js · Go · PostgreSQL) | AI-Integrated Web Apps"
                      : "Data Analyst & ML Developer (Python, SQL) | Web-GIS & Predictive Modeling"
                }
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
              <div style={{ borderBottom: '2px solid #1e293b', marginTop: '4px' }} />
            </header>

            {/* ===== PROFILE SUMMARY ===== */}
            <section style={{ marginBottom: '6px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROFIL PROFESIONAL" : "PROFESSIONAL SUMMARY"}
              </h2>
              <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: 1.45, textAlign: 'justify', margin: 0 }}>
                {role === "generalist"
                  ? lang === "id"
                    ? "Lulusan Sistem Informasi (IPK 3.77) dengan pengalaman langsung di pengembangan web, analisis data, dan IT support. Membangun 3+ aplikasi web produksi (React, Next.js, Node.js) sekaligus merancang model prediktif ML (LSTM, XGBoost) dengan akurasi 92% di Telkom Indonesia. Terampil mengelola infrastruktur IT laboratorium dengan tingkat ketersediaan 98%, serta berpengalaman dalam metodologi Agile/Scrum. Mampu beradaptasi cepat di berbagai peran teknologi dan siap memberikan kontribusi lintas fungsi di lingkungan kerja yang dinamis."
                    : "Information Systems graduate (GPA 3.77) with hands-on experience spanning web development, data analysis, and IT support. Built 3+ production web applications (React, Next.js, Node.js) while engineering predictive ML models (LSTM, XGBoost) achieving 92% accuracy at Telkom Indonesia. Skilled in managing IT lab infrastructure with 98% device availability, and well-practiced in Agile/Scrum methodologies. A fast-adapting professional ready to contribute across diverse technology roles in dynamic work environments."
                  : role === "general"
                    ? lang === "id"
                      ? "Software Quality Assurance (QA) & Test Engineer yang berfokus pada pengujian perangkat lunak (Manual & Automated Testing), penjaminan kualitas API, serta pemeliharaan sistem. Terbukti memiliki ketelitian tinggi dalam identifikasi bug, termasuk merancang pipeline pengujian (Jest & React Testing Library) yang memangkas bug rate produksi sebesar 60% pada portal web festival skala besar, serta mempertahankan 98% ketersediaan perangkat lab komputer melalui troubleshooting sistematis. Menguasai SDLC (Agile/Scrum), pengujian API (Postman), dokumentasi test case, dan analisis sistem."
                      : "Software Quality Assurance (QA) & Test Engineer specialized in manual & automated software testing, API validation, and system quality assurance. Proven track record of high attention to detail in bug detection, including engineering a component testing pipeline (Jest & React Testing Library) that slashed production bug rate by 60% on a large-scale festival portal, while sustaining 98% device availability across 30+ lab units. Well-versed in SDLC (Agile/Scrum), API testing (Postman), test case documentation, and systematic debugging."
                    : role === "fullstack"
                      ? lang === "id"
                        ? "Full-Stack Developer yang menguasai sisi frontend (React, Next.js, TypeScript, skor Lighthouse 90+) dan backend engineering (Node.js/Express, Go/Gin, REST API + JWT Auth) dengan database PostgreSQL dan MongoDB. Meluncurkan 3+ aplikasi produksi live termasuk platform klasifikasi sampah terintegrasi AI (Next.js + Gemini Vision API) dan e-commerce F&B dengan pembayaran Stripe (MERN stack). Membawa ketelitian riset IEEE (ICETISI 2025) ke engineering — menghubungkan kecerdasan ML dengan pengiriman produk web yang solid."
                        : "Full-Stack Developer proficient in both frontend (React, Next.js, TypeScript, Lighthouse 90+) and backend engineering (Node.js/Express, Go/Gin, REST API + JWT Auth) with PostgreSQL and MongoDB databases. Shipped 3+ production applications including a live AI waste classification platform (Next.js + Gemini Vision API) and an F&B e-commerce with Stripe payment processing (MERN stack). Brings IEEE-published research rigor (ICETISI 2025) to engineering — bridging ML intelligence with solid web product delivery."
                      : lang === "id"
                        ? "Data Analyst & Machine Learning Developer yang berfokus pada pemodelan prediktif, analisis geospasial, dan pipeline data end-to-end. Merancang model prediktif (LSTM, XGBoost) dengan akurasi 92% pada 50.000+ data poin di Telkom Indonesia, serta membangun sistem monitoring kualitas air pesisir 7 tahun berbasis Google Earth Engine dan uji statistik Mann-Kendall. Penulis utama & presenter riset di IEEE ICETISI 2025, berpengalaman mengubah dataset terstruktur dan time-series menjadi insight bisnis yang actionable melalui dashboard interaktif (Streamlit, Tableau)."
                        : "Data Analyst & Machine Learning Developer specialized in end-to-end data pipelines, predictive modeling (LSTM, XGBoost), and geospatial analytics. Engineered predictive energy models achieving 92% accuracy on 50,000+ data points at Telkom Indonesia, and architected a 7-year spatiotemporal coastal water monitoring framework using Google Earth Engine and Mann-Kendall statistical testing. First-author presenter at IEEE ICETISI 2025, skilled at transforming complex time-series and spatial datasets into actionable business dashboards (Streamlit, Tableau) and decision support systems."
                }
              </p>
            </section>

            {/* ===== EXPERIENCE — All 4 ===== */}
            <section style={{ marginBottom: '6px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENGALAMAN PROFESIONAL" : "PROFESSIONAL EXPERIENCE"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {orderedExperiences.map((exp) => (
                  <div key={exp.id} className="exp-item">
                    {/* Role + Period */}
                    <div className="exp-header">
                      <h3 style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{t(exp.role)}</h3>
                      <span style={{ fontSize: '9px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{exp.period}</span>
                    </div>
                    {/* Company | Type | Location */}
                    <div style={{ fontSize: '9px', color: '#1d4ed8', fontWeight: 600, display: 'flex', flexWrap: 'wrap', gap: '0 4px', alignItems: 'center' }}>
                      <span>{exp.company}</span>
                      {exp.type && (
                        <>
                          <span style={{ color: '#cbd5e1', fontWeight: 400 }}>|</span>
                          <span style={{ color: '#475569', fontWeight: 500 }}>{tType(exp.type)}</span>
                        </>
                      )}
                      {exp.location && (
                        <>
                          <span style={{ color: '#cbd5e1', fontWeight: 400 }}>|</span>
                          <span style={{ color: '#475569', fontWeight: 500 }}>{exp.location}</span>
                        </>
                      )}
                    </div>
                    <ul style={{ margin: '1px 0 0 12px', padding: 0, listStyleType: 'disc' }}>
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} style={{ fontSize: '9px', color: '#374151', lineHeight: 1.3, paddingLeft: '2px' }}>
                          {t(bullet)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== EDUCATION ===== */}
            <section style={{ marginBottom: '6px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PENDIDIKAN" : "EDUCATION"}
              </h2>
              <div>
                <div className="exp-header">
                  <h3 style={{ fontSize: '10.5px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{education.institution}</h3>
                  <span style={{ fontSize: '9px', fontWeight: 500, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px' }}>{education.period}</span>
                </div>
                <div style={{ fontSize: '9.5px', color: '#1e293b', fontWeight: 600 }}>{t(education.degree)}</div>
                {education.gpa && (
                  <div style={{ fontSize: '9px', color: '#475569' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "IPK:" : "GPA:"}</span> {education.gpa}
                  </div>
                )}
                <div style={{ fontSize: '9px', color: '#374151', marginTop: '1px' }}>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "Proyek Capstone: " : "Capstone Project: "}</span>
                  {lang === "id"
                    ? "Cloud-Based Coastal Water Quality Monitoring: Analisis Tren Spatiotemporal dan Unsupervised Spectral Clustering via Web-GIS"
                    : "Cloud-Based Coastal Water Quality Monitoring: Spatiotemporal Trend Analysis and Unsupervised Spectral Clustering via Web-GIS"
                  }
                </div>
                {education.courses && (
                  <div style={{ fontSize: '9px', color: '#374151', marginTop: '1px' }}>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{lang === "id" ? "Mata Kuliah Relevan: " : "Relevant Coursework: "}</span>
                    {education.courses.map(c => t(c)).join(", ")}
                  </div>
                )}
              </div>
            </section>

            {/* ===== TECHNICAL SKILLS ===== */}
            <section style={{ marginBottom: '6px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "KOMPETENSI TEKNIS" : "TECHNICAL SKILLS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {(role === "general" || role === "generalist")
                  ? (role === "generalist" ? getGeneralistSkills() : getGeneralSkills()).map((cat, i) => (
                    <div key={i} style={{ fontSize: '9.5px', lineHeight: 1.35 }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{cat.title}:</span>{" "}
                      <span style={{ color: '#374151' }}>{cat.skills}</span>
                    </div>
                  ))
                  : getFilteredSkills().map((cat, i) => (
                    <div key={i} style={{ fontSize: '9.5px', lineHeight: 1.35 }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{t(cat.title)}:</span>{" "}
                      <span style={{ color: '#374151' }}>
                        {cat.skills.map(s => s.name).join(", ")}
                      </span>
                    </div>
                  ))
                }
              </div>
            </section>

            {/* ===== SELECTED PROJECTS — 3 projects ===== */}
            <section style={{ marginBottom: '6px' }}>
              <h2 className="cv-section-title">
                {lang === "id" ? "PROYEK UNGGULAN" : "SELECTED PROJECTS"}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {topProjects.map((proj) => (
                  <div key={proj.slug} className="project-item">
                    <div className="exp-header">
                      <h3 style={{ fontSize: '10px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {typeof proj.title === 'string' ? proj.title : t(proj.title)}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} style={{ fontSize: '8.5px', color: '#1d4ed8', fontWeight: 500, marginLeft: '4px', textDecoration: 'none' }}>
                            (GitHub)
                          </a>
                        )}
                      </h3>
                    </div>
                    <p style={{ fontSize: '9.5px', color: '#374151', lineHeight: 1.35, margin: '1px 0 0 0' }}>
                      {t(proj.description)}
                    </p>
                    <p style={{ fontSize: '8.5px', color: '#64748b', fontWeight: 500, fontFamily: "'SF Mono', 'Fira Code', monospace", margin: '1px 0 0 0' }}>
                      {proj.technologies.slice(0, 6).join(", ")}
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
                  <div key={cert.id} className="cert-item" style={{ fontSize: '9.5px', color: '#374151', lineHeight: 1.35 }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>{t(cert.name)}</span>
                    {" | "}{cert.issuer} ({cert.date})
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
