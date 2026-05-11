import { Experience, Education } from "@/types";

export const experiences: Experience[] = [
  {
    id: "telkom",
    role: { id: "Business Intelligence & ML Intern", en: "Business Intelligence & ML Intern" },
    company: "Telkom Indonesia — Infranexia",
    type: "Internship",
    location: "Jakarta, ID",
    period: "Apr 2025 – Sep 2025",
    isCurrent: false,
    bullets: [
      {
        id: "Mengembangkan model AI prediktif menggunakan LSTM dan Gradient Boosting yang mencapai akurasi 92% dalam peramalan konsumsi energi gedung pintar, mendukung langsung divisi analisis tekno-ekonomi.",
        en: "Engineered a predictive AI model using LSTM and Gradient Boosting that achieved 92% accuracy in smart building energy consumption forecasting, directly supporting the techno-economic analysis division.",
      },
      {
        id: "Merancang pipeline data end-to-end dari ingest mentah hingga deployment model (LSTM, XGBoost), memproses 50.000+ data poin dan menghasilkan insight yang actionable untuk optimasi efisiensi energi.",
        en: "Architected an end-to-end data pipeline from raw ingestion through preprocessing to model deployment (LSTM, XGBoost), processing 50,000+ data points and generating actionable insights for energy efficiency optimization.",
      },
      {
        id: "Mengembangkan platform manajemen magang berbasis web bekerja sama dengan 3 divisi lintas fungsi, melayani 100+ peserta magang dan mengurangi overhead koordinasi onboarding.",
        en: "Developed a web-based internship management platform in collaboration with 3 cross-functional divisions, serving 100+ interns and reducing onboarding coordination overhead.",
      },
    ],
  },
  {
    id: "labassist",
    role: { id: "Asisten Laboratorium Komputer", en: "Computer Laboratory Assistant" },
    company: "Lab Data Monetize — Universitas Nasional",
    type: "Student Organization",
    location: "Jakarta, ID",
    period: "Sep 2024 – Sep 2025",
    isCurrent: false,
    bullets: [
      {
        id: "Memelihara dan men-troubleshoot 30+ unit komputer laboratorium, mempertahankan ketersediaan perangkat sebesar 98% selama jam operasional dan meminimalkan downtime sesi untuk 200+ mahasiswa per semester.",
        en: "Maintained and troubleshot 30+ laboratory computer units, sustaining 98% device availability during operational hours and minimizing session downtime for 200+ students per semester.",
      },
      {
        id: "Mengoptimalkan alur instalasi perangkat lunak dan konfigurasi sistem, mendukung kegiatan praktikum 200+ mahasiswa per semester melalui prosedur pemeliharaan terstandarisasi.",
        en: "Optimized software installation and system configuration workflows, supporting lab sessions for 200+ students per semester through standardized maintenance procedures.",
      },
    ],
  },
  {
    id: "himasi",
    role: { id: "Asisten Riset & Pengembangan", en: "Research & Development Assistant" },
    company: "HIMASI — Universitas Nasional",
    type: "Student Organization",
    location: "Jakarta, ID",
    period: "Jun 2024 – Mar 2025",
    bullets: [
      {
        id: "Mengorkestrasi seminar teknologi nasional sebagai Ketua Pelaksana, mengoordinasikan 15 anggota panitia dari perencanaan hingga pelaksanaan, dan berhasil menghadirkan 150+ peserta tepat waktu.",
        en: "Orchestrated a national technology seminar as Chief Executive, coordinating 15 committee members from planning to execution and successfully delivering the event to 150+ attendees on schedule.",
      },
      {
        id: "Mengembangkan dan mengelola website resmi himpunan menggunakan WordPress, meningkatkan traffic website sebesar 40% dan mendorong keterlibatan anggota melalui konten terstruktur yang dioptimalkan SEO.",
        en: "Developed and managed the association's official WordPress website, increasing website traffic by 40% and driving member engagement through structured, SEO-optimized content.",
      },
    ],
  },
  {
    id: "unasfest",
    role: { id: "Fullstack Developer", en: "Fullstack Developer" },
    company: "UNAS FEST — Universitas Nasional Festival",
    type: "Student Organization",
    location: "Jakarta, ID",
    period: "Apr 2024 – Nov 2024",
    bullets: [
      {
        id: "Mengembangkan 10+ komponen website responsif menggunakan TypeScript dan Tailwind CSS, mencapai skor Lighthouse 90+ untuk performa dan aksesibilitas pada portal festival resmi.",
        en: "Developed 10+ responsive website components using TypeScript and Tailwind CSS, achieving a Lighthouse score of 90+ for performance and accessibility on the official festival portal.",
      },
      {
        id: "Merancang pipeline pengujian dan debugging komprehensif yang mengurangi bug rate produksi sebesar 60%, memastikan stabilitas optimal untuk rilis publik yang digunakan seluruh civitas universitas.",
        en: "Engineered a comprehensive testing and debugging pipeline that reduced the production bug rate by 60%, ensuring optimal stability for the public release used by the entire university community.",
      },
    ],
  },
];

export const education: Education = {
  institution: "Universitas Nasional",
  degree: {
    id: "Sarjana Komputer (S.Kom) — Sistem Informasi",
    en: "Bachelor of Computer Science (S.Kom) — Information Systems",
  },
  period: "2022 – 2026",
  gpa: "3.77",
  courses: [
    { id: "Pemrograman Web", en: "Web Programming" },
    { id: "Basis Data", en: "Database Systems" },
    { id: "Rekayasa Perangkat Lunak", en: "Software Engineering" },
    { id: "Kecerdasan Buatan", en: "Artificial Intelligence" },
    { id: "Analisis & Perancangan Sistem", en: "System Analysis & Design" },
    { id: "Jaringan Komputer", en: "Computer Networks" },
  ],
};
