import { Hero } from "@/components/hero";
import { PromoBanner } from "@/components/promo-banner";
import { SizeGuide } from "@/components/size-guide";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, Clock, LockKeyhole, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import officeHero from "@/assets/Office.jpg";
import officeImage from "@/assets/office-image.jpg";
import rvLotFirst from "@/assets/RV Storage - First lot.jpg";
import reviewsBackground from "@/assets/background image 1.jpg";
import miniUnits from "@/assets/Mini Units.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const PROMO_ACTIVE = true;
const PAY_URL = "/pay";
const RENT_URL = "/units";
const SIZE_GUIDE_RENT_URL = "/units";
const MOBILE_BREAKPOINT = 768;
const CITY_NAME = "Cookeville";
const PHONE_NUMBER_SCHEMA = "+1-931-209-4395";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.360storagesolutions.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_URL ||
  "https://www.google.com/maps/place/360+Storage+Solutions/@36.1776918,-85.5737668,17z/data=!4m8!3m7!1s0x8867219715cd6e71:0x7e8dbccd0b228f50!8m2!3d36.1776876!4d-85.5688959!9m1!1b1!16s%2Fg%2F11sjbptth5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

const features = [
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Serving neighbors since 2016",
    description:
      "Long-term, consistent ownership with a steady local reputation.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Clear policies, no surprises",
    description:
      "Straightforward terms and transparent pricing you can understand.",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Clean, well-kept property",
    description:
      "We stay on top of maintenance so the facility feels orderly and safe.",
  },
  {
    icon: <PhoneCall className="h-10 w-10 text-primary" />,
    title: "Real people when you call",
    description:
      "Talk to a local team member who can help you quickly.",
  },
  {
    icon: <LockKeyhole className="h-10 w-10 text-primary" />,
    title: "Secure, orderly access",
    description:
      "Clear gates, bright lighting, and systems that keep things controlled.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Easy to find, easy to use",
    description:
      "Drive up, unload, and get back to your day without hassle.",
  },
];

const reviews = [
  {
    name: "Sinda H.",
    date: "2023-10-25",
    text: "Back in June a tree fell on our garage and we needed some extra storage. Called around with no relief or had to leave messages. Called here spoke with a REAL person and he was so helpful and got us in that day!! It was a huge relief and so appreciated! Definitely would use in future",
    rating: 5,
  },
  {
    name: "Steve Y.",
    date: "2021-06-24",
    text: "I felt my RV was safe and secure while stored at the facility. I never had an issue with the storing of the RV. The people running the storage facility was always friendly and helpful.",
    rating: 5,
  },
  {
    name: "ROBERT D.",
    date: "2021-04-03",
    text: "Hope to return next November.",
    rating: 5,
  },
  {
    name: "Donald W.",
    date: "2020-12-30",
    text: "Thank you for helping us with a place to store what was left over from the tornado. You was very kind.",
    rating: 5,
  },
  {
    name: "Steven C.",
    date: "2018-12-11",
    text: "Very friendly and helpful will use again",
    rating: 5,
  },
];

const reviewStats = (() => {
  const count = reviews.length;
  const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const averageRating = count ? Math.round((total / count) * 10) / 10 : 0;
  return { count, averageRating };
})();

const reviewCardOffsets = [
  "md:-rotate-1 md:-translate-y-2",
  "md:rotate-1 md:translate-y-3",
  "md:-rotate-2 md:-translate-y-4",
  "md:rotate-2 md:-translate-y-1",
  "md:-rotate-1 md:translate-y-2",
  "md:rotate-1 md:-translate-y-3",
  "md:-rotate-2 md:translate-y-1",
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
      opens: "00:00",
      closes: "23:59",
      description: "Storage access 24/7",
    },
    
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "17:00",
      description: "Office hours or by appointment",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: reviewStats.averageRating,
    reviewCount: reviewStats.count,
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
    },
    reviewBody: review.text,
    datePublished: review.date,
  })),
  image: new URL(officeImage.src, SITE_URL).toString(),
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
      <PromoBanner
        promoActive={PROMO_ACTIVE}
        city={CITY_NAME}
        phoneDisplay={PHONE_DISPLAY}
        phoneLink={PHONE_LINK}
        rentUrl={RENT_URL}
        mobileBreakpoint={MOBILE_BREAKPOINT}
      />
      <Hero
        id="hero"
        capsuleText="Trusted local storage"
        capsuleLink="#why-360"
        title="Storage that doesn’t waste your time."
        subtitle="Clean, secure units. Clear pricing. Real people when you call."
        primaryCtaText="View available units"
        primaryCtaLink="/units"
        secondaryCtaText="Pay Online"
        secondaryCtaLink={PAY_URL}
        backgroundImages={[
          { src: officeHero, alt: "Office exterior at 360 Storage Solutions" },
          { src: miniUnits, alt: "Storage unit rows at the facility" },
          { src: rvLotFirst, alt: "Outdoor parking area on-site" },
        ]}
      />
      <div className="space-y-0">
        <section id="size-guide" className="bg-[#B5D7E9] py-12 md:py-16">
          <div className="container max-w-6xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Size guide</p>
              <h2 className="text-3xl font-semibold">Find the right unit size</h2>
              <p className="text-muted-foreground">
                Browse sizes, compare use cases, and jump straight to availability.
              </p>
            </div>
            <SizeGuide rentUrl={SIZE_GUIDE_RENT_URL} />
          </div>
        </section>

        <section id="why-360" className="bg-[#B5D7E9] scroll-mt-28">
          <div className="container max-w-6xl grid gap-8 py-12 md:grid-cols-3 md:items-start md:py-16">
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-10 bg-primary/50" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  Why 360
                </p>
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                Straightforward people. Straightforward storage.
              </h2>
              <p className="text-muted-foreground">
                You want a place that answers the phone, keeps the property clean, and makes the process easy. That is exactly how we run the facility.
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
                    className="relative overflow-hidden rounded-lg border bg-card p-2 shadow-sm"
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
          </div>
        </section>

        <section
          id="reviews"
          className="relative w-full py-12 md:py-16"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 130, 0, 0.28), rgba(255, 130, 0, 0.48)), url("${reviewsBackground.src}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative container max-w-6xl space-y-6 text-white">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-px w-10 bg-primary/70" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  Reviews
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <span className="flex text-amber-500 text-2xl" aria-label="Five star reviews">
                    ★★★★★
                  </span>
                  <h3 className="text-3xl font-semibold">What neighbors say about 360 Storage Solutions</h3>
                  <span className="text-sm text-white/80">
                    Real reviews from people who wanted it to be easy.
                  </span>
                </div>
                <Link
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    variant: "secondary",
                    className: "bg-white text-slate-900 hover:bg-white/90",
                  })}
                >
                  Leave a review
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {reviews
                .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
                .slice(0, 5)
                .map((review, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group rounded-xl border bg-card/95 backdrop-blur shadow-sm p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg",
                      reviewCardOffsets[idx % reviewCardOffsets.length]
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {review.date ? (
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {review.text}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-auto">{review.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-transparent py-12 md:py-20 scroll-mt-28">
          <div className="container max-w-5xl">
            <div className="rounded-2xl bg-muted px-6 py-10 md:px-12 md:py-14 text-center space-y-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-10 bg-primary/50" />
                  <p className="text-sm uppercase tracking-[0.2em] text-primary">
                    Ready?
                  </p>
                </div>
                <h3 className="text-3xl font-semibold">Talk to a real person today</h3>
                <p className="text-muted-foreground">
                  Quick answers, clear pricing, and a team that respects your time.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/storage-units-cookeville-tn"
                  className={buttonVariants({ size: "lg" })}
                >
                  View available units
                </Link>
                <Link
                  href={PHONE_LINK}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  Call {PHONE_DISPLAY}
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Need specifics?{" "}
                <Link
                  href="/storage-units-cookeville-tn"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  Self storage units in Cookeville, TN
                </Link>{" "}
                or{" "}
                <Link
                  href="/storage-units-cookeville-tn"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  Cookeville storage facility
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
