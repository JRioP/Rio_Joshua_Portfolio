"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useCookieConsent } from "./CookieConsentProvider";

export function ConditionalAnalytics() {
  const { consent } = useCookieConsent();

  // If user hasn't explicitly accepted, drop analytics and speed insights events
  const handleAnalyticsBeforeSend = (event: Parameters<NonNullable<React.ComponentProps<typeof Analytics>["beforeSend"]>>[0]) => {
    if (consent === "accepted") {
      return event;
    }
    return null;
  };

  const handleSpeedInsightsBeforeSend = (event: Parameters<NonNullable<React.ComponentProps<typeof SpeedInsights>["beforeSend"]>>[0]) => {
    if (consent === "accepted") {
      return event;
    }
    return null;
  };

  return (
    <>
      <Analytics beforeSend={handleAnalyticsBeforeSend} />
      <SpeedInsights beforeSend={handleSpeedInsightsBeforeSend} />
    </>
  );
}

