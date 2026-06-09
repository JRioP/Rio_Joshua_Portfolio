import "server-only";
import { getAllProjects, type ProjectWithContent } from "./mdx";

// Derive Project from the explicit ProjectWithContent interface
// Safe regardless of how many projects exist — no [0] array indexing
export type Project = Omit<ProjectWithContent, "content">;

export function getProjects(): Project[] {
  return getAllProjects().map(({ content, ...project }) => project);
}