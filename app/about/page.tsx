// app/about/page.tsx
import type { Metadata } from "next";
import { ALL_TECH_STACK, GROUPED_TECH_STACK } from "@/lib/tech-stack";

export const metadata: Metadata = {
  title: "About",
  description: "BSIT graduate and full-stack developer from Batangas, Philippines.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
      {/* TODO: Build out About sections */}
      {/* Sections to include:
            - Photo + bio paragraph
            - Tech stack grid (Android, Web, AI, Tools)
            - Certifications table (LPI, SAP, Oracle, Python)
            - Education timeline (STI Tanauan, BSIT 2025)
      */}
      <h1 className="font-display text-5xl font-bold">About</h1>
    </div>
  );
}
