// components/projects/ProjectsGrid.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import type { Project } from "@/lib/projects";

const CATEGORIES = [
  { value: "all",     label: "All"     },
  { value: "android", label: "Android" },
  { value: "web",     label: "Web"     },
  { value: "ai",      label: "AI"      },
  { value: "desktop", label: "Desktop" },
];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={clsx(
              "font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all",
              active === value
                ? "bg-orange-500 text-black border-orange-500"
                : "border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-neutral-600 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-orange-500 uppercase tracking-widest">
                {project.category}
              </span>
              {project.featured && (
                <span className="font-mono text-xs text-neutral-600 uppercase tracking-widest">
                  Featured
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight mb-2 group-hover:text-orange-500 transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-600">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
