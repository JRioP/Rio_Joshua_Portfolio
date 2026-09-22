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
            className="flex-1 sm:flex-none px-6 py-3.5 min-h-[44px] bg-accent-500 hover:bg-accent-hover text-white font-sans font-semibold rounded-xl text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-center shadow-[0_2px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.45)] border border-blue-400/30 group/gh"
          >
            <svg
              className="w-4 h-4 text-blue-100 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>View on GitHub</span>
          </a>
        )}
        {project.liveUrl && (
          <ProjectLiveLink
            href={project.liveUrl}
            className="flex-1 sm:flex-none px-6 py-3.5 min-h-[44px] rounded-xl border border-neutral-700/80 bg-neutral-800/70 hover:bg-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-600 font-sans font-semibold text-sm shadow-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group/sec"
          >
            <span>Live Site</span>
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
        )}
      </div>
    </article>
  );
}