"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";

import { prefersReducedMotion } from "@/lib/motion";

type SetupFn = (root: HTMLElement) => void | (() => void);

/**
 * Scoped GSAP context with automatic cleanup on unmount / re-run.
 * Skips setup when the user prefers reduced motion (unless force=true).
 */
export function useGsapContext(
  rootRef: RefObject<HTMLElement | null>,
  setup: SetupFn,
  deps: unknown[] = [],
  options?: { force?: boolean },
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!options?.force && prefersReducedMotion()) return;

    let extraCleanup: void | (() => void);

    const ctx = gsap.context(() => {
      extraCleanup = setupRef.current(root);
    }, root);

    return () => {
      if (typeof extraCleanup === "function") extraCleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
