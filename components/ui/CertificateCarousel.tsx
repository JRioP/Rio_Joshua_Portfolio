"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface Certificate {
  name: string;
  icon: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

export default function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = certificates.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next]);

  if (total === 0) return null;

  const cert = certificates[current];

  return (
    <div className="relative w-full select-none" tabIndex={0} role="region" aria-label="Certificate carousel" aria-roledescription="carousel">

      {/* Image container */}
      <div className="relative w-full h-128 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        <Image
          src={cert.icon}
          alt={cert.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 pointer-events-none"
          priority={current === 0}
        />

        {/* Name overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-neutral-950/80 backdrop-blur-sm py-2 px-3 text-center border-t border-neutral-800/50">
          <p className="font-mono text-xs text-neutral-300 truncate">{cert.name}</p>
        </div>

        {/* Prev button */}
        {total > 1 && (
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-200 hover:text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800 transition-all flex items-center justify-center cursor-pointer backdrop-blur-sm active:scale-95 text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 shadow-md"
            aria-label="Previous certificate"
          >
            ‹
          </button>
        )}

        {/* Next button */}
        {total > 1 && (
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-200 hover:text-neutral-100 hover:border-neutral-500 hover:bg-neutral-800 transition-all flex items-center justify-center cursor-pointer backdrop-blur-sm active:scale-95 text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 shadow-md"
            aria-label="Next certificate"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center items-center gap-1 mt-3" role="tablist" aria-label="Certificate slides">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="p-2 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded"
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
              role="tab"
            >
              <span
                className={`block rounded-full transition-all ${
                  i === current
                    ? "w-5 h-1.5 bg-accent-500"
                    : "w-2 h-1.5 bg-neutral-700 hover:bg-neutral-500"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}