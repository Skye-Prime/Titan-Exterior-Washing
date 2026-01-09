import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SizeGuide } from "@/components/size-guide";
import heroImage from "@/assets/middle.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const RENT_URL = "/units";

export const metadata: Metadata = {
  title: "Storage Unit Size Guide in Cookeville, TN | 360 Storage Solutions",
  description:
    "Compare storage unit sizes in Cookeville, TN by real-world use cases. Find the right fit for apartments, home moves, and RV storage.",
  alternates: {
    canonical: "/size-guide",
  },
};

export default function SizeGuidePage() {
  return (
    <div>
      <section className="pt-24 md:pt-28">
        <div className="relative h-[240px] md:h-[320px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage.src})` }}
          />
          <div className="absolute inset-0 bg-slate-900/55" />
          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center text-white">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                Storage unit sizes
              </p>
              <h1 className="text-3xl md:text-5xl font-semibold">Size Guide</h1>
              <p className="text-base md:text-lg text-white/90">
                If you have questions or want to tour our facility to see different
                units, contact us today.
              </p>
              <p className="text-sm text-white/80">
                Need local details? Visit our{" "}
                <Link href="/storage-units-cookeville-tn" className="font-semibold underline underline-offset-4">
                  self storage in Cookeville, TN
                </Link>{" "}
                page.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                  View available units
                </Link>
                <Link
                  href={PHONE_LINK}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-white/70 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  Call {PHONE_DISPLAY}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="container max-w-6xl py-12 md:py-16">
          <SizeGuide rentUrl={RENT_URL} />
        </div>
      </section>
    </div>
  );
}
