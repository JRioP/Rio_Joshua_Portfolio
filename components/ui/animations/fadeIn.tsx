"use client";
import { useEffect, useRef } from "react";

type Direction = "up" | "left" | "right";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("is-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionClass = {
    up:    "push-up",
    left:  "push-left",
    right: "push-right",
  }[direction];

  return (
    <div ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </div>
  );
}