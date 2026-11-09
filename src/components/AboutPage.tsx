"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { useGsapContext } from "@/hooks/useGsapContext";

gsap.registerPlugin(ScrollTrigger);

const INTRO_TAGS = [
  "UI/UX DESIGNER",
  "CREATIVE THINKER",
  "DIGITAL EXPERIENCE DESIGNER",
] as const;

const EXPERTISE = [
  {
    index: "01.",
    title: "UI/UX DESIGN",
    body: "Creating intuitive, user-centered interfaces that combine thoughtful functionality, clear navigation, and visually engaging experiences.",
  },
  {
    index: "02.",
    title: "WEB DESIGN",
    body: "Designing modern, responsive websites that communicate brand identity, engage visitors, and deliver seamless digital experiences.",
  },
  {
    index: "03.",
    title: "VISUAL STORYTELLING",
    body: "Transforming ideas and messages into compelling visual experiences through purposeful typography, imagery, layout, and creative direction.",
  },
  {
    index: "04.",
    title: "RESPONSIVE DESIGN",
    body: "Crafting consistent, accessible, and adaptable interfaces that feel natural across desktop, tablet, and mobile devices.",
  },
] as const;

const PHILOSOPHY = [
  {
    index: "01.",
    title: "CLARITY FIRST.",
    body: "Every interface should feel simple, intuitive, and easy to understand. I focus on removing unnecessary complexity and making important information accessible.",
  },
  {
    index: "02.",
    title: "CREATIVITY WITH PURPOSE.",
    body: "Creativity should enhance functionality, not compete with it. Every color, element, and interaction should contribute to a meaningful experience.",
  },
  {
    index: "03.",
    title: "PEOPLE AT THE CENTER.",
    body: "The best digital experiences are built around people. I prioritize usability, accessibility, and thoughtful interactions that respond to real user needs.",
  },
] as const;

function NumberedCard({
  index,
  title,
  body,
}: {
  index: string;
  title: string;
  body: string;
}) {
  return (
    <div
      data-about-card
      className="group/card flex flex-col border border-solid border-[#1e1e1e] bg-white px-5 py-8 transition-[border-color,transform] duration-400 ease-out hover:border-[#ff7340] sm:px-[30px] sm:py-10"
    >
      <div className="flex gap-3 sm:gap-4">
        <p
          data-card-index
          className="shrink-0 font-[family-name:var(--font-vina-sans)] text-[clamp(28px,3.5vw,40px)] leading-none text-[#1e1e1e] transition-colors duration-300 group-hover/card:text-[#ff7340]"
        >
          {index}
        </p>
        <div className="flex min-w-0 flex-col gap-3 text-[#1e1e1e] sm:gap-3.5">
          <div className="overflow-hidden">
            <h3
              data-card-title
              className="font-[family-name:var(--font-vina-sans)] text-[clamp(22px,2.8vw,32px)] leading-none"
            >
              {title}
            </h3>
          </div>
          <p
            data-card-body
            className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty sm:text-[17px] sm:leading-8"
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Page entrance
  useGsapContext(
    pageRef,
    () => {
      const root = pageRef.current;
      if (!root) return;

      const headerBar = root.querySelector<HTMLElement>("[data-header-bar]");
      const logo = root.querySelector<HTMLElement>("[data-header-logo]");
      const menu = root.querySelector<HTMLElement>("[data-header-menu]");
      const title = root.querySelector<HTMLElement>("[data-about-title]");
      const subtitle = root.querySelector<HTMLElement>("[data-about-subtitle]");
      const portrait = root.querySelector<HTMLElement>("[data-about-portrait]");
      const introHeading = root.querySelectorAll<HTMLElement>(
        "[data-intro-line]",
      );
      const introParas = root.querySelectorAll<HTMLElement>("[data-intro-para]");
      const badges = root.querySelectorAll<HTMLElement>("[data-intro-badge]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (headerBar) gsap.set(headerBar, { clearProps: "transform" });
          if (logo) gsap.set(logo, { clearProps: "transform" });
          if (menu) gsap.set(menu, { clearProps: "transform" });
          ScrollTrigger.refresh();
        },
      });

      if (headerBar) {
        gsap.set(headerBar, { y: -28, autoAlpha: 0 });
        tl.to(headerBar, { y: 0, autoAlpha: 1, duration: 0.5 }, 0);
      }
      if (logo) {
        gsap.set(logo, { scale: 0.72, autoAlpha: 0 });
        tl.to(logo, { scale: 1, autoAlpha: 1, duration: 0.45 }, 0.1);
      }
      if (menu) {
        gsap.set(menu, { x: 20, autoAlpha: 0 });
        tl.to(menu, { x: 0, autoAlpha: 1, duration: 0.4 }, 0.16);
      }
      if (title) {
        gsap.set(title, { clipPath: "inset(0 0 100% 0)", y: 20 });
        tl.to(
          title,
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7 },
          0.18,
        );
      }
      if (subtitle) {
        gsap.set(subtitle, { y: 16, autoAlpha: 0 });
        tl.to(subtitle, { y: 0, autoAlpha: 1, duration: 0.45 }, 0.38);
      }
      if (portrait) {
        gsap.set(portrait, { clipPath: "inset(0 0 100% 0)" });
        tl.to(
          portrait,
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power3.inOut" },
          0.35,
        );
      }
      if (introHeading.length) {
        gsap.set(introHeading, { yPercent: 110 });
        tl.to(
          introHeading,
          { yPercent: 0, duration: 0.55, stagger: 0.08 },
          0.45,
        );
      }
      if (introParas.length) {
        gsap.set(introParas, { y: 18, autoAlpha: 0 });
        tl.to(
          introParas,
          { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 },
          0.62,
        );
      }
      if (badges.length) {
        gsap.set(badges, { y: 14, autoAlpha: 0 });
        tl.to(
          badges,
          { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.07 },
          0.85,
        );
      }
    },
    [],
  );

  // Scroll sections
  useGsapContext(
    pageRef,
    () => {
      const root = pageRef.current;
      if (!root) return;

      // MY STORY
      const story = root.querySelector<HTMLElement>("[data-about-story]");
      if (story) {
        const heading = story.querySelector<HTMLElement>("[data-story-heading]");
        const sub = story.querySelector<HTMLElement>("[data-story-sub]");
        const paras = story.querySelectorAll<HTMLElement>("[data-story-para]");

        gsap.set([heading, sub].filter(Boolean), { y: 24, autoAlpha: 0 });
        gsap.set(paras, { y: 20, autoAlpha: 0 });

        const storyTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: story,
            start: "top 78%",
            once: true,
          },
        });

        if (heading) {
          storyTl.to(heading, { y: 0, autoAlpha: 1, duration: 0.55 }, 0);
        }
        if (sub) {
          storyTl.to(sub, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.1);
        }
        storyTl.to(
          paras,
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.1 },
          0.22,
        );
      }

      // EXPERIENCE TIMELINE
      const experience = root.querySelector<HTMLElement>(
        "[data-about-experience]",
      );
      if (experience) {
        const heading = experience.querySelector<HTMLElement>(
          "[data-exp-heading]",
        );
        const sub = experience.querySelector<HTMLElement>("[data-exp-sub]");
        const intro = experience.querySelector<HTMLElement>("[data-exp-intro]");
        const line = experience.querySelector<HTMLElement>("[data-exp-line]");
        const entries = experience.querySelectorAll<HTMLElement>(
          "[data-exp-entry]",
        );

        gsap.set([heading, sub, intro].filter(Boolean), {
          y: 22,
          autoAlpha: 0,
        });
        if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
        gsap.set(entries, { y: 28, autoAlpha: 0 });

        const expTl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: experience,
            start: "top 75%",
            once: true,
          },
        });

        if (heading) {
          expTl.to(heading, { y: 0, autoAlpha: 1, duration: 0.5 }, 0);
        }
        if (sub) {
          expTl.to(sub, { y: 0, autoAlpha: 1, duration: 0.45 }, 0.08);
        }
        if (intro) {
          expTl.to(intro, { y: 0, autoAlpha: 1, duration: 0.45 }, 0.16);
        }
        if (line) {
          expTl.to(line, { scaleY: 1, duration: 0.9, ease: "power2.inOut" }, 0.28);
        }

        entries.forEach((entry, index) => {
          const items = entry.querySelectorAll<HTMLElement>("[data-exp-item]");
          gsap.set(items, { y: 14, autoAlpha: 0 });

          expTl.to(
            entry,
            { y: 0, autoAlpha: 1, duration: 0.5 },
            0.4 + index * 0.28,
          );
          expTl.to(
            items,
            { y: 0, autoAlpha: 1, duration: 0.35, stagger: 0.05 },
            0.5 + index * 0.28,
          );
        });
      }

      // EXPERTISE + PHILOSOPHY CARDS
      root
        .querySelectorAll<HTMLElement>("[data-about-card-group]")
        .forEach((group) => {
          const groupHeading = group.querySelectorAll<HTMLElement>(
            "[data-group-heading]",
          );
          const groupCopy = group.querySelectorAll<HTMLElement>(
            "[data-group-copy]",
          );
          const cards = group.querySelectorAll<HTMLElement>("[data-about-card]");

          gsap.set(groupHeading, { y: 22, autoAlpha: 0 });
          gsap.set(groupCopy, { y: 16, autoAlpha: 0 });

          cards.forEach((card) => {
            const indexEl = card.querySelector<HTMLElement>("[data-card-index]");
            const titleEl = card.querySelector<HTMLElement>("[data-card-title]");
            const bodyEl = card.querySelector<HTMLElement>("[data-card-body]");
            gsap.set(card, { y: 28, autoAlpha: 0 });
            if (indexEl) gsap.set(indexEl, { scale: 0.6, autoAlpha: 0 });
            if (titleEl) gsap.set(titleEl, { yPercent: 110 });
            if (bodyEl) gsap.set(bodyEl, { y: 12, autoAlpha: 0 });
          });

          const groupTl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: group,
              start: "top 78%",
              once: true,
            },
          });

          groupTl.to(
            groupHeading,
            { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 },
            0,
          );
          if (groupCopy.length) {
            groupTl.to(
              groupCopy,
              { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.08 },
              0.12,
            );
          }

          cards.forEach((card, index) => {
            const indexEl = card.querySelector<HTMLElement>("[data-card-index]");
            const titleEl = card.querySelector<HTMLElement>("[data-card-title]");
            const bodyEl = card.querySelector<HTMLElement>("[data-card-body]");
            const at = 0.22 + index * 0.14;

            groupTl.to(card, { y: 0, autoAlpha: 1, duration: 0.45 }, at);
            if (indexEl) {
              groupTl.to(
                indexEl,
                {
                  scale: 1,
                  autoAlpha: 1,
                  duration: 0.4,
                  ease: "back.out(1.6)",
                },
                at + 0.05,
              );
            }
            if (titleEl) {
              groupTl.to(titleEl, { yPercent: 0, duration: 0.45 }, at + 0.08);
            }
            if (bodyEl) {
              groupTl.to(
                bodyEl,
                { y: 0, autoAlpha: 1, duration: 0.4 },
                at + 0.16,
              );
            }
          });
        });
    },
    [],
  );

  return (
    <div ref={pageRef} className="relative">
      <SiteHeader />
      <main className="flex-1 bg-white">
        <section
          className="mx-auto w-full max-w-[1920px] px-4 pt-8 pb-4 sm:px-6 sm:pt-12 md:px-10 md:pt-[100px] md:pb-6"
          aria-label="About me"
        >
          <div className="mx-auto flex w-full max-w-[1840px] flex-col gap-10 sm:gap-12 md:gap-[52px]">
            {/* Title */}
            <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
              <div className="w-full overflow-hidden py-2 sm:py-3">
                <h1
                  data-about-title
                  className="font-[family-name:var(--font-vina-sans)] text-[clamp(56px,12vw,200px)] leading-[0.9] text-[#ff7340]"
                >
                  ABOUT ME.
                </h1>
              </div>
              <p
                data-about-subtitle
                className="font-[family-name:var(--font-gugi)] text-[clamp(15px,2.1vw,24px)] leading-snug text-[#1e1e1e] sm:leading-8"
              >
                THE PERSON BEHIND THE PIXELS.
              </p>
            </div>

            {/* Intro: portrait + bio */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <div className="flex shrink-0 flex-col border border-solid border-[#1e1e1e] p-4 sm:p-5 lg:w-[min(796px,43%)]">
                <div
                  data-about-portrait
                  className="relative aspect-[1507/1044] w-full flex-1 overflow-hidden bg-[#1e1e1e] lg:aspect-auto lg:min-h-[28rem]"
                >
                  <Image
                    src="/about/portrait.png"
                    alt="Masum Ahmed portrait"
                    fill
                    priority
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 1024px) 100vw, 796px"
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 border border-solid border-[#1e1e1e] bg-white p-2.5 sm:gap-5 sm:p-2.5">
                <h2 className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4.5vw,60px)] leading-none text-[#1e1e1e]">
                  <span className="inline-block overflow-hidden align-bottom">
                    <span data-intro-line className="block">
                      HEY, I&apos;M
                    </span>
                  </span>{" "}
                  <span className="inline-block overflow-hidden align-bottom text-[#ff7340]">
                    <span data-intro-line className="block">MASUM AHMED.</span>
                  </span>
                </h2>

                <div className="flex flex-col gap-8 sm:gap-10">
                  <div className="flex flex-col gap-4 font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[18px] sm:leading-8 sm:text-justify">
                    <p data-intro-para>
                      A passionate UI/UX Designer who transforms ideas into
                      intuitive, visually compelling, and meaningful digital
                      experiences.
                    </p>
                    <p data-intro-para>
                      I focus on creating digital products that not only look
                      beautiful but also solve real problems, communicate
                      clearly, and provide seamless experiences for the people
                      who use them.
                    </p>
                    <p data-intro-para>
                      I believe every great digital experience begins with a
                      simple idea, thoughtful design, and a purpose worth
                      pursuing.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4 xl:gap-12">
                    {INTRO_TAGS.map((tag) => (
                      <div
                        key={tag}
                        data-intro-badge
                        className="flex items-center justify-center bg-[#1e1e1e] px-4 py-3 sm:flex-1 sm:py-4 xl:flex-none"
                      >
                        <p className="text-center font-[family-name:var(--font-gugi)] text-[13px] leading-tight text-[#f7f6f2] sm:text-[16px] xl:text-[20px]">
                          {tag}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Story / experience + expertise / philosophy */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch xl:justify-between">
              {/* Left column */}
              <div className="flex w-full flex-col gap-4 xl:w-[min(796px,43%)]">
                <div
                  data-about-story
                  className="flex flex-col gap-5 border border-solid border-[#1e1e1e] bg-white p-3 sm:gap-6 sm:p-4"
                >
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <h2
                      data-story-heading
                      className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,5vw,60px)] leading-none text-[#ff7340]"
                    >
                      MY STORY.
                    </h2>
                    <p
                      data-story-sub
                      className="font-[family-name:var(--font-vina-sans)] text-[clamp(24px,3.5vw,48px)] leading-[0.95] text-[#1e1e1e]"
                    >
                      CREATIVITY MEETS PURPOSE.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[18px] sm:leading-8 sm:text-justify">
                    <p data-story-para>
                      My journey into design began with a curiosity about how
                      creativity and technology come together to shape the way
                      people interact with digital products.
                    </p>
                    <p data-story-para>
                      What started as an interest in visual design gradually
                      became a passion for creating meaningful user experiences.
                      I discovered that great design goes beyond colors,
                      typography, and beautiful layouts. It is about
                      understanding people, simplifying complexity, and making
                      every interaction feel natural.
                    </p>
                    <p data-story-para>
                      Today, I focus on designing modern websites and digital
                      experiences that balance aesthetics, functionality, and
                      usability. From exploring early ideas to refining the
                      smallest interface details, I enjoy turning creative
                      concepts into thoughtful, engaging solutions.
                    </p>
                    <p data-story-para>
                      For me, design is more than a profession. It is a
                      continuous journey of learning, experimenting, and
                      creating something better with every project.
                    </p>
                  </div>
                </div>

                <div
                  data-about-experience
                  className="flex flex-1 flex-col gap-5 border border-solid border-[#1e1e1e] p-4 sm:gap-6 sm:p-5"
                >
                  <h2
                    data-exp-heading
                    className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4vw,60px)] leading-none text-[#ff7340]"
                  >
                    EXPERIENCE &amp; JOURNEY.
                  </h2>

                  <div className="flex flex-col gap-4">
                    <p
                      data-exp-sub
                      className="font-[family-name:var(--font-vina-sans)] text-[clamp(24px,3.5vw,48px)] leading-[0.95] text-[#1e1e1e]"
                    >
                      WHERE CREATIVITY MEETS EXPERIENCE.
                    </p>
                    <p
                      data-exp-intro
                      className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[18px] sm:leading-8 sm:text-justify"
                    >
                      My professional journey is driven by creativity, continuous
                      learning, and hands-on experience in designing meaningful
                      digital products. Every project and professional
                      opportunity helps me strengthen my design thinking,
                      problem-solving abilities, and attention to detail.
                    </p>

                    <div className="flex flex-col gap-4">
                      {/* Current position */}
                      <div
                        data-exp-entry
                        className="flex flex-col gap-4"
                      >
                        <h3
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(22px,2.8vw,32px)] leading-none text-[#ff7340]"
                        >
                          01. CURRENT POSITION
                        </h3>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(18px,2.2vw,24px)] leading-none text-[#1e1e1e]"
                        >
                          UI/UX DESIGNER &amp; SOCIAL MEDIA MANAGER
                        </p>
                        <div
                          data-exp-item
                          className="flex flex-col gap-2 font-[family-name:var(--font-gugi)] text-[15px] leading-8 text-[#1e1e1e] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-[18px]"
                        >
                          <a
                            href="#"
                            className="inline-flex items-center gap-4 underline decoration-solid underline-offset-2"
                          >
                            <span>Kode By Kraft</span>
                            <span className="flex size-6 items-center justify-center overflow-hidden">
                              <span className="-scale-y-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src="/about/link-external.svg"
                                  alt=""
                                  width={15}
                                  height={15}
                                  className="max-w-none"
                                />
                              </span>
                            </span>
                          </a>
                          <p className="sm:text-right">
                            January 25, 2026 – Present
                          </p>
                        </div>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[18px] sm:leading-8 sm:text-justify"
                        >
                          Currently working as a UI/UX DESIGNER &amp; SOCIAL
                          MEDIA MANAGER at KODE BY KRAFT, where I contribute to
                          designing intuitive interfaces, improving user
                          experiences, and developing visually engaging digital
                          solutions.
                        </p>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(18px,2.2vw,24px)] leading-none text-[#1e1e1e]"
                        >
                          Key Responsibilities:
                        </p>
                        <ul
                          data-exp-item
                          className="list-disc space-y-0 pl-[27px] font-[family-name:var(--font-gugi)] text-[15px] leading-8 text-[#1e1e1e] sm:text-[18px] sm:text-justify"
                        >
                          <li>
                            Designing user-friendly web and digital interfaces.
                          </li>
                          <li>
                            Creating responsive layouts and consistent UI
                            components.
                          </li>
                          <li>
                            Collaborating with team members to deliver effective
                            design solutions.
                          </li>
                          <li>
                            Improving usability, visual hierarchy, and overall
                            user experience.
                          </li>
                        </ul>
                      </div>

                      {/* Creative journey */}
                      <div
                        data-exp-entry
                        className="flex flex-col gap-4"
                      >
                        <h3
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(22px,2.8vw,32px)] leading-none text-[#ff7340]"
                        >
                          02. CREATIVE JOURNEY
                        </h3>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(18px,2.2vw,24px)] leading-none text-[#1e1e1e]"
                        >
                          UI/UX Designer &amp; Social Media Manager | Independent
                          Creative Projects
                        </p>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[18px] sm:leading-8 sm:text-justify"
                        >
                          Combining creative design with digital communication to
                          build engaging and meaningful brand experiences. My
                          work spans user-centered interface design, social
                          media content creation, visual storytelling, and
                          digital brand management.
                        </p>
                        <p
                          data-exp-item
                          className="font-[family-name:var(--font-vina-sans)] text-[clamp(18px,2.2vw,24px)] leading-none text-[#1e1e1e]"
                        >
                          Key Focus Areas:
                        </p>
                        <ul
                          data-exp-item
                          className="list-disc space-y-0 pl-[27px] font-[family-name:var(--font-gugi)] text-[15px] leading-8 text-[#1e1e1e] sm:text-[18px] sm:text-justify"
                        >
                          <li>UI/UX &amp; Responsive Web Design</li>
                          <li>
                            Social Media Management &amp; Content Planning
                          </li>
                          <li>Creative Graphics &amp; Visual Storytelling</li>
                          <li>Brand Identity &amp; Digital Engagement</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex w-full flex-col gap-4 xl:w-[min(1028px,56%)]">
                <div
                  data-about-card-group
                  className="flex flex-col gap-5 border border-solid border-[#1e1e1e] p-4 sm:gap-6 sm:p-5"
                >
                  <h2
                    data-group-heading
                    className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4vw,60px)] leading-none text-[#ff7340]"
                  >
                    WHAT I BRING TO THE TABLE.
                  </h2>
                  <p
                    data-group-heading
                    className="font-[family-name:var(--font-vina-sans)] text-[clamp(24px,3.5vw,48px)] leading-[0.95] text-[#1e1e1e]"
                  >
                    MY EXPERTISE.
                  </p>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {EXPERTISE.map((item) => (
                      <NumberedCard key={item.index} {...item} />
                    ))}
                  </div>
                </div>

                <div
                  data-about-card-group
                  className="flex flex-col gap-5 border border-solid border-[#1e1e1e] p-4 sm:gap-6 sm:p-5"
                >
                  <h2
                    data-group-heading
                    className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4vw,60px)] leading-none text-[#ff7340]"
                  >
                    MY DESIGN PHILOSOPHY.
                  </h2>
                  <div className="flex flex-col gap-4">
                    <p
                      data-group-heading
                      className="font-[family-name:var(--font-vina-sans)] text-[clamp(24px,3.5vw,48px)] leading-[0.95] text-[#1e1e1e]"
                    >
                      DESIGN WITH PURPOSE.
                    </p>
                    <p
                      data-group-copy
                      className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[17px] sm:leading-8"
                    >
                      I believe great design is not just about how something
                      looks. It is about how effectively it works, how naturally
                      people interact with it, and how meaningfully it
                      communicates.
                    </p>
                    <p
                      data-group-copy
                      className="font-[family-name:var(--font-gugi)] text-[15px] leading-7 text-pretty text-[#1e1e1e] sm:text-[17px] sm:leading-8"
                    >
                      My approach is guided by three core principles.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {PHILOSOPHY.map((item) => (
                      <NumberedCard key={item.index} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
