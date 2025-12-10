import { Hero } from "@/components/hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Clock, LockKeyhole, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import officeImage from "@/assets/office-image.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";

const features = [
  {
    icon: <LockKeyhole className="h-10 w-10 text-primary" />,
    title: "Gated access",
    description:
      "Controlled entry so only authorized tenants can access the property.",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "24/7 surveillance",
    description:
      "Top-of-the-line security cameras keep an eye on your belongings around the clock.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Located in Middle Tennessee",
    description:
      "Serving our local community with easy access and responsive support.",
  },
  {
    icon: <PhoneCall className="h-10 w-10 text-primary" />,
    title: "Friendly, local team",
    description:
      "Call us anytime for quick answers about availability, unit sizes, and move-ins.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Convenient hours",
    description: "Office: Mon–Fri 8am–5pm. Storage access: daily 5am–11pm.",
  },
];

export default function IndexPage() {
  return (
    <>
      <Hero
        capsuleText="Middle Tennessee Storage"
        capsuleLink="#why-360"
        title="360 Storage Solutions"
        subtitle="360 Storage Solutions is your local and reliable storage provider. Founded in 2016, we’ve been serving the Middle Tennessee community with easy, secure storage. Breathe easy knowing your belongings are protected by top-of-the-line security cameras and gated access."
        primaryCtaText="View available units"
        primaryCtaLink="/units"
        secondaryCtaText={PHONE_DISPLAY}
        secondaryCtaLink={PHONE_LINK}
        imageSrc={officeImage}
        imageAlt="Exterior of 360 Storage Solutions office"
        imagePriority
      />

      <section
        id="why-360"
        className="container grid gap-8 py-8 md:grid-cols-3 md:items-start md:py-16 scroll-mt-28"
      >
        <div className="md:col-span-1 space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">
            Why 360
          </p>
          <h2 className="text-3xl font-semibold leading-tight">
            Local, secure, and easy to work with.
          </h2>
          <p className="text-muted-foreground">
            Trusted since 2016 by neighbors across Middle Tennessee. We keep
            things simple: clean units, secure access, and friendly service.
          </p>
          <div className="flex gap-3">
            <Link
              href="/units"
              className={buttonVariants({ size: "lg" })}
            >
              Check availability
            </Link>
            <Link
              href={PHONE_LINK}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {PHONE_DISPLAY}
            </Link>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-full flex-col rounded-md p-6 gap-4">
                  {item.icon}
                  <div className="space-y-2">
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-8 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <Card className="h-full shadow-sm">
            <CardContent className="space-y-4 p-6 md:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                What to expect
              </p>
              <h3 className="text-2xl font-semibold">
                Clean units, secure access, straightforward pricing.
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Indoor and drive-up options sized for homes and businesses.</li>
                <li>Security-first property with cameras and gated entry.</li>
                <li>Fast move-ins with online reservations coming soon.</li>
                <li>Local support to help you pick the right unit.</li>
              </ul>
              <div className="flex gap-3">
                <Link
                  href="/units"
                  className={buttonVariants({ size: "lg" })}
                >
                  View units
                </Link>
                <Link
                  href={PHONE_LINK}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  {PHONE_DISPLAY}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full border-dashed">
            <CardContent className="space-y-4 p-6 md:p-10">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                Coming soon
              </p>
              <h3 className="text-2xl font-semibold">
                Live availability & online rentals
              </h3>
              <p className="text-muted-foreground">
                We’re integrating directly with our U-Haul WebSelfStorage system
                so you can see real-time availability, reserve, and move in from
                this site. Until then, give us a call and we’ll hold the right
                unit for you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="contact"
        className="container py-12 md:py-20 scroll-mt-28"
      >
        <div className="rounded-2xl bg-muted px-6 py-10 md:px-12 md:py-14">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                Contact
              </p>
              <h3 className="text-3xl font-semibold">Call now for more information</h3>
              <p className="text-muted-foreground">
                We’ll answer questions about sizing, availability, and move-in
                timing. Let us know what you’re storing and we’ll recommend the
                best fit.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">2237 W Broad St</p>
                <p className="font-medium text-foreground">Cookeville, TN 38501</p>
                <p className="text-foreground">United States</p>
                <p>Office: Mon–Fri 8am–5pm (Sat–Sun closed)</p>
                <p>Storage access: Mon–Sun 5am–11pm</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={PHONE_LINK}
                className={buttonVariants({ size: "lg" })}
              >
                {PHONE_DISPLAY}
              </Link>
              <Link
                href="/units"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Explore units
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
