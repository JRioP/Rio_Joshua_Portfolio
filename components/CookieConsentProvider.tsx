"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ConsentStatus = "accepted" | "declined" | null;

interface CookieConsentContextType {
  consent: ConsentStatus;
  hasMounted: boolean;
  accept: () => void;
  decline: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: null,
  hasMounted: false,
  accept: () => {},
  decline: () => {},
  resetConsent: () => {},
});

const STORAGE_KEY = "joshua_rio_cookie_consent";

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus;
      if (stored === "accepted" || stored === "declined") {
        setConsent(stored);
      }
    } catch {
      // localStorage may fail in restricted/private modes
    }
    setHasMounted(true);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setConsent("accepted");
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {}
    setConsent("declined");
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setConsent(null);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasMounted,
        accept,
        decline,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

