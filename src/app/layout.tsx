import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferdiansyach | Fullstack Developer & Data Analyst",
  description:
    "Portfolio profesional Ferdiansyach — Fresh Graduate Sistem Informasi, Universitas Nasional. Fullstack Developer & Data Analyst dengan keahlian dalam React, Next.js, Python, dan Machine Learning.",
  keywords: [
    "Ferdiansyach",
    "Fullstack Developer",
    "Data Analyst",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
    "Sistem Informasi",
    "Jakarta",
    "Fresh Graduate",
    "Web Developer",
    "Machine Learning",
  ],
  authors: [{ name: "Ferdiansyach" }],
  creator: "Ferdiansyach",
  openGraph: {
    title: "Ferdiansyach — Fullstack Developer & Data Analyst",
    description:
      "Fresh Graduate Sistem Informasi dengan fokus pada web development dan data analysis. Siap berkontribusi pada proyek inovatif.",
    type: "website",
    locale: "id_ID",
    siteName: "Ferdiansyach Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferdiansyach — Fullstack Developer & Data Analyst",
    description:
      "Fresh Graduate Sistem Informasi. React, Next.js, Python, Machine Learning.",
  },
  robots: "index, follow",
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ferdiansyach",
  jobTitle: "Fullstack Developer & Data Analyst",
  url: "https://ferdiansyach-portfolio.vercel.app",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universitas Nasional",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "Data Analysis",
    "Node.js",
    "MongoDB",
  ],
  sameAs: [
    "https://github.com/ferdiansyach",
    "https://www.linkedin.com/in/ferdiansyach-845930246/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
