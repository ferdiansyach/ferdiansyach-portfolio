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
        id: "Memimpin analisis tekno-ekonomi untuk efisiensi energi gedung pintar, mengembangkan model AI prediktif.",
        en: "Led a techno-economic analysis on smart building energy efficiency, developing a predictive AI model.",
      },
      {
        id: "Mengembangkan pipeline data end-to-end mulai dari pemrosesan hingga pelatihan model (Gradient Boosting, LSTM).",
        en: "Developed an end-to-end data pipeline from processing to model training (Gradient Boosting, LSTM).",
      },
      {
        id: "Berkolaborasi dalam merancang dan menerapkan platform magang berbasis web.",
        en: "Collaborated in designing and deploying a web-based internship platform.",
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
        id: "Memberikan dukungan teknis untuk peralatan dan perangkat lunak laboratorium.",
        en: "Provided technical support for laboratory equipment and software.",
      },
      {
        id: "Melakukan pemeliharaan berkala dan instalasi perangkat lunak di komputer lab.",
        en: "Performed periodic maintenance and software installation on lab computers.",
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
        id: "Memimpin seminar teknologi sebagai Ketua Pelaksana, mengelola acara dari perencanaan hingga eksekusi.",
        en: "Led a technology seminar as Chief Executive, managing the event from planning to execution.",
      },
      {
        id: "Turut mengembangkan dan mengelola website resmi himpunan menggunakan WordPress, meningkatkan keterlibatan anggota.",
        en: "Co-developed and managed the association's official WordPress website, increasing member engagement.",
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
        id: "Mengembangkan komponen website yang responsif menggunakan TypeScript dan Tailwind CSS.",
        en: "Developed responsive website components using TypeScript and Tailwind CSS.",
      },
      {
        id: "Menguji dan melakukan debug pada komponen untuk memastikan stabilitas dan performa optimal.",
        en: "Tested and debugged components to ensure optimal stability and performance.",
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
        id: "Mengembangkan komponen UI yang menarik dan responsif untuk proyek pariwisata.",
        en: "Developed attractive and responsive UI components for a tourism project.",
      },
      {
        id: "Berkolaborasi dalam arsitektur front-end untuk meningkatkan performa website.",
        en: "Collaborated on front-end architecture to enhance website performance.",
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
