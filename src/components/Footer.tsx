"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

import { useGsapContext } from "@/hooks/useGsapContext";
import { Magnetic } from "@/components/ui/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Feature Works", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Plans", href: "/#pricing" },
  { label: "Contact", href: "/contact" },
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/digimasumahmed" },
  { label: "Instagram", href: "https://www.instagram.com/digimasumahmed" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/digimasumahmed/" },
  { label: "Github", href: "https://github.com/digimasumahmed" },
  { label: "Dribbble", href: "https://dribbble.com/digimasumahmed" },
] as const;

const SKILL_ICONS = [
  { src: "/footer/icon-pen.svg", alt: "Design" },
  { src: "/footer/icon-bulb.svg", alt: "Ideas" },
  { src: "/footer/icon-target.svg", alt: "Goals" },
] as const;

function CornerArrow({
  src,
  size = 24,
}: {
  src: string;
  size?: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      style={{ width: size, height: size }}
    >
      <span className="-scale-y-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          className="max-w-none"
        />
      </span>
    </span>
  );
}

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(
    rootRef,
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        "[data-footer-line]",
        { yPercent: 110 },
        { yPercent: 0, duration: 0.95, stagger: 0.12 },
      )
        .from(
          "[data-footer-arrow]",
          {
            scale: 0.65,
            opacity: 0,
            rotate: -12,
            duration: 0.85,
            ease: "back.out(1.4)",
          },
          0.25,
        )
        .fromTo(
          "[data-footer-brand]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.05, ease: "power4.inOut" },
          0.35,
        )
        .from(
          "[data-footer-brand-text]",
          { opacity: 0, y: 24, duration: 0.55 },
          0.75,
        )
        .from(
          "[data-footer-link]",
          { opacity: 0, x: -12, duration: 0.4, stagger: 0.05 },
          0.7,
        )
        .from(
          "[data-footer-social]",
          { opacity: 0, x: 12, duration: 0.4, stagger: 0.05 },
          0.75,
        )
        .from(
          "[data-footer-email]",
          { opacity: 0, y: 18, duration: 0.55 },
          0.95,
        );
    },
    [],
  );

  return (
    <footer
      ref={rootRef}
      id="contact"
      className="relative w-full overflow-x-clip bg-white"
      aria-label="Footer"
    >
      <div className="mx-auto w-full max-w-[1920px] px-4 pt-8 pb-4 sm:px-5 sm:pt-10 md:pt-14 md:pb-5">
        <div className="flex flex-col gap-4 border border-solid border-[#1e1e1e] p-3 sm:gap-5 sm:p-5">
          <Link
            href="/contact"
            className="group inline-flex max-w-full items-end gap-2 p-3 sm:gap-4 sm:p-5 md:gap-5"
          >
            <p className="min-w-0 font-[family-name:var(--font-vina-sans)] text-[clamp(36px,11vw,280px)] leading-[0.95] text-[#252525] sm:leading-[0.85]">
              <span className="inline-block overflow-hidden align-bottom py-1">
                <span data-footer-line className="block">
                  START A
                </span>
              </span>{" "}
              <span className="inline-block overflow-hidden align-bottom py-1 text-[#ff6228]">
                <span data-footer-line className="block">
                  PROJECT.
                </span>
              </span>
            </p>
            <span
              data-footer-arrow
              className="footer-cta-arrow mb-[0.12em] shrink-0 origin-center transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-6"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/footer/arrow-large.svg"
                alt=""
                className="h-auto w-[clamp(40px,8vw,160px)] -scale-y-100 max-w-none"
              />
            </span>
          </Link>

          <div className="flex flex-col xl:flex-row">
            <div
              data-footer-brand
              className="flex min-h-[260px] w-full shrink-0 flex-col justify-center bg-[#ff6228] p-4 sm:min-h-[320px] sm:p-5 xl:min-h-[400px] xl:w-[600px]"
            >
              <div
                data-footer-brand-text
                className="mx-auto flex w-full max-w-[564px] flex-1 flex-col justify-between gap-10 py-2 sm:gap-12 xl:min-h-[320px] xl:gap-16"
              >
                <p className="font-[family-name:var(--font-vina-sans)] text-[clamp(48px,10vw,120px)] leading-[0.95] text-[#f7f6f2]">
                  MaSum AHMED.
                </p>
                <div className="flex items-center justify-center gap-6 sm:gap-10">
                  {SKILL_ICONS.map((icon) => (
                    <span
                      key={icon.src}
                      className="relative size-[clamp(52px,10vw,100px)] shrink-0 overflow-visible"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        className="absolute inset-[8%] size-[84%] max-w-none object-contain"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-col lg:flex-row">
                <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-1">
                  <nav
                    className="flex min-w-0 flex-col sm:border-r-[0.5px] sm:border-solid sm:border-[#1e1e1e] lg:flex-1"
                    aria-label="Footer navigation"
                  >
                    {NAV_LINKS.map((link, index) => (
                      <a
                        key={link.label}
                        href={link.href}
                        data-footer-link
                        className={`group flex min-h-[52px] items-center justify-between px-3 py-2.5 text-[#1e1e1e] transition-colors hover:bg-black/5 sm:min-h-[66px] sm:px-4 ${
                          index === 0
                            ? "border-y-[0.5px] border-solid border-[#1e1e1e]"
                            : "border-b-[0.5px] border-solid border-[#1e1e1e]"
                        }`}
                      >
                        <span className="font-[family-name:var(--font-gugi)] text-[15px] leading-none sm:text-[18px]">
                          {link.label}
                        </span>
                        <CornerArrow src="/footer/arrow-black.svg" size={20} />
                      </a>
                    ))}
                  </nav>

                  <div className="flex min-w-0 flex-col justify-between border-x-0 border-y-[0.5px] border-solid border-[#1e1e1e] sm:border-[0.5px] lg:flex-1">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-footer-social
                        className="group flex min-h-[44px] items-center justify-between px-3 py-2 text-[#1e1e1e] transition-colors hover:bg-black/5 sm:min-h-[43px] sm:px-4 sm:py-2.5"
                      >
                        <span className="font-[family-name:var(--font-gugi)] text-[15px] leading-none sm:text-[18px]">
                          {link.label}
                        </span>
                        <CornerArrow src="/footer/arrow-orange.svg" size={20} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col lg:max-w-[651px]">
                  <div className="flex items-center justify-center overflow-hidden border-y-[0.5px] border-solid border-[#1e1e1e] px-2 py-3 sm:py-2.5 lg:border-r-[0.5px]">
                    <p className="max-w-full text-center font-[family-name:var(--font-gugi)] text-[clamp(20px,4.2vw,70px)] leading-[1.05] break-words text-[#ff6228]">
                      STAY CONNECTED
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-2 border-solid border-[#1e1e1e] px-3 py-4 font-[family-name:var(--font-gugi)] text-[#1e1e1e] sm:px-2.5 lg:border-r-[0.5px]">
                    <p className="text-[18px] leading-normal sm:text-[20px]">
                      Newsletter
                    </p>
                    <p className="text-[13px] leading-relaxed text-pretty sm:text-[14px] sm:leading-normal">
                      Subscribe to our newsletter to get more insights.
                    </p>
                  </div>
                  <form
                    className="flex flex-col gap-3 border-y-[0.5px] border-solid border-[#1e1e1e] p-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 lg:border-r-[0.5px]"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <label className="sr-only" htmlFor="footer-email">
                      Your Email
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="min-w-0 flex-1 border border-[#1e1e1e]/20 bg-transparent px-3 py-2.5 font-[family-name:var(--font-gugi)] text-[14px] leading-normal text-[#1e1e1e] outline-none placeholder:text-[rgba(30,30,30,0.5)] sm:border-0 sm:px-0 sm:py-0"
                    />
                    <Magnetic>
                      <button
                        type="submit"
                        className="shrink-0 bg-[#1e1e1e] px-4 py-2.5 font-[family-name:var(--font-vina-sans)] text-[16px] leading-none whitespace-nowrap text-[#f7f6f2] transition-opacity hover:opacity-90 sm:text-[18px]"
                      >
                        SUBSCRIBE
                      </button>
                    </Magnetic>
                  </form>
                </div>
              </div>

              <div
                data-footer-email
                className="flex flex-col gap-2 border-b-[0.5px] border-solid border-[#1e1e1e] p-3 text-[#1e1e1e] sm:gap-2.5 sm:p-4 lg:border-r-[0.5px]"
              >
                <p className="font-[family-name:var(--font-vina-sans)] text-[clamp(24px,5vw,40px)] leading-none">
                  Reach Out
                </p>
                <a
                  href="mailto:mdmasumahmed4800@gmail.com"
                  className="font-[family-name:var(--font-gugi)] text-[clamp(16px,4vw,40px)] leading-snug break-all transition-opacity hover:opacity-70"
                >
                  mdmasumahmed4800@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
