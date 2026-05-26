// components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/resume",   label: "Resume"   },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300",
        scrolled && "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800"
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display font-black text-lg tracking-tight text-neutral-100"
      >
        J<span className="text-accent">.</span>Rio
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={clsx(
                "font-mono text-xs uppercase tracking-widest transition-colors",
                pathname === href
                  ? "text-accent"
                  : "text-neutral-400 hover:text-neutral-100"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-neutral-400 hover:text-neutral-100"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="font-mono text-xs uppercase tracking-widest">
          {menuOpen ? "Close" : "Menu"}
        </span>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 px-6 py-6 flex flex-col gap-5 md:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "font-mono text-sm uppercase tracking-widest",
                pathname === href ? "text-accent" : "text-neutral-400"
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
