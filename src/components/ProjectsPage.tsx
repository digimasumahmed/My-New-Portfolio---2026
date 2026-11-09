"use client";

import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { Magnetic } from "@/components/ui/Magnetic";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  isTouchDevice,
  prefersReducedMotion,
} from "@/lib/motion";
import {
  PORTFOLIO_PROJECTS,
  PROJECT_FILTERS,
  PROJECT_STATS,
  type PortfolioProject,
  type ProjectFilter,
} from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, Flip);

function FilterArrow({ active }: { active: boolean }) {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden sm:size-6">
      <span className="-scale-y-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            active
              ? "/projects-page/arrow-filter-white.svg"
              : "/projects-page/arrow-filter-black.svg"
          }
          alt=""
          width={15}
          height={15}
          className="max-w-none"
        />
      </span>
    </span>
  );
}

function ProjectCard({
  project,
  onImagePointerMove,
  onImagePointerEnter,
  onImagePointerLeave,
}: {
  project: PortfolioProject;
  onImagePointerMove: (
    event: ReactPointerEvent<HTMLDivElement>,
    cardId: string,
  ) => void;
  onImagePointerEnter: (
    event: ReactPointerEvent<HTMLDivElement>,
    cardId: string,
  ) => void;
  onImagePointerLeave: (cardId: string) => void;
}) {
  return (
    <article
      id={project.id}
      data-project-card
      data-filter={project.filter}
      className="group flex min-w-0 flex-col gap-4 border border-solid border-[#1e1e1e] bg-white p-2.5"
    >
      <div
        data-card-media
        className="relative aspect-[3/2] w-full overflow-hidden bg-[#d9d9d9]"
        onPointerEnter={(event) => onImagePointerEnter(event, project.id)}
        onPointerMove={(event) => onImagePointerMove(event, project.id)}
        onPointerLeave={() => onImagePointerLeave(project.id)}
      >
        <div data-card-image className="absolute inset-0 will-change-transform">
          <Image
            src={project.preview}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div
          data-card-overlay
          className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300"
        />
      </div>

      <div className="flex flex-1 flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p
              data-card-category
              className="font-[family-name:var(--font-gugi)] text-[15px] leading-normal text-[#1e1e1e] sm:text-[18px]"
            >
              {project.category}
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="overflow-hidden">
                <h2
                  data-card-title
                  className="font-[family-name:var(--font-vina-sans)] text-[clamp(28px,4vw,48px)] leading-none text-[#ff7340] transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  {project.title}
                </h2>
              </div>
              <p
                data-card-desc
                className="font-[family-name:var(--font-gugi)] text-[14px] leading-relaxed text-pretty text-[#1e1e1e] sm:text-[16px] sm:leading-7"
              >
                {project.description}
              </p>
            </div>
          </div>

          <div
            data-card-focus
            className="flex flex-col gap-1 font-[family-name:var(--font-gugi)] text-[#1e1e1e]"
          >
            <p className="text-[13px] leading-normal sm:text-[14px]">
              DESIGN FOCUS
            </p>
            <ul className="list-disc space-y-2.5 pl-5 text-[14px] leading-normal sm:pl-6 sm:text-[16px]">
              {project.designFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-card-actions
          className="mt-auto flex flex-col gap-3 min-[480px]:flex-row sm:gap-4"
        >
          <Magnetic className="min-w-0 flex-1">
            <a
              href={project.caseStudyHref}
              className="group/btn flex w-full items-center justify-center gap-2 bg-[#ff7340] px-3 py-2.5 text-[#f7f6f2] transition-[background-color,color,transform] duration-300 hover:bg-[#e86635] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e] sm:gap-2.5 sm:px-4"
            >
              <span className="text-center font-[family-name:var(--font-vina-sans)] text-[15px] leading-none transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:text-[18px] lg:text-[20px]">
                VIEW CASE STUDY
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects-page/arrow-case.svg"
                alt=""
                width={24}
                height={24}
                className="size-5 shrink-0 max-w-none transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 sm:size-6"
              />
            </a>
          </Magnetic>
          <Magnetic className="min-w-0 flex-1">
            <a
              href={project.liveHref}
              className="group/btn flex w-full items-center justify-center gap-2 bg-[#1e1e1e] px-3 py-2.5 transition-[background-color,color] duration-300 hover:bg-[#2c2c2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7340] sm:gap-2.5 sm:px-4"
            >
              <span className="text-center font-[family-name:var(--font-vina-sans)] text-[15px] leading-none text-[#ff7340] transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:text-[18px] lg:text-[20px]">
                Live Website
              </span>
              <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden sm:size-6">
                <span className="-scale-y-100 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/projects-page/arrow-live.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="max-w-none"
                  />
                </span>
              </span>
            </a>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}

export function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const activeFilterRef = useRef<ProjectFilter>("ALL");
  const filteringRef = useRef(false);
  const revealedCardsRef = useRef(new Set<string>());
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("ALL");
  const [statDisplays, setStatDisplays] = useState<string[]>(() =>
    PROJECT_STATS.map(() => "00"),
  );

  activeFilterRef.current = activeFilter;

  const hideIndicator = useCallback(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    gsap.to(indicator, {
      autoAlpha: 0,
      scale: 0.7,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, []);

  const positionIndicator = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const indicator = indicatorRef.current;
      if (!indicator) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const half = 44;
      const x = Math.min(
        Math.max(event.clientX - half, rect.left + 8),
        rect.right - half * 2 - 8,
      );
      const y = Math.min(
        Math.max(event.clientY - half, rect.top + 8),
        rect.bottom - half * 2 - 8,
      );
      gsap.to(indicator, {
        x,
        y,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [],
  );

  const onImagePointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, _cardId: string) => {
      if (prefersReducedMotion() || isTouchDevice()) return;
      const indicator = indicatorRef.current;
      const media = event.currentTarget;
      if (!indicator) return;

      const image = media.querySelector<HTMLElement>("[data-card-image]");
      const overlay = media.querySelector<HTMLElement>("[data-card-overlay]");

      gsap.to(image, {
        scale: 1.05,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(overlay, {
        backgroundColor: "rgba(0,0,0,0.35)",
        duration: 0.35,
        overwrite: "auto",
      });

      gsap.set(indicator, {
        x: event.clientX - 44,
        y: event.clientY - 44,
      });
      positionIndicator(event);
      gsap.to(indicator, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [positionIndicator],
  );

  const onImagePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, _cardId: string) => {
      if (prefersReducedMotion() || isTouchDevice()) return;
      positionIndicator(event);
    },
    [positionIndicator],
  );

  const onImagePointerLeave = useCallback(
    (_cardId: string) => {
      if (prefersReducedMotion() || isTouchDevice()) return;
      const page = pageRef.current;
      if (!page) return;

      hideIndicator();

      page.querySelectorAll<HTMLElement>("[data-card-image]").forEach((image) => {
        gsap.to(image, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      page
        .querySelectorAll<HTMLElement>("[data-card-overlay]")
        .forEach((overlay) => {
          gsap.to(overlay, {
            backgroundColor: "rgba(0,0,0,0)",
            duration: 0.3,
            overwrite: "auto",
          });
        });
    },
    [hideIndicator],
  );

  const applyFilter = useCallback(
    (next: ProjectFilter) => {
      if (filteringRef.current || next === activeFilterRef.current) return;
      const grid = gridRef.current;
      if (!grid) {
        setActiveFilter(next);
        return;
      }

      const cards = Array.from(
        grid.querySelectorAll<HTMLElement>("[data-project-card]"),
      );
      const reduced = prefersReducedMotion();

      if (reduced) {
        cards.forEach((card) => {
          const match =
            next === "ALL" || card.dataset.filter === next;
          card.style.display = match ? "" : "none";
          card.setAttribute("aria-hidden", match ? "false" : "true");
        });
        setActiveFilter(next);
        return;
      }

      filteringRef.current = true;
      const state = Flip.getState(cards);

      cards.forEach((card) => {
        const match = next === "ALL" || card.dataset.filter === next;
        if (match) {
          card.style.display = "";
          card.setAttribute("aria-hidden", "false");
          // Clear any leftover autoAlpha/visibility from prior leave or scroll setup.
          gsap.set(card, { autoAlpha: 1 });
        } else {
          card.style.display = "none";
          card.setAttribute("aria-hidden", "true");
        }
      });

      setActiveFilter(next);

      Flip.from(state, {
        duration: 0.65,
        ease: "power2.inOut",
        absoluteOnLeave: true,
        nested: true,
        stagger: 0.04,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 28, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
              clearProps: "transform",
            },
          ),
        onLeave: (elements) =>
          gsap.to(elements, {
            autoAlpha: 0,
            y: -16,
            scale: 0.97,
            duration: 0.35,
            stagger: 0.03,
            ease: "power2.in",
          }),
        onComplete: () => {
          filteringRef.current = false;
          cards.forEach((card) => {
            if (card.style.display !== "none") {
              gsap.set(card, {
                autoAlpha: 1,
                clearProps: "transform",
              });
              // Mark as revealed so scroll setup won't hide them again.
              revealedCardsRef.current.add(card.id);
            }
          });
          ScrollTrigger.refresh();
        },
      });
    },
    [],
  );

  // Page entrance
  useGsapContext(
    pageRef,
    () => {
      const root = pageRef.current;
      if (!root) return;

      const headerBar = root.querySelector<HTMLElement>("[data-header-bar]");
      const logo = root.querySelector<HTMLElement>("[data-header-logo]");
      const menu = root.querySelector<HTMLElement>("[data-header-menu]");
      const title = root.querySelector<HTMLElement>("[data-projects-title]");
      const subtitle = root.querySelector<HTMLElement>(
        "[data-projects-subtitle]",
      );
      const statsPanel = root.querySelector<HTMLElement>("[data-stats-panel]");
      const filterBtns = root.querySelectorAll<HTMLElement>("[data-filter-btn]");
      const statValues = root.querySelectorAll<HTMLElement>("[data-stat-value]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          if (headerBar) gsap.set(headerBar, { clearProps: "transform" });
          if (logo) gsap.set(logo, { clearProps: "transform" });
          if (menu) gsap.set(menu, { clearProps: "transform" });
          setStatDisplays(
            PROJECT_STATS.map((stat) => String(stat.value).padStart(2, "0")),
          );
          ScrollTrigger.refresh();
        },
      });

      // Animate the inner bar — avoid fighting the fixed header's hide/show translate.
      if (headerBar) {
        gsap.set(headerBar, { y: -28, autoAlpha: 0 });
        tl.to(headerBar, { y: 0, autoAlpha: 1, duration: 0.55 }, 0);
      }
      if (logo) {
        gsap.set(logo, { scale: 0.7, autoAlpha: 0 });
        tl.to(logo, { scale: 1, autoAlpha: 1, duration: 0.5 }, 0.12);
      }
      if (menu) {
        gsap.set(menu, { x: 24, autoAlpha: 0 });
        tl.to(menu, { x: 0, autoAlpha: 1, duration: 0.45 }, 0.18);
      }
      if (title) {
        gsap.set(title, { clipPath: "inset(0 0 100% 0)", y: 24 });
        tl.to(
          title,
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.75 },
          0.2,
        );
      }
      if (subtitle) {
        gsap.set(subtitle, { y: 20, autoAlpha: 0 });
        tl.to(subtitle, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.4);
      }
      if (statsPanel) {
        gsap.set(statsPanel, { y: 28, autoAlpha: 0 });
        tl.to(statsPanel, { y: 0, autoAlpha: 1, duration: 0.55 }, 0.48);
      }
      if (filterBtns.length) {
        gsap.set(filterBtns, { y: 16, autoAlpha: 0 });
        tl.to(
          filterBtns,
          { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05 },
          0.58,
        );
      }

      statValues.forEach((el) => {
        const target = Number(el.dataset.target ?? "0");
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: target,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.val)).padStart(2, "0");
            },
          },
          0.55,
        );
      });
    },
    [],
  );

  // Card scroll reveals — keep card shell visible; reveal media + copy.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    if (prefersReducedMotion()) return;

    const cards = grid.querySelectorAll<HTMLElement>("[data-project-card]");
    const timelines: gsap.core.Timeline[] = [];

    cards.forEach((card, index) => {
      const id = card.id;
      if (revealedCardsRef.current.has(id)) return;

      const media = card.querySelector<HTMLElement>("[data-card-media]");
      const image = card.querySelector<HTMLElement>("[data-card-image]");
      const category = card.querySelector<HTMLElement>("[data-card-category]");
      const title = card.querySelector<HTMLElement>("[data-card-title]");
      const desc = card.querySelector<HTMLElement>("[data-card-desc]");
      const focus = card.querySelector<HTMLElement>("[data-card-focus]");
      const actions = card.querySelector<HTMLElement>("[data-card-actions]");

      gsap.set(card, { y: 36 });
      if (media) gsap.set(media, { clipPath: "inset(100% 0 0 0)" });
      if (image) gsap.set(image, { scale: 1.08 });
      if (category) gsap.set(category, { autoAlpha: 0, y: 12 });
      if (title) gsap.set(title, { yPercent: 110 });
      if (desc) gsap.set(desc, { autoAlpha: 0, y: 14 });
      if (focus) gsap.set(focus, { autoAlpha: 0, y: 14 });
      if (actions) gsap.set(actions, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: (index % 3) * 0.07,
        scrollTrigger: {
          trigger: card,
          start: "top 92%",
          once: true,
        },
        onComplete: () => {
          revealedCardsRef.current.add(id);
        },
      });

      tl.to(card, { y: 0, duration: 0.55 }, 0);
      if (media) {
        tl.to(
          media,
          { clipPath: "inset(0% 0 0 0)", duration: 0.7, ease: "power3.inOut" },
          0.02,
        );
      }
      if (image) {
        tl.to(image, { scale: 1, duration: 0.85, ease: "power2.out" }, 0.08);
      }
      if (category) {
        tl.to(category, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.22);
      }
      if (title) {
        tl.to(title, { yPercent: 0, duration: 0.5 }, 0.26);
      }
      if (desc) {
        tl.to(desc, { autoAlpha: 1, y: 0, duration: 0.4 }, 0.36);
      }
      if (focus) {
        tl.to(focus, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.44);
      }
      if (actions) {
        tl.to(actions, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.52);
      }

      timelines.push(tl);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      timelines.forEach((tl) => {
        tl.scrollTrigger?.kill();
        tl.kill();
      });
    };
  }, []);

  // Park indicator off-page initially
  useEffect(() => {
    const indicator = indicatorRef.current;
    if (!indicator) return;
    gsap.set(indicator, { autoAlpha: 0, scale: 0.7 });
  }, []);

  const visibleCount =
    activeFilter === "ALL"
      ? PORTFOLIO_PROJECTS.length
      : PORTFOLIO_PROJECTS.filter((p) => p.filter === activeFilter).length;

  return (
    <div ref={pageRef} className="relative">
      <SiteHeader />
      <main className="flex-1 bg-white">
        <section
          className="mx-auto w-full max-w-[1920px] px-4 pt-8 pb-4 sm:px-6 sm:pt-12 md:px-10 md:pt-[100px] md:pb-6"
          aria-label="Projects"
        >
          <div className="mx-auto flex w-full max-w-[1840px] flex-col gap-8 sm:gap-10">
            <div className="flex flex-col items-center gap-3 px-1 text-center sm:gap-4">
              <div className="w-full overflow-hidden py-2 sm:py-3">
                <h1
                  data-projects-title
                  className="font-[family-name:var(--font-vina-sans)] text-[clamp(56px,12vw,200px)] leading-[0.9] text-[#ff7340]"
                >
                  PROJECTS.
                </h1>
              </div>
              <p
                data-projects-subtitle
                className="max-w-[40rem] px-2 font-[family-name:var(--font-gugi)] text-[clamp(15px,2.1vw,24px)] leading-snug text-pretty text-[#1e1e1e] sm:max-w-4xl sm:leading-8"
              >
                A curated selection of products, systems, and digital
                experiences.
              </p>
            </div>

            <div
              data-stats-panel
              className="flex w-full flex-col gap-5 border border-solid border-[#1e1e1e] p-3 sm:gap-6 sm:p-5"
            >
              <div className="grid grid-cols-3 items-start justify-between gap-2 sm:items-center sm:gap-6">
                {PROJECT_STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="flex min-w-0 flex-col items-center gap-1 text-center sm:gap-2"
                  >
                    <p className="font-[family-name:var(--font-gugi)] text-[11px] leading-tight text-[#1e1e1e] sm:text-[16px] sm:leading-8 md:text-[20px]">
                      {stat.label}
                    </p>
                    <p
                      data-stat-value
                      data-target={stat.value}
                      className={`font-[family-name:var(--font-anton)] text-[clamp(36px,7vw,80px)] leading-none sm:leading-[1.1] ${
                        stat.accent ? "text-[#ff7340]" : "text-[#1e1e1e]"
                      }`}
                    >
                      {statDisplays[index] ?? "00"}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 xl:grid-cols-4 xl:gap-4"
                role="tablist"
                aria-label="Project filters"
              >
                {PROJECT_FILTERS.map((filter) => {
                  const active = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      data-filter-btn
                      aria-selected={active}
                      onClick={() => applyFilter(filter)}
                      className={`group flex min-w-0 items-center justify-between gap-2 p-3 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7340] sm:gap-3 sm:p-4 ${
                        active
                          ? "bg-[#ff7340] text-white"
                          : "border border-solid border-[#1e1e1e] bg-white text-[#1e1e1e] hover:bg-black/[0.04]"
                      }`}
                    >
                      <span className="min-w-0 truncate text-left font-[family-name:var(--font-vina-sans)] text-[clamp(16px,2vw,40px)] leading-none">
                        {filter}
                      </span>
                      <FilterArrow active={active} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-solid border-[#1e1e1e] p-3 sm:p-5">
              <div
                ref={gridRef}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                {PORTFOLIO_PROJECTS.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onImagePointerEnter={onImagePointerEnter}
                    onImagePointerMove={onImagePointerMove}
                    onImagePointerLeave={onImagePointerLeave}
                  />
                ))}
              </div>
              {visibleCount === 0 ? (
                <p className="py-16 text-center font-[family-name:var(--font-gugi)] text-[16px] text-[#1e1e1e]">
                  No projects in this category yet.
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <Footer />
      </main>

      {/* Fixed cursor follower — clamped to hovered image bounds */}
      <div
        ref={indicatorRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-40 hidden size-[88px] items-center justify-center rounded-full bg-[#ff7340] text-center font-[family-name:var(--font-vina-sans)] text-[13px] leading-tight text-[#f7f6f2] md:flex"
      >
        VIEW
        <br />
        PROJECT
      </div>
    </div>
  );
}
