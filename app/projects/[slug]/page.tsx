import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import type { Metadata } from "next";
import { ProjectLiveLink } from "@/components/ui/ProjectLiveLink";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <a
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400 hover:text-accent-500 transition-colors group cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Projects
          </a>
          <span className="text-neutral-700 text-xs">/</span>
          <span className="text-accent-400 text-xs font-mono uppercase tracking-wider font-semibold">
            {project.category}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 text-neutral-100">
          {project.title}
        </h1>
        <p className="text-neutral-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-900 text-neutral-300 border border-neutral-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose max-w-none 
        [--tw-prose-body:var(--color-neutral-300)]
        [--tw-prose-headings:var(--color-neutral-100)]
        [--tw-prose-lead:var(--color-neutral-400)]
        [--tw-prose-links:var(--accent-500)]
        [--tw-prose-bold:var(--color-neutral-100)]
        [--tw-prose-counters:var(--accent-500)]
        [--tw-prose-bullets:var(--accent-500)]
        [--tw-prose-hr:var(--color-neutral-800)]
        [--tw-prose-quotes:var(--color-neutral-200)]
        [--tw-prose-quote-borders:var(--accent-500)]
        [--tw-prose-code:var(--accent-400)]
        [--tw-prose-pre-code:var(--color-neutral-200)]
        [--tw-prose-pre-bg:var(--color-neutral-900)]
        prose-headings:font-display prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-4
        prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:border-neutral-800/80 prose-h2:pb-3 prose-h2:text-neutral-100
        prose-h3:text-xl prose-h3:font-bold prose-h3:text-neutral-100
        prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base sm:prose-p:text-lg
        prose-ul:my-6 prose-ul:flex prose-ul:flex-col prose-ul:gap-2.5
        prose-ol:my-6 prose-ol:flex prose-ol:flex-col prose-ol:gap-2.5
        prose-li:text-neutral-300 prose-li:leading-relaxed prose-li:text-base sm:prose-li:text-lg
        prose-strong:text-neutral-100 prose-strong:font-semibold
        prose-code:font-mono prose-code:text-accent-400 prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-neutral-800 prose-code:text-xs sm:prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl prose-pre:p-4 prose-pre:bg-neutral-900 prose-pre:text-neutral-200
        prose-a:text-accent-500 prose-a:font-medium prose-a:underline hover:prose-a:text-accent-hover prose-a:underline-offset-4
        prose-blockquote:border-l-2 prose-blockquote:border-accent-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-neutral-400"
      >
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row gap-3 sm:gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 py-3.5 min-h-[44px] bg-accent-500 text-neutral-950 font-bold rounded-lg text-sm hover:bg-accent-hover transition-all active:scale-[0.98] flex items-center justify-center text-center shadow-sm"
          >
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <ProjectLiveLink
            href={project.liveUrl}
            className="flex-1 grow text-center font-mono text-xs uppercase px-5 py-3.5 min-h-[44px] rounded-lg border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-neutral-100 hover:bg-neutral-800/40 transition-all active:scale-[0.98] flex items-center justify-center"
          >
            Live Site
          </ProjectLiveLink>
        )}
      </div>
    </article>
  );
}