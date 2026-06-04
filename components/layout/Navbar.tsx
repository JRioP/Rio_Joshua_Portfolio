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
    J<span className="text-accent-500">.</span>Rio
  </Link>

  {/* Desktop nav — centered */}
  <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
    {NAV_LINKS.map(({ href, label }) => (
      <li key={href}>
        <Link
          href={href}
          className={clsx(
            "font-mono text-xs uppercase tracking-widest transition-colors",
            pathname === href
              ? "text-accent-500"
              : "text-neutral-400 hover:text-neutral-100"
          )}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>

  {/* Spacer to balance the logo (keeps mobile hamburger on right) */}
  <div className="w-8" />
</nav>
  );
}
