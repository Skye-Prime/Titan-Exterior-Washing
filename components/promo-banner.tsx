"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PromoBannerProps = {
  promoActive: boolean;
  city: string;
  phoneDisplay: string;
  phoneLink: string;
  rentUrl: string;
  mobileBreakpoint: number;
};

const OFFSET_VAR = "--promo-banner-offset";

export function PromoBanner({
  promoActive,
  city,
  phoneDisplay,
  phoneLink,
  rentUrl,
  mobileBreakpoint,
}: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDismissed(false);
  }, []);

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (!promoActive || dismissed) {
      document.documentElement.style.setProperty(OFFSET_VAR, "0px");
      return;
    }

    const updateOffset = () => {
      const height = bannerRef.current?.getBoundingClientRect().height ?? 0;
      document.documentElement.style.setProperty(OFFSET_VAR, `${height}px`);
    };

    updateOffset();
    const observer = new ResizeObserver(() => updateOffset());
    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    window.addEventListener("resize", updateOffset);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateOffset);
      document.documentElement.style.setProperty(OFFSET_VAR, "0px");
    };
  }, [promoActive, dismissed]);

  if (!promoActive || dismissed) return null;

  return (
    <section
      role="region"
      aria-label="Promotional offer"
      data-schema="offer"
      ref={bannerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b bg-white/95 backdrop-blur"
      )}
    >
      <div
        className={cn(
          "container max-w-6xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
          isMobile ? "py-3" : "py-4"
        )}
      >
        <div className="flex flex-col gap-1">
          <strong className="text-base text-primary">
            First month free storage for first-time renters
          </strong>
          <p className="text-sm text-muted-foreground">
            Renting your first unit at 360 Storage Solutions? Get your first month free for a limited time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={rentUrl} className={buttonVariants({ size: "sm" })}>
            Rent a unit
          </Link>
          <a
            href={phoneLink}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Call {phoneDisplay}
          </a>
          <button
            type="button"
            aria-label="Dismiss promotion"
            className="ml-1 rounded-full border border-input px-2 py-1 text-sm text-muted-foreground transition hover:text-foreground"
            onClick={() => setDismissed(true)}
          >
            x
          </button>
        </div>
      </div>
    </section>
  );
}
