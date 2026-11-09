import type { Metadata } from "next";

import { ProjectsPage } from "@/components/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects — Masum Ahmed",
  description:
    "A curated selection of products, systems, and digital experiences by Masum Ahmed.",
};

export default function Projects() {
  return <ProjectsPage />;
}
