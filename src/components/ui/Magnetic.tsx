"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";

import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.35 });

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (prefersReducedMotion() || isTouchDevice()) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        x.set(relX * strength);
        y.set(relY * strength);
      }}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
