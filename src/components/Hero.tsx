"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { useMenu } from "@/components/providers/MenuProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { src: "/hero-v2/project-1.png", alt: "Project preview 1" },
  { src: "/hero-v2/project-2.png", alt: "Project preview 2" },
  { src: "/hero-v2/project-3.png", alt: "Project preview 3" },
  { src: "/hero-v2/project-4.png", alt: "Project preview 4" },
  { src: "/hero-v2/project-5.png", alt: "Project preview 5" },
] as const;

function HeroBackground() {
  return (
    <video
      data-hero-video
      className="absolute inset-0 size-full object-cover object-center"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero-v2/bg-landscape.png"
      aria-hidden="true"
    >
      <source src="/hero-v2/bg-landscape.mp4" type="video/mp4" />
    </video>
  );
}

function HeroThumbsMarquee({
  variant,
}: {
  variant: "mobile" | "desktop";
}) {
  const track = [...PROJECTS, ...PROJECTS];

  return (
    <div className="hero-thumbs-marquee flex w-max gap-2.5">
      {track.map((project, index) => (
        <div
          key={`${project.src}-${index}`}
          data-cursor="expand"
          className={
            variant === "mobile"
              ? "group w-[min(220px,70vw)] shrink-0 bg-background/20 p-2 backdrop-blur-sm"
              : "group w-[clamp(200px,18.75vw,360px)] shrink-0 bg-background/10 p-2.5"
          }
        >
          <div
            className={
              variant === "mobile"
                ? "relative h-[140px] w-full overflow-hidden"
                : "relative h-[clamp(120px,10.42vw,200px)] w-full overflow-hidden"
            }
          >
            <Image
              src={project.src}
              alt={project.alt}
              fill
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              sizes={variant === "mobile" ? "220px" : "360px"}
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-400 group-hover:bg-black/25" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { openMenu } = useMenu();

  useGsapContext(
    rootRef,
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const reduceDistance =
          typeof window !== "undefined" && window.innerWidth < 1280;

        // Keep critical hero content readable on first paint. Mild transform
        // offsets only — no opacity/autoAlpha/clip blanking — and chrome +
        // copy settle together so the nav never appears alone.
        gsap.set("[data-hero-bg]", { scale: 1.08 });
        gsap.set("[data-hero-logo]", { scale: 0.94 });
        gsap.set("[data-hero-nav]", { y: -14 });
        gsap.set("[data-hero-line]", { yPercent: 28 });
        gsap.set("[data-hero-desc]", { y: 12 });
        gsap.set("[data-hero-cta]", { scale: 0.94 });
        gsap.set("[data-hero-aside]", { x: 28 });
        gsap.set("[data-hero-thumbs]", { y: 24 });
        gsap.set("[data-hero-copy]", { y: 12 });

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        intro
          .to("[data-hero-bg]", { scale: 1, duration: 1.6, ease: "power2.out" }, 0)
          .to("[data-hero-logo]", { scale: 1, duration: 0.7 }, 0)
          .to("[data-hero-nav]", { y: 0, duration: 0.65 }, 0)
          .to(
            "[data-hero-line]",
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power4.out",
            },
            0,
          )
          .to("[data-hero-desc]", { y: 0, duration: 0.7 }, 0.05)
          .to(
            "[data-hero-cta]",
            {
              scale: 1,
              duration: 0.65,
              ease: "back.out(1.4)",
              stagger: 0.08,
            },
            0.08,
          )
          .to("[data-hero-aside]", { x: 0, duration: 0.85 }, 0.05)
          .to("[data-hero-copy]", { y: 0, duration: 0.6 }, 0.05)
          .to(
            "[data-hero-thumbs]",
            { y: 0, duration: 0.85, ease: "power3.out" },
            0.1,
          );

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set("[data-hero-bg]", {
              y: p * (reduceDistance ? 28 : 70),
            });
            gsap.set("[data-hero-copy-wrap]", {
              y: p * (reduceDistance ? -20 : -50),
              opacity: 1 - p * 0.85,
            });
            gsap.set("[data-hero-thumbs]", {
              y: p * (reduceDistance ? 16 : 36),
            });
            gsap.set("[data-hero-aside]", {
              y: p * (reduceDistance ? 12 : 28),
            });
          },
        });
      });

      return () => mm.revert();
    },
    [],
  );

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-background"
      aria-label="Hero"
    >
      <div className="relative mx-auto w-full max-w-[1920px]">
        <div
          data-hero-bg
          className="pointer-events-none absolute inset-3 origin-center overflow-hidden will-change-transform sm:inset-4 xl:inset-[2.105%_1.042%]"
        >
          <HeroBackground />
        </div>

        {/* Mobile / tablet */}
        <div className="relative flex min-h-[100svh] flex-col xl:hidden">
          <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
            <div
              data-hero-logo
              className="relative h-12 w-[68px] sm:h-14 sm:w-20"
            >
              <Image
                src="/hero-v2/logo.png"
                alt="Masum"
                fill
                priority
                className="object-contain object-left"
                sizes="80px"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <button
                type="button"
                data-hero-nav
                onClick={openMenu}
                className="flex items-center gap-2 text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Open menu"
              >
                <span className="flex w-10 flex-col gap-1.5 p-1">
                  <span className="h-1.5 w-full bg-ink" />
                  <span className="h-1.5 w-full bg-ink" />
                  <span className="h-1.5 w-full bg-ink" />
                </span>
                <span className="font-[family-name:var(--font-vina-sans)] text-[28px] leading-none sm:text-[32px]">
                  Menu
                </span>
              </button>
            </div>
          </header>

          <div className="relative z-10 mt-auto flex flex-col gap-8 px-6 pb-6 pt-24 sm:px-8 sm:pb-8">
            <div
              data-hero-copy-wrap
              className="max-w-xl rounded-sm bg-background/80 p-5 backdrop-blur-sm sm:p-6"
            >
              <div data-hero-copy className="flex flex-col gap-4">
                <h1 className="font-[family-name:var(--font-vina-sans)] text-[clamp(36px,10vw,64px)] leading-none text-foreground">
                  <span className="block overflow-hidden">
                    <span data-hero-line className="block">
                      Turning Ideas Into
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      data-hero-line
                      className="block text-accent-text"
                    >
                      Digital Experiences.
                    </span>
                  </span>
                </h1>
                <p
                  data-hero-desc
                  className="font-[family-name:var(--font-gugi)] text-[14px] leading-relaxed text-foreground sm:text-[16px]"
                >
                  I transform complex ideas into intuitive, visually compelling
                  digital experiences that balance creativity, usability, and
                  purpose.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Magnetic strength={0.2}>
                    <a
                      href="/contact"
                      data-hero-cta
                      className="group inline-flex w-full items-center justify-between gap-2.5 bg-accent px-4 py-3 text-cream sm:w-auto sm:justify-start"
                    >
                      <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-pre transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[18px]">
                        START  A PROJECT
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/hero-v2/icon-arrow.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 max-w-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <a
                      href="/projects"
                      data-hero-cta
                      className="group inline-flex w-full items-center justify-between gap-2 bg-strong px-4 py-3 sm:w-auto sm:justify-start"
                    >
                      <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-nowrap text-accent transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[18px]">
                        SEE ALL PROJECTS
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/hero-v2/icon-arrow-small.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="size-4 max-w-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>

            <div
              data-hero-thumbs
              className="hero-thumbs-fade -mx-6 overflow-hidden px-6 pb-1 sm:-mx-8 sm:px-8"
            >
              <HeroThumbsMarquee variant="mobile" />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="relative hidden aspect-[1920/950] w-full xl:block">
          <header className="absolute top-[4.21%] right-[2.083%] left-[2.083%] z-10 flex items-center justify-between">
            <div
              data-hero-logo
              className="relative h-[clamp(48px,7.47vw,71px)] w-[clamp(68px,5.21vw,100px)]"
            >
              <Image
                src="/hero-v2/logo.png"
                alt="Masum"
                fill
                priority
                className="object-contain object-left"
                sizes="100px"
              />
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle className="bg-background/70 backdrop-blur-sm" />
              <button
                type="button"
                data-hero-nav
                onClick={openMenu}
                className="flex items-center gap-2 text-foreground transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Open menu"
              >
                <span className="flex w-[clamp(40px,3.125vw,60px)] flex-col gap-2 p-1">
                  <span className="h-2 w-full bg-ink" />
                  <span className="h-2 w-full bg-ink" />
                  <span className="h-2 w-full bg-ink" />
                </span>
                <span className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,2.08vw,40px)] leading-none">
                  Menu
                </span>
              </button>
            </div>
          </header>

          <div
            data-hero-copy-wrap
            className="absolute top-[24.3%] left-[2.083%] z-10 flex w-[min(635px,33vw)] flex-col gap-6"
          >
            <div data-hero-copy className="flex flex-col gap-5">
              <h1 className="font-[family-name:var(--font-vina-sans)] text-[clamp(40px,4.43vw,85px)] leading-none text-foreground">
                <span className="block overflow-hidden">
                  <span data-hero-line className="block">
                    Turning Ideas Into
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-line className="block text-accent-text">
                    Digital Experiences.
                  </span>
                </span>
              </h1>
              <p
                data-hero-desc
                className="font-[family-name:var(--font-gugi)] text-justify text-[clamp(14px,0.94vw,18px)] leading-normal text-foreground"
              >
                I transform complex ideas into intuitive, visually compelling
                digital experiences that balance creativity, usability, and
                purpose.
              </p>
            </div>

            <Magnetic strength={0.22} className="w-fit">
              <a
                href="/contact"
                data-hero-cta
                className="group inline-flex w-fit items-center gap-2.5 bg-accent p-4 text-cream"
              >
                <span className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-none whitespace-pre transition-transform duration-300 group-hover:translate-x-0.5">
                  START  A PROJECT
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-v2/icon-arrow.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 max-w-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
          </div>

          <aside
            data-hero-aside
            className="absolute top-[26.95%] right-[2.083%] z-10 w-[min(339px,17.66vw)] bg-background/10 p-2.5"
          >
            <div className="flex flex-col gap-2.5">
              <div className="h-[172px] w-full bg-black/20" />
              <Magnetic strength={0.18}>
                <a
                  href="/projects"
                  data-hero-cta
                  className="group flex items-center justify-between bg-strong p-4"
                >
                  <span className="font-[family-name:var(--font-vina-sans)] text-[20px] leading-none whitespace-nowrap text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                    SEE ALL PROJECTS
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-v2/icon-arrow-small.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-5 max-w-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
            </div>
          </aside>

          <div
            data-hero-thumbs
            className="hero-thumbs-fade absolute right-[2.083%] bottom-[4.21%] left-[2.083%] z-10 overflow-hidden"
          >
            <HeroThumbsMarquee variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  );
}
