import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProjectDetailPage } from "@/components/ProjectDetailPage";
import {
  getAllProjectDetailSlugs,
  getProjectDetail,
} from "@/data/project-details";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) {
    return { title: "Project — Masum Ahmed" };
  }
  return {
    title: `${project.title} — Masum Ahmed`,
    description: project.overview,
  };
}

async function ProjectDetailContent({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}

export default function ProjectDetailRoute({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
