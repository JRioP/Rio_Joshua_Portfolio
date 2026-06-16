// components/TechStackCard.tsx
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { GROUPED_TECH_STACK } from "@/lib/tech-stack";
import TechStackModal from "@/components/TechStackModal";


export function TechStackCard() {
  const allItems = Object.values(GROUPED_TECH_STACK).flat();
  const previewItems = allItems.slice(0, 10);
  const remaining = allItems.length - previewItems.length;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openModal = () => triggerRef.current?.click();

  return (
    <div className="w-80 mx-auto rounded-2xl p-6 pb-4 flex flex-col items-center">
        <h3 className="font-semibold text-neutral-100 mb-2">
          Tech Stack<span className="text-accent-500">.</span>
        </h3>

      <div className="flex flex-wrap gap-2 justify-start mt-2 w-full">
        {previewItems.map((item) => (
          <span
            key={item.name}
            className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
          >
          {item.name}
          </span>
        ))}
        

        {remaining > 0 && (
          <button
            type="button"
            onClick={openModal}
            className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-800 text-neutral-500 border border-neutral-700 hover:text-accent-500 hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 transition-colors cursor-pointer"
            aria-label={`Show ${remaining} more tech stack items`}
          >
            +{remaining} more
          </button>
        )}
        <TechStackModal ref={triggerRef} />
      </div>
    </div>
  );
}