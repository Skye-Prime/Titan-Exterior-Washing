"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WssUnit } from "@/lib/wssClient";
import unit10x20 from "@/assets/10x20.jpg";
import unit10x20Inside from "@/assets/10x20 inside.jpg";
import unit10x9 from "@/assets/10x9.jpg";
import unit10x9Inside from "@/assets/10x9 inside.jpg";
import rvFirstLot from "@/assets/RV Storage - First lot.jpg";
import rvMiddleLot from "@/assets/RV Storage -  middle lot.jpg";
import rvSideView from "@/assets/RV Storage - side view.jpg";
import middleLot from "@/assets/middle.jpg";
import climateControl from "@/assets/climate control.jpg";
import miniUnits from "@/assets/Mini Units.jpg";

type Props = {
  units: WssUnit[];
};

const moveInBaseUrl = process.env.NEXT_PUBLIC_WSS_MOVE_IN_URL;
const moveInTemplate = process.env.NEXT_PUBLIC_WSS_MOVE_IN_URL_TEMPLATE;
const affiliatePortalUrl =
  "https://www.uhaul.com/Locations/Self-Storage-near-Cookeville-TN-38501/1032354/";

type CategoryId = "indoor" | "drive-up" | "rv";
type TypeFilter = "all" | CategoryId;
type SizeFilter = "all" | "small" | "medium" | "large";

const categories: {
  id: CategoryId;
  title: string;
  description: string;
}[] = [
  {
    id: "indoor",
    title: "Indoor Storage",
    description:
      "Located inside secure buildings, these units offer added protection from the elements. Ideal for long-term storage or items sensitive to temperature changes.",
  },
  {
    id: "drive-up",
    title: "Drive-Up Storage",
    description:
      "Easy vehicle access for quick loading and unloading. Works like a personal garage—perfect for furniture, tools, and large household items.",
  },
  {
    id: "rv",
    title: "Parking",
    description: "Spaces sized for RVs, trailers, boats, and vehicle storage.",
  },
];

type EnrichedUnit = WssUnit & {
  isIndoor: boolean;
  isRV: boolean;
  category: CategoryId;
  categoryLabel: string;
  sizeCategory?: SizeFilter;
  sqft?: number;
  features: string[];
  accessLabel?: string;
  climateLabel?: string;
  climateBool?: boolean;
  doorLabel?: string;
  floorLabel?: string;
  electricityLabel?: string;
  useCase?: string;
  displayTitle: string;
  displayDescription?: string;
  displaySize?: string;
};

function getUnitImages(unit: EnrichedUnit) {
  const normalizedSize = (unit.displaySize || unit.size || "")
    .replace(/\s+/g, "")
    .toLowerCase();

  // RV / vehicle: rotate through three shots
  if (unit.isRV) {
    return [rvFirstLot.src, rvMiddleLot.src, rvSideView.src];
  }

  if (unit.category === "drive-up") {
    return [miniUnits.src, unit10x20.src, unit10x20Inside.src];
  }

  const is10x20 =
    normalizedSize.includes("10x20") || normalizedSize.includes("20x10");
  const is10x9 =
    normalizedSize.includes("10x9") || normalizedSize.includes("9x10");

  const outside = unit.isIndoor
    ? climateControl.src
    : is10x20
      ? unit10x20.src
      : is10x9
        ? unit10x9.src
        : middleLot.src;

  const inside = unit.isIndoor
    ? unit10x9.src
    : is10x20
      ? unit10x20Inside.src
      : is10x9
        ? unit10x9Inside.src
        : unit10x9Inside.src;

  return [outside, inside].filter(Boolean) as string[];
}

function simpleHash(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash + input.charCodeAt(i) * 31) % 10000;
  }
  return hash;
}

function normalizeSizeFilter(value?: string | null): SizeFilter | null {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (normalized === "small") return "small";
  if (normalized === "medium") return "medium";
  if (normalized === "large") return "large";
  return null;
}

function normalizeTypeFilter(value?: string | null, sizeValue?: string | null): TypeFilter | null {
  const normalized = value?.toLowerCase();
  if (normalized === "indoor") return "indoor";
  if (normalized === "drive-up" || normalized === "driveup") return "drive-up";
  if (normalized === "rv" || normalized === "vehicle" || normalized === "parking") {
    return "rv";
  }
  const sizeNormalized = sizeValue?.toLowerCase();
  if (sizeNormalized === "vehicle") return "rv";
  return null;
}

export default function UnitsGrid({ units }: Props) {
  const searchParams = useSearchParams();
  const requestedSize = searchParams.get("size");
  const requestedType = searchParams.get("type");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>("all");
  const enrichedUnits = useMemo(() => units.map(enrichUnit), [units]);
  const dedupedUnits = useMemo(() => {
    const merged = new Map<string, EnrichedUnit>();

    for (const unit of enrichedUnits) {
      const sizeKey = unit.displaySize || unit.size || "";
      const accessKey = unit.accessLabel || unit.access || "";
      const climateKey = unit.climateLabel || "";
      const key = `${unit.category}|${sizeKey}|${accessKey}|${climateKey}|${unit.rate ?? ""}`;

      const existing = merged.get(key);
      if (!existing) {
        merged.set(key, unit);
        continue;
      }

      const mergedAvailableCount =
        (existing.availableCount ?? 0) + (unit.availableCount ?? 0);

      merged.set(key, {
        ...existing,
        available: existing.available || unit.available,
        availableCount:
          mergedAvailableCount > 0 ? mergedAvailableCount : existing.availableCount,
        rate: existing.rate ?? unit.rate,
        unitId: existing.unitId || unit.unitId,
        rentableObjectId: existing.rentableObjectId || unit.rentableObjectId,
      });
    }

    return Array.from(merged.values());
  }, [enrichedUnits]);

  useEffect(() => {
    const normalized = normalizeSizeFilter(requestedSize);
    if (normalized) {
      setSizeFilter(normalized);
    }
  }, [requestedSize]);

  useEffect(() => {
    const normalized = normalizeTypeFilter(requestedType, requestedSize);
    if (normalized) {
      setTypeFilter(normalized);
    }
  }, [requestedType, requestedSize]);

  const filtered = dedupedUnits.filter((unit) => {
    const matchesAvailability = unit.available !== false;

    const matchesType =
      typeFilter === "all"
        ? true
        : unit.category === typeFilter;

    const matchesSize =
      sizeFilter === "all"
        ? true
        : unit.sizeCategory === sizeFilter ||
          // If RVs have large square footage, keep them when size filter is large
          (sizeFilter === "large" && unit.isRV);

    return matchesAvailability && matchesType && matchesSize;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <FilterGroup
          label="Type"
          options={[
            { value: "all", label: "All" },
            { value: "indoor", label: "Indoor" },
            { value: "drive-up", label: "Drive-Up" },
            { value: "rv", label: "Parking" },
          ]}
          value={typeFilter}
          onChange={(val) => setTypeFilter(val as TypeFilter)}
        />
        <FilterGroup
          label="Size"
          options={[
            { value: "all", label: "All" },
            { value: "small", label: "Small (25–50 sq ft)" },
            { value: "medium", label: "Medium (75–150 sq ft)" },
            { value: "large", label: "Large (200–300 sq ft)" },
          ]}
          value={sizeFilter}
          onChange={(val) => setSizeFilter(val as SizeFilter)}
        />
        <p className="text-sm text-muted-foreground">
          Showing {filtered.length} of {dedupedUnits.length} units
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const categoryUnits = filtered.filter((unit) => unit.category === category.id);
          const isTypeFiltered = typeFilter !== "all";
          const isSizeFiltered = sizeFilter !== "all";
          const hasAnyUnitsInCategory = dedupedUnits.some(
            (unit) => unit.category === category.id
          );

          if (isTypeFiltered && category.id !== typeFilter) {
            return null;
          }

          if (!isTypeFiltered && !isSizeFiltered && !hasAnyUnitsInCategory) {
            return null;
          }

          return (
            <section key={category.id} className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold">{category.title}</h2>
                <p className="text-muted-foreground font-normal">{category.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {categoryUnits.length === 0 ? (
                  <Card className="md:col-span-3">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No units match these filters in this category. Adjust filters or call and
                      we will help you find the right fit.
                    </CardContent>
                  </Card>
                ) : (
                  categoryUnits.map((unit) => <UnitCard key={unit.id} unit={unit} />)
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function buildMoveInUrl(unit: EnrichedUnit) {
  if (affiliatePortalUrl) {
    return affiliatePortalUrl;
  }

  const unitParam = unit.unitId || unit.rentableObjectId || unit.id;
  const rentableParam = unit.rentableObjectId;
  const query = new URLSearchParams();
  if (unitParam) query.set("unitID", unitParam);
  if (rentableParam) query.set("rentableObjectId", rentableParam);
  query.set("mode", "move-in");

  if (moveInTemplate) {
    return moveInTemplate.replace("{unitId}", encodeURIComponent(unitParam || unit.id));
  }

  if (moveInBaseUrl) {
    const trimmed = moveInBaseUrl.endsWith("/")
      ? moveInBaseUrl.slice(0, -1)
      : moveInBaseUrl;
    const separator = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${separator}${query.toString()}`;
  }

  // Fallback to on-site reservation form.
  return `/rent/${encodeURIComponent(unit.id)}?${query.toString()}`;
}

function isExternalMoveInLink() {
  return Boolean(affiliatePortalUrl || moveInTemplate || moveInBaseUrl);
}

function UnitCard({ unit }: { unit: EnrichedUnit }) {
  const price =
    typeof unit.rate === "number" && !Number.isNaN(unit.rate)
      ? `$${unit.rate.toFixed(2)} /mo`
      : "Call for rate";
  const images = useMemo(() => getUnitImages(unit), [unit]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [unit.id]);

  // Preload remaining images so arrows feel snappy.
  useEffect(() => {
    images.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const displayImage = images[activeIndex] ?? images[0];

  const stepImage = (delta: number) => {
    setActiveIndex((prev) => {
      const next = (prev + delta + images.length) % images.length;
      return next;
    });
  };
  const moveInUrl = buildMoveInUrl(unit);
  const useExternalTarget = isExternalMoveInLink();
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="space-y-2 pb-2">
        <CardTitle className="text-xl">
          {unit.displayTitle || unit.name || "Storage unit"}
        </CardTitle>
        {displayImage ? (
          <div className="relative overflow-hidden rounded-md border bg-muted/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt={unit.name || "Storage unit"}
              className="h-40 w-full object-cover"
              loading={activeIndex === 0 ? "eager" : "lazy"}
            />
            {images.length > 1 ? (
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => stepImage(-1)}
                  aria-label="Previous photo"
                  className="rounded-full bg-background/90 px-3 py-1 font-semibold shadow hover:bg-background transition"
                >
                  ‹
                </button>
                <div className="flex flex-1 justify-center gap-1">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border border-primary/70 bg-background/70 transition",
                        activeIndex === idx ? "bg-primary" : "opacity-70"
                      )}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => stepImage(1)}
                  aria-label="Next photo"
                  className="rounded-full bg-background/90 px-3 py-1 font-semibold shadow hover:bg-background transition"
                >
                  ›
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
        <p className="text-sm text-muted-foreground">
          {unit.displaySize || "Size listed at checkout"}
          {unit.useCase ? ` • ${unit.useCase}` : null}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 flex-1">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>{unit.displayDescription || unit.description || unit.type || "Storage unit available now."}</p>
          {unit.features.length ? (
            <ul className="list-disc space-y-1 pl-4">
              {unit.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="mt-auto space-y-3">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Monthly rate</span>
            <span className="text-lg font-semibold">{price}</span>
          </div>
          {unit.available && unit.availableCount !== undefined && unit.availableCount <= 3 ? (
            <p className="text-[15px] font-semibold text-orange-600">
              {unit.availableCount === 1
                ? "Only 1 unit left — reserve soon!"
                : `Only ${unit.availableCount} units left — reserve soon!`}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {unit.isRV ? <BadgePill>RV / Vehicle</BadgePill> : null}
            <BadgePill>{unit.categoryLabel}</BadgePill>
            {unit.sizeCategory ? <BadgePill>{unit.sizeCategory}</BadgePill> : null}
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              href={moveInUrl}
              className={buttonVariants({ className: "w-full" })}
              target={useExternalTarget ? "_blank" : undefined}
              rel={useExternalTarget ? "noreferrer" : undefined}
            >
              Rent Now
            </Link>
            <Link
              href={affiliatePortalUrl}
              className={buttonVariants({ variant: "outline", className: "w-full" })}
              target="_blank"
              rel="noreferrer"
            >
              Reserve Unit
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function enrichUnit(unit: WssUnit): EnrichedUnit {
  const text = `${unit.type || ""} ${unit.description || ""} ${unit.name || ""} ${unit.access || ""} ${unit.climate || ""} ${unit.sizeDescriptions?.join(" ") || ""} ${unit.orderGrouping || ""}`.toLowerCase();
  const accessNormalized = `${unit.access || ""} ${unit.orderGrouping || ""} ${unit.sizeDescriptions?.join(" ") || ""}`
    .replace(/\s|-/g, "")
    .toLowerCase();
  const isRV = /\brv\b|vehicle|parking|boat|trailer/.test(text);
  const isDriveUp =
    accessNormalized.includes("drive") ||
    accessNormalized.includes("driveup") ||
    accessNormalized.includes("drivein");
  const isIndoorAccess =
    accessNormalized.includes("hall") ||
    accessNormalized.includes("inside") ||
    accessNormalized.includes("interior");
  const hasInteriorWord = /interior/.test(text);
  const hasDriveWord = /drive\s*up/.test(text);
  const climateFlag =
    typeof unit.isClimate === "boolean"
      ? unit.isClimate
      : typeof unit.climate === "string"
        ? !/no\s*climate/i.test(String(unit.climate))
        : undefined;
  const isIndoor =
    isIndoorAccess ||
    hasInteriorWord ||
    unit.isInside === true ||
    (!isDriveUp && !isRV && climateFlag === true);
  const sqft = parseSqft(unit.size);
  const sizeCategory = deriveSizeCategory(sqft, isRV);
  const accessLabel =
    unit.access ||
    (isDriveUp ? "Drive-Up" : isIndoor ? "Indoor" : isRV ? "RV / Vehicle" : "Outdoor");
  const climateLabel =
    typeof unit.climate === "boolean"
      ? unit.climate
        ? "Climate"
        : "No Climate"
      : unit.climate
        ? formatLabel(String(unit.climate))
        : climateFlag === false
          ? "No Climate"
          : undefined;
  const climateBool =
    typeof unit.climate === "boolean"
      ? unit.climate
      : climateLabel
        ? !/^no\s*climate/i.test(climateLabel)
        : climateFlag === true;
  const doorLabel = unit.doors ? formatLabel(unit.doors) : undefined;
  const derivedDoor = inferDoor(unit.sizeDescriptions);
  const floorLabel = unit.floor || unit.elevation || inferFloor(unit.sizeDescriptions);
  const electricityLabel = inferElectricity(text, unit.sizeDescriptions);
  const useCase = deriveUseCase(sqft);
  const displaySize = unit.size || deriveSizeLabel(unit.size);

  let category: CategoryId = "drive-up";
  if (isRV) category = "rv";
  else if (isDriveUp) category = "drive-up";
  else if (isIndoor || hasInteriorWord) category = "indoor";
  else if (isIndoorAccess) category = "indoor";
  else category = "drive-up"; // default to drive-up to avoid mislabeling everything as outdoor

  const categoryLabel =
    category === "indoor"
      ? "Indoor"
      : category === "drive-up"
        ? "Drive-Up"
        : category === "rv"
          ? "Large Vehicle"
          : "Drive-Up";

  const features = [
    accessLabel,
    floorLabel,
    climateLabel,
    doorLabel || derivedDoor,
    electricityLabel,
  ].filter(Boolean) as string[];

  const sizeWord = sizeCategory ? capitalize(sizeCategory) : "";
  const displayTitle = `${sizeWord ? `${sizeWord} ` : ""}${categoryLabel} Unit${displaySize ? ` (${displaySize})` : ""}`.trim();
  const displayDescription =
    category === "indoor"
      ? climateBool
        ? "Climate-controlled indoor storage for items sensitive to temperature."
        : "Indoor storage with added protection from the elements."
      : category === "drive-up"
        ? "Drive-up access for fast loading and unloading."
        : "Vehicle-sized space.";

  return {
    ...unit,
    isIndoor,
    isRV,
    category,
    categoryLabel,
    sqft,
    sizeCategory,
    features,
    accessLabel,
    climateLabel,
    climateBool,
    doorLabel,
    floorLabel,
    electricityLabel,
    useCase,
    displayTitle,
    displayDescription,
    displaySize,
  };
}

function parseSqft(size?: string) {
  if (!size) return undefined;
  const numbers = size.match(/(\d+(\.\d+)?)/g);
  if (!numbers || numbers.length < 2) return undefined;
  const width = parseFloat(numbers[0]);
  const length = parseFloat(numbers[1]);
  if (Number.isNaN(width) || Number.isNaN(length)) return undefined;
  return Math.round(width * length);
}

function deriveSizeCategory(sqft?: number, isRV?: boolean): SizeFilter | undefined {
  if (isRV) return "large";
  if (!sqft) return undefined;
  if (sqft <= 50) return "small";
  if (sqft >= 75 && sqft <= 150) return "medium";
  if (sqft >= 200) return "large";
  return undefined;
}

function formatLabel(label: string) {
  const cleaned = label.replace(/_/g, " ").trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function deriveUseCase(sqft?: number) {
  if (!sqft) return undefined;
  if (sqft < 70) return "Studio or 1 Bedroom Home";
  if (sqft < 100) return "1–2 Bedroom Home";
  if (sqft < 150) return "2–3 Bedroom Home";
  return "4 Bedroom Home or larger";
}

function inferElectricity(text: string, sizeDescriptions?: string[]) {
  const combined = `${text} ${sizeDescriptions?.join(" ") || ""}`.toLowerCase();
  if (/no electricity|no electric/.test(combined)) return "No Electricity";
  if (/electric/.test(combined)) return "Electricity";
  return undefined;
}

function inferDoor(sizeDescriptions?: string[]) {
  const combined = (sizeDescriptions || []).join(" ").toLowerCase();
  if (/rollup/.test(combined)) return "Rollup";
  if (/swing/.test(combined)) return "Swing";
  return undefined;
}

function inferFloor(sizeDescriptions?: string[]) {
  const combined = (sizeDescriptions || []).join(" ").toLowerCase();
  if (/1st\s*floor/.test(combined)) return "1st Floor";
  if (/street\s*level/.test(combined)) return "Street Level";
  if (/inside\s*level/.test(combined)) return "Inside Level";
  if (/outside\s*level/.test(combined)) return "Outside Level";
  return undefined;
}

function capitalize(input?: string) {
  if (!input) return "";
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function deriveSizeLabel(raw?: string) {
  if (!raw) return undefined;
  return raw.replace(/x/gi, "×");
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              value === option.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-input bg-background text-foreground hover:bg-muted"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function BadgePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-[11px] font-medium">
      {children}
    </span>
  );
}
