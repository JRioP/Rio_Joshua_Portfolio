// components/ResumeViewerClient.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import the viewer **only on the client**
const ResumeViewer = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center w-full h-[75vh] bg-neutral-900 rounded-lg animate-pulse border border-neutral-700">
      <span className="text-neutral-500">Preparing PDF Viewer...</span>
    </div>
  ),
});

export default ResumeViewer;