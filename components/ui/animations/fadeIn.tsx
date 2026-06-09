"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";
type IntrinsicTag = keyof JSX.IntrinsicElements;

// Shared observer state
const callbackMap = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;
let observerCount = 0; 

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
              observerCount--;

              // Disconnect and destroy when no elements left
              if (observerCount <= 0) {
                sharedObserver?.disconnect();
                sharedObserver = null;
                observerCount = 0;
              }
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
  as?: IntrinsicTag;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    el.classList.remove("is-visible");

    callbackMap.set(el, () => {
      timeoutId = setTimeout(() => {
        el.classList.add("is-visible");
      }, delay);
    });

    const observer = getSharedObserver();
    observer.observe(el);
    observerCount++; 

    return () => {
      observer.unobserve(el);
      callbackMap.delete(el);
      clearTimeout(timeoutId);
      observerCount--; 

      // Disconnect and destroy when no elements left
      if (observerCount <= 0) {
        sharedObserver?.disconnect();
        sharedObserver = null;
        observerCount = 0;
      }
    };
  }, [delay, direction]);

  const directionClass = {
    up:    "push-up",
    left:  "push-left",
    right: "push-right",
  }[direction];

  return (
    // @ts-expect-error — Tag is restricted to IntrinsicElements so ref is always safe
    <Tag ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </Tag>
  );
}