"use client";

import { useState, useRef, useEffect } from "react";

interface ExperienceBullet {
  lead: string;
  text: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  shortName: string;
  role: string;
  type: string;
  period: string;
  yearLabel: string;
  yearNumber: string;
  pillTag: string;
  locationShort: string;
  duration?: string;
  location?: string;
  badge?: string;
  technologies: string[];
  bullets: ExperienceBullet[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "mayo-holdings",
    shortName: "MaYo Holdings",
    company: "MaYo Holdings and Construction, Inc.",
    role: "IT Intern (OJT)",
    type: "Corporate Internship",
    period: "2026",
    yearLabel: "YEAR",
    yearNumber: "2026",
    pillTag: "486 hrs",
    locationShort: "Calamba",
    duration: "486-Hour Practicum",
    location: "Calamba, Laguna",
    badge: "Production Deployment",
    technologies: [
      "WordPress",
      "Elementor",
      "PHP",
      "LiteSpeed Cache",
      "Wordfence WAF",
      "DNS & CPanel",
      "Network & IT Support",
    ],
    bullets: [
      {
        lead: "Full-Lifecycle Production Deployment:",
        text: "Completed a 486-Hour Internship, building and deploying the full corporate website for MHCI from local staging to live production using WordPress and Elementor — executing DNS configuration, server redirects, and database search-and-replace for clean internal URLs.",
      },
      {
        lead: "Speed & Security Hardening:",
        text: "Optimized site performance to a 92 PageSpeed score by configuring LiteSpeed Cache and WP Super Cache, boosting WP_MEMORY_LIMIT to 512MB, and securing the domain with Wordfence WAF for an A+ security audit rating.",
      },
      {
        lead: "Custom PHP Lead Routing Engine:",
        text: "Architected a custom PHP email dispatch system with dynamic service-driven auto-selection and categorized subject tags, establishing an automated lightweight ticketing pipeline for incoming website leads.",
      },
      {
        lead: "Information Architecture & Responsive UX:",
        text: "Consolidated 19 corporate service lines into 8 structured categories with custom layout breakpoints (1024px) and an icon-grid matrix to maximize mobile usability and client conversion.",
      },
      {
        lead: "Systems & Infrastructure Operations:",
        text: "Maintained operational continuity across hardware and networking — servicing CCTV arrays, crimping and repairing LAN/RJ45 drops, troubleshooting Ricoh document scanners, managing device inventory, and operating hybrid Zoom AV setups for corporate events.",
      },
    ],
  },
  {
    id: "sti-tanauan",
    shortName: "STI Tanauan",
    company: "STI College Tanauan",
    role: "Thesis Lead Developer",
    type: "Academic Leadership",
    period: "2024 – 2025",
    yearLabel: "YEAR",
    yearNumber: "2024",
    pillTag: "Thesis",
    locationShort: "Tanauan",
    duration: "BSIT Capstone Project",
    location: "Tanauan, Batangas",
    badge: "Capstone Defense",
    technologies: [
      "Java (Android)",
      "Firebase Realtime DB",
      "Google Maps SDK",
      "Material Design",
      "System Architecture",
    ],
    bullets: [
      {
        lead: "Engineering & Team Leadership:",
        text: "Spearheaded an engineering team building RoadRescue, a real-time roadside emergency assistance Android application connecting distressed motorists with verified local towing and mechanical assistance.",
      },
      {
        lead: "Realtime Architecture & Schema:",
        text: "Engineered the system architecture and designed normalized Firebase Realtime Database schemas handling live GPS coordinates, status synchronizations, and bidirectional socket events.",
      },
      {
        lead: "UX Flows & Capstone Defense:",
        text: "Designed high-stress mobile UX workflows with Google Maps SDK integration, leading technical presentations to earn highest evaluation marks during final capstone defense.",
      },
    ],
  },
  {
    id: "smplfy-labs",
    shortName: "Smplfy Labs",
    company: "Smplfy Creative Labs",
    role: "WordPress Developer",
    type: "Client Development",
    period: "2023",
    yearLabel: "YEAR",
    yearNumber: "2023",
    pillTag: "LGU Portal",
    locationShort: "Contract",
    duration: "Public Sector Project",
    location: "Remote / Contract",
    badge: "Civic Portal",
    technologies: [
      "WordPress",
      "Elementor",
      "JavaScript",
      "Responsive Web Design",
      "Web Accessibility",
      "Client Relations",
    ],
    bullets: [
      {
        lead: "LGU Public Portal Delivery:",
        text: "Built and launched an end-to-end Local Government Unit (LGU) public portal from scratch using WordPress and Elementor, giving thousands of municipal residents digital access to civic services and official records.",
      },
      {
        lead: "Stakeholder Discovery & Requirements:",
        text: "Conducted iterative discovery sessions with LGU administrative staff, translating civic department workflows into accessible, user-tested digital interfaces.",
      },
      {
        lead: "Frontend Performance & Usability:",
        text: "Delivered responsive, accessible front-end interfaces with vanilla JavaScript micro-interactions, reducing page load latency and improving mobile accessibility across all device types.",
      },
    ],
  },
  {
    id: "hello-world",
    shortName: "Hello World",
    company: "First Program & Genesis",
    role: "First Line of Code",
    type: "Foundational Milestone",
    period: "2022",
    yearLabel: "YEAR",
    yearNumber: "2022",
    pillTag: "Origin",
    locationShort: "Genesis",
    duration: "Day 1 Milestone",
    location: "Independent Study",
    badge: "Origin",
    technologies: [
      "Java",
      "OOP Principles",
      "Algorithms",
      "CLI Tooling",
      "Software Fundamentals",
    ],
    bullets: [
      {
        lead: "The Spark of Software Development:",
        text: "Wrote and compiled my very first Java program in the terminal, printing 'Hello, World!' — sparking a deep obsession with algorithmic thinking, system architectures, and shipping software that people use.",
      },
      {
        lead: "Computer Science Foundations:",
        text: "Established fundamental grounding in object-oriented programming principles, data structures, and command-line developer tooling that continues to underpin my full-stack workflow today.",
      },
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
      const amount = direction === "right" ? 220 : -220;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const exp = EXPERIENCES[active];

  return (
    <div className="w-full relative" aria-labelledby="experience-heading">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 gap-4">
        <div>
          <h2
            id="experience-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
          >
            Experience<span className="text-accent-500">.</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
            Corporate internships, technical leadership, and engineering milestones.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-end">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-accent-400 bg-accent-500/10 border border-accent-400/20">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            <span>{EXPERIENCES.length} Milestones</span>
          </span>
        </div>
      </div>

      {/* Mobile: Horizontal scrollable segmented pill bar with swipe indicators */}
      <div className="md:hidden relative mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-2 w-12 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent flex items-center justify-start pl-2 z-10 pointer-events-none transition-opacity duration-200">
            <button
              type="button"
              onClick={() => scrollContainer("left")}
              aria-label="Scroll back to previous experience"
              className="pointer-events-auto w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700/80 text-accent-500 shadow-md flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
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

        {/* Scrollable track with cards */}
        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label="Work Experience Tabs"
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {EXPERIENCES.map((e, i) => {
            const isActive = active === i;
            return (
              <button
                key={e.id}
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
                className={`min-h-[56px] min-w-[260px] shrink-0 p-3 rounded-2xl transition-all duration-200 flex items-center gap-3 cursor-pointer text-left border ${
                  isActive
                    ? "bg-neutral-900/95 border-2 border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
                    : "bg-neutral-900/50 border border-neutral-800/80 text-neutral-300 hover:border-neutral-700"
                }`}
              >
                {/* Left Date Block */}
                <div className="flex flex-col items-center justify-center shrink-0 w-12 text-center border-r border-neutral-800/80 pr-2.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                    {e.yearLabel}
                  </span>
                  <span className={`font-display font-bold text-base leading-tight ${isActive ? "text-neutral-100" : "text-neutral-300"}`}>
                    {e.yearNumber}
                  </span>
                </div>

                {/* Center Title & Role */}
                <div className="flex-1 min-w-0">
                  <div className={`font-sans font-bold text-sm truncate ${isActive ? "text-neutral-100" : "text-neutral-300"}`}>
                    {e.shortName}
                  </div>
                  <div className="text-xs text-neutral-400 truncate mt-0.5">
                    {e.role}
                  </div>
                </div>

                {/* Right Pill */}
                <div className="shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border ${
                      isActive
                        ? "bg-neutral-950/80 text-neutral-100 border-neutral-700 shadow-inner"
                        : "bg-neutral-800/60 text-neutral-400 border-neutral-750"
                    }`}
                  >
                    {e.pillTag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-2 w-14 bg-gradient-to-l from-neutral-950 via-neutral-950/80 to-transparent flex items-center justify-end pr-2 z-10 pointer-events-none transition-opacity duration-200">
            <button
              type="button"
              onClick={() => scrollContainer("right")}
              aria-label="Scroll to see more experiences"
              className="pointer-events-auto w-8 h-8 rounded-full bg-neutral-900 border border-neutral-700/80 text-accent-500 shadow-md flex items-center justify-center cursor-pointer active:scale-90 transition-transform hover:border-accent-500"
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

      {/* Desktop & Tablet: Interactive Left Button Cards + Right Showcase Card */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-start w-full">
        {/* Left Column: List of Experience Cards matching user's exact reference */}
        <div
          className="hidden md:flex flex-col w-80 lg:w-96 shrink-0 gap-3"
          role="tablist"
          aria-label="Work Experience Timeline"
        >
          {EXPERIENCES.map((e, i) => {
            const isActive = active === i;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="experience-details-panel"
                onClick={() => setActive(i)}
                className={`group w-full p-4 rounded-2xl transition-all duration-200 flex items-center gap-4 text-left cursor-pointer border ${
                  isActive
                    ? "bg-neutral-900/95 border-2 border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.5)] ring-1 ring-white/20"
                    : "bg-neutral-900/40 border border-neutral-800/80 text-neutral-400 hover:bg-neutral-900/70 hover:border-neutral-700/80"
                }`}
              >
                {/* Left Date Block (Calendar Style e.g. SEP / 27 -> YEAR / 2026) */}
                <div className="flex flex-col items-center justify-center shrink-0 w-12 text-center border-r border-neutral-800/80 pr-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                    {e.yearLabel}
                  </span>
                  <span
                    className={`font-display font-bold text-lg leading-tight transition-colors ${
                      isActive ? "text-neutral-100" : "text-neutral-400 group-hover:text-neutral-200"
                    }`}
                  >
                    {e.yearNumber}
                  </span>
                </div>

                {/* Center Title & Subtitle */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-sans font-bold text-sm lg:text-base truncate transition-colors ${
                      isActive ? "text-neutral-100" : "text-neutral-300 group-hover:text-neutral-100"
                    }`}
                  >
                    {e.shortName}
                  </div>
                  <div className="text-xs text-neutral-400 truncate mt-0.5">
                    {e.role} · {e.locationShort}
                  </div>
                </div>

                {/* Right Pill Tag (e.g. 7 songs -> 486 hrs / Thesis / LGU Site) */}
                <div className="shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium border transition-colors ${
                      isActive
                        ? "bg-neutral-950/80 text-neutral-100 border-neutral-700 shadow-inner font-semibold"
                        : "bg-neutral-800/60 text-neutral-400 border-neutral-750 group-hover:text-neutral-300"
                    }`}
                  >
                    {e.pillTag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Experience Showcase Card */}
        <div
          id="experience-details-panel"
          role="tabpanel"
          aria-label={`${exp.role} at ${exp.company}`}
          className="flex-1 min-w-0 bg-neutral-900/70 border border-neutral-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm shadow-xl transition-all duration-300"
        >
          {/* Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="font-mono text-xs font-bold text-accent-500 uppercase tracking-wider">
              {exp.type}
            </span>
            <div className="flex items-center gap-2">
              {exp.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-300 bg-emerald-400/10 border border-emerald-400/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {exp.badge}
                </span>
              )}
              <span className="font-mono text-xs text-neutral-300 bg-neutral-800/80 px-3 py-1 rounded-full border border-neutral-750">
                {exp.period}
              </span>
            </div>
          </div>

          {/* Role Title in Display Syne Font */}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-100 tracking-tight leading-snug">
            {exp.role}
          </h3>

          {/* Company, Location & Duration */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm sm:text-base">
            <span className="font-sans font-semibold text-accent-500">
              @ {exp.company}
            </span>
            {exp.location && (
              <>
                <span className="text-neutral-600">·</span>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {exp.location}
                </span>
              </>
            )}
            {exp.duration && (
              <>
                <span className="text-neutral-600">·</span>
                <span className="font-mono text-xs sm:text-sm text-neutral-400">
                  {exp.duration}
                </span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-800/80 my-6" />

          {/* Key Deliverables & Technical Contributions */}
          <div className="mb-8">
            <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
              Key Deliverables &amp; Technical Contributions
            </h4>
            <ul className="flex flex-col gap-4">
              {exp.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start gap-3.5 group">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-md bg-accent-500/10 border border-accent-500/25 flex items-center justify-center text-accent-500">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    <strong className="text-neutral-100 font-semibold mr-1.5">
                      {b.lead}
                    </strong>
                    {b.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies & Tools Shelf */}
          {exp.technologies && exp.technologies.length > 0 && (
            <div className="pt-6 border-t border-neutral-800/80">
              <h4 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                Core Technologies &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded-lg bg-neutral-800/80 text-neutral-200 border border-neutral-750 hover:border-neutral-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
