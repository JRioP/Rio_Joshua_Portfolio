"use client";

import { useState, useRef, useEffect } from "react";

const EXPERIENCES = [
  {
    shortName: "MaYo Holdings",
    company: "MaYo Holdings and Construction, Inc.",
    role: "IT Intern (OJT)",
    period: "2026",
    bullets: [
      "Completed a 486-Hour Internship, built and deployed a full corporate website for MHCI from local staging to live production using WordPress and Elementor, including DNS configuration, server redirect setup, and a post-migration database search-and-replace to update all internal URLs.",
      "Optimized site performance from baseline to a 92 PageSpeed score by configuring LiteSpeed Cache, WP Super Cache, and raising the server WP_MEMORY_LIMIT from 40MB to 512MB; secured the site with Wordfence WAF, achieving an external A+ security rating.",
      "Engineered a custom PHP email routing system with dynamic service-based dropdown auto-selection and auto-labeled subject lines for inquiry tracking, effectively creating a lightweight ticketing system for incoming website leads.",
      "Ensured full cross-platform responsiveness by implementing custom layout breakpoints (1024px) and mobile-specific design fixes; consolidated 19 services into 8 structured categories with an icon-grid layout to improve UX and site navigability.",
      "Provided hands-on IT support including CCTV maintenance, RJ45 crimping and LAN cable repair, Ricoh scanner troubleshooting, laptop/phone inventory management, and hybrid Zoom event AV setup for company-wide orientations and corporate events.",
    ],
  },
  {
    shortName: "STI Tanauan",
    company: "STI Tanauan",
    role: "Thesis Lead Developer",
    period: "2024 – 2025",
    bullets: [
      "Led a team building a real-time roadside assistance Android app using Java and Firebase.",
      "Designed the system architecture, Firebase Realtime Database schema, and all core UI flows.",
      "Presented and defended the project as part of the BSIT capstone requirement.",
    ],
  },
  {
    shortName: "Smplfy Labs",
    company: "Smplfy Creative Labs",
    role: "WordPress Developer",
    period: "2023",
    bullets: [
      "Built and launched a full LGU website from scratch using WordPress and Elementor, enabling online access to government services for thousands of community residents.",
      "Conducted stakeholder interviews with LGU staff to define requirements, translating community needs into functional website features through iterative feedback cycles.",
      "Delivered responsive, accessible front-end interfaces using WordPress, Elementor, and vanilla JavaScript — reducing page load time through site-wide performance optimization.",
      "Ensured full mobile responsiveness across all devices, improving public accessibility to government information and services.",
    ],
  },
  {
    shortName: "Hello World",
    company: "Hello World",
    role: "My First Hello World project",
    period: "2022",
    bullets: [
      "Built Hello World, a simple Java program that displays 'Hello, World!' on the screen, as my first programming project to learn the basics of Development.",
    ],
  },
];

export default function ExperienceSection() {
  const [active, setActive] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    const timer = setTimeout(checkScroll, 100);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollContainer = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const amount = direction === "right" ? 180 : -180;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const exp = EXPERIENCES[active];

  return (
    <section className="w-full mt-32" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="font-display text-4xl font-bold tracking-tight mb-8 md:mb-12 md:text-6xl">
        Experience<span className="text-accent-500">.</span>
      </h2>

      {/* Mobile: Horizontal scrollable segmented pill bar with swipe indicators */}
      <div className="md:hidden relative mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* Left swipe indicator arrow */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent flex items-center justify-start pl-2 z-10 pointer-events-none transition-opacity duration-200">
            <button
              type="button"
              onClick={() => scrollContainer("left")}
              aria-label="Scroll back to previous experience"
              className="pointer-events-auto w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700/80 text-accent-500 shadow-md flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Scrollable track */}
        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="Work Experience Tabs"
          className="flex gap-2 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERIENCES.map((e, i) => {
            const isActive = active === i;
            return (
              <button
                key={e.company}
                role="tab"
                aria-selected={isActive}
                aria-controls="experience-details-panel"
                onClick={(evt) => {
                  setActive(i);
                  evt.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
                className={`min-h-[44px] shrink-0 px-3.5 py-2 rounded-xl font-mono text-xs transition-all duration-150 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? "bg-accent-500 text-neutral-950 font-bold border-accent-500 shadow-sm"
                    : "bg-neutral-900/80 text-neutral-400 hover:text-neutral-200 border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <span>{e.shortName || e.company}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-neutral-950/20 text-neutral-950 font-semibold"
                      : "bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {e.period.slice(0, 4)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right swipe indicator arrow */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-2 w-14 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent flex items-center justify-end pr-2 z-10 pointer-events-none transition-opacity duration-200">
            <button
              type="button"
              onClick={() => scrollContainer("right")}
              aria-label="Scroll to see more experiences"
              className="pointer-events-auto w-7 h-7 rounded-full bg-neutral-900 border border-neutral-700/80 text-accent-500 shadow-md flex items-center justify-center cursor-pointer active:scale-90 transition-transform hover:border-accent-500"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="animate-pulse"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-0">
        {/* Desktop: Connected vertical timeline */}
        <div className="hidden md:block relative shrink-0 w-64">
          {/* Vertical connecting line */}
          <div className="absolute left-1.75 top-2 bottom-2 w-px bg-neutral-800" />

          <div className="flex flex-col gap-6" role="tablist" aria-label="Work Experience Timeline">
            {EXPERIENCES.map((e, i) => (
              <div key={e.company} className="flex gap-5 items-start relative">
                {/* Dot — filled accent when active, hollow when not */}
                <button
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="experience-details-panel"
                  onClick={() => setActive(i)}
                  className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1 z-10 transition-all cursor-pointer ${
                    active === i
                      ? "bg-accent-500 border-accent-500 ring-4 ring-accent-500/20"
                      : "bg-neutral-950 border-neutral-700 hover:border-accent-500"
                  }`}
                  aria-label={`View ${e.company}`}
                />

                {/* Label */}
                <button
                  onClick={() => setActive(i)}
                  className={`text-left font-mono text-sm transition-colors cursor-pointer pb-6 ${
                    active === i
                      ? "text-accent-500 font-semibold"
                      : "text-neutral-500 hover:text-neutral-200"
                  }`}
                >
                  {e.company}<br />
                  {e.period.slice(0, 4)}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Content pane: pl-0 on mobile for full width, pl-10 on desktop */}
        <div
          id="experience-details-panel"
          role="tabpanel"
          aria-label={`${exp.role} at ${exp.company}`}
          className="flex-1 pl-0 md:pl-10"
        >
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-1 leading-snug">
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
                  aria-hidden="true"
                >
                  <path
                    d="M2 7l3.5 3.5L12 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
