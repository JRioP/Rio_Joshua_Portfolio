"use client";
import { useEffect, useRef } from "react";
import type { ReactNode, ElementType } from "react";

type Direction = "up" | "left" | "right";

const callbackMap = new Map<Element, () => void>();

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbackMap.get(entry.target);
            if (cb) {
              cb();
              callbackMap.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -60px 0px" }
    );
  }
  return sharedObserver;
}

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
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    callbackMap.set(el, () => {
      timeoutId = setTimeout(() => {
        el.classList.add("is-visible");
      }, delay);
    });

    const observer = getSharedObserver();
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbackMap.delete(el);
      clearTimeout(timeoutId);
    };
  }, [delay]);

  const directionClass = {
    up:    "push-up",
    left:  "push-left",
    right: "push-right",
  }[direction];

  return (
    <Tag ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </Tag>
  );
}