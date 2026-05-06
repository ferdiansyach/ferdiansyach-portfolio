import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: { id: "Frontend", en: "Frontend" },
    skills: [
      { name: "React", icon: "react", color: "#61DAFB", proficiency: "advanced" },
      { name: "Next.js", icon: "nextjs", color: "#ffffff", proficiency: "intermediate" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", proficiency: "intermediate" },
      { name: "HTML/CSS", icon: "html", color: "#E34F26", proficiency: "advanced" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4", proficiency: "advanced" },
    ],
  },
  {
    title: { id: "Backend & DB", en: "Backend & DB" },
    skills: [
      { name: "Node.js", icon: "nodejs", color: "#339933", proficiency: "intermediate" },
      { name: "Express.js", icon: "express", color: "#ffffff", proficiency: "intermediate" },
      { name: "REST API", icon: "api", color: "#FF6C37", proficiency: "intermediate" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248", proficiency: "intermediate" },
      { name: "SQL", icon: "sql", color: "#4479A1", proficiency: "intermediate" },
    ],
  },
  {
    title: { id: "Data & ML", en: "Data & ML" },
    skills: [
      { name: "Python", icon: "python", color: "#3776AB", proficiency: "advanced" },
      { name: "LSTM", icon: "ml", color: "#FF6F00", proficiency: "intermediate" },
      { name: "XGBoost", icon: "ml", color: "#FF6F00", proficiency: "intermediate" },
      { name: "Pandas", icon: "pandas", color: "#150458", proficiency: "intermediate" },
      { name: "Streamlit", icon: "streamlit", color: "#FF4B4B", proficiency: "intermediate" },
    ],
  },
  {
    title: { id: "DevOps & Tools", en: "DevOps & Tools" },
    skills: [
      { name: "Git", icon: "git", color: "#F05032", proficiency: "intermediate" },
      { name: "Docker", icon: "docker", color: "#2496ED", proficiency: "beginner", isLearning: true },
      { name: "Google Cloud", icon: "gcloud", color: "#4285F4", proficiency: "beginner" },
      { name: "Figma", icon: "figma", color: "#F24E1E", proficiency: "beginner" },
      { name: "WordPress", icon: "wordpress", color: "#21759B", proficiency: "advanced" },
    ],
  },
];
