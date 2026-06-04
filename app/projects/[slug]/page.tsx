// app/projects/[slug]/page.tsx — Individual case study
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import type { Metadata } from "next";

// Tell Next.js all valid slugs at build time (SSG)
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per project
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
      {/* Project header */}
      <header className="mb-16">
        <p className="font-mono text-xs text-orange-500 tracking-widest uppercase mb-4">
          Case study
        </p>
        <h1 className="font-display text-6xl font-bold leading-none tracking-tight mb-6">
          {project.title}
        </h1>
        <p className="text-neutral-400 text-xl leading-relaxed mb-8">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* MDX content */}
      <div className="prose prose-invert prose-neutral max-w-none
                      prose-headings:font-display prose-headings:tracking-tight prose-headings:mt-8 prose-headings:mb-4
                      prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
                      prose-code:font-mono prose-code:text-orange-300
                      prose-p:text-neutral-300 prose-p:leading-relaxed
                      prose-strong:text-neutral-100">
        <MDXRemote source={project.content} />
      </div>

      {/* Links */}
      <div className="mt-16 pt-8 border-t border-neutral-800 flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-orange-500 text-black font-semibold rounded-lg text-sm hover:bg-orange-400 transition-colors"
          >
            View on GitHub →
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-neutral-800 text-neutral-100 font-semibold rounded-lg text-sm hover:bg-neutral-700 transition-colors border border-neutral-700"
          >
            Live site →
          </a>
        )}
      </div>
    </article>
  );
}
