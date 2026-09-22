// lib/projects.ts
import "server-only";
import { getAllProjects, type ProjectWithContent } from "./mdx";
export type Project = Omit<ProjectWithContent, "content">;
export function getProjects(): Project[] {
  return getAllProjects()
    .map(({ content, ...project }) => project)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getInProgressProjects(): Project[] {
  return getProjects().filter(
    (p) => p.status === "in-progress" || p.status === "wip"
  );
}