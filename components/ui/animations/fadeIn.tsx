"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: any;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const directionClass = {
    up: "push-up",
    left: "push-left",
    right: "push-right",
  }[direction];

  return (
    <Tag
      ref={ref}
      className={`${directionClass} ${className} ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </Tag>
  );
}