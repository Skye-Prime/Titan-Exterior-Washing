import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DoorOpen, Move, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";

const placeholderUnits = [
  {
    name: "Drive-up",
    size: "10' x 15'",
    note: "Great for a 2-bedroom home or business inventory.",
  },
  {
    name: "Indoor",
    size: "5' x 10'",
    note: "Perfect for seasonal items or apartment overflow.",
  },
  {
    name: "Drive-up",
    size: "10' x 25'",
    note: "Fits a whole household or small vehicle.",
  },
];

export default function UnitsPage() {
  return (
    <div className="container space-y-10 py-12 md:py-16">
      <div className="space-y-4 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          Units
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold">
          Find the right fit for your storage needs
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Live availability and online rentals are coming soon. Until then,
          choose the size that fits best and give us a call—we’ll confirm the
          perfect unit and reserve it for you.
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

      <div className="grid gap-4 md:grid-cols-3">
        {placeholderUnits.map((unit, index) => (
          <Card key={index} className="h-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl">{unit.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{unit.size}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{unit.note}</p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <ShieldCheck className="h-4 w-4" /> Secure access
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <DoorOpen className="h-4 w-4" /> Easy entry
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <Truck className="h-4 w-4" /> Drive-up friendly
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                  <Move className="h-4 w-4" /> Flexible sizing
                </span>
              </div>
              <Link
                href={PHONE_LINK}
                className={buttonVariants({ variant: "outline", className: "w-full" })}
              >
                Call to reserve
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
