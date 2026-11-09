import type { Metadata } from "next";

import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Masum Ahmed",
  description:
    "Let's build something extraordinary. Open to full-time roles and selected freelance projects.",
};

export default function Contact() {
  return <ContactPage />;
}
