import "server-only";
import { getAllProjects, type ProjectWithContent } from "./mdx";

export type Project = Omit<ProjectWithContent, "content">;

export function getProjects(): Project[] {
  return getAllProjects().map(({ content, ...project }) => project);
}