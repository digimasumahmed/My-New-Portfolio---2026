"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    if (!window.matchMedia("(min-width: 1280px)").matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='expand'], input, textarea, label",
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden mix-blend-difference xl:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full bg-[#ff6228]"
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          opacity: hovering ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
    </motion.div>
  );
}
