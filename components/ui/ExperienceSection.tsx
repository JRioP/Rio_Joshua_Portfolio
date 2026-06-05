"use client";

import { useState } from "react";

const EXPERIENCES = [
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2023 – Present",
    bullets: [
      "Built and deployed a production corporate website for a local business using Next.js and WordPress CMS.",
      "Developed a local AI document chatbot using Python, LangChain, and Ollama for offline document Q&A.",
      "Handled end-to-end delivery: UI design in Figma, implementation, hosting, and client handoff.",
    ],
  },
  {
    company: "MaYo Holdings and Construction, Inc.",
    role: "IT Intern (OJT)",
    period: "2026",
    bullets: [
      "Built and deployed a full corporate website for MHCI from local staging to live production using WordPress and Elementor, including DNS configuration, server redirect setup, and a post-migration database search-and-replace to update all internal URLs.",
      "Optimized site performance from baseline to a 92 PageSpeed score by configuring LiteSpeed Cache, WP Super Cache, and raising the server WP_MEMORY_LIMIT from 40MB to 512MB; secured the site with Wordfence WAF, achieving an external A+ security rating.",
      "Engineered a custom PHP email routing system with dynamic service-based dropdown auto-selection and auto-labeled subject lines for inquiry tracking, effectively creating a lightweight ticketing system for incoming website leads.",
      "Ensured full cross-platform responsiveness by implementing custom layout breakpoints (1024px) and mobile-specific design fixes; consolidated 19 services into 8 structured categories with an icon-grid layout to improve UX and site navigability.",
      "Provided hands-on IT support including CCTV maintenance, RJ45 crimping and LAN cable repair, Ricoh scanner troubleshooting, laptop/phone inventory management, and hybrid Zoom event AV setup for company-wide orientations and corporate events.",
    ],
  },
  {
    company: "STI Tanauan",
    role: "Thesis Lead Developer",
    period: "2024 – 2025",
    bullets: [
      "Led a team building a real-time roadside assistance Android app using Java and Firebase.",
      "Designed the system architecture, Firebase Realtime Database schema, and all core UI flows.",
      "Presented and defended the project as part of the BSIT capstone requirement.",
    ],
  },
];

export default function ExperienceSection() {
  const [active, setActive] = useState(0);

  const exp = EXPERIENCES[active];

  return (
    <section className="w-full mt-32">
      <h2 className="font-display text-6xl font-bold tracking-tight mb-12">
        Experience<span className="text-accent-500">.</span>
      </h2>

      <div className="flex gap-0">
        {/* Left sidebar */}
        <ul className="flex flex-col min-w-36 border-l border-neutral-800">
          {EXPERIENCES.map((e, i) => (
            <li key={e.company}>
              <button
                onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-3 font-mono text-sm transition-colors border-l-2 -ml-px ${
                  active === i
                    ? "border-accent-500 text-accent-500 bg-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-200 hover:bg-neutral-900/50"
                }`}
              >
                {e.company}
              </button>
            </li>
          ))}
        </ul>

        {/* Right content */}
        <div className="flex-1 pl-10">
          <h3 className="font-display text-xl font-bold mb-1">
            {exp.role}{" "}
            <span className="text-accent-500">@ {exp.company}</span>
          </h3>
          <p className="font-mono text-xs text-neutral-500 mb-6">{exp.period}</p>
          <ul className="flex flex-col gap-3">
            {exp.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-neutral-400 text-sm leading-relaxed">
                <svg
                  className="mt-0.5 shrink-0 text-accent-500"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2 7l3.5 3.5L12 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
