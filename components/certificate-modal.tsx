"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

type CertificateImage = {
  src: StaticImageData;
  alt: string;
};

type CertificateModalProps = {
  images: CertificateImage[];
};

export function CertificateModal({ images }: CertificateModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const thumbWidth = "320px";
  const minZoom = 1.1;
  const maxZoom = 2;
  const zoomStep = 0.1;
  const [zoom, setZoom] = useState(minZoom);

  const maxIndex = images.length - 1;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(maxZoom, Number((prev + zoomStep).toFixed(2))));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(minZoom, Number((prev - zoomStep).toFixed(2))));
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, maxIndex]);

  return (
    <div
      className="space-y-3"
      style={{ "--thumb-width": thumbWidth } as CSSProperties}
    >
      <div className="relative w-[var(--thumb-width)]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="h-auto w-full shadow-md transition-transform duration-200 group-hover:scale-[1.01]"
            sizes="(min-width: 1024px) 300px, 80vw"
          />
          <span className="sr-only">
            Open full size {images[activeIndex].alt}
          </span>
        </button>
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous page"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-lg font-semibold text-slate-900 shadow"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next page"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 text-lg font-semibold text-slate-900 shadow"
        >
          ›
        </button>
      </div>
      <p className="text-center text-xs font-semibold text-slate-500">
        Page {activeIndex + 1} of {images.length}
      </p>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 shadow"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            aria-label="Previous page"
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xl font-semibold text-slate-900 shadow"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            aria-label="Next page"
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-xl font-semibold text-slate-900 shadow"
          >
            ›
          </button>
          <div
            className="w-[min(95vw,calc(var(--thumb-width)*var(--zoom)))] max-h-[95vh] overflow-auto"
            onClick={(event) => event.stopPropagation()}
            style={{ "--zoom": zoom } as CSSProperties}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="h-auto w-full rounded-md shadow-2xl"
              sizes="(min-width: 1024px) 352px, 95vw"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                zoomOut();
              }}
              aria-label="Zoom out"
              className="rounded-full border border-slate-200 px-2 py-0.5"
            >
              −
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                zoomIn();
              }}
              aria-label="Zoom in"
              className="rounded-full border border-slate-200 px-2 py-0.5"
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
