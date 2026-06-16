// components/TechStackModal.tsx
"use client";

import { useEffect, useState, useRef, forwardRef, Ref } from "react";
import Image from "next/image";                     // <-- new import
import { GROUPED_TECH_STACK } from "@/lib/tech-stack";

export const TechStackModal = forwardRef(
  (props, ref: Ref<HTMLButtonElement>) => {
    const [open, setOpen] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    /* ----- same focus & escape‑key handling (unchanged) ----- */
    useEffect(() => {
      if (typeof ref === "function") {
        ref(triggerRef.current);
      } else if (ref && "current" in ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          triggerRef.current;
      }
    }, [ref]);

    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      if (open) window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }, [open]);

    useEffect(() => {
      if (open) closeBtnRef.current?.focus();
      else triggerRef.current?.focus();
    }, [open]);

    const grouped = GROUPED_TECH_STACK;

    return (
      <>
        <button
          ref={triggerRef}
          onClick={() => setOpen(true)}
          className="sr-only"
          type="button"
        >
          View All
        </button>

        {open && (
          <div
            className="fixed inset-0 z-99 flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
              className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border border-white/10 bg-neutral-900 p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="tech-stack-modal-title"
                className="flex items-center justify-between mb-5"
              >
                <h2
                  id="tech-stack-modal-title"
                  className="text-4xl font-semibold text-white"
                >
                  Full Tech Stack <span className="text-accent-500">.</span>
                </h2>
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors text-xl leading-none"
                  aria-label="Close tech stack modal"
                >
                  ✕
                </button>
              </div>

              {/* Body – list grouped items */}
              <div className="space-y-5">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      {category}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item.name}                                   // <-- use name as key
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full border border-white/10 bg-white/5 text-white/80"
                        >
                          {/* Icon (optional) */}
                          {item.icon && (
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={16}
                              height={16}
                              className="object-contain"
                            />
                          )}
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default TechStackModal;