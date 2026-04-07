"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const socialLinks = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&to=iyanferdiansyach30@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "hover:border-red-400/30 hover:bg-red-400/10",
    iconColor: "group-hover:text-red-400",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/628886007599",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    color: "hover:border-green-400/30 hover:bg-green-400/10",
    iconColor: "group-hover:text-green-400",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ferdiansyach-845930246/",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: "hover:border-blue-400/30 hover:bg-blue-400/10",
    iconColor: "group-hover:text-blue-400",
  },
  {
    label: "GitHub",
    href: "https://github.com/ferdiansyach",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:border-slate-400/30 hover:bg-slate-400/10",
    iconColor: "group-hover:text-slate-300",
  },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:iyanferdiansyach30@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setFormState("success");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setFormState("idle"), 4000);
  };

  return (
    <AnimatedSection id="contact" className="py-32 container mx-auto px-6">
      <AnimatedDiv className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-sky-400/10 via-indigo-500/10 to-purple-500/10 border border-sky-400/15 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="text-center mb-10 relative z-10">
            <p className="text-sky-400 font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              {t(translations.contact.label)}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t(translations.contact.title)}
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">
              {t(translations.contact.description)}
            </p>

            {/* Availability badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-sm font-medium">
                {t(translations.hero.availableBadge)}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1.5">
                  {t(translations.contact.formName)}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1.5">
                  {t(translations.contact.formEmail)}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1.5">
                  {t(translations.contact.formMessage)}
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all resize-none"
                  placeholder="..."
                />
              </div>

              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {formState === "sending" ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t(translations.contact.formSending)}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t(translations.contact.formSend)}
                  </>
                )}
              </button>

              {formState === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm text-center font-medium"
                >
                  ✓ {t(translations.contact.formSuccess)}
                </motion.p>
              )}
            </form>

            {/* Social links with brand colors */}
            <div className="flex flex-col justify-center">
              <p className="text-slate-400 text-sm font-medium mb-4">
                {t(translations.contact.orReachOut)}
              </p>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 bg-slate-800/60 border border-slate-700 text-slate-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(56,189,248,0.2)] group ${link.color}`}
                  >
                    <span className={`group-hover:scale-110 transition-transform ${link.iconColor}`}>{link.icon}</span>
                    {link.label}
                    <svg className="w-4 h-4 ml-auto text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ))}
              </div>

              {/* Response time */}
              <div className="mt-6 flex items-center gap-2 text-slate-500 text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t({ id: "Biasanya membalas dalam 24 jam", en: "Usually responds within 24 hours" })}</span>
              </div>
            </div>
          </div>
        </div>
      </AnimatedDiv>
    </AnimatedSection>
  );
}
