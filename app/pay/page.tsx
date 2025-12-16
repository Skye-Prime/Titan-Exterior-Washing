"use client";

import { useEffect } from "react";

const portalUrl = process.env.NEXT_PUBLIC_WSS_PAYMENT_PORTAL_URL;

export default function PayPage() {
  useEffect(() => {
    if (portalUrl) {
      window.open(portalUrl, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <main className="container max-w-2xl py-16 space-y-4">
      <h1 className="text-3xl font-semibold">Secure Payment Portal</h1>
      <p className="text-muted-foreground">
        Redirecting you to our PCI-compliant payment portal. If you are not
        redirected automatically, use the link below.
      </p>
      {portalUrl ? (
        <a className="text-primary underline" href={portalUrl} target="_blank" rel="noreferrer">
          Go to payment portal
        </a>
      ) : (
        <p className="text-red-600">
          Payment portal URL is not configured. Please try again later.
        </p>
      )}
    </main>
  );
}
