import type { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import ProjectPageClient from "./ProjectPageClient";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ferdiansyach Portfolio",
    };
  }

  const title = `${project.title} | Ferdiansyach Portfolio`;
  const description = project.description.id || project.description.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: project.thumbnail }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectPageClient slug={slug} />;
}
