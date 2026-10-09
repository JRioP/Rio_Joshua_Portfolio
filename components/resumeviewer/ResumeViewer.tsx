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
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return Math.min(window.innerWidth - 32, 750);
    }
    return 600;
  });

  // Configure the PDF.js worker only on the client
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  }, []);

  // Dynamically observe container width to scale PDF pages responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const updateWidth = () => {
      if (el) {
        const width = el.clientWidth;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth(Math.floor(width));
        }
      }
    });

    resizeObserver.observe(el);
    window.addEventListener("resize", updateWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[75vh] flex flex-col items-center overflow-y-auto overflow-x-hidden bg-white dark:bg-neutral-900"
    >
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex flex-col items-center w-full"
        loading={
          <div className="flex items-center justify-center h-[75vh] text-neutral-400">
            <span className="font-mono text-sm animate-pulse">Loading resume...</span>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center h-[75vh] p-6 text-center text-red-400">
            <p className="mb-3 font-medium">Failed to load PDF in viewer.</p>
            <a
              href={fileUrl}
              download
              className="px-4 py-2 bg-accent-500 hover:bg-accent-hover text-white rounded-xl text-xs font-semibold"
            >
              Download PDF instead
            </a>
          </div>
        }
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <div
              key={i + 1}
              className="w-full flex justify-center mb-6 last:mb-0 shadow-sm"
            >
              <Page
                pageNumber={i + 1}
                width={containerWidth ? Math.min(containerWidth, 750) : undefined}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="max-w-full"
              />
            </div>
          ))}
      </Document>
    </div>
  );
}