import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBackground from "@/assets/background image 1.jpg";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const RENT_URL = "/units";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.360storagesolutions.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12568.560486298632!2d-85.5405!3d36.1554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8866c1ca5cfb4fcb%3A0x5d3ea35ba678bea2!2s2237%20W%20Broad%20St%2C%20Cookeville%2C%20TN%2038501!5e0!3m2!1sen!2sus!4v1700000000000&maptype=satellite";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_URL ||
  "https://www.google.com/maps/place/360+Storage+Solutions/@36.1776918,-85.5737668,17z/data=!4m8!3m7!1s0x8867219715cd6e71:0x7e8dbccd0b228f50!8m2!3d36.1776876!4d-85.5688959!9m1!1b1!16s%2Fg%2F11sjbptth5?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D";

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
    name: "Donald W.",
    date: "2020-12-30",
    text: "Thank you for helping us with a place to store what was left over from the tornado. You was very kind.",
    rating: 5,
  },
];

const reviewStats = (() => {
  const count = reviews.length;
  return { count, averageRating: 4.7 };
})();

const faqs = [
  {
    question: "Where are your storage units located in Cookeville, TN?",
    answer:
      "We are located at 2237 W Broad St in Cookeville, TN 38501. The property is easy to reach from I-40, Tennessee Tech University, and the West Broad Street corridor.",
  },
  {
    question: "Do you offer climate-controlled storage units in Cookeville?",
    answer:
      "Yes. Climate-controlled storage helps protect furniture, documents, electronics, and photos from heat and humidity that are common in Cookeville, TN.",
  },
  {
    question: "Can I rent a storage unit online?",
    answer:
      "Yes. You can browse availability, pick a size, and complete your rental online any time.",
  },
  {
    question: "What kinds of storage are available at your facility?",
    answer:
      "Drive-up units, interior climate-controlled units, and outdoor parking for RVs, boats, and trailers are available.",
  },
  {
    question: "How secure is the Cookeville storage facility?",
    answer:
      "The property has gated access, 24/7 video monitoring, and bright lighting to help keep your belongings protected. Each tenant gets an access code and the lot is designed for clear visibility.",
  },
];

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SelfStorage",
  name: "360 Storage Solutions",
  url: SITE_URL,
  telephone: "+1-931-209-4395",
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
      areaServed: "Cookeville, TN",
    },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: reviewStats.averageRating,
    reviewCount: reviewStats.count,
  },
  review: reviews.map((review) => ({
    "@type": "Review",
    author: review.name,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
    },
    reviewBody: review.text,
    datePublished: review.date,
  })),
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

export const metadata: Metadata = {
  title:
    "Self Storage Units in Cookeville, TN | Climate-Controlled & Drive-Up Storage",
  description:
    "View climate-controlled, drive-up, and RV storage units in Cookeville, TN near West Broad Street. Compare sizes and rent online.",
  alternates: {
    canonical: "/storage-units-cookeville-tn",
  },
};

export default function CookevilleStoragePage() {
  return (
    <>
      <Script
        id="cookeville-local-business-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd),
        }}
      />
      <Script
        id="cookeville-faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section className="relative overflow-hidden bg-background text-white">
        <div className="absolute inset-0">
          <Image
            src={heroBackground}
            alt="Storage facility at 360 Storage Solutions"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container max-w-6xl py-20 md:py-28">
          <div className="max-w-3xl space-y-5 rounded-2xl bg-black/28 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80">
              Cookeville storage details
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold">
              Self Storage Units in Cookeville, TN
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Climate-controlled, drive-up, and RV storage units are available near West Broad
              Street in Cookeville, TN. Use this page to review unit types, access, and
              location details before renting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                View available units
              </Link>
              <Link
                href={PHONE_LINK}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "bg-white text-slate-900 hover:bg-white/90"
                )}
              >
                Call {PHONE_DISPLAY}
              </Link>
            </div>
            <p className="text-sm text-white/80">
              Need a fast answer? Check{" "}
              <Link href="/units" className="font-semibold underline underline-offset-4">
                availability and pricing
              </Link>{" "}
              and reserve your space in minutes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B5D7E9]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                About us
              </h2>
              <p className="text-muted-foreground">
                360 Storage Solutions is located at 2237 W Broad St in Cookeville, TN 38501, near
                the West Broad Street corridor with quick access from I-40 and Tennessee Tech
                University. This page covers unit types, access, and location details so you can
                confirm fit before renting.
              </p>
              <p className="text-muted-foreground">
                Use the size guide to compare units, check availability online, and plan your
                move-in based on your schedule. If you prefer to talk with someone first, call
                the office for pricing or access questions.
              </p>
              <p className="text-muted-foreground">
                Looking for brand details? Visit{" "}
                <Link href="/" className="font-semibold text-primary underline underline-offset-4">
                  360 Storage Solutions
                </Link>{" "}
                for the homepage overview.
              </p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Quick facts</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Address: 2237 W Broad St, Cookeville, TN 38501</li>
                <li>Access: 24/7 gate access for tenants</li>
                <li>Units: climate-controlled and drive-up options</li>
                <li>Parking: RV, boat, and trailer storage</li>
                <li>Nearby: I-40, Tennessee Tech, West Broad Street</li>
              </ul>
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

          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Storage unit types available in Cookeville
              </h2>
              <p className="text-muted-foreground">
                Climate-controlled units are available for temperature-sensitive items. Drive-up
                units provide vehicle access for loading. Outdoor parking is available for RVs,
                boats, and trailers. If you are unsure which size fits your needs, our{" "}
                <Link href="/size-guide" className="font-semibold text-primary underline underline-offset-4">
                  storage unit size guide
                </Link>{" "}
                breaks down the most common options.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Popular storage options</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Climate-controlled units for temperature-sensitive items</li>
                <li>Drive-up units with vehicle access</li>
                <li>Business storage for tools, inventory, and equipment</li>
                <li>RV and boat parking on-site</li>
              </ul>
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                Check availability
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Who this storage works for
            </h2>
            <p className="text-muted-foreground">
              Storage units are commonly used during moves, renovations, or seasonal changes.
              Students often store belongings between semesters. Contractors and small
              businesses use storage for tools and inventory. RV owners use outdoor parking
              when driveway space is limited.
            </p>
            <p className="text-muted-foreground">
              If you live near West Broad Street or Tennessee Tech, the location keeps storage
              access close to your daily routes. For help deciding what size you need, start
              with our{" "}
              <Link href="/size-guide" className="font-semibold text-primary underline underline-offset-4">
                Cookeville storage unit size guide
              </Link>{" "}
              and compare options based on the items you plan to store.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B5D7E9]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Find our Cookeville storage facility on West Broad Street
              </h2>
              <p className="text-muted-foreground">
                The facility is located at 2237 W Broad St, Cookeville, TN 38501. It is a
                short drive from I-40 and Tennessee Tech University, with access from the
                West Broad Street corridor.
              </p>
              <p className="text-muted-foreground">
                Use the map to plan your route or call {PHONE_DISPLAY} with questions about
                access hours, unit sizes, or availability.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
              <iframe
                src={MAP_EMBED_SRC}
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cookeville storage units map"
              />
              <div className="p-4 space-y-2 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">360 Storage Solutions</p>
                <p>2237 W Broad St</p>
                <p>Cookeville, TN 38501</p>
                <Link
                  href={MAPS_LINK}
                  className="font-semibold text-primary underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-[#B5D7E9]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Frequently asked questions about Cookeville storage
            </h2>
            <p className="text-muted-foreground">
              Quick answers for renters looking for self storage in Cookeville, TN.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border bg-slate-50 p-6 space-y-2 shadow-sm">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border bg-slate-50 p-6 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Reserve your Cookeville storage unit</h3>
              <p className="text-sm text-muted-foreground">
                Ready to get started? Compare unit sizes, check availability, and rent online.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                View available units
              </Link>
              <Link
                href="/#contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
