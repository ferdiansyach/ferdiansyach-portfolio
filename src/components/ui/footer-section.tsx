'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, MessageSquare, Terminal, FileCode2, Award, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/data/translations';

interface FooterLink {
	title: { id: string; en: string } | string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: { id: string; en: string } | string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: { id: 'Navigasi', en: 'Navigation' },
		links: [
			{ title: translations.nav.about, href: '#about' },
			{ title: translations.nav.skills, href: '#skills', icon: Code2 },
			{ title: translations.nav.projects, href: '#projects', icon: FileCode2 },
			{ title: translations.nav.experience, href: '#experience', icon: Briefcase },
		],
	},
	{
		label: { id: 'Kredensial', en: 'Credentials' },
		links: [
			{ title: translations.nav.education, href: '#education', icon: GraduationCap },
			{ title: translations.nav.certifications, href: '#certifications', icon: Award },
			{ title: { id: 'Kontak Langsung', en: 'Direct Contact' }, href: '#contact', icon: Mail },
		],
	},
	{
		label: { id: 'Tautan Sosial', en: 'Social Links' },
		links: [
			{ title: 'GitHub', href: 'https://github.com/ferdiansyach', icon: FaGithub },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/ferdiansyach-845930246/', icon: FaLinkedin },
			{ title: 'WhatsApp', href: 'https://wa.me/628886007599', icon: MessageSquare },
			{ title: 'Email', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=iyanferdiansyach30@gmail.com', icon: Mail },
		],
	},
];

export function Footer() {
	const { t } = useLanguage();

	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-[var(--color-hairline)] bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16 mt-20">
			<div className="bg-[var(--color-primary)]/40 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)]">
							<Terminal className="size-6" />
						</div>
						<span className="text-xl font-serif font-bold text-[var(--color-ink)]">
							Ferdiansyach
						</span>
					</div>
					<p className="text-[var(--color-body)] text-xs leading-relaxed max-w-xs">
						Fullstack Developer, Data Analyst & AI Engineer. Fresh Graduate Sistem Informasi Universitas Nasional.
					</p>
					<p className="text-[var(--color-muted)] mt-8 text-xs md:mt-0 font-mono">
						© {new Date().getFullYear()} Ferdiansyach. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={typeof section.label === 'string' ? section.label : section.label.en} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
									{typeof section.label === 'string' ? section.label : t(section.label)}
								</h3>
								<ul className="text-[var(--color-body)] mt-4 space-y-2.5 text-sm">
									{section.links.map((link) => {
										const titleText = typeof link.title === 'string' ? link.title : t(link.title);
										const isExternal = link.href.startsWith('http');
										return (
											<li key={titleText}>
												<a
													href={link.href}
													target={isExternal ? '_blank' : undefined}
													rel={isExternal ? 'noopener noreferrer' : undefined}
													className="hover:text-[var(--color-primary)] inline-flex items-center gap-2 transition-all duration-300 group"
												>
													{link.icon && <link.icon className="size-4 text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors" />}
													<span>{titleText}</span>
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
