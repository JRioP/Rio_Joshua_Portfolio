// app/resume/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description: "Joshua Rio's resume — full-stack developer.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-display text-5xl font-bold">Resume</h1>
        <a
          href="/resume/joshua-rio-resume.pdf"
          download
          className="px-5 py-2.5 bg-accent text-black font-semibold rounded-lg text-sm hover:bg-accent-hover transition-colors"
        >
          Download PDF →
        </a>
      </div>
      {/* TODO: Render inline CV content here */}
    </div>
  );
}
