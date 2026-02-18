import Link from "next/link";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getAvailableUnits, WssUnit } from "@/lib/wssClient";
import UnitsGrid from "./units-grid";

const PHONE_DISPLAY = "(931) 316-9839";
const PHONE_LINK = "tel:+19313169839";

export const metadata: Metadata = {
  title: "Storage Units in Cookeville, TN | Titan Exterior Washing",
  description:
    "Browse climate-controlled and drive-up storage units with live availability in Cookeville, Tennessee. Reserve or move in online at Titan Exterior Washing.",
  alternates: {
    canonical: "/units",
  },
};

export const dynamic = "force-dynamic";

export default async function UnitsPage() {
  const { units, error } = await loadUnits();

  return (
    <div className="container max-w-6xl space-y-10 py-12 md:py-16 pt-24 md:pt-28">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          Units
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold">
          Reserve or move in online
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Live availability direct from our WebSelfStorage system. Pick your
          unit and start your move-in now, or call and we will hold the best fit
          for you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={PHONE_LINK} className={buttonVariants({ size: "lg" })}>
            {PHONE_DISPLAY}
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Back to home
          </Link>
        </div>
      </div>

      {error ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Availability temporarily unavailable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>{error}</p>
            <p>Please call and we will reserve a unit for you.</p>
          </CardContent>
        </Card>
      ) : (
        <UnitsGrid units={units} />
      )}
    </div>
  );
}

async function loadUnits(): Promise<{ units: WssUnit[]; error?: string }> {
  try {
    const locationId = process.env.WSS_ENTITY_ID;
    if (!locationId) {
      return { units: [], error: "Location ID is not configured." };
    }

    const units = await getAvailableUnits({ locationId });
    return { units };
  } catch (err) {
    console.error("Failed to load units", err);
    return { units: [], error: "We could not load availability right now." };
  }
}
