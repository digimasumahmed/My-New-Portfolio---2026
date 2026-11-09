"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  { label: "OTHER SERVICES", tone: "orange" as const },
  { label: "OTHER SERVICES", tone: "black" as const },
  { label: "OTHER SERVICES", tone: "orange" as const },
] as const;

const SERVICES = [
  {
    letter: "D",
    title: "Digital Marketing",
    bg: "/services/bg-digital.jpg",
    overlay: "bg-black",
  },
  {
    letter: "W",
    title: "Web Development",
    bg: "/services/bg-web.jpg",
    overlay: "bg-accent",
  },
] as const;

function MarqueeItem({
  label,
  tone,
}: {
  label: string;
  tone: "orange" | "black";
}) {
  const color = tone === "orange" ? "text-accent" : "text-foreground";
  const star =
    tone === "orange" ? "/services/star-orange.svg" : "/services/star-black.svg";

  return (
    <div className={`flex shrink-0 items-center gap-3 sm:gap-4 ${color}`}>
      <span className="relative size-[clamp(36px,8vw,100px)] shrink-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={star}
          alt=""
          width={92}
          height={92}
          className="absolute inset-[3.89%] size-[92.22%] max-w-none"
        />
      </span>
      <span className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,8vw,100px)] leading-none whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(
    rootRef,
    () => {
      const cards = rootRef.current?.querySelectorAll("[data-service-card]");
      if (!cards?.length) return;

      gsap.from(cards, {
        opacity: 0,
        y: 48,
        duration: 0.9,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current?.querySelector("[data-service-grid]"),
          start: "top 78%",
        },
      });

      cards.forEach((card) => {
        const image = card.querySelector("[data-service-image]");
        const letter = card.querySelector("[data-service-letter]");
        if (!image) return;

        gsap.fromTo(
          image,
          { scale: 1.12, clipPath: "inset(8% 8% 8% 8%)" },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          },
        );

        if (letter) {
          gsap.from(letter, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          });
        }

        ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            gsap.set(image, { yPercent: (self.progress - 0.5) * 8 });
          },
        });
      });
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative w-full overflow-hidden bg-background"
      aria-label="Other services"
    >
      <div className="mx-auto w-full max-w-[1920px] pt-12 pb-8 sm:pt-16 md:pt-[100px] md:pb-10">
        <div className="mb-6 flex w-full gap-6 overflow-hidden sm:mb-10 sm:gap-10">
          <div className="services-marquee flex w-max gap-6 sm:gap-10">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
              <MarqueeItem key={`${item.tone}-${index}`} {...item} />
            ))}
          </div>
        </div>

        <div className="mx-4 rounded border border-solid border-ink p-3 sm:mx-6 sm:p-5 md:mx-10 md:p-[30px]">
          <div
            data-service-grid
            className="flex flex-col gap-3 sm:gap-4 md:flex-row"
          >
            {SERVICES.map((service) => (
              <article
                key={service.title}
                data-service-card
                data-cursor="expand"
                className="group relative flex min-h-[280px] min-w-0 flex-1 flex-col items-center justify-center overflow-hidden p-4 sm:min-h-[420px] sm:p-6 md:min-h-[754px]"
              >
                <div aria-hidden className="absolute inset-0 overflow-hidden">
                  <div className={`absolute inset-0 ${service.overlay}`} />
                  <div
                    data-service-image
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={service.bg}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 881px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/25 group-focus-within:bg-black/25" />
                </div>
                <div className="relative z-20 flex flex-col items-center gap-2 text-cream sm:gap-2.5">
                  <p
                    data-service-letter
                    className="w-full text-center font-[family-name:var(--font-gugi)] text-[clamp(72px,18vw,200px)] leading-none transition-transform duration-500 ease-out group-hover:-translate-y-2"
                  >
                    {service.letter}
                  </p>
                  <p className="w-full text-center font-[family-name:var(--font-vina-sans)] text-[clamp(24px,5vw,60px)] leading-none">
                    {service.title}
                  </p>

                  {/* Figma 83:443 — I WANT TO TAKE THIS SERVICE (below title on hover) */}
                  <a
                    href="/contact"
                    className="mt-2 inline-flex translate-y-2 scale-[0.96] items-center justify-center gap-2.5 bg-strong px-5 py-6 text-accent-bright opacity-0 transition-[transform,opacity] duration-400 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
                  >
                    <span className="font-[family-name:var(--font-vina-sans)] text-[clamp(16px,2vw,24px)] leading-none whitespace-nowrap">
                      I WANT TO TAKE THIS SERVICE
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/services/icon-take-service.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 max-w-none"
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
