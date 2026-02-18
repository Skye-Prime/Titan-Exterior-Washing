"use client";

import Link from "next/link";
import { useState } from "react";
import { Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import smallUnit from "@/assets/driveway - clean.jpeg";
import mediumUnit from "@/assets/Driveway - dirty.jpeg";
import largeUnit from "@/assets/diving board - clean.jpeg";

export type AvailableSize = {
  width: number;
  depth: number;
  label: string;
};

type SizeGuideProps = {
  rentUrl: string;
};

type SizeGuideCategory = "concrete" | "housewash" | "fences";

type SizeGuideCard = {
  key: SizeGuideCategory;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

const CATEGORY_UNITS: Record<SizeGuideCategory, string[]> = {
  concrete: [
    "Driveways and sidewalks",
    "Patios and pool decks",
    "Garage floors and entry pads",
    "Stain and mildew treatment options",
    "Pre- and post-rinse surface protection",
  ],
  housewash: [
    "Brick exteriors",
    "Vinyl siding",
    "Soffits, fascia, and gutters",
    "Algae and oxidation-safe cleaning process",
    "Low-pressure soft wash where required",
  ],
  fences: [
    "Wood fence brightening and cleanup",
    "Vinyl fence wash and stain removal",
    "Gate and post detail cleaning",
    "Mildew and organic buildup treatment",
    "Rinse and surrounding area cleanup",
  ],
};

const SIZE_GUIDE_CARDS: SizeGuideCard[] = [
  {
    key: "concrete",
    title: "Concrete Cleaning",
    description:
      "Concrete cleaning is ideal for restoring curb appeal and removing dark buildup from high-traffic surfaces.\nBest for driveways, sidewalks, patios, and entry pads.",
    image: { src: smallUnit.src, alt: "Cleaned concrete driveway and walkway" },
  },
  {
    key: "housewash",
    title: "House Wash (Brick & Vinyl)",
    description:
      "House washing removes algae, dirt, and surface discoloration while protecting exterior materials.\nWe tailor pressure and detergents for brick and vinyl surfaces.",
    image: { src: mediumUnit.src, alt: "House exterior wash for brick and vinyl siding" },
  },
  {
    key: "fences",
    title: "Fence Cleaning",
    description:
      "Fence cleaning refreshes weathered surfaces and removes mildew, algae, and grime.\nIdeal for wood and vinyl fences that need a brighter, cleaner finish.",
    image: { src: largeUnit.src, alt: "Fence cleaning service results" },
  },
];

const CATEGORY_ORDER: SizeGuideCategory[] = ["concrete", "housewash", "fences"];

const CATEGORY_META: Record<
  SizeGuideCategory,
  { label: string; range: string; icon: JSX.Element; service: string }
> = {
  concrete: {
    label: "Concrete",
    range: "Driveways, patios, sidewalks",
    icon: <Grid2x2 className="h-6 w-6 text-slate-700" />,
    service: "concrete cleaning",
  },
  housewash: {
    label: "House Wash",
    range: "Brick and vinyl exteriors",
    icon: <LayoutGrid className="h-6 w-6 text-slate-700" />,
    service: "house wash",
  },
  fences: {
    label: "Fences",
    range: "Wood and vinyl fencing",
    icon: <Grid3x3 className="h-6 w-6 text-slate-700" />,
    service: "fence cleaning",
  },
};

const CATEGORY_SERVICE_VALUE: Record<SizeGuideCategory, string> = {
  concrete: "concrete",
  housewash: "house-wash",
  fences: "fence-cleaning",
};

function buildRentUrl(baseUrl: string, serviceParam?: string) {
  const [path, queryString = ""] = baseUrl.split("?");
  const params = new URLSearchParams(queryString);
  if (serviceParam) {
    params.set("service", serviceParam);
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function SizeGuide({ rentUrl }: SizeGuideProps) {
  const [selectedCategory, setSelectedCategory] = useState<SizeGuideCategory>("concrete");
  const availableCategories = CATEGORY_ORDER.filter(
    (category) => CATEGORY_UNITS[category].length > 0
  );
  const visibleCards = SIZE_GUIDE_CARDS.filter((card) => card.key === selectedCategory);
  const visibleUnits = CATEGORY_UNITS[selectedCategory];
  const rentLink = buildRentUrl(rentUrl, CATEGORY_SERVICE_VALUE[selectedCategory]);
  const buttonLabel = `Get a quote for ${CATEGORY_META[selectedCategory].service}`;

  return (
    <section
      id="size-guide"
      role="region"
      aria-label="Exterior washing service guide"
      data-schema="size-guide"
      className="py-4"
    >
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Services
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
            <Link
              href={rentUrl}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 w-full")}
            >
              View all services
            </Link>
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
                      What this service covers:
                    </p>
                    {visibleUnits.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {visibleUnits.map((unit) => (
                          <li key={unit}>{unit}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>This service option is not available right now.</p>
                    )}
                  </div>
                  <Link href={rentLink} className={buttonVariants({ size: "sm" })}>
                    {buttonLabel}
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
