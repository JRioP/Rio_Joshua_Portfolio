// app/resume/page.tsx
import type { Metadata } from "next";
import dynamic from 'next/dynamic';
import Link from "next/link";
import ResumeViewerClient from "@/components/resumeviewer/ResumeViewerClient";

export const metadata: Metadata = {
  title: "Resume",
  description: "Joshua Rio's resume — full-stack developer.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-display text-5xl font-bold">Resume</h1>
        {/* Handy download button at the top */}
        <a 
          href="/resume/Joshua_Rio_Resume.pdf" 
          download 
          className="px-5 py-2.5 bg-accent-500 hover:bg-accent-hover text-white font-sans font-semibold rounded-xl text-sm transition-all duration-200 active:scale-[0.98] shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_18px_rgba(59,130,246,0.4)] border border-blue-400/30 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4 text-blue-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PDF</span>
        </a>
      </div>
      
      <div className="flex justify-center items-center w-full bg-white rounded-lg overflow-hidden border border-neutral-800">
        <object
          data="/resume/Joshua_Rio_Resume.pdf"
          type="application/pdf"
          className="w-full h-[75vh]"
        >
          <ResumeViewerClient fileUrl="/resume/Joshua_Rio_Resume.pdf" />
          
          {/* Fallback for mobile browsers that block inline PDFs */}
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-neutral-900 w-full">
            <p className="mb-4 text-neutral-400">Your browser doesn't support inline PDFs.</p>
            <a 
              href="/resume/Joshua_Rio_Resume.pdf" 
              download
              className="text-blue-400 hover:underline"
            >
              Click here to download it instead.
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}

