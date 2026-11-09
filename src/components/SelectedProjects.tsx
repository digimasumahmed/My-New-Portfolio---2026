"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { Magnetic } from "@/components/ui/Magnetic";
import { PROJECT_STATS, SHOWCASE_PROJECTS } from "@/data/projects";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_COUNT = SHOWCASE_PROJECTS.length;
/** Total pinned scroll distance as a multiple of viewport height. */
const PIN_VH = 2.8;

function CornerArrow({ active }: { active: boolean }) {
  return (
    <span className="flex size-5 items-center justify-center overflow-hidden sm:size-6">
      <span className="-scale-y-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            active
              ? "/projects/icon-arrow-up-white.svg"
              : "/projects/icon-arrow-up.svg"
          }
          alt=""
          width={15}
          height={15}
          className="max-w-none transition-transform duration-300"
        />
      </span>
    </span>
  );
}

function padStat(value: number) {
  return value.toString().padStart(2, "0");
}

function indexFromProgress(progress: number) {
  if (progress >= 1) return PROJECT_COUNT - 1;
  return Math.min(
    PROJECT_COUNT - 1,
    Math.max(0, Math.floor(progress * PROJECT_COUNT)),
  );
}

export function SelectedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const letterBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const transitioningRef = useRef(false);
  const activeIndexRef = useRef(0);
  const metaReadyRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  /** White letter chrome — destination flips immediately; source clears when pill finishes. */
  const [tabVisualIndex, setTabVisualIndex] = useState(0);
  const [tabLeavingIndex, setTabLeavingIndex] = useState<number | null>(null);
  const [isDesktopPin, setIsDesktopPin] = useState(false);

  const active = SHOWCASE_PROJECTS[activeIndex];

  const moveHighlight = useCallback(
    (index: number, animate = true, fromIndex?: number) => {
      const highlight = highlightRef.current;
      const button = letterBtnRefs.current[index];
      const list = button?.parentElement?.parentElement;
      if (!highlight || !button || !list) return;

      const listRect = list.getBoundingClientRect();
      const btnRect = button.getBoundingClientRect();
      // Cover shared hairlines so they never peek as a black streak on the pill edge.
      const overlap = 2;
      const y = btnRect.top - listRect.top - overlap;
      const height = btnRect.height + overlap * 2;

      if (animate) {
        const from = fromIndex ?? activeIndexRef.current;
        setTabLeavingIndex(from === index ? null : from);
        setTabVisualIndex(index);
        gsap.to(highlight, {
          y,
          height,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            setTabVisualIndex(index);
            setTabLeavingIndex(null);
          },
        });
      } else {
        gsap.set(highlight, { y, height });
        setTabVisualIndex(index);
        setTabLeavingIndex(null);
      }
    },
    [],
  );

  const showProject = useCallback(
    (index: number, direction: 1 | -1 = 1) => {
      if (index === activeIndexRef.current) return;

      const prev = activeIndexRef.current;
      activeIndexRef.current = index;
      setActiveIndex(index);

      const reduced = prefersReducedMotion();
      const images = imageRefs.current;

      if (reduced) {
        images.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            autoAlpha: i === index ? 1 : 0,
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
          });
        });
        moveHighlight(index, false, prev);
        return;
      }

      transitioningRef.current = true;
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          transitioningRef.current = false;
        },
      });

      const outgoing = images[prev];
      const incoming = images[index];

      if (outgoing) {
        tl.to(
          outgoing,
          {
            autoAlpha: 0,
            y: direction > 0 ? -28 : 28,
            scale: 1.02,
            duration: 0.45,
          },
          0,
        );
      }

      if (incoming) {
        gsap.set(incoming, {
          autoAlpha: 1,
          clipPath:
            direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
          y: direction > 0 ? 36 : -36,
          scale: 1.06,
        });
        tl.to(
          incoming,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power4.out",
          },
          0.08,
        );
      }

      moveHighlight(index, true, prev);
    },
    [moveHighlight],
  );

  // Animate meta copy after React commits the new project text (skip first paint).
  useEffect(() => {
    if (!metaReadyRef.current) {
      metaReadyRef.current = true;
      return;
    }

    const meta = metaRef.current;
    if (!meta || prefersReducedMotion()) return;

    const parts = meta.querySelectorAll("[data-meta-part]");
    gsap.fromTo(
      parts,
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.055,
        ease: "power2.out",
        overwrite: "auto",
      },
    );
  }, [activeIndex]);

  // Keep highlight aligned on resize.
  useEffect(() => {
    const onResize = () => moveHighlight(activeIndexRef.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [moveHighlight]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pinTarget = pinRef.current;
    if (!section || !pinTarget) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      setIsDesktopPin(true);

      // Initial visual state: C
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: i === 0 ? 1 : 0,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          scale: 1,
        });
      });
      activeIndexRef.current = 0;
      setActiveIndex(0);
      requestAnimationFrame(() => moveHighlight(0, false));

      // Entrance: heading + stats
      const headingSpans = section.querySelectorAll(
        "[data-projects-heading] span span",
      );
      gsap.set(headingSpans, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: pinTarget,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(headingSpans, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          });
        },
      });

      section.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((el) => {
        const target = Number(el.dataset.statValue || 0);
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: pinTarget,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = padStat(Math.round(obj.val));
              },
            });
          },
        });
      });

      if (prefersReducedMotion()) {
        return () => setIsDesktopPin(false);
      }

      let lastIndex = 0;

      const st = ScrollTrigger.create({
        trigger: pinTarget,
        start: "top top",
        end: () => `+=${window.innerHeight * PIN_VH}`,
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = indexFromProgress(self.progress);
          if (next !== lastIndex) {
            const direction: 1 | -1 = next > lastIndex ? 1 : -1;
            lastIndex = next;
            showProject(next, direction);
          }
        },
      });

      scrollTriggerRef.current = st;
      ScrollTrigger.refresh();

      return () => {
        st.kill();
        scrollTriggerRef.current = null;
        setIsDesktopPin(false);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      setIsDesktopPin(false);
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          autoAlpha: i === activeIndexRef.current ? 1 : 0,
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          scale: 1,
        });
      });
      requestAnimationFrame(() =>
        moveHighlight(activeIndexRef.current, false),
      );
    });

    return () => mm.revert();
  }, [moveHighlight, showProject]);

  const selectProject = (index: number) => {
    const direction: 1 | -1 = index >= activeIndexRef.current ? 1 : -1;
    showProject(index, direction);

    const st = scrollTriggerRef.current;
    if (!st || !isDesktopPin || prefersReducedMotion()) return;

    // Seek to the middle of the selected project's scroll slice.
    const slice = 1 / PROJECT_COUNT;
    const targetProgress = index * slice + slice * 0.5;
    const scrollPos = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-white"
      aria-label="Selected projects"
    >
      <div
        ref={pinRef}
        className="mx-auto flex w-full max-w-[1920px] flex-col justify-center px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:min-h-[100svh] lg:py-8"
      >
        <div className="flex max-h-none flex-col gap-5 border border-solid border-[#1e1e1e] p-3 sm:gap-6 sm:p-4 lg:max-h-[min(920px,92svh)] lg:flex-row lg:items-stretch lg:gap-8 lg:overflow-hidden xl:gap-12">
          {/* Left column */}
          <div className="flex min-w-0 flex-1 flex-col justify-between gap-5 lg:max-w-[46%] lg:gap-6">
            <div className="flex flex-col gap-5 lg:gap-6">
              <div className="flex flex-col gap-2 sm:gap-3">
                <h2
                  data-projects-heading
                  className="font-[family-name:var(--font-vina-sans)] text-[clamp(36px,6.5vw,80px)] leading-[1.05] text-[#1e1e1e]"
                >
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="block">SELECTED</span>
                  </span>{" "}
                  <span className="inline-block overflow-hidden align-bottom text-[#ff6228]">
                    <span className="block">PROJECTS.</span>
                  </span>
                </h2>
                <p className="max-w-xl font-[family-name:var(--font-gugi)] text-[14px] leading-relaxed text-[#1e1e1e] sm:text-[17px] sm:leading-7">
                  A curated selection of products, systems, and digital
                  experiences.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-between sm:gap-3">
                {PROJECT_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-w-0 flex-col items-start gap-0.5 sm:w-[150px] sm:max-w-[33%] sm:items-center sm:gap-1"
                  >
                    <p className="w-full font-[family-name:var(--font-gugi)] text-[10px] leading-tight text-[#1e1e1e] sm:text-[clamp(11px,0.9vw,16px)]">
                      {stat.label}
                    </p>
                    <p
                      data-stat-value={stat.value}
                      className={`font-[family-name:var(--font-anton)] text-[clamp(32px,6vw,64px)] leading-[1.05] whitespace-nowrap ${
                        stat.accent ? "text-[#ff6228]" : "text-[#1e1e1e]"
                      }`}
                    >
                      {stat.display}
                    </p>
                  </div>
                ))}
              </div>

              <ul
                data-projects-letters
                className="relative flex flex-col overflow-hidden"
              >
                {/* Hairlines sit under the orange pill so they never flash as a black streak. */}
                <span
                  ref={highlightRef}
                  aria-hidden
                  className="pointer-events-none absolute top-0 right-0 left-0 z-[1] bg-[#ff6228] will-change-transform"
                  style={{ height: 0 }}
                />
                {SHOWCASE_PROJECTS.map((project, index) => {
                  const isVisualActive =
                    index === tabVisualIndex || index === tabLeavingIndex;
                  const isPressed = index === activeIndex;
                  // Hairlines paint above the pill in practice — hide any that touch a lit row.
                  const hairlineHidden = (at: number) =>
                    at === tabVisualIndex ||
                    at === tabLeavingIndex ||
                    at === tabVisualIndex - 1 ||
                    at === (tabLeavingIndex ?? -99) - 1;
                  return (
                    <li key={project.letter} className="relative">
                      {index === 0 ? (
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-[#1e1e1e] transition-opacity duration-150 ${
                            isVisualActive ? "opacity-0" : "opacity-100"
                          }`}
                        />
                      ) : null}
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#1e1e1e] transition-opacity duration-150 ${
                          hairlineHidden(index) ? "opacity-0" : "opacity-100"
                        }`}
                      />
                      <button
                        ref={(el) => {
                          letterBtnRefs.current[index] = el;
                        }}
                        type="button"
                        onClick={() => selectProject(index)}
                        className={`relative z-[2] flex w-full items-center justify-between bg-transparent px-3 py-2.5 transition-colors duration-150 ease-out sm:px-4 sm:py-3 ${
                          isVisualActive ? "text-white" : "text-[#1e1e1e]"
                        }`}
                        aria-pressed={isPressed}
                      >
                        <span className="font-[family-name:var(--font-vina-sans)] text-[clamp(32px,4vw,52px)] leading-none">
                          {project.letter}
                        </span>
                        <CornerArrow active={isVisualActive} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Magnetic>
              <a
                href="/projects"
                className="group flex w-full items-center justify-center gap-2.5 bg-[#1e1e1e] p-3 text-[#f7f6f2] sm:p-3.5"
              >
                <span className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-nowrap transition-transform duration-300 group-hover:translate-x-0.5 sm:text-[18px]">
                  VIEW ALL PROJECTS
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/projects/icon-arrow-circle.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-5 max-w-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 sm:size-6"
                />
              </a>
            </Magnetic>
          </div>

          {/* Right column */}
          <article className="flex min-w-0 flex-1 flex-col lg:min-h-0">
            <div className="bg-[#252525] p-2 sm:p-2.5">
              <div
                data-projects-preview
                data-cursor="expand"
                className="group/preview relative aspect-[16/10] w-full overflow-hidden sm:aspect-[849/480] lg:aspect-auto lg:h-[min(28vh,260px)] xl:h-[min(36vh,340px)]"
              >
                {SHOWCASE_PROJECTS.map((project, index) => (
                  <div
                    key={project.letter}
                    ref={(el) => {
                      imageRefs.current[index] = el;
                    }}
                    className="absolute inset-0 will-change-transform"
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      visibility: index === 0 ? "visible" : "hidden",
                    }}
                  >
                    <Image
                      src={project.preview}
                      alt={`${project.title} website preview`}
                      fill
                      priority={index === 0}
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 869px"
                    />
                  </div>
                ))}

                {/* Figma 83:534 — VIEW CASE STUDY (centered on hover) */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/0 opacity-0 transition-[opacity,background-color] duration-400 ease-out group-hover/preview:bg-black/35 group-hover/preview:opacity-100 group-focus-within/preview:bg-black/35 group-focus-within/preview:opacity-100"
                  aria-hidden={false}
                >
                  <a
                    href={active.caseStudyHref}
                    className="pointer-events-auto inline-flex translate-y-2 scale-[0.96] items-center justify-center gap-2.5 bg-[#ff6228] p-4 text-[#f7f6f2] transition-[transform,opacity] duration-400 ease-out group-hover/preview:translate-y-0 group-hover/preview:scale-100 group-focus-within/preview:translate-y-0 group-focus-within/preview:scale-100"
                  >
                    <span className="font-[family-name:var(--font-vina-sans)] text-[18px] leading-none whitespace-nowrap sm:text-[20px]">
                      VIEW CASE STUDY
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/projects/icon-view-case.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6 max-w-none"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div
              ref={metaRef}
              data-projects-meta
              className="flex flex-1 flex-col gap-3 overflow-visible border border-solid border-[#252525] bg-white p-2.5 sm:gap-3.5 lg:min-h-0 lg:overflow-y-auto"
            >
              <div data-meta-part className="flex flex-col gap-2 sm:gap-2.5">
                <div className="flex flex-col gap-2">
                  <p className="font-[family-name:var(--font-gugi)] text-[11px] leading-normal text-black sm:text-[13px]">
                    {active.meta}
                  </p>
                  <div className="h-px w-full bg-black/80" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-[family-name:var(--font-vina-sans)] text-[clamp(26px,4vw,42px)] leading-none text-[#ff6228]">
                    {active.title}
                  </h3>
                </div>
              </div>

              <div data-meta-part className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 font-[family-name:var(--font-gugi)] text-black sm:gap-2.5">
                  <p className="text-[16px] leading-snug sm:text-[20px] sm:leading-snug">
                    {active.headline}
                  </p>
                  <p className="text-[13px] leading-relaxed text-pretty sm:text-justify sm:text-[15px] sm:leading-6">
                    {active.body}
                  </p>
                </div>

                <div data-meta-part className="flex flex-col gap-2">
                  <div className="h-px w-full bg-black/80" />
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
                    <div className="flex w-full flex-col gap-0.5 sm:w-[200px]">
                      <p className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-normal text-[#1e1e1e] sm:text-[18px]">
                        DESIGN FOCUS
                      </p>
                      <div className="font-[family-name:var(--font-gugi)] text-[13px] leading-6 text-black sm:text-[14px] sm:leading-7">
                        {active.designFocus.map((item) => (
                          <p key={item}>· {item}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-0.5 sm:w-[200px]">
                      <p className="font-[family-name:var(--font-vina-sans)] text-[16px] leading-normal text-[#1e1e1e] sm:text-[18px]">
                        PROJECT TYPE
                      </p>
                      <p className="font-[family-name:var(--font-gugi)] text-[13px] leading-normal text-black sm:text-[14px]">
                        {active.projectType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {isDesktopPin ? (
          <p className="mt-3 hidden text-center font-[family-name:var(--font-gugi)] text-[12px] tracking-wide text-[#1e1e1e]/45 lg:block">
            Scroll to explore · {active.letter} {activeIndex + 1}/{PROJECT_COUNT}
          </p>
        ) : null}
      </div>
    </section>
  );
}
