import type { Metadata } from "next";

import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About — Masum Ahmed",
  description:
    "The person behind the pixels — UI/UX designer Masum Ahmed on craft, experience, and design philosophy.",
};

export default function About() {
  return <AboutPage />;
}
