"use client";

import { useEffect } from "react";
import type { Metadata } from "next";

const portalUrl = process.env.NEXT_PUBLIC_WSS_PAYMENT_PORTAL_URL;

export const metadata: Metadata = {
  title: "Pay Your Storage Bill Securely | 360 Storage Solutions",
  description:
    "Access the secure online payment portal for 360 Storage Solutions tenants.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PayPage() {
  useEffect(() => {
    if (portalUrl) {
      window.location.href = portalUrl;
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
        <a className="text-primary underline" href={portalUrl}>
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
