import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: { id: "Frontend", en: "Frontend" },
    skills: [
      { name: "React", icon: "react", color: "#61DAFB", proficiency: "advanced" },
      { name: "Next.js", icon: "nextjs", color: "#ffffff", proficiency: "intermediate" },
      { name: "TypeScript", icon: "typescript", color: "#3178C6", proficiency: "intermediate" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4", proficiency: "advanced" },
      { name: "HTML/CSS", icon: "html", color: "#E34F26", proficiency: "advanced" },
    ],
  },
  {
    title: { id: "Backend", en: "Backend" },
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
      { name: "Machine Learning", icon: "ml", color: "#FF6F00", proficiency: "intermediate" },
      { name: "Pandas", icon: "pandas", color: "#150458", proficiency: "intermediate" },
      { name: "R", icon: "r", color: "#276DC3", proficiency: "beginner" },
      { name: "Streamlit", icon: "streamlit", color: "#FF4B4B", proficiency: "intermediate" },
    ],
  },
  {
    title: { id: "Tools & Lainnya", en: "Tools & Others" },
    skills: [
      { name: "Git", icon: "git", color: "#F05032", proficiency: "intermediate" },
      { name: "WordPress", icon: "wordpress", color: "#21759B", proficiency: "advanced" },
      { name: "VS Code", icon: "vscode", color: "#007ACC", proficiency: "advanced" },
      { name: "Figma", icon: "figma", color: "#F24E1E", proficiency: "beginner" },
      { name: "Docker", icon: "docker", color: "#2496ED", proficiency: "beginner", isLearning: true },
      { name: "Laravel", icon: "laravel", color: "#FF2D20", proficiency: "beginner", isLearning: true },
    ],
  },
];
