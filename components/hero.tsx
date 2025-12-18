"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import * as React from "react";

export function Hero(props: {
  id?: string;
  capsuleText: string;
  capsuleLink: string;
  title: string;
  subtitle: string;
  credits?: React.ReactNode;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  tertiaryCtaText?: string;
  tertiaryCtaLink?: string;
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  imagePriority?: boolean;
  backgroundImages?: { src: string | StaticImageData; alt?: string }[];
}) {
  const hasCarousel = (props.backgroundImages?.length ?? 0) > 0;
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!hasCarousel) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) =>
        (prev + 1) % (props.backgroundImages?.length ?? 1)
      );
    }, 6000);
    return () => window.clearInterval(id);
  }, [hasCarousel, props.backgroundImages?.length]);

  return (
    <section
      id={props.id}
      className="relative isolate overflow-hidden bg-background"
    >
      {hasCarousel ? (
        <div className="absolute inset-0">
          {props.backgroundImages?.map((image, idx) => (
            <Image
              key={idx}
              src={image.src}
              alt={image.alt ?? ""}
              fill
              className={cn(
                "object-cover transition-opacity duration-700",
                idx === activeIndex ? "opacity-100" : "opacity-0"
              )}
              sizes="100vw"
              priority={idx === 0}
            />
          ))}
        </div>
      ) : null}
      <div className="relative container flex flex-col justify-center gap-10 py-32 md:py-40 lg:py-48 min-h-[85vh] lg:min-h-[92vh]">
        <div className="max-w-3xl space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 ring-1 ring-black/5 backdrop-blur drop-shadow-[0_4px_14px_rgba(255,255,255,0.65)]">
            <span className="h-px w-8 bg-slate-900/70" />
            <Link href={props.capsuleLink} className="hover:text-slate-900">
              {props.capsuleText}
            </Link>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-slate-900 drop-shadow-[0_6px_18px_rgba(255,255,255,0.55)]">
            {props.title}
          </h1>
          <p className="max-w-[42rem] leading-normal text-slate-900 sm:text-xl sm:leading-8 drop-shadow-[0_5px_16px_rgba(255,255,255,0.5)]">
            {props.subtitle}
          </p>
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            <Link
              href={props.primaryCtaLink}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {props.primaryCtaText}
            </Link>

            {props.secondaryCtaText && props.secondaryCtaLink ? (
              <Link
                href={props.secondaryCtaLink}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                {props.secondaryCtaText}
              </Link>
            ) : null}

            {props.tertiaryCtaText && props.tertiaryCtaLink ? (
              <Link
                href={props.tertiaryCtaLink}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "bg-white text-slate-900 hover:bg-white/90"
                )}
              >
                {props.tertiaryCtaText}
              </Link>
            ) : null}
          </div>

          {props.credits && (
            <p className="text-sm text-white/70 mt-2">
              {props.credits}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
