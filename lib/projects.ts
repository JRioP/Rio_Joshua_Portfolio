import { getAllProjects } from "./mdx";

export type Project = Omit<ReturnType<typeof getAllProjects>[0], "content">;

// Get all projects (metadata only, no content)
export function getProjects(): Project[] {
  return getAllProjects().map(({ content, ...project }) => project);
}

export const PROJECTS = getProjects();