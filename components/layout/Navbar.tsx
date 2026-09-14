// components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import MenuToggle from "@/components/ui/menuToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FloatingChat } from "../chatFunctions/FloatingChat";
import { Suspense } from "react";

const NAV_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible]   = useState(true);
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
    <>
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 py-3 flex items-center transition-all duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled && "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800",
        "hide-on-1322"
      )}
    >
      {/* Centered container */}
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          prefetch={false}
          className="font-display font-black text-2xl tracking-tight text-neutral-100 px-2 sm:px-4 md:px-8 lg:px-12"
        >
          J<span className="text-accent-500">.</span>Rio
        </Link>

        {/* Desktop nav — balanced for laptop/desktop */}
        <div className="hidden lg:flex flex-1 justify-end items-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch={false}
                  className={clsx(
                    "font-mono text-xs uppercase tracking-widest transition-colors py-1 hover:text-accent-500",
                    pathname === href
                      ? "text-accent-500 font-semibold"
                      : "text-neutral-200"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/resume"
                className="px-5 py-2.5 bg-accent-500 text-neutral-950 font-bold rounded-lg text-xs hover:bg-accent-hover transition-colors tracking-wider inline-block"
              >
                RESUME
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>

        {/* Mobile nav menu & Theme Toggle */}
        <div className="lg:hidden relative z-50 flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <MenuToggle />
        </div>
      </div>
    </nav>
     {/* Floating chat */}
      <Suspense fallback={null}>
        <FloatingChat/>
      </Suspense>
    </>
  );
}