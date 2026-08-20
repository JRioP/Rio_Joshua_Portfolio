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
          className="bg-neutral-100 text-neutral-950 px-4 py-2 rounded-md font-medium hover:bg-neutral-300 transition"
        >
          Download PDF
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

