// components/ResumeViewer.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface ResumeViewerProps {
  fileUrl: string;
}

export default function ResumeViewer({ fileUrl }: ResumeViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure the PDF.js worker only on the client
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Scroll to the bottom once the pages are rendered
  useEffect(() => {
    if (containerRef.current) {
      // Scroll to the very bottom of the container
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [numPages]);

  return (
    <div ref={containerRef} className="h-[75vh] pl-7  overflow-y-auto">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex items-center justify-center h-[75vh] text-neutral-400">
            Loading resume...
          </div>
        }
        error={
          <div className="flex items-center justify-center h-[75vh] text-red-400">
            Failed to load PDF.
          </div>
        }
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="max-w-full"
            />
          ))}
      </Document>
    </div>
  );
}