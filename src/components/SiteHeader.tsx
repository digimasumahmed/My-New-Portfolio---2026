"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useMenu } from "@/components/providers/MenuProvider";

type SiteHeaderProps = {
  variant?: "dark" | "light";
};

export function SiteHeader({ variant = "dark" }: SiteHeaderProps) {
  const dark = variant === "dark";
  const { openMenu, isOpen } = useMenu();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 12);

      // Always show near the top or while the menu is open.
      if (y < 48 || isOpen) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setHidden(false);
  }, [isOpen]);

  return (
    <>
      <header
        data-site-header
        className={`fixed top-0 right-0 left-0 z-50 w-full transition-transform duration-400 ease-out ${
          hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-white/95 backdrop-blur-sm" : "bg-white"}`}
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 pt-4 pb-0 sm:px-5 sm:pt-5">
          <div
            data-header-bar
            className={`flex items-center justify-between p-4 sm:p-5 ${
              dark
                ? "bg-[#1e1e1e]"
                : "border border-solid border-[#1e1e1e] bg-white"
            }`}
          >
            <Link
              href="/"
              data-header-logo
              className="relative h-12 w-[52px] shrink-0 overflow-hidden sm:h-[71px] sm:w-[75px]"
              aria-label="Masum home"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-v2/logo.png"
                alt="Masum"
                className="absolute top-[-20%] left-[-17.58%] h-[128%] w-[133.82%] max-w-none"
              />
            </Link>

            <button
              type="button"
              data-header-menu
              onClick={openMenu}
              className={`flex items-center gap-2 transition-transform duration-300 hover:-translate-y-0.5 ${
                dark ? "text-white" : "text-[#1e1e1e]"
              }`}
              aria-label="Open menu"
            >
              <span className="flex w-10 flex-col gap-1.5 p-1 sm:w-[60px] sm:gap-2 sm:p-1">
                <span
                  className={`h-1.5 w-full sm:h-2 ${dark ? "bg-white" : "bg-[#1e1e1e]"}`}
                />
                <span
                  className={`h-1.5 w-full sm:h-2 ${dark ? "bg-white" : "bg-[#1e1e1e]"}`}
                />
                <span
                  className={`h-1.5 w-full sm:h-2 ${dark ? "bg-white" : "bg-[#1e1e1e]"}`}
                />
              </span>
              <span className="font-[family-name:var(--font-vina-sans)] text-[28px] leading-none sm:text-[40px]">
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>
      {/* Matches fixed header height so page content isn't covered. */}
      <div
        aria-hidden
        className="h-[calc(1rem+3rem+2rem)] sm:h-[calc(1.25rem+4.4375rem+2.5rem)]"
      />
    </>
  );
}
