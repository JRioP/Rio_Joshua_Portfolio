"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href:   "/",        label: "Home"},
  { href:  "/projects",  label: "Projects"},
  { href:   "/about",   label: "About"    },
  { href:   "/contact", label: "Contact"  },
];

export default function MenuToggle() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus trap inside open navigation drawer
  useEffect(() => {
    if (!open) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === buttonRef.current) {
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

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-dialog"
        aria-haspopup="dialog"
        className="relative z-60 flex items-center justify-center p-2.5 sm:px-3 min-w-[44px] min-h-[44px] rounded-lg border border-neutral-800 bg-neutral-900/60 font-mono text-xs uppercase tracking-widest cursor-pointer transition-all text-neutral-300 hover:text-neutral-100 hover:border-neutral-700 active:scale-95 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
      >
        <div className="w-4.5 h-3.5 flex flex-col justify-between">
          <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-0.5 rounded-full bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </div>
        <span className="hidden md:block ml-2">
          {open ? "Close" : "Menu"}
        </span>
      </button>

      <div
        id="mobile-nav-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-50 transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ height: "100dvh" }}
      >
        <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md" onClick={() => { setOpen(false); buttonRef.current?.focus(); }} />

        <div className="relative z-60 flex flex-col justify-center h-full px-8 md:px-20">
          <nav className="flex flex-col gap-2 mb-10">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Link
                prefetch={false}
                key={href}
                href={href}
                className={`font-display font-bold tracking-tight transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${pathname === href ? "text-accent-500" : "text-neutral-100 hover:text-accent-500"}`}
                style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              >
                {label}
              </Link>
            ))}
            <Link
              prefetch={false}
              href="/resume"
              className={`mt-4 inline-flex items-center justify-center w-fit px-6 py-3 bg-accent-500 text-neutral-950 font-bold rounded-lg text-sm hover:bg-accent-hover transition-all active:scale-95 shadow-sm ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: open ? `${NAV_LINKS.length * 60}ms` : "0ms" }}
            >
              VIEW RESUME →
            </Link>
          </nav>

          <div className={`flex flex-wrap items-center gap-6 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: open ? "280ms" : "0ms" }}>
            <ThemeToggle />
            <a href="https://github.com/JRioP" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-neutral-400 hover:text-neutral-100 uppercase tracking-widest transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/japrdev" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-neutral-300 hover:text-neutral-100 uppercase tracking-widest transition-colors">
              LinkedIn
            </a>
            <a href="mailto:riojoshuadev@gmail.com" className="font-mono text-xs text-neutral-200 hover:text-neutral-100 uppercase tracking-widest transition-colors">
              Email
            </a>
            <span className="font-mono text-xs text-neutral-100 uppercase tracking-widest ml-auto">
              Batangas, PH · Open to work
            </span>
          </div>
        </div>
      </div>
    </>
  );
}