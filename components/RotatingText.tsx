"use client";
import { useState, useEffect, useRef } from "react";

const ROTATING_TEXTS = [
  "a Full-Stack Developer.",
  "an Android Developer.",
  "a Web Developer.",
  "an AI Enthusiast.",
  "a Problem Solver.",
  "a Lifelong Learner.",
  "a WordPress Developer.",
  "a Technology Enthusiast."
];

export function RotatingText() {
  const [mounted, setMounted] = useState(false);
  const [displayed, setDisplayed] = useState(ROTATING_TEXTS[0]);
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const posRef = useRef(ROTATING_TEXTS[0].length);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const current = ROTATING_TEXTS[indexRef.current];

      if (!isDeletingRef.current) {
        posRef.current += 1;
        setDisplayed(current.slice(0, posRef.current));

        if (posRef.current === current.length) {
          isDeletingRef.current = true;
          timeoutId = setTimeout(tick, 2000);
          return;
        }
        timeoutId = setTimeout(tick, 80);
      } else {
        posRef.current -= 1;
        setDisplayed(current.slice(0, posRef.current));

        if (posRef.current === 0) {
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % ROTATING_TEXTS.length;
          timeoutId = setTimeout(tick, 300);
          return;
        }
        timeoutId = setTimeout(tick, 40);
      }
    };

    // First rotation starts after a 2-second pause displaying the initial text
    timeoutId = setTimeout(() => {
      isDeletingRef.current = true;
      tick();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [mounted]);

  return (
    <span className="block whitespace-nowrap overflow-hidden">
      <span className="text-accent-400">
        {displayed}
        <span className={mounted ? "animate-pulse" : ""}>|</span>
      </span>
    </span>
  );
}