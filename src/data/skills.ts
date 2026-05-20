import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: { id: "Frontend", en: "Frontend" },
    skills: [
      { 
        name: "React", 
        icon: "react", 
        color: "#61DAFB", 
        proficiency: "advanced",
        usageContext: { id: "Indosaji E-commerce, UNAS FEST", en: "Indosaji E-commerce, UNAS FEST" }
      },
      { 
        name: "Next.js", 
        icon: "nextjs", 
        color: "#ffffff", 
        proficiency: "intermediate",
        usageContext: { id: "UNAS FEST, Portofolio ini", en: "UNAS FEST, This portfolio" }
      },
      { 
        name: "TypeScript", 
        icon: "typescript", 
        color: "#3178C6", 
        proficiency: "intermediate",
        usageContext: { id: "UNAS FEST, Portofolio ini", en: "UNAS FEST, This portfolio" }
      },
      { 
        name: "HTML/CSS", 
        icon: "html", 
        color: "#E34F26", 
        proficiency: "advanced",
        usageContext: { id: "Semua proyek web", en: "All web projects" }
      },
      { 
        name: "Tailwind CSS", 
        icon: "tailwind", 
        color: "#06B6D4", 
        proficiency: "advanced",
        usageContext: { id: "UNAS FEST, Portofolio ini", en: "UNAS FEST, This portfolio" }
      },
    ],
  },
  {
    title: { id: "Backend & DB", en: "Backend & DB" },
    skills: [
      { 
        name: "Node.js", 
        icon: "nodejs", 
        color: "#339933", 
        proficiency: "intermediate",
        usageContext: { id: "Indosaji E-commerce (API)", en: "Indosaji E-commerce (API)" }
      },
      { 
        name: "Express.js", 
        icon: "express", 
        color: "#ffffff", 
        proficiency: "intermediate",
        usageContext: { id: "Indosaji E-commerce (Router)", en: "Indosaji E-commerce (Router)" }
      },
      { 
        name: "REST API", 
        icon: "api", 
        color: "#FF6C37", 
        proficiency: "intermediate",
        usageContext: { id: "Indosaji E-commerce, Telkom Intern", en: "Indosaji E-commerce, Telkom Intern" }
      },
      { 
        name: "MongoDB", 
        icon: "mongodb", 
        color: "#47A248", 
        proficiency: "intermediate",
        usageContext: { id: "Indosaji E-commerce Database", en: "Indosaji E-commerce Database" }
      },
      { 
        name: "SQL", 
        icon: "sql", 
        color: "#4479A1", 
        proficiency: "intermediate",
        usageContext: { id: "Analisis data & database relasional", en: "Data analysis & relational DB" }
      },
    ],
  },
  {
    title: { id: "Data & ML", en: "Data & ML" },
    skills: [
      { 
        name: "Python", 
        icon: "python", 
        color: "#3776AB", 
        proficiency: "advanced",
        usageContext: { id: "Smart Meter Analysis Telkom, Capstone Project", en: "Telkom Smart Meter Analysis, Capstone Project" }
      },
      { 
        name: "LSTM", 
        icon: "ml", 
        color: "#FF6F00", 
        proficiency: "intermediate",
        usageContext: { id: "Forecasting Konsumsi Energi Telkom", en: "Telkom Energy Consumption Forecasting" }
      },
      { 
        name: "XGBoost", 
        icon: "ml", 
        color: "#FF6F00", 
        proficiency: "intermediate",
        usageContext: { id: "Deteksi Anomali Smart Meter Telkom", en: "Telkom Smart Meter Anomaly Detection" }
      },
      { 
        name: "Pandas", 
        icon: "pandas", 
        color: "#150458", 
        proficiency: "intermediate",
        usageContext: { id: "Preprocessing 50.000+ data Telkom", en: "Telkom 50,000+ data preprocessing" }
      },
      { 
        name: "Streamlit", 
        icon: "streamlit", 
        color: "#FF4B4B", 
        proficiency: "intermediate",
        usageContext: { id: "Dashboard Real-time Smart Meter Telkom", en: "Telkom Smart Meter Real-time Dashboard" }
      },
    ],
  },
  {
    title: { id: "DevOps & Tools", en: "DevOps & Tools" },
    skills: [
      { 
        name: "Git", 
        icon: "git", 
        color: "#F05032", 
        proficiency: "intermediate",
        usageContext: { id: "Version control semua proyek", en: "Version control on all projects" }
      },
      { 
        name: "Docker", 
        icon: "docker", 
        color: "#2496ED", 
        proficiency: "beginner", 
        isLearning: true,
        usageContext: { id: "Eksplorasi kontainerisasi aplikasi", en: "App containerization exploration" }
      },
      { 
        name: "Google Cloud", 
        icon: "gcloud", 
        color: "#4285F4", 
        proficiency: "beginner",
        usageContext: { id: "Hosting & Cloud computing", en: "Hosting & Cloud computing" }
      },
      { 
        name: "Figma", 
        icon: "figma", 
        color: "#F24E1E", 
        proficiency: "beginner",
        usageContext: { id: "Desain UI/UX & Wireframing", en: "UI/UX Design & Wireframing" }
      },
      { 
        name: "WordPress", 
        icon: "wordpress", 
        color: "#21759B", 
        proficiency: "advanced",
        usageContext: { id: "Website Resmi HIMASI UNAS", en: "Official HIMASI UNAS Website" }
      },
    ],
  },
];
