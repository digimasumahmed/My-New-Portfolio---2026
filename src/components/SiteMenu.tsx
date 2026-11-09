"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

import { useMenu } from "@/components/providers/MenuProvider";
import { prefersReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/digimasumahmed" },
  { label: "Instagram", href: "https://www.instagram.com/digimasumahmed" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/digimasumahmed/" },
  { label: "Github", href: "https://github.com/digimasumahmed" },
  { label: "Dribbble", href: "https://dribbble.com/digimasumahmed" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteMenu() {
  const { isOpen, closeMenu } = useMenu();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const image = imageRef.current;
    if (!root || !panel || !backdrop) return;

    const links = root.querySelectorAll<HTMLElement>("[data-menu-link]");
    const socials = root.querySelectorAll<HTMLElement>("[data-menu-social]");
    const closeBtn = root.querySelector<HTMLElement>("[data-menu-close]");
    const reach = root.querySelector<HTMLElement>("[data-menu-reach]");
    const reduced = prefersReducedMotion();
    const wasOpen = wasOpenRef.current;

    gsap.killTweensOf([
      root,
      panel,
      backdrop,
      image,
      links,
      socials,
      closeBtn,
      reach,
    ]);

    // Initial hidden state
    if (!isOpen && !wasOpen) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(panel, { xPercent: 110 });
      gsap.set(backdrop, { autoAlpha: 0 });
      return;
    }

    if (isOpen) {
      wasOpenRef.current = true;
      gsap.set(root, { autoAlpha: 1, pointerEvents: "auto" });

      if (reduced) {
        gsap.set(panel, { xPercent: 0 });
        gsap.set(backdrop, { autoAlpha: 1 });
        gsap.set([links, socials, closeBtn, reach, image], {
          clearProps: "all",
        });
        return;
      }

      gsap.set(panel, { xPercent: 110 });
      gsap.set(backdrop, { autoAlpha: 0 });
      gsap.set(image, { scale: 1.2, autoAlpha: 0 });
      gsap.set(links, { autoAlpha: 0, y: 40 });
      gsap.set(socials, { autoAlpha: 0, x: 20 });
      gsap.set(closeBtn, { autoAlpha: 0, rotate: -90, scale: 0.65 });
      gsap.set(reach, { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(backdrop, { autoAlpha: 1, duration: 0.42 }, 0)
        .to(panel, { xPercent: 0, duration: 0.72, ease: "power4.out" }, 0.04)
        .to(
          image,
          { scale: 1, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
          0.16,
        )
        .to(
          closeBtn,
          {
            autoAlpha: 1,
            rotate: 0,
            scale: 1,
            duration: 0.48,
            ease: "back.out(1.7)",
          },
          0.26,
        )
        .to(
          links,
          { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.075 },
          0.28,
        )
        .to(
          socials,
          { autoAlpha: 1, x: 0, duration: 0.42, stagger: 0.05 },
          0.5,
        )
        .to(reach, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.64);
      return;
    }

    // Closing
    wasOpenRef.current = false;

    if (reduced) {
      gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(panel, { xPercent: 110 });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.in" },
      onComplete: () => {
        gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });
      },
    });

    tl.to([links, socials, closeBtn, reach], {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      stagger: { each: 0.02, from: "end" },
    })
      .to(
        image,
        { scale: 1.1, autoAlpha: 0.35, duration: 0.32, ease: "power2.in" },
        0,
      )
      .to(panel, { xPercent: 110, duration: 0.48, ease: "power4.in" }, 0.04)
      .to(backdrop, { autoAlpha: 0, duration: 0.28 }, 0.12);
  }, [isOpen]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100]"
      aria-hidden={!isOpen}
    >
      <button
        ref={backdropRef}
        type="button"
        aria-label="Close menu overlay"
        className="absolute inset-0 bg-black/50"
        onClick={closeMenu}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute inset-0 flex h-[100dvh] w-full overflow-hidden bg-white will-change-transform"
      >
        <div
          ref={imageRef}
          className="relative hidden h-full w-[46%] shrink-0 overflow-hidden bg-[#d9d9d9] md:block lg:w-[52%]"
        >
          <Image
            src="/menu/panel-art.png"
            alt=""
            fill
            className="object-cover"
            sizes="52vw"
            priority
          />
        </div>

        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col justify-between gap-4 overflow-hidden p-4 sm:gap-5 sm:p-6 md:max-w-none md:px-10 md:py-7 lg:gap-8 lg:px-14 lg:py-10">
          <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-5 lg:gap-8">
            <div className="flex items-start justify-between gap-3 sm:gap-4">
              <nav
                className="flex min-h-0 flex-1 flex-col justify-center gap-[clamp(10px,2.2dvh,32px)]"
                aria-label="Primary"
              >
                {NAV_LINKS.map((link) => {
                  const active = isActivePath(pathname, link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      data-menu-link
                      onClick={closeMenu}
                      className={`font-[family-name:var(--font-vina-sans)] text-[clamp(28px,min(8.5vw,9.5dvh),96px)] leading-[0.95] transition-colors duration-300 hover:text-[#ff7340] ${
                        active ? "text-[#ff7340]" : "text-[#1e1e1e]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <button
                type="button"
                data-menu-close
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex size-10 shrink-0 items-center justify-center border border-solid border-[#ff7340] p-2 transition-transform duration-300 hover:scale-105 sm:size-[50px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/menu/icon-close.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="size-5 max-w-none sm:size-[30px]"
                />
              </button>
            </div>
          </div>

          <div className="flex w-full max-w-[420px] shrink-0 flex-col">
            <div className="flex flex-col border border-solid border-[#1e1e1e]">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-menu-social
                  className="group flex items-center justify-between px-3 py-1.5 text-[#1e1e1e] transition-colors hover:bg-black/[0.03] sm:px-4 sm:py-2.5"
                >
                  <span className="font-[family-name:var(--font-gugi)] text-[13px] leading-none sm:text-[16px] lg:text-[18px]">
                    {link.label}
                  </span>
                  <span className="flex size-4 items-center justify-center overflow-hidden sm:size-6">
                    <span className="-scale-y-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/menu/icon-arrow.svg"
                        alt=""
                        width={15}
                        height={15}
                        className="max-w-none"
                      />
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div
              data-menu-reach
              className="flex flex-col gap-1.5 border border-t-0 border-solid border-[#1e1e1e] p-3 text-[#1e1e1e] sm:gap-2.5 sm:p-4"
            >
              <p className="font-[family-name:var(--font-vina-sans)] text-[18px] leading-none sm:text-[22px] lg:text-[24px]">
                Reach Out
              </p>
              <a
                href="mailto:mdmasumahmed4800@gmail.com"
                className="font-[family-name:var(--font-gugi)] text-[12px] leading-snug break-all transition-opacity hover:opacity-70 sm:text-[15px] lg:text-[18px]"
              >
                mdmasumahmed4800@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
