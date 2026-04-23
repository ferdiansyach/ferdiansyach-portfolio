import { Experience, Education } from "@/types";

export const experiences: Experience[] = [
  {
    id: "telkom",
    role: { id: "Business Development Intern", en: "Business Development Intern" },
    company: "Telkom Indonesia — Infranexia",
    period: "April 2025 — September 2025",
    isCurrent: false,
    bullets: [
      {
        id: "Memimpin analisis tekno-ekonomi efisiensi energi gedung pintar dan mengembangkan model AI prediktif yang meningkatkan akurasi prediksi konsumsi energi hingga 92%.",
        en: "Led techno-economic analysis on smart building energy efficiency and developed a predictive AI model that achieved 92% accuracy in energy consumption forecasting.",
      },
      {
        id: "Merancang pipeline data end-to-end dari preprocessing hingga deployment model (Gradient Boosting, LSTM), memproses 50.000+ data poin untuk menghasilkan insight yang actionable.",
        en: "Engineered an end-to-end data pipeline from preprocessing to model deployment (Gradient Boosting, LSTM), processing 50,000+ data points to generate actionable insights.",
      },
      {
        id: "Berkolaborasi dengan tim lintas fungsi (3 divisi) dalam merancang dan meluncurkan platform magang berbasis web yang digunakan oleh 100+ peserta magang.",
        en: "Collaborated with cross-functional teams (3 divisions) to design and launch a web-based internship platform serving 100+ interns.",
      },
    ],
  },
  {
    id: "labassist",
    role: { id: "Asisten Laboratorium Komputer", en: "Computer Laboratory Assistant" },
    company: "Lab Data Monotize — Universitas Nasional",
    period: "September 2024 — September 2025",
    isCurrent: false,
    bullets: [
      {
        id: "Memberikan dukungan teknis dan troubleshooting untuk 30+ unit komputer laboratorium, memastikan ketersediaan perangkat sebesar 98% selama jam operasional.",
        en: "Provided technical support and troubleshooting for 30+ lab computers, ensuring 98% device availability during operational hours.",
      },
      {
        id: "Melakukan pemeliharaan berkala, instalasi perangkat lunak, dan konfigurasi sistem untuk mendukung kegiatan praktikum 200+ mahasiswa per semester.",
        en: "Performed periodic maintenance, software installations, and system configuration to support lab sessions for 200+ students per semester.",
      },
    ],
  },
  {
    id: "himasi",
    role: { id: "Asisten Litbang", en: "Research & Development Assistant" },
    company: "HIMASI Universitas Nasional",
    period: "Juni 2024 — Maret 2025",
    bullets: [
      {
        id: "Memimpin seminar teknologi nasional sebagai Ketua Pelaksana dengan 150+ peserta, mengoordinasikan 15 anggota panitia dari perencanaan hingga pelaksanaan.",
        en: "Led a national technology seminar as Chief Executive with 150+ attendees, coordinating 15 committee members from planning to execution.",
      },
      {
        id: "Mengembangkan dan mengelola website resmi himpunan menggunakan WordPress, meningkatkan traffic website 40% dan engagement anggota melalui konten terstruktur.",
        en: "Developed and managed the association's official WordPress website, increasing website traffic by 40% and member engagement through structured content.",
      },
    ],
  },
  {
    id: "unasfest",
    role: { id: "Fullstack Developer Committee", en: "Fullstack Developer Committee" },
    company: "Universitas Nasional Festival (UNAS FEST)",
    period: "April 2024 — November 2024",
    bullets: [
      {
        id: "Mengembangkan 10+ komponen website responsif menggunakan TypeScript dan Tailwind CSS, mencapai skor Lighthouse 90+ untuk performa dan aksesibilitas.",
        en: "Developed 10+ responsive website components using TypeScript and Tailwind CSS, achieving a Lighthouse score of 90+ for performance and accessibility.",
      },
      {
        id: "Melakukan pengujian dan debugging komprehensif yang mengurangi bug rate sebesar 60%, memastikan stabilitas optimal pada rilis produksi.",
        en: "Conducted comprehensive testing and debugging that reduced bug rate by 60%, ensuring optimal stability for the production release.",
      },
    ],
  },
  {
    id: "anambas",
    role: { id: "Front End Developer", en: "Front End Developer" },
    company: "Anambas Website Project",
    period: "Agustus 2024 — Oktober 2024",
    bullets: [
      {
        id: "Mengembangkan 8+ komponen UI interaktif dan responsif untuk platform pariwisata dengan Next.js, mengoptimalkan loading gambar beresolusi tinggi hingga 50% lebih cepat.",
        en: "Developed 8+ interactive and responsive UI components for a tourism platform with Next.js, optimizing high-resolution image loading by 50%.",
      },
      {
        id: "Merancang arsitektur front-end modular dan menerapkan lazy loading serta Next.js Image optimization, meningkatkan Core Web Vitals score secara signifikan.",
        en: "Designed modular front-end architecture and implemented lazy loading with Next.js Image optimization, significantly improving Core Web Vitals scores.",
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
  period: "2022 — 2026",
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
