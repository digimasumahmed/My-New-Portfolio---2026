"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
  /** When true, use light glyphs (for dark header bars). */
  inverted?: boolean;
};

export function ThemeToggle({ className = "", inverted = false }: ThemeToggleProps) {
  const { theme, toggleTheme, ready } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`flex size-10 shrink-0 items-center justify-center border border-solid transition-colors duration-300 hover:opacity-80 sm:size-11 ${
        inverted
          ? "border-white/80 text-white"
          : "border-ink text-ink"
      } ${className}`}
    >
      <span className={ready ? "opacity-100" : "opacity-0"} aria-hidden>
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.05 5.05l1.56 1.56M17.39 17.39l1.56 1.56M5.05 18.95l1.56-1.56M17.39 6.61l1.56-1.56"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M20.5 14.2A7.8 7.8 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
