import type { Metadata } from "next";
import { Anton, Gugi, Vina_Sans } from "next/font/google";
import { MotionRoot } from "@/components/providers/MotionRoot";
import "./globals.css";

const vinaSans = Vina_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vina-sans",
});

const gugi = Gugi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gugi",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "Masum Ahmed — UI/UX Designer",
  description:
    "I transform complex ideas into intuitive, visually compelling digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${vinaSans.variable} ${gugi.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
