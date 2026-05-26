// types/index.ts — shared TypeScript types

export type ProjectCategory = "android" | "web" | "ai" | "desktop";
export type ProjectStatus    = "production" | "capstone" | "personal";

export interface ContactFormData {
  name:    string;
  email:   string;
  message: string;
}
