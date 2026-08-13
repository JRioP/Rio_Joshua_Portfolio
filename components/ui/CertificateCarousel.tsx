"use client";
import { useState, useCallback } from "react";
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

  if (total === 0) return null;

  const cert = certificates[current];

  return (
    <div className="relative w-full select-none">

      {/* Image container — fixed height, no layout shift */}
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
        <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm py-2 px-3 text-center">
          <p className="font-mono text-xs text-neutral-300 truncate">{cert.name}</p>
        </div>

        {/* Prev button */}
        {total > 1 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all flex items-center justify-center cursor-pointer backdrop-blur-sm"
            aria-label="Previous certificate"
          >
            ‹
          </button>
        )}

        {/* Next button */}
        {total > 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-900/80 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all flex items-center justify-center cursor-pointer backdrop-blur-sm"
            aria-label="Next certificate"
          >
            ›
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all cursor-pointer ${
                i === current
                  ? "w-4 h-1.5 bg-accent-500"
                  : "w-1.5 h-1.5 bg-neutral-700 hover:bg-neutral-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
}