"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useCookieConsent } from "./consentBanner/CookieConsentProvider";

export function ConditionalAnalytics() {
  const { consent } = useCookieConsent();

  // If user hasn't explicitly accepted, do not mount tracking scripts
  if (consent !== "accepted") {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
