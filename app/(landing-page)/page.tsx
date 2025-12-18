import { Hero } from "@/components/hero";
import { MapRevealSection } from "@/components/map-reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Camera, Clock, LockKeyhole, MapPin, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import officeImage from "@/assets/office-image.jpg";
import middlePhoto from "@/assets/middle.jpg";
import rvLotFirst from "@/assets/RV Storage - First lot.jpg";
import reviewsBackground from "@/assets/background image 1.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const PHONE_NUMBER_SCHEMA = "+1-931-209-4395";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.360storagesolutions.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12568.560486298632!2d-85.5405!3d36.1554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8866c1ca5cfb4fcb%3A0x5d3ea35ba678bea2!2s2237%20W%20Broad%20St%2C%20Cookeville%2C%20TN%2038501!5e0!3m2!1sen!2sus!4v1700000000000&maptype=satellite";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_URL ||
  "https://www.google.com/maps/place/360+Storage+Solutions/@36.1776918,-85.5737668,17z/data=!4m8!3m7!1s0x8867219715cd6e71:0x7e8dbccd0b228f50!8m2!3d36.1776876!4d-85.5688959!9m1!1b1!16s%2Fg%2F11sjbptth5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

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
    description:
      "Office: Mon–Fri 10am–5pm or by appointment. Storage access: 24/7.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Unit insurance available",
    description:
      "Protect your belongings with simple, affordable coverage so you can rest easy.",
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
      "Storage access is available 24/7. Our office is open Monday–Friday, 10am–5pm or by appointment for in-person assistance.",
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
        id="hero"
        capsuleText="Cookeville, TN Self Storage"
        capsuleLink="#why-360"
        title="360 Storage Solutions"
        subtitle="Drive-up storage, climate-controlled units, and RV/boat parking with local service. Reserve online in minutes and move in without surprises."
        primaryCtaText="View available units"
        primaryCtaLink="/units"
        tertiaryCtaText="Pay online"
        tertiaryCtaLink="/pay"
        backgroundImages={[
          { src: middlePhoto, alt: "Climate-controlled buildings and drive paths" },
          { src: rvLotFirst, alt: "Drive-up storage lot" },
        ]}
      />
      <div className="space-y-0">
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
                Local, secure, and easy to work with.
              </h2>
              <p className="text-muted-foreground">
                Trusted since 2016 by neighbors across Middle Tennessee. We keep things simple: clean units, secure access, clear pricing, and friendly humans.
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

        <MapRevealSection />

        <section
          id="services"
          className="bg-transparent"
        >
          <div className="container max-w-6xl py-12 md:py-16">
            <div className="rounded-3xl px-6 py-10 md:px-10 md:py-12 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-px w-10 bg-primary/50" />
                  <p className="text-sm uppercase tracking-[0.2em] text-primary">
                    Storage in Cookeville
                  </p>
                </div>
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
                    className="relative overflow-hidden rounded-lg border bg-background p-2 shadow-sm"
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
                  <span className="text-sm text-white/80">Real reviews from our customers</span>
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
                .slice(0, 6)
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
                    <p className="text-muted-foreground leading-relaxed line-clamp-5">
                      {review.text}
                    </p>
                    <p className="text-sm font-semibold text-foreground mt-auto">{review.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#B5D7E9] py-12 md:py-20 scroll-mt-28">
          <div className="container max-w-6xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-px w-10 bg-primary/50" />
                <p className="text-sm uppercase tracking-[0.2em] text-primary">
                  FAQs
                </p>
              </div>
              <h3 className="text-3xl font-semibold">Storage questions, answered</h3>
              <p className="text-muted-foreground max-w-3xl">
                Quick answers to the most common questions about our Cookeville self storage facility, from climate control to access hours.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border bg-card p-6 space-y-2 shadow-sm">
                  <h4 className="text-lg font-semibold">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-transparent py-12 md:py-20 scroll-mt-28">
          <div className="container max-w-6xl">
            <div className="rounded-2xl bg-muted px-6 py-10 md:px-12 md:py-14 space-y-10 shadow-sm">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-10 bg-primary/50" />
                    <p className="text-sm uppercase tracking-[0.2em] text-primary">
                      Contact
                    </p>
                  </div>
                  <h3 className="text-3xl font-semibold">Call now for more information</h3>
                  <p className="text-muted-foreground">
                    Talk with a local team member about unit sizing, availability, move-in timing, or how to start online.
                    Let us know what you’re storing and we’ll recommend the best fit.
                  </p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">2237 W Broad St</p>
                    <p className="font-medium text-foreground">Cookeville, TN 38501</p>
                    <p className="text-foreground">United States</p>
                    <p>Office: Mon–Fri 10am–5pm or by appointment</p>
                    <p>Storage access: 24/7</p>
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
              <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-xl overflow-hidden border shadow-sm bg-background">
                  <iframe
                    src={MAP_EMBED_SRC}
                    className="h-[320px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="360 Storage Solutions location map"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold">Find us faster</h4>
                  <p className="text-muted-foreground">
                    See the property from above. We’re minutes from I-40 and the Tennessee Tech campus, with easy access on West Broad Street.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={MAPS_LINK}
                      className={buttonVariants({ size: "lg" })}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Maps
                    </Link>
                    <Link
                      href={PHONE_LINK}
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                    >
                      Call for directions
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
