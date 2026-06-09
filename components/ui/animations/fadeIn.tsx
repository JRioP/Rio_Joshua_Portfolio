"use client";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right";
type HTMLTag = keyof HTMLElementTagNameMap;

const callbackMap = new Map<Element, () => void>();
const observedElements = new Set<Element>();
let sharedObserver: IntersectionObserver | null = null;

function unregisterElement(el: Element) {
  if (!observedElements.has(el)) return;
  observedElements.delete(el);
  callbackMap.delete(el);
  sharedObserver?.unobserve(el);
  if (observedElements.size === 0) {
    sharedObserver?.disconnect();
    sharedObserver = null;
  }
}

function getSharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbackMap.get(entry.target);
            if (cb) {
              cb();
              unregisterElement(entry.target);
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
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  as?: HTMLTag;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    el.classList.remove("is-visible");

    const observer = getSharedObserver();

    if (!observer) {
      el.classList.add("is-visible");
      return;
    }

    callbackMap.set(el, () => {
      timeoutId = setTimeout(() => {
        el.classList.add("is-visible");
      }, delay);
    });

    observedElements.add(el);
    observer.observe(el);

    return () => {
      clearTimeout(timeoutId);
      unregisterElement(el);
    };
  }, [delay , direction]);

  const directionClass = {
    up:    "push-up",
    left:  "push-left",
    right: "push-right",
  }[direction];
  const Tag = as as any;

  return (
    <Tag ref={ref} className={`${directionClass} ${className}`}>
      {children}
    </Tag>
  );
}