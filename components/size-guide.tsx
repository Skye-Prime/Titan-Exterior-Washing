"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import smallUnit from "@/assets/small unit.webp";
import mediumUnit from "@/assets/medium unit.webp";
import largeUnit from "@/assets/large unit.webp";
import rvUnit from "@/assets/rv.webp";

export type AvailableSize = {
  width: number;
  depth: number;
  label: string;
};

type SizeGuideProps = {
  rentUrl: string;
};

type SizeGuideCategory = "small" | "medium" | "large" | "vehicle";

type SizeGuideCard = {
  key: SizeGuideCategory;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

const CATEGORY_UNITS: Record<SizeGuideCategory, string[]> = {
  small: [
    "4x8x11 – Interior climate swing, electric",
    "4x11x11 – Interior climate swing, no electric",
    "5x8.4x6.4x11 – Interior climate rollup, no electric",
    "6x11x12 – Drive-up, no climate, rollup",
    "5x8x13.8x11 – Interior climate swing, no electric",
  ],
  medium: [
    "5x14x16 – Drive-up, rollup, no climate",
    "7.5x11.5x10 – Interior climate",
    "8x11x10 – Interior climate",
    "10x9x8 – Drive-up, no climate",
    "10x11x8 – Drive-up, no climate",
    "10.5x12x12 – Interior climate rollup",
  ],
  large: [
    "12x11.5x8 – Drive-up rollup",
    "10x20x8 – Drive-up rollup",
    "10x20x12 – Drive-up rollup",
    "12x37.5x12 – Drive-up rollup bonus",
    "14x38x8 – Drive-up rollup",
    "20x38x16 – Drive-up rollup bonus",
    "26x36x15 – Drive-up rollup with electricity",
  ],
  vehicle: [
    "12x20x16 – RV/Boat/Vehicle covered",
    "12x40x16 – RV/Boat/Vehicle enclosed",
    "12x40x16 – RV/Boat/Vehicle outside",
    "12x40x16 – RV/Boat/Vehicle sub-basement covered",
    "15x40x20 – RV/Boat/Vehicle, no climate bonus",
    "23x68x20 – RV/Boat/Vehicle/Parking",
  ],
};

const SIZE_GUIDE_CARDS: SizeGuideCard[] = [
  {
    key: "small",
    title: "Small",
    description:
      "Small storage units are ideal for boxes, seasonal items, small furniture, and apartment overflow.\nComparable in size to a walk-in closet.",
    image: { src: smallUnit.src, alt: "Small storage units for boxes and small furniture" },
  },
  {
    key: "medium",
    title: "Medium",
    description:
      "Medium storage units are commonly used for apartment moves, small homes, and business storage.\nComparable to a spare bedroom or studio apartment.",
    image: { src: mediumUnit.src, alt: "Medium storage units for apartment moves" },
  },
  {
    key: "large",
    title: "Large",
    description:
      "Large storage units are ideal for full-home moves, garages, commercial storage, and construction materials.\nComparable to a one-to-two car garage or the contents of a multi-bedroom home.",
    image: { src: largeUnit.src, alt: "Large storage unit for full-home moves" },
  },
  {
    key: "vehicle",
    title: "Parking",
    description:
      "Vehicle and RV storage spaces are designed for cars, trucks, trailers, boats, and recreational vehicles.\nOptions include covered, uncovered, and fully enclosed parking.",
    image: { src: rvUnit.src, alt: "Vehicle and RV parking storage" },
  },
];

const CATEGORY_ORDER: SizeGuideCategory[] = ["small", "medium", "large", "vehicle"];

const CATEGORY_META: Record<
  SizeGuideCategory,
  { label: string; range: string; icon: JSX.Element }
> = {
  small: {
    label: "Small",
    range: "25 – 50 sq ft",
    icon: <Grid2x2 className="h-6 w-6 text-slate-700" />,
  },
  medium: {
    label: "Medium",
    range: "75 – 150 sq ft",
    icon: <LayoutGrid className="h-6 w-6 text-slate-700" />,
  },
  large: {
    label: "Large",
    range: "200 – 300 sq ft",
    icon: <Grid3x3 className="h-6 w-6 text-slate-700" />,
  },
  vehicle: {
    label: "Parking",
    icon: <Car className="h-6 w-6 text-slate-700" />,
  },
};

export function SizeGuide({ rentUrl }: SizeGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<SizeGuideCategory>("small");
  const availableCategories = CATEGORY_ORDER.filter(
    (category) => CATEGORY_UNITS[category].length > 0
  );
  const visibleCards = SIZE_GUIDE_CARDS.filter((card) => card.key === selectedCategory);
  const visibleUnits = CATEGORY_UNITS[selectedCategory];

  return (
    <section
      id="size-guide"
      role="region"
      aria-label="Storage unit size guide"
      data-schema="size-guide"
      className="py-4"
    >
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Sizes
            </p>
            <div className="mt-4 space-y-3">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border bg-white px-3 py-3 text-left text-sm transition-shadow",
                    "border-slate-200 shadow-sm hover:shadow-md",
                    selectedCategory === category
                      ? "border-primary/60 ring-2 ring-primary/20"
                      : "border-slate-200"
                  )}
                  aria-pressed={selectedCategory === category}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {CATEGORY_META[category].icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {CATEGORY_META[category].label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {CATEGORY_META[category].range}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-8">
          {visibleCards.map((card) => (
            <article
              key={card.key}
              data-size={card.key}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-slate-50 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image.src}
                    alt={card.image.alt}
                    className="h-40 w-full object-contain"
                    loading="lazy"
                  />
                  <p className="text-[11px] text-center text-slate-400">
                    Image is for illustrative purposes.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                  {card.description.split("\n").map((line) => (
                    <p key={line} className="text-sm text-slate-600">
                      {line}
                    </p>
                  ))}
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">
                      Units we have at this size:
                    </p>
                    {visibleUnits.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {visibleUnits.map((unit) => (
                          <li key={unit}>{unit}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>there are not more units avialble in this size category currently</p>
                    )}
                  </div>
                  <Link href={rentUrl} className={buttonVariants({ size: "sm" })}>
                    View available units
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
