"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/data/translations";
import { AnimatedSection, AnimatedDiv } from "@/components/ui/AnimatedSection";

const socialLinks = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=iyanferdiansyach30@gmail.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "hover:border-red-400/50 hover:bg-red-400/10",
    iconColor: "group-hover:text-red-400 text-slate-300",
    desc: "iyanferdiansyach30@gmail.com"
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/628886007599",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    color: "hover:border-green-400/50 hover:bg-green-400/10",
    iconColor: "group-hover:text-green-400 text-slate-300",
    desc: "+62 888 6007 599"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ferdiansyach-845930246/",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    color: "hover:border-blue-400/50 hover:bg-blue-400/10",
    iconColor: "group-hover:text-blue-400 text-slate-300",
    desc: "ferdiansyach-845930246"
  },
  {
    label: "GitHub",
    href: "https://github.com/ferdiansyach",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: "hover:border-slate-400/50 hover:bg-slate-400/10",
    iconColor: "group-hover:text-slate-100 text-slate-300",
    desc: "@ferdiansyach"
  },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xkopedgv", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <AnimatedSection id="contact" className="py-32 container mx-auto px-6">
      <AnimatedDiv className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-rose-400/10 via-fuchsia-500/10 to-violet-500/10 border border-rose-400/15 rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />

          <div className="text-center mb-12 relative z-10">
            <p className="text-rose-400 font-semibold text-sm tracking-[0.2em] uppercase mb-3">
              {t(translations.contact.label)}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t(translations.contact.title)}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t(translations.contact.description)}
            </p>

            {/* Availability badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-sm font-medium">
                {t(translations.hero.availableBadge)}
              </span>
            </div>
          </div>

          {/* ───── Contact Form ───── */}
          <div className="relative z-10 max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-white mb-2">
                    {t(translations.contact.formName)}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 transition-all duration-300"
                    placeholder={t(translations.contact.formName)}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-white mb-2">
                    {t(translations.contact.formEmail)}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 transition-all duration-300"
                    placeholder={t(translations.contact.formEmail)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-white mb-2">
                  {t(translations.contact.formMessage)}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/30 transition-all duration-300 resize-none"
                  placeholder={t(translations.contact.formMessage)}
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                whileTap={{ scale: 0.97 }}
              >
                {status === "sending" ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
              </motion.button>

              {/* Status messages */}
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t(translations.contact.formSuccess)}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t(translations.contact.formError)}
                </motion.p>
              )}
            </form>
          </div>

          {/* Divider */}
          <div className="relative z-10 flex items-center gap-4 max-w-2xl mx-auto mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-700/60" />
            <span className="text-slate-500 text-sm font-medium whitespace-nowrap">
              {t(translations.contact.orReachOut)}
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-700/60" />
          </div>

          {/* Social Links */}
          <div className="relative z-10">
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 px-6 py-5 rounded-2xl font-medium transition-all duration-300 bg-slate-800/40 border border-slate-700/50 text-slate-200 hover:-translate-y-1 hover:shadow-xl group ${link.color}`}
                >
                  <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform shadow-sm ${link.iconColor}`}>
                    {link.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white tracking-wide">{link.label}</span>
                    <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors mt-0.5">{link.desc}</span>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Response time */}
            <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
              <svg className="w-4 h-4 text-emerald-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t({ id: "Biasanya membalas dalam 24 jam", en: "Usually responds within 24 hours" })}</span>
            </div>
          </div>
        </div>
      </AnimatedDiv>
    </AnimatedSection>
  );
}
