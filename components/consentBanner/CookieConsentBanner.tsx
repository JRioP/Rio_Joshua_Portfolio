"use client";

import React from "react";
import { useCookieConsent } from "./CookieConsentProvider";

export function CookieConsentBanner() {
  const { consent, hasMounted, accept, decline } = useCookieConsent();

  // Don't render until client mount to avoid hydration mismatches
  if (!hasMounted || consent !== null) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie and analytics consent"
      className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-lg z-40 bg-neutral-900/95 border border-neutral-800/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 md:p-6 text-neutral-200 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3 mb-2.5">
        <div className="p-2 rounded-lg bg-neutral-800/70 border border-neutral-700/50 text-base leading-none">
          🍪
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-sm tracking-tight text-neutral-100">
            Cookie &amp; Performance Preferences
          </h3>
          <span className="font-mono text-[10px] text-accent-400 uppercase tracking-widest">
            Privacy &amp; Analytics
          </span>
        </div>
      </div>

      <p className="text-neutral-400 text-xs leading-relaxed mb-4">
        This site uses cookies and telemetry to monitor page speed and analyze traffic caching via Vercel Speed Insights and Analytics. Do you accept these cookies?
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <button
          type="button"
          onClick={accept}
          className="flex-1 min-h-[44px] py-2.5 px-5 bg-accent-500 hover:bg-accent-hover active:scale-[0.98] text-white font-sans font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer text-center flex items-center justify-center shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_18px_rgba(59,130,246,0.4)] border border-blue-400/30"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 min-h-[44px] py-2.5 px-5 border border-neutral-700/80 bg-neutral-800/70 hover:bg-neutral-800 active:scale-[0.98] text-neutral-200 hover:text-white hover:border-neutral-600 font-sans font-semibold text-sm rounded-xl transition-all duration-200 cursor-pointer text-center flex items-center justify-center shadow-sm"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

