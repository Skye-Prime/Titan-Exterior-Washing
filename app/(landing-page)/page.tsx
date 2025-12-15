import { Hero } from "@/components/hero";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Clock, LockKeyhole, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import officeImage from "@/assets/office-image.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const PHONE_NUMBER_SCHEMA = "+1-931-209-4395";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.360storagesolutions.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";

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

const serviceHighlights = [
  {
    title: "Climate-controlled storage units",
    description:
      "Protect furniture, business files, and electronics with interior climate control and clean corridors.",
  },
  {
    title: "Drive-up storage units",
    description:
      "Ground-level units let you park next to the door for quick loading and unloading.",
  },
  {
    title: "Business & contractor storage",
    description:
      "Store inventory, tools, and records securely with camera coverage and gated access.",
  },
  {
    title: "Serving Middle Tennessee",
    description:
      "Convenient to Cookeville, Baxter, Sparta, Livingston, Algood, and the Tennessee Tech campus.",
  },
];

const faqs = [
  {
    question: "Do you have climate-controlled storage units in Cookeville?",
    answer:
      "Yes. Our indoor climate-controlled storage units keep furniture, electronics, and files stable year-round at our Cookeville, TN facility.",
  },
  {
    question: "What are your access hours and office hours?",
    answer:
      "Storage access is available every day from 5am–11pm. Our office is open Monday–Friday, 8am–5pm for in-person assistance.",
  },
  {
    question: "Can I reserve or move into a storage unit online?",
    answer:
      "Absolutely. Check live availability, reserve a unit, or start a move-in online through our WebSelfStorage-powered checkout.",
  },
  {
    question: "How secure is 360 Storage Solutions?",
    answer:
      "We use gated access, unique tenant codes, and 24/7 video surveillance to help keep your items secure.",
  },
  {
    question: "Where is 360 Storage Solutions located?",
    answer:
      "You can find us at 2237 W Broad St, Cookeville, TN 38501—easy to reach from I-40 and the Tennessee Tech campus.",
  },
];

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SelfStorage",
  name: "360 Storage Solutions",
  url: SITE_URL,
  telephone: PHONE_NUMBER_SCHEMA,
  address: {
    "@type": "PostalAddress",
    streetAddress: "2237 W Broad St",
    addressLocality: "Cookeville",
    addressRegion: "TN",
    postalCode: "38501",
    addressCountry: "US",
  },
  hasMap: MAPS_LINK,
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "05:00",
      closes: "23:00",
      description: "Storage gate access hours",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
      description: "Office hours",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Cookeville" },
    { "@type": "City", name: "Baxter" },
    { "@type": "City", name: "Sparta" },
    { "@type": "City", name: "Livingston" },
    { "@type": "CollegeOrUniversity", name: "Tennessee Tech University" },
  ],
  makesOffer: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: "Self storage units",
      areaServed: "Middle Tennessee",
    },
  },
  image: new URL(officeImage.src, SITE_URL).toString(),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function IndexPage() {
  return (
    <>
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd),
        }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Hero
        capsuleText="Cookeville, TN Self Storage"
        capsuleLink="#why-360"
        title="360 Storage Solutions"
        subtitle="360 Storage Solutions is your local Cookeville, Tennessee self storage facility with climate-controlled and drive-up units. Since 2016, we’ve served the Middle Tennessee community with secure gated access, 24/7 surveillance, and friendly local support."
        primaryCtaText="View available units"
        primaryCtaLink="/units"
        secondaryCtaText={PHONE_DISPLAY}
        secondaryCtaLink={PHONE_LINK}
        imageSrc={officeImage}
        imageAlt="Exterior of 360 Storage Solutions office"
        imagePriority
      />
      <div className="space-y-16 md:space-y-24">
        <section
          id="why-360"
          className="container max-w-6xl grid gap-8 py-8 md:grid-cols-3 md:items-start md:py-16 scroll-mt-28"
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
            <div className="flex flex-wrap gap-3">
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

        <section
          id="services"
          className="container max-w-6xl grid gap-8 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-start md:py-16"
        >
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              Storage in Cookeville
            </p>
            <h2 className="text-3xl font-semibold leading-tight">
              Storage solutions for homes, students, and businesses across Middle Tennessee.
            </h2>
            <p className="text-muted-foreground">
              Whether you need climate-controlled storage for delicate items or a drive-up unit for business inventory,
              we make it easy to store close to home. We are minutes from Tennessee Tech University and convenient to
              Cookeville, Baxter, Sparta, Livingston, and the broader Upper Cumberland region.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/units"
                className={buttonVariants({ size: "lg" })}
              >
                Check availability
              </Link>
              <Link
                href={MAPS_LINK}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceHighlights.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg border bg-background p-2"
              >
                <div className="flex h-full flex-col rounded-md p-6 gap-3">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container max-w-6xl py-8 md:py-16">
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
                  <li>Indoor climate-controlled and drive-up units sized for homes and businesses.</li>
                  <li>Security-first property with cameras, gated entry, and convenient access hours.</li>
                  <li>Fast online move-ins and reservations powered by WebSelfStorage.</li>
                  <li>Local team to help you pick the right unit and move in quickly.</li>
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
                  Online rentals
                </p>
                <h3 className="text-2xl font-semibold">
                  Live availability, secure payments
                </h3>
                <p className="text-muted-foreground">
                  Reserve or move in online through our WebSelfStorage integration.
                  Existing tenants can pay securely via our payment portal on the
                  Pay page—no phone call or in-person visit required.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="container max-w-6xl py-12 md:py-20 scroll-mt-28">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-primary">
              FAQs
            </p>
            <h3 className="text-3xl font-semibold">Storage questions, answered</h3>
            <p className="text-muted-foreground max-w-3xl">
              Quick answers to the most common questions about our Cookeville self storage facility, from climate control to access hours.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border p-6 space-y-2 bg-card">
                <h4 className="text-lg font-semibold">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="container max-w-6xl py-12 md:py-20 scroll-mt-28">
          <div className="rounded-2xl bg-muted px-6 py-10 md:px-12 md:py-14">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  Contact
                </p>
                <h3 className="text-3xl font-semibold">Call now for more information</h3>
                <p className="text-muted-foreground">
                  Talk with a local team member about unit sizing, availability, move-in timing, or how to start online.
                  Let us know what you’re storing and we’ll recommend the best fit.
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
      </div>
    </>
  );
}
