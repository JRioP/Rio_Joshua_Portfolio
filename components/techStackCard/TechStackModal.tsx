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
    const modalRef = useRef<HTMLDivElement>(null);

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

    // Trap focus inside modal
    useEffect(() => {
      if (!open) return;
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !modalRef.current) return;
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      window.addEventListener("keydown", handleTab);
      return () => window.removeEventListener("keydown", handleTab);
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
            <div className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-stack-modal-title"
              className="relative z-10 w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <h2
                  id="tech-stack-modal-title"
                  className="text-3xl font-display font-bold text-neutral-100"
                >
                  Full Tech Stack <span className="text-accent-500">.</span>
                </h2>
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpen(false)}
                  className="text-neutral-400 hover:text-neutral-100 transition-colors text-xl leading-none cursor-pointer p-1.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  aria-label="Close tech stack modal"
                >
                  ✕
                </button>
              </div>

              {/* Body – list grouped items */}
              <div className="space-y-6">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-xs font-mono font-semibold text-accent-500 uppercase tracking-widest mb-3">
                      {category}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item.name}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-lg border border-neutral-800 bg-neutral-800/60 text-neutral-200 hover:border-neutral-700 transition-colors"
                        >
                          {/* Icon */}
                          {item.icon && (
                            <Image
                              src={item.icon}
                              alt={item.name}
                              width={16}
                              height={16}
                              className="object-contain shrink-0"
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