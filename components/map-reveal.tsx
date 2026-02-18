"use client";

import Image from "next/image";
import * as React from "react";
import wireframeOverlay from "@/assets/Buildigns Overlay.png";
import baseMap from "@/assets/Map.png";
import coloredOverlay from "@/assets/overlay with map.png";
import { cn } from "@/lib/utils";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function MapRevealSection() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [pinnedActive, setPinnedActive] = React.useState(false);
  const scrollMathRef = React.useRef<{
    start: number;
    span: number;
    pageTop: number;
  } | null>(null);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const handler = () => setReduceMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    const measure = () => {
      setIsMobile(window.innerWidth < 768);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  React.useEffect(() => {
    const header = document.querySelector("header");

    const updateHeaderHeight = () => {
      if (!header) {
        document.documentElement.style.setProperty("--header-height", "0px");
        setHeaderHeight(0);
        return;
      }
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
      setHeaderHeight(height);
    };

    updateHeaderHeight();

    if (header) {
      const resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(header);

      window.addEventListener("resize", updateHeaderHeight);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateHeaderHeight);
      };
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  React.useEffect(() => {
    if (!sectionRef.current || reduceMotion) {
      setProgress(1);
      setPinnedActive(false);
      return;
    }

    let frame = 0;
    const node = sectionRef.current;
    const containerNode = mapContainerRef.current;

    const update = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const start = window.innerHeight * 0.5; // wait until centered/pinned
      const span = Math.max(rect.height - start, 1);
      const rawProgress = clamp((start - rect.top) / span, 0, 1);
      const compressed = Math.min(rawProgress / 0.85, 1);
      setProgress(compressed);
      scrollMathRef.current = {
        start,
        span,
        pageTop: rect.top + window.scrollY,
      };

      if (containerNode) {
        const containerRect = containerNode.getBoundingClientRect();
        const pinned =
          containerRect.top <= headerHeight + 1 &&
          containerRect.bottom >= headerHeight + containerRect.height - 1;
        setPinnedActive(pinned);
      } else {
        setPinnedActive(false);
      }
    };

    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headerHeight, reduceMotion]);

  const computeScrollTargetForProgress = React.useCallback(
    (targetProgress: number) => {
      const math = scrollMathRef.current;
      if (!math) return null;
      const rawProgress = Math.min(clamp(targetProgress, 0, 1) * 0.85, 1);
      return rawProgress * math.span + math.pageTop - math.start;
    },
    []
  );

  const jumpToStart = React.useCallback(() => {
    const target = computeScrollTargetForProgress(0.08); // slight offset so content is visible
    if (target === null) return;
    window.scrollTo({ top: target + 1, behavior: "smooth" });
  }, [computeScrollTargetForProgress]);

  const jumpToEnd = React.useCallback(() => {
    const target = computeScrollTargetForProgress(0.98);
    if (target === null) return;
    window.scrollTo({ top: target - 1, behavior: "smooth" });
  }, [computeScrollTargetForProgress]);

  const assistVisible =
    !reduceMotion && pinnedActive && progress > 0 && progress < 1;

  const phase1End = 0.25;
  const phase2End = 0.7;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const mapOpacity = clamp((progress - 0.2) * 1.25, 0, 1);
  // Cap final scale slightly under 1 to keep the full image visible beneath the header.
  const sharedScale = isMobile ? 1 : 0.75 + progress * 0.23; // 0.75 -> ~0.98
  const overlayOpacity = clamp((progress - 0.7) * 3, 0, 1);

  const wireframeOpacity =
    progress <= phase1End
      ? 1
      : progress <= phase2End
      ? clamp(1 - (progress - phase1End) / (phase2End - phase1End), 0, 1)
      : clamp(1 - progress * 1.2, 0, 1);

  const parallax = 0;

  const sectionHeight = isMobile
    ? "180vh"
    : `calc(250vh + ${headerHeight}px)`;

  return (
    <section
      id="map-scroll-section"
      ref={sectionRef}
      aria-label="Facility layout map"
      className="relative w-full bg-[#B9CED6] facility-scroll-section"
      style={{ minHeight: sectionHeight }}
    >
      <div className="container max-w-6xl pt-8 pb-4 text-center flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary ring-1 ring-primary/15 shadow-sm shadow-primary/10 backdrop-blur">
          <span className="h-px w-10 bg-primary/50" />
          <span>Site Map</span>
        </div>
      </div>
      <div
        ref={mapContainerRef}
        className="map-pin-container sticky w-full overflow-visible flex items-center justify-center"
        style={{
          top: "var(--header-height, 0px)",
          height: "calc(100vh - var(--header-height, 0px))",
        }}
      >
        <div
          aria-hidden={!assistVisible}
          className={cn(
            "pointer-events-none absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 transition-opacity duration-300",
            assistVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            type="button"
            aria-label="Jump to start of map animation"
            disabled={progress <= 0 || !assistVisible}
            onClick={jumpToStart}
            className={cn(
              "pointer-events-auto h-10 w-10 rounded-full border border-border bg-card text-foreground shadow-sm transition",
              "opacity-70 hover:opacity-100 focus-visible:opacity-100",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              "disabled:cursor-not-allowed disabled:opacity-30"
            )}
          >
            ↑
          </button>
          <button
            type="button"
            aria-label="Jump to end of map animation"
            disabled={!assistVisible}
            onClick={jumpToEnd}
            className={cn(
              "pointer-events-auto h-10 w-10 rounded-full border border-border bg-card text-foreground shadow-sm transition",
              "opacity-70 hover:opacity-100 focus-visible:opacity-100",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            )}
          >
            ↓
          </button>
        </div>
        <div
          className="relative w-full h-full"
          style={{
            transition: reduceMotion ? "none" : undefined,
          }}
        >
          <div
            className="absolute inset-0 map-layer satellite will-change-transform will-change-opacity rounded-2xl overflow-hidden"
            style={{
              opacity: mapOpacity,
              transform: `scale(${sharedScale})`,
              transition: reduceMotion ? "none" : "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <Image
              src={baseMap}
              alt="Aerial view of the storage facility"
              fill
              priority={false}
              sizes="100vw"
              className="object-contain rounded-2xl"
            />
          </div>
          <div
            className="absolute inset-0 map-layer overlay-layer will-change-transform will-change-opacity rounded-2xl overflow-hidden"
            style={{
              opacity: overlayOpacity,
              transform: `scale(${sharedScale})`,
              transition: reduceMotion ? "none" : "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <Image
              src={coloredOverlay}
              alt="Facility map with unit types highlighted"
              fill
              priority={false}
              sizes="100vw"
              className="object-contain rounded-2xl"
            />
          </div>
          <div
            className="absolute inset-0 map-layer wireframe-layer will-change-transform will-change-opacity z-10 rounded-2xl overflow-hidden"
            style={{
              opacity: wireframeOpacity,
              transform: `translateY(${parallax}px) scale(${sharedScale})`,
              transition: reduceMotion ? "none" : "transform 0.1s linear, opacity 0.1s linear",
            }}
          >
            <Image
              src={wireframeOverlay}
              alt="Wireframe outline of the storage buildings"
              fill
              priority={false}
              sizes="100vw"
              className={cn("object-contain", "mix-blend-screen", "rounded-2xl")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
