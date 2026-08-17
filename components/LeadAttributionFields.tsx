"use client";

import { useEffect, useRef } from "react";

export function LeadAttributionFields() {
  const fields = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedLandingPage = window.sessionStorage.getItem("jurivo:first-landing-page");
    const landingPage = storedLandingPage || `${window.location.pathname}${window.location.search}`;

    if (!storedLandingPage) {
      window.sessionStorage.setItem("jurivo:first-landing-page", landingPage);
    }

    const attribution = {
      landingPage,
      referrer: document.referrer,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      utmTerm: params.get("utm_term") || "",
    };

    Object.entries(attribution).forEach(([name, value]) => {
      if (fields.current[name]) fields.current[name]!.value = value;
    });
  }, []);

  return (
    <>
      {["landingPage", "referrer", "utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm"].map((name) => (
        <input key={name} ref={(element) => { fields.current[name] = element; }} type="hidden" name={name} defaultValue="" />
      ))}
    </>
  );
}
