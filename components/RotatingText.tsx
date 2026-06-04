"use client";
import { useState, useEffect, useRef } from "react";

const ROTATING_TEXTS = [
  "a Full-Stack Developer.",
  "an Android Developer.",
  "a Web Developer.",
  "an AI Enthusiast.",
  "a Problem Solver.",
  "a Lifelong Learner.",
  "a WordPress Developer."
];

export function RotatingText() {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const posRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      const current = ROTATING_TEXTS[indexRef.current];

      if (!isDeletingRef.current) {
        posRef.current += 1;
        setDisplayed(current.slice(0, posRef.current));

        if (posRef.current === current.length) {
          isDeletingRef.current = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 80);
      } else {
        posRef.current -= 1;
        setDisplayed(current.slice(0, posRef.current));

        if (posRef.current === 0) {
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % ROTATING_TEXTS.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 40);
      }
    };

    const timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="text-accent-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}
