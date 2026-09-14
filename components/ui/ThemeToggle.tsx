"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/themes/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder with identical dimensions to prevent layout shift
    return (
      <div
        aria-hidden="true"
        className={`w-15 h-8 rounded-full bg-neutral-800/60 border border-neutral-700/50 opacity-40 shrink-0 ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative w-15 h-8 rounded-full p-1 transition-all duration-500 cursor-pointer overflow-hidden border shrink-0 select-none shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 ${
        isDark
          ? "bg-gradient-to-r from-slate-900 via-indigo-950 to-neutral-900 border-indigo-900/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          : "bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 border-sky-300/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]"
      } ${className}`}
    >
      {/* BACKGROUND SCENERY */}

      {/* Night Sky: Stars & Sparkles */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {/* Star 1 (4-point sparkle) */}
        <svg
          className="absolute top-1.5 left-2 w-2 h-2 text-white/90 animate-pulse"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>

        {/* Star 2 (small dot) */}
        <span className="absolute top-4 left-4.5 w-1 h-1 rounded-full bg-indigo-200/90" />

        {/* Star 3 (small sparkle) */}
        <svg
          className="absolute top-2.5 left-6 w-1.5 h-1.5 text-indigo-100"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" />
        </svg>

        {/* Star 4 (tiny dot) */}
        <span className="absolute bottom-1.5 left-3 w-0.5 h-0.5 rounded-full bg-white/70" />
      </div>

      {/* Day Sky: Fluffy Clouds */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Cloud 1 (Back cloud) */}
        <svg
          className="absolute -bottom-1 right-2 w-7 h-4 text-white/70 transition-transform duration-500"
          viewBox="0 0 24 16"
          fill="currentColor"
        >
          <path d="M19.5 10c0-.3-.03-.6-.08-.9A4.5 4.5 0 0 0 11 7a5 5 0 0 0-4.9 4 3.5 3.5 0 0 0 .4 7h13a3.5 3.5 0 0 0 0-7z" />
        </svg>

        {/* Cloud 2 (Front cloud) */}
        <svg
          className="absolute -bottom-0.5 right-0.5 w-6 h-3.5 text-white/95"
          viewBox="0 0 24 16"
          fill="currentColor"
        >
          <path d="M19 10.5c0-.28-.03-.55-.08-.82A4 4 0 0 0 11.5 7 4.5 4.5 0 0 0 7 10.7a3 3 0 0 0 .5 6h11.5a3 3 0 0 0 0-6.2z" />
        </svg>
      </div>

      {/* SLIDING KNOB (Sun morphing into Moon) */}
      <div
        className={`relative z-10 w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center ${
          isDark
            ? "translate-x-7 bg-slate-100 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            : "translate-x-0 bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]"
        }`}
      >
        {/* Moon Craters (Fade in only in dark mode) */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Crater 1 */}
          <span className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-slate-300/80 shadow-inner" />
          {/* Crater 2 */}
          <span className="absolute bottom-1.5 left-2 w-2 h-2 rounded-full bg-slate-300/80 shadow-inner" />
          {/* Crater 3 */}
          <span className="absolute top-2 right-1.5 w-1 h-1 rounded-full bg-slate-300/80 shadow-inner" />
        </div>

        {/* Sun Center Accent (Fade in only in light mode) */}
        <div
          className={`absolute inset-0.5 rounded-full bg-yellow-200/40 transition-opacity duration-400 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </button>
  );
}
