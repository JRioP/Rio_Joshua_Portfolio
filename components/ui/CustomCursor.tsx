"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let rafId: number;

    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    rafId = requestAnimationFrame(updatePosition);

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible((prev) => (prev ? prev : true));
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "a, button, [role='button'], input, textarea, select, label, [data-clickable='true']"
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.15s ease-out",
      }}
    >
      <div
        className={`relative transition-transform duration-100 ease-out origin-top-left ${
          isClicked ? "scale-90" : isHovering ? "scale-105" : "scale-100"
        }`}
      >
        {/* Exact Neon Lime Arrow Pointer */}
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
        >
          <path
            d="M0.5 0.5L18.5 12L8.5 12.5L4 22.5L0.5 0.5Z"
            fill="#B8EE00"
            stroke="#B8EE00"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        {/* Attached "You" Pill Badge */}
        <div className="absolute left-[13px] top-[11px] px-2.5 py-0.5 rounded-full bg-[#B8EE00] text-neutral-950 font-sans font-extrabold text-[11px] leading-tight tracking-tight shadow-[0_2px_8px_rgba(0,0,0,0.35)] select-none">
          You
        </div>
      </div>
    </div>
  );
}

