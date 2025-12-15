import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getAvailableUnits, WssUnit } from "@/lib/wssClient";
import { RentForm } from "./rent-form";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";

export const metadata: Metadata = {
  title: "Reserve a Storage Unit Online | 360 Storage Solutions",
  description:
    "Finish your Cookeville, TN storage unit reservation securely with 360 Storage Solutions.",
  robots: {
    index: false,
    follow: true,
  },
};

type RentPageParams = {
  params: Promise<{ unitId: string }>;
};

export default async function RentPage({ params }: RentPageParams) {
  const resolvedParams = await params;
  const decodedUnitId = decodeURIComponent(resolvedParams.unitId);
  const { unit, error } = await loadUnit(decodedUnitId);

  return (
    <div className="container max-w-4xl py-12 md:py-16 space-y-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Rent now</p>
        <h1 className="text-3xl md:text-4xl font-semibold">
          Finish your reservation
        </h1>
        <p className="text-muted-foreground">
          Complete the form below to reserve or move into your unit. You will
          receive a confirmation once the reservation is processed.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Renter details</CardTitle>
          </CardHeader>
          <CardContent>
            <RentForm unitId={decodedUnitId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unit summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {unit ? (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Unit</span>
                  <span className="font-medium">{unit.name || "Storage unit"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span className="font-medium">{unit.size || "See details at checkout"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{unit.type || "Storage"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">
                    {typeof unit.rate === "number" && !Number.isNaN(unit.rate)
                      ? `$${unit.rate.toFixed(2)} /mo`
                      : "Call for rate"}
                  </span>
                </div>
              </>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                We could not find this unit. You can still submit your details and we
                will match you with the closest available option.
              </p>
            )}
            <div className="pt-2 space-y-2 text-sm text-muted-foreground">
              <p>Questions or prefer to book by phone?</p>
              <Link
                href={PHONE_LINK}
                className={cn(buttonVariants({ variant: "outline", className: "w-full" }))}
              >
                Call {PHONE_DISPLAY}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function loadUnit(unitId: string): Promise<{ unit?: WssUnit; error?: string }> {
  try {
    const locationId = process.env.WSS_ENTITY_ID;
    if (!locationId) {
      return { error: "Location ID is not configured." };
    }

    const units = await getAvailableUnits({ locationId });
    const unit = units.find((item) => item.id === unitId);
    return { unit };
  } catch (err) {
    return { error: "We could not load this unit right now." };
  }
}
