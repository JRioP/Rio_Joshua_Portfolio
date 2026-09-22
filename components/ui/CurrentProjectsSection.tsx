import FadeIn from "@/components/ui/animations/fadeIn";
import type { Project } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

interface CurrentProjectsSectionProps {
  projects: Project[];
}

export default function CurrentProjectsSection({ projects }: CurrentProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <FadeIn
      as="section"
      className="w-full mt-28 relative overflow-visible px-6 sm:px-10 md:px-15 lg:px-50"
      direction="up"
      delay={80}
    >
      <div className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl">
              Currently Building<span className="text-accent-500">.</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
              Active architectures, systems, and tools currently on my workbench.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-end">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-amber-300 bg-amber-400/10 border border-amber-400/25">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{projects.length === 1 ? "1 Active Build" : `${projects.length} Active Builds`}</span>
            </span>
          </div>
        </div>

        {/* Project Showcase Grid */}
        <div
          className={`grid gap-8 ${
            projects.length === 1
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              layout={projects.length === 1 ? "spotlight" : "grid"}
              showFocus={true}
            />
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
