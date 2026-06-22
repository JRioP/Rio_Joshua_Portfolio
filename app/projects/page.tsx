import FadeIn from "@/components/ui/animations/fadeIn";
import { getProjects } from "@/lib/projects";
import Image from "next/image";



export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="font-display text-6xl font-bold tracking-tight mb-12">
            Projects<span className="text-accent-500">.</span>
            </h1>
      <p className="text-neutral-400 text-lg leading-relaxed mb-10">
        A collection of production-ready applications, local AI experiments, and technical solutions. Each project demonstrates a focus on clean code, secure deployment pipelines, and optimized performance. From cross-platform development to structural system design, these works showcase practical engineering solutions built to solve real-world problems.
      </p>
      {/* FEATURED PROJECTS */}
            <FadeIn as="section" className="w-full mt-20 relative" direction="up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.filter((p) => p.featured).map((project) => (
                  <div key={project.slug} className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-200 flex flex-col">
                    {project.coverImage && (
                      <div className="relative w-full h-48 bg-neutral-800">
                        <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute uppercase top-3 right-3 font-mono text-xs px-2 py-1 rounded-md bg-neutral-900/80 text-accent-400 border border-accent-400/30 backdrop-blur-sm">
                       Featured
                      </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <p className="font-mono text-xs text-accent-500 uppercase tracking-widest mb-3">
                        {project.category}
                      </p>
                      <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500">
                            {tag}
                          </span>
                        ))}
                      </div>
              
                      <div className="flex gap-3 mt-auto pt-4 border-t border-neutral-800">
                        <a href={`/projects/${project.slug}`} className="flex-1 uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg bg-accent-500 text-neutral-300 font-bold hover:bg-accent-400 hover:text-white transition-colors">
                          Case study
                        </a>
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 grow uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors">
                            Live site
                          </a>
                        ) : project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 grow uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors">
                            GitHub
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              


              <div className="grid grid-cols-1 py-6 md:grid-cols-3 gap-4">
                {projects.filter((p) => !p.featured).map((project) => (
                  <div key={project.slug} className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all duration-200 flex flex-col">
              
                    {project.coverImage && (
                      <div className="relative w-full h-48 bg-neutral-800">
                        <Image src={project.coverImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    )}
              
                    <div className="p-6 flex flex-col flex-1">
                      <p className="font-mono text-xs text-accent-500 uppercase tracking-widest mb-3">
                        {project.category}
                      </p>
                      <h3 className="font-display text-xl font-bold tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500">
                            {tag}
                          </span>
                        ))}
                      </div>
              
                      <div className="flex gap-3 mt-auto pt-4 border-t border-neutral-800">
                        <a href={`/projects/${project.slug}`} className="flex-1 grow uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg bg-accent-500 text-neutral-300 font-bold hover:bg-accent-400 hover:text-white transition-colors">
                          Case study
                        </a>
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 grow uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors">
                            Live site
                          </a>
                        ) : project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 grow uppercase text-center font-mono text-xs px-4 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors">
                            GitHub
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

          </FadeIn>
    </div>
  );
}