import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectLiveLink } from "@/components/ui/ProjectLiveLink";

interface ProjectCardProps {
  project: Project;
  layout?: "grid" | "spotlight";
  showFocus?: boolean;
}

export default function ProjectCard({
  project,
  layout = "grid",
  showFocus = false,
}: ProjectCardProps) {
  const isSpotlight = layout === "spotlight";

  // Build category + role line matching user design (e.g. "WEB — FULL STACK DEVELOPER")
  const roleText = project.role || (project.category === "web" ? "Full Stack Developer" : "Software Engineer");
  const categoryRoleString = `${project.category} — ${roleText}`;

  return (
    <div
      className={`group bg-neutral-900/90 border border-neutral-800/90 rounded-2xl sm:rounded-3xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col ${
        isSpotlight ? "lg:flex-row lg:items-stretch" : ""
      }`}
    >
      {/* Cover Image / Thumbnail */}
      {project.coverImage && (
        <div
          className={`relative bg-neutral-800/80 overflow-hidden ${
            isSpotlight
              ? "w-full lg:w-5/12 min-h-[260px] lg:min-h-full"
              : "w-full h-48 sm:h-52"
          }`}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={
              isSpotlight
                ? "(max-width: 1024px) 100vw, 45vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            }
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
        </div>
      )}

      {/* Main Content Body */}
      <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
        <div>
          {/* Top Bar: CATEGORY — ROLE + Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="font-mono text-xs sm:text-[13px] font-bold text-accent-500 uppercase tracking-wider">
              {categoryRoleString}
            </span>

            {/* Badges: In Progress / Latest / Featured */}
            {project.status === "in-progress" || project.status === "wip" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-amber-300 bg-amber-400/10 border border-amber-400/25">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                In Progress
              </span>
            ) : project.badge ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-400/10 border border-emerald-400/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {project.badge}
              </span>
            ) : project.featured ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-accent-400 bg-accent-500/10 border border-accent-400/20">
                Featured
              </span>
            ) : null}
          </div>

          {/* Title: Display Syne Font in Vibrant Accent Blue */}
          <h3 className="font-display text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight text-accent-500 group-hover:text-accent-hover transition-colors mb-3 leading-snug">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Current Focus Box (optional) */}
          {showFocus && project.currentFocus && (
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent-500" />
                <span className="font-mono text-xs font-semibold text-neutral-200 uppercase tracking-wider">
                  Current Focus &amp; Milestones
                </span>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed pl-4 border-l border-neutral-800">
                {project.currentFocus}
              </p>
            </div>
          )}

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-lg bg-neutral-800/80 text-neutral-200 border border-neutral-750 hover:border-neutral-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons with Divider */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-5 border-t border-neutral-800/80 mt-auto">
          {/* Primary: Read Case Study */}
          <Link
            href={`/projects/${project.slug}`}
            aria-label={`Read case study for ${project.title}`}
            className="flex-1 text-center font-sans font-semibold text-sm px-5 py-3 rounded-xl bg-accent-500 hover:bg-accent-hover text-white active:scale-[0.98] transition-all duration-200 shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] border border-blue-400/30 flex items-center justify-center gap-2 min-h-[44px] group/btn"
          >
            <span>Case Study</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 text-blue-100"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3.5L10.5 8L6 12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Secondary: Live Demo or GitHub */}
          {project.liveUrl ? (
            <ProjectLiveLink
              href={project.liveUrl}
              aria-label={`View live demo of ${project.title}`}
              className="flex-1 text-center font-sans font-semibold text-sm px-5 py-3 rounded-xl border border-neutral-700/80 bg-neutral-800/70 hover:bg-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 min-h-[44px] group/sec"
            >
              <span>Live Demo</span>
              <svg
                className="w-4 h-4 text-neutral-400 group-hover/sec:text-neutral-200 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </ProjectLiveLink>
          ) : project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
              className="flex-1 text-center font-sans font-semibold text-sm px-5 py-3 rounded-xl border border-neutral-700/80 bg-neutral-800/70 hover:bg-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 active:scale-[0.98] transition-all duration-200 shadow-sm flex items-center justify-center gap-2 min-h-[44px] group/sec"
            >
              <svg
                className="w-4 h-4 text-neutral-400 group-hover/sec:text-neutral-200 transition-colors fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

