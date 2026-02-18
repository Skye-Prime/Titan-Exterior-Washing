import { Hero } from "@/components/hero";
import { PromoBanner } from "@/components/promo-banner";
import { SizeGuide } from "@/components/size-guide";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, Clock, LockKeyhole, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";
import officeHero from "@/assets/Office.jpg";
import officeImage from "@/assets/office-image.jpg";
import rvLotFirst from "@/assets/RV Storage - First lot.jpg";
import reviewsBackground from "@/assets/background image 1.jpg";
import miniUnits from "@/assets/Mini Units.jpg";

const PHONE_DISPLAY = "(931) 316-9839";
const PHONE_LINK = "tel:+19313169839";
const PROMO_ACTIVE = true;
const RENT_URL = "/units";
const SIZE_GUIDE_RENT_URL = "/units";
const MOBILE_BREAKPOINT = 768;
const CITY_NAME = "Cookeville";
const PHONE_NUMBER_SCHEMA = "+1-931-316-9839";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.titanexteriorwashing.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_URL ||
  "https://www.google.com/maps/search/?api=1&query=Titan+Exterior+Washing";

const features = [
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Scheduling that works for you",
    description:
      "Pick the day and service window that fits your week. We show up prepared.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Protection-first process",
    description:
      "We treat every surface with the right method so your property is cleaned, not worn down.",
  },
  {
    icon: <Camera className="h-10 w-10 text-primary" />,
    title: "Results you can see",
    description:
      "From siding to concrete, we focus on details that keep your place looking sharp.",
  },
  {
    icon: <PhoneCall className="h-10 w-10 text-primary" />,
    title: "Clear communication",
    description:
      "You get direct updates, straightforward pricing, and answers without runaround.",
  },
  {
    icon: <LockKeyhole className="h-10 w-10 text-primary" />,
    title: "Fully insured protection",
    description:
      "Titan Exterior Washing is fully insured to protect you and your property.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Local, accountable team",
    description:
      "We serve Cookeville and nearby communities with consistent, professional care.",
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
  "@type": "ProfessionalService",
  name: "Titan Exterior Washing",
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
      description: "Online requests accepted 24/7",
    },
    
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "17:00",
      description: "Phone support and appointments",
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
      name: "Exterior washing and property cleaning",
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
      <script
        id="local-business-jsonld"
        type="application/ld+json"
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
        capsuleText="Exterior care on your terms"
        capsuleLink="#why-titan"
        title="Clean surfaces. Protected finishes. Service built around you."
        subtitle="You call the priorities. We deliver exterior washing with clear communication, careful methods, and dependable follow-through."
        primaryCtaText="View services"
        primaryCtaLink="/units"
        secondaryCtaText="Call for a quote"
        secondaryCtaLink={PHONE_LINK}
        backgroundImages={[
          { src: officeHero, alt: "Office exterior at Titan Exterior Washing" },
          { src: miniUnits, alt: "Storage unit rows at the facility" },
          { src: rvLotFirst, alt: "Outdoor parking area on-site" },
        ]}
      />
      <div className="space-y-0">
        <section id="size-guide" className="bg-[#B9CED6] py-12 md:py-16">
          <div className="container max-w-6xl space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Service options</p>
              <h2 className="text-3xl font-semibold">Choose the type of washing you need</h2>
              <p className="text-muted-foreground">
                Compare concrete cleaning, house washing, and fence cleaning to find the best fit for your property.
              </p>
            </div>
            <SizeGuide rentUrl={SIZE_GUIDE_RENT_URL} />
          </div>
        </section>

        <section id="why-titan" className="bg-[#B9CED6] scroll-mt-28">
          <div className="container max-w-6xl grid gap-8 py-12 md:grid-cols-3 md:items-start md:py-16">
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-px w-10 bg-primary/50" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  Why Titan
                </p>
              </div>
              <h2 className="text-3xl font-semibold leading-tight">
                Professional service, with you in control.
              </h2>
              <p className="text-muted-foreground">
                You should never feel stuck waiting on a contractor. We make scheduling, scope, and expectations clear so you can make confident decisions.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/units"
                  className={buttonVariants({ size: "lg" })}
                >
                  Explore services
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
                  <h3 className="text-3xl font-semibold">What neighbors say about Titan Exterior Washing</h3>
                  <span className="text-sm text-white/80">
                    Real feedback from customers who wanted control, clarity, and clean results.
                  </span>
                </div>
                <Link
                  href={REVIEW_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({
                    size: "lg",
                    variant: "secondary",
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
                <h3 className="text-3xl font-semibold">Tell us what you need. We will build the right plan.</h3>
                <p className="text-muted-foreground">
                  Straight answers, respectful service, and clean outcomes that protect your property.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/storage-units-cookeville-tn"
                  className={buttonVariants({ size: "lg" })}
                >
                  View service options
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
                  Exterior washing in Cookeville, TN
                </Link>{" "}
                or{" "}
                <Link
                  href="/storage-units-cookeville-tn"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  property cleaning services
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
