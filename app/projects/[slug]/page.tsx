import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/mdx";
import type { Metadata } from "next";

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
        <h3 className="font-display text-4xl font-bold tracking-tight mb-12">
            Case Study<span className="text-accent-500">.</span>
            </h3>
            <p className="text-accent-400 text-sm uppercase tracking-widest mb-4">
              {project.category}
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

      <div className="prose prose-invert prose-neutral max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:mt-8 prose-headings:mb-4 prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-accent-400 prose-p:text-neutral-300 prose-p:leading-relaxed prose-strong:text-neutral-100">
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-16 pt-8 border-t border-neutral-800 flex gap-4">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-accent-500 text-black font-semibold rounded-lg text-sm hover:bg-accent-400 transition-colors">
            View on GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-neutral-800 text-neutral-100 font-semibold rounded-lg text-sm hover:bg-neutral-700 transition-colors border border-neutral-700">
            Live site
          </a>
        )}
      </div>
    </article>
  );
}