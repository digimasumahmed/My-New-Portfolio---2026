export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

export function isDesktopMotion(): boolean {
  if (typeof window === "undefined") return false;
  return (
    !prefersReducedMotion() &&
    window.matchMedia("(min-width: 1280px)").matches
  );
}
