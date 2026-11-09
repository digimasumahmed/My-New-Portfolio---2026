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

const themeInitScript = `(function(){try{var s=localStorage.getItem('masum-theme');var t=s==='light'||s==='dark'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${vinaSans.variable} ${gugi.variable} ${anton.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
