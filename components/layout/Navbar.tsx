// components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import MenuToggle from "@/components/ui/menuToggle";
import { FloatingChat } from "../FloatingChat";
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
          className="font-display font-black text-2xl tracking-tight text-neutral-100 px-8 md:px-12 lg:px-20"
        >
          J<span className="text-accent-500">.</span>Rio
        </Link>

        {/* Desktop nav — centered */}
        <div className="hidden min-[1550px]:flex flex-1 justify-left">
          <ul className="flex items-center gap-47 ml-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  prefetch={false}
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
            <a
              href="/resume"
              className="px-6 py-3 bg-accent-500 text-neutral-950 font-semibold rounded-lg text-sm hover:bg-accent-400 transition-colors"
            >
              RESUME
            </a>
          </ul>
        </div>

        {/* Mobile nav menu */}
        <div className="min-[1550px]:hidden relative z-50">
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