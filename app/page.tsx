"use client";
import { useState, useEffect, useRef } from "react";

const ROTATING_TEXTS = [
  "a Full-Stack Developer.",
  "an Android Developer.",
  "a Web Developer.",
  "an AI Enthusiast.",
  "a Problem Solver.",
];

const TECH_STACK = [
  { label: "Java", category: "Android" },
  { label: "Firebase", category: "Android" },
  { label: "Next.js", category: "Web" },
  { label: "TypeScript", category: "Web" },
  { label: "PHP", category: "Web" },
  { label: "Python", category: "AI" },
  { label: "LangChain", category: "AI" },
  { label: "MySQL", category: "DB" },
  { label: "Git", category: "Tools" },
  { label: "Figma", category: "Tools" },
];

export default function Home() {
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
    <main className="min-h-screen flex items-center px-6 py-32 max-w-6xl mx-auto">

      {/* LEFT COLUMN — text content */}
      <div className="flex-1 max-w-xl">
        <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-5">
          portfolio
        </p>

        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight mb-6">
          Hi, I am Joshua
          <br />
          <span className="text-orange-500">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </h1>

        <p className="text-neutral-400 text-lg leading-relaxed mb-4">
          Full-stack developer from Batangas. I've shipped a real-time
          Android app, a live corporate website, and a local AI chatbot.
        </p>

        <p className="text-neutral-100 text-lg leading-relaxed mb-10">
          I don't just follow tutorials — I deploy things, secure them,
          and make them fast. Open to roles in Metro Manila or remote.
        </p>

        <div className="flex gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors"
          >
            See my work
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-neutral-700 text-neutral-300 font-bold rounded-lg hover:border-neutral-500 hover:text-white transition-colors"
          >
            Contact me
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN — tech stack card */}
      <div className="hidden lg:flex flex-1 justify-end">
        <div className="w-80 bg-neutral-900 border border-neutral-800 rounded-2xl p-6">

          <p className="font-mono text-xs text-neutral-600 uppercase tracking-widest mb-5">
            Tech stack
          </p>

          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.label}
                className="font-mono text-xs px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
              >
                {tech.label}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-800 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Status</span>
              <span className="flex items-center gap-2 font-mono text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to work
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Location</span>
              <span className="font-mono text-xs text-neutral-300">Batangas, PH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">Available</span>
              <span className="font-mono text-xs text-neutral-300">Remote / Metro Manila</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-xs text-neutral-600">GitHub</span>
              <a
                href="https://github.com/JRioP"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-orange-500 hover:underline"
              >
                JRioP
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}