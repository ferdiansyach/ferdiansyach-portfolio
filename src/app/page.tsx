"use client";

import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main>
          <HeroSection />
          <div className="section-divider" />
          <AboutSection />
          <div className="section-divider" />
          <StatsSection />
          <div className="section-divider" />
          <SkillsSection />
          <div className="section-divider" />
          <ProjectsSection />
          <div className="section-divider" />
          <ExperienceSection />
          <div className="section-divider" />
          <EducationSection />
          <div className="section-divider" />
          <CertificationsSection />
          <div className="section-divider" />
          <TestimonialsSection />
          <div className="section-divider" />
          <ContactSection />
        </main>
        <Footer />
        <ScrollToTop />
      </LanguageProvider>
    </ThemeProvider>
  );
}
