"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href:   "/",        label: "Home"},
  { href:  "/projects",  label: "Projects"},
  { href:   "/about",   label: "About"    },
  { href:   "/contact", label: "Contact"  },
];

export default function MenuToggle() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-60 flex items-center px-6 gap-2 font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors text-neutral-400 hover:text-neutral-100"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-1.75" : ""}`} />
          <span className={`block h-px bg-current transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block h-px bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2.25" : ""}`} />
        </div>
        <span className="hidden md:block">
          {open ? "Close" : "Menu"}
        </span>
      </button>

      <div className={`fixed inset-0 z-50 transition-all duration-500 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
       style={{ height: "100dvh" }}>
        <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md" onClick={() => setOpen(false)} />

        <div className="relative z-60 flex flex-col justify-center h-full px-10 md:px-20">
          <nav className="flex flex-col gap-2 mb-16">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                className={`font-display font-bold tracking-tight transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${pathname === href ? "text-accent-500" : "text-neutral-100 hover:text-accent-500"}`}
                style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", transitionDelay: open ? `${i * 60}ms` : "0ms" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className={`flex flex-wrap items-center gap-6 transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: open ? "280ms" : "0ms" }}>
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
              Laguna, PH · Open to work
            </span>
          </div>
        </div>
      </div>
    </>
  );
}