import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ProjectWithContent extends ProjectFrontmatter {
  content: string;
}

// Get all project files
export function getAllProjectSlugs(): string[] {
  const files = fs.readdirSync(projectsDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

// Get project metadata and content
export function getProjectBySlug(slug: string): ProjectWithContent | null {
  try {
    const filePath = path.join(projectsDir, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      ...(data as Omit<ProjectFrontmatter, "slug">),
      content,
    };
  } catch {
    return null;
  }
}

// Get all projects
export function getAllProjects(): ProjectWithContent[] {
  const slugs = getAllProjectSlugs();
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is ProjectWithContent => project !== null);
}
