"use client";

import { useCookieConsent } from "@/components/consentBanner/CookieConsentProvider";

// components/layout/Footer.tsx
export default function Footer() {
  const { resetConsent } = useCookieConsent();

  return (
    <footer className="border-t border-neutral-800 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-neutral-400" suppressHydrationWarning>
          © {new Date().getFullYear()} Joshua Rio · Built with Next.js + Tailwind
        </p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={resetConsent}
            className="font-mono text-xs text-neutral-400 hover:text-accent-400 transition-colors uppercase tracking-widest cursor-pointer"
            title="Update cookie and analytics preferences"
            aria-label="Update cookie and analytics preferences"
          >
            Cookies
          </button>
          <a
            href="https://github.com/JRioP"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Joshua Rio's GitHub profile"
            className="font-mono text-xs text-neutral-400 hover:text-accent-400 transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/japrdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Joshua Rio's LinkedIn profile"
            className="font-mono text-xs text-neutral-400 hover:text-accent-400 transition-colors uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="mailto:riojoshuadev@gmail.com"
            aria-label="Send email to Joshua Rio"
            className="font-mono text-xs text-neutral-400 hover:text-accent-400 transition-colors uppercase tracking-widest"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
