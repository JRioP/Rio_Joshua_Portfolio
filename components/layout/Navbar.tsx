// components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import MenuToggle from "@/components/ui/menuToggle";

const NAV_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 40);

      if (current < 10) {
        setVisible(true);
        lastScrollY.current = current;
        return;
      }
      if (current > lastScrollY.current + 8) {
        setVisible(false);
      } else if (current < lastScrollY.current - 8) {
        setVisible(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
  className={clsx(
    "fixed top-0 left-0 right-0 z-50 px-0 py-3 flex items-center justify-between transition-all duration-300 z-index-99",
    visible ? "translate-y-0" : "-translate-y-full",
    scrolled && "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800", 
  )}
>
  {/* Logo */}
  <Link
    href="/"
    className="font-display font-black text-2xl tracking-tight text-neutral-100 px-12 md:px-15 lg:px-50"
  >
    J<span className="text-accent-500">.</span>Rio
  </Link>

  {/* Desktop nav — centered */}
  <ul className="hidden md:flex items-center gap-30 absolute left-1/2 -translate-x-1/2">
    {NAV_LINKS.map(({ href, label }) => (
      <li key={href}>
        <Link
          href={href}
          className={clsx(
            "font-mono uppercase tracking-widest transition-colors",
            pathname === href
              ? "text-accent-500"
              : "text-neutral-100 hover:text-neutral-400"
          )}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>

  {/* Mobile nav menu */}
  <div className="w-8" />
    <div className="md:hidden relative z-50">
      <MenuToggle/>
    </div>

</nav>
  );
}
