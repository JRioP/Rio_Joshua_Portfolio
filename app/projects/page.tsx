import type { Metadata } from "next";
import FadeIn from "@/components/ui/animations/fadeIn";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of production-ready applications, local AI experiments, and technical solutions by Joshua Rio.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen w-full mt-20 relative overflow-visible py-10 px-6 sm:px-10 md:px-15 lg:px-50">
      <h1 className="font-display text-4xl font-bold tracking-tight mb-6 md:text-6xl">
        Projects<span className="text-accent-500">.</span>
      </h1>
      <p className="text-neutral-400 text-lg leading-relaxed mb-10 max-w-4xl">
        A collection of production-ready applications, local AI experiments, and technical solutions. Each project demonstrates a focus on clean code, secure deployment pipelines, and optimized performance. From cross-platform development to structural system design, these works showcase practical engineering solutions built to solve real-world problems.
      </p>

      {/* FEATURED PROJECTS */}
      <FadeIn as="section" className="w-full mt-6 md:mt-10 relative" direction="up">
        <h2 className="font-mono text-xs text-accent-500 uppercase tracking-widest mb-6">
          Featured Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </FadeIn>

      {/* OTHER PROJECTS */}
      {otherProjects.length > 0 && (
        <FadeIn as="section" className="w-full mt-16 relative" direction="up" delay={50}>
          <h2 className="font-display text-2xl font-bold tracking-tight text-neutral-200 mb-6 md:text-3xl">
            More Projects<span className="text-accent-500">.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
