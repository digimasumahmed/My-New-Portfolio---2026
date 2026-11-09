"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
  { id: "figma", src: "/tools/figma.svg", alt: "Figma" },
  { id: "openai", src: "/tools/openai.svg", alt: "OpenAI" },
  { id: "framer", src: "/tools/framer.svg", alt: "Framer" },
  { id: "photoshop", src: "/tools/photoshop.svg", alt: "Adobe Photoshop" },
  { id: "vscode", src: "/tools/vscode.svg", alt: "VS Code" },
  { id: "webflow", src: "/tools/webflow.svg", alt: "Webflow" },
  { id: "notion", src: "/tools/notion.svg", alt: "Notion" },
  { id: "analytics", src: "/tools/analytics.svg", alt: "Analytics" },
] as const;

export function Tools() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(
    rootRef,
    () => {
      const title = rootRef.current?.querySelector("[data-tools-title]");
      if (title) {
        gsap.fromTo(
          title,
          { clipPath: "inset(100% 0 0 0)", y: 40 },
          {
            clipPath: "inset(0% 0 0 0)",
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
            },
          },
        );

        gsap.to(title, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      gsap.from("[data-tool-item]", {
        opacity: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-tools-track]"),
          start: "top 85%",
        },
      });
    },
    [],
  );

  const track = [...TOOLS, ...TOOLS];

  return (
    <section
      ref={rootRef}
      id="tools"
      className="relative w-full overflow-hidden bg-white"
      aria-label="Tools I use"
    >
      <div className="relative mx-auto w-full max-w-[1920px] pt-8 sm:pt-10 md:pt-[50px]">
        <div className="relative mx-auto flex w-full max-w-[1840px] justify-center overflow-hidden px-4 sm:px-6 md:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-tools-title
            src="/tools/title-tools.png"
            alt="Tools I use"
            width={1792}
            height={364}
            className="h-auto w-full max-w-[1840px] will-change-transform"
          />
        </div>

        <div className="mt-4 border-y border-solid border-[#1e1e1e] py-2 sm:mt-6 md:mt-[clamp(24px,2vw,50px)] md:py-2.5">
          <div data-tools-track className="overflow-hidden">
            <div className="tools-marquee flex w-max gap-2 px-4 sm:px-6 md:px-10">
              {track.map((tool, index) => (
                <div
                  key={`${tool.id}-${index}`}
                  data-tool-item
                  data-cursor="expand"
                  className="group flex w-[110px] shrink-0 items-center justify-center overflow-hidden border border-solid border-[#1e1e1e] px-4 py-4 sm:w-[140px] sm:px-6 sm:py-5 md:w-[clamp(140px,12vw,220px)] md:px-10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tool.src}
                    alt={tool.alt}
                    width={118}
                    height={120}
                    className="h-14 w-auto max-w-none transition-transform duration-400 ease-out group-hover:scale-110 sm:h-16 md:h-[clamp(56px,6.25vw,120px)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
