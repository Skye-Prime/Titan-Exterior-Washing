import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroBackground from "@/assets/background image 1.jpg";

const PHONE_DISPLAY = "(931) 316-9839";
const PHONE_LINK = "tel:+19313169839";
const RENT_URL = "/units";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.titanexteriorwashing.com";
const MAPS_LINK =
  "https://maps.google.com/?q=2237+W+Broad+St+Cookeville+TN+38501";
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12568.560486298632!2d-85.5405!3d36.1554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8866c1ca5cfb4fcb%3A0x5d3ea35ba678bea2!2s2237%20W%20Broad%20St%2C%20Cookeville%2C%20TN%2038501!5e0!3m2!1sen!2sus!4v1700000000000&maptype=satellite";
const REVIEW_URL =
  process.env.NEXT_PUBLIC_REVIEW_URL ||
  "https://www.google.com/maps/search/?api=1&query=Titan+Exterior+Washing";

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
    question: "Who is Titan Exterior Washing?",
    answer:
      "Titan Exterior Washing is run by two Tennessee Tech students focused on high-quality service, clear communication, and long-term trust with every homeowner.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide house washing for brick and vinyl, concrete cleaning for driveways and patios, and fence cleaning to restore weathered surfaces.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. Titan Exterior Washing is fully insured to protect you and your property.",
  },
  {
    question: "Where do you serve?",
    answer:
      "We serve Cookeville and nearby Middle Tennessee communities.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Call us at (931) 316-9839 or use our services page to request pricing based on your property and project scope.",
  },
];

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Titan Exterior Washing",
  url: SITE_URL,
  telephone: "+1-931-316-9839",
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
      name: "Exterior washing services",
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
    "About Titan Exterior Washing | Cookeville, TN",
  description:
    "Meet Titan Exterior Washing: two Tennessee Tech students building a trusted exterior washing company through hard work, quality results, and personal service.",
  alternates: {
    canonical: "/storage-units-cookeville-tn",
  },
};

export default function CookevilleStoragePage() {
  return (
    <>
      <script
        id="cookeville-local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessJsonLd),
        }}
      />
      <script
        id="cookeville-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section className="relative overflow-hidden bg-background text-white">
        <div className="absolute inset-0">
          <Image
            src={heroBackground}
            alt="Storage facility at Titan Exterior Washing"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container max-w-6xl py-20 md:py-28">
          <div className="max-w-3xl space-y-5 rounded-2xl bg-black/28 backdrop-blur-sm px-6 py-6 md:px-8 md:py-7 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
            <p className="text-sm uppercase tracking-[0.3em] text-white/80">
              About Titan Exterior Washing
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold">
              Built on hard work. Driven by trust.
            </h1>
            <p className="text-base md:text-lg text-white/90">
              At Titan Exterior Washing, we are a team of two Tennessee Tech students and
              aspiring entrepreneurs. Since 2025, we have built Titan through hard work,
              dependable results, and personal relationships with the homeowners we serve.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                View services
              </Link>
              <Link
                href={PHONE_LINK}
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
              >
                Call {PHONE_DISPLAY}
              </Link>
            </div>
            <p className="text-sm text-white/80">
              Need a fast answer? Explore our{" "}
              <Link href="/units" className="font-semibold underline underline-offset-4">
                services and pricing
              </Link>{" "}
              or call us directly.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B9CED6]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                About us
              </h2>
              <p className="text-muted-foreground">
                At Titan Exterior Washing, we are a team of two Tennessee Tech students,
                aspiring entrepreneurs fueled by hard work and a dream. Since 2025, we have
                grown Titan not just as a business, but as a bond and a personal connection
                with every homeowner we serve.
              </p>
              <p className="text-muted-foreground">
                We do not just wash homes, we build trust. Whether it is a full home exterior
                clean, a concrete driveway refresh, or a fence that feels like new, we treat
                your property like it matters because it does.
              </p>
            </div>
            <div className="rounded-2xl border bg-slate-50 p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Quick facts</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Founded: 2025</li>
                <li>Team: Two Tennessee Tech student entrepreneurs</li>
                <li>Core services: House washing, concrete cleaning, fence cleaning</li>
                <li>Protection: Fully insured to protect you and your property</li>
                <li>Address: 2237 W Broad St, Cookeville, TN 38501</li>
                <li>Service area: Cookeville and nearby Middle Tennessee communities</li>
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
                Services we provide
              </h2>
              <p className="text-muted-foreground">
                We deliver exterior cleaning services designed around your home and your priorities.
                If you are not sure which service you need first, our{" "}
                <Link href="/size-guide" className="font-semibold text-primary underline underline-offset-4">
                  service guide
                </Link>{" "}
                breaks down the most common options.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
              <h3 className="text-xl font-semibold">Popular service options</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>House washing for brick and vinyl</li>
                <li>Concrete driveway and patio cleaning</li>
                <li>Fence brightening for wood and vinyl</li>
                <li>Exterior refreshes for homeowners and small businesses</li>
              </ul>
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                Get service options
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Who we serve
            </h2>
            <p className="text-muted-foreground">
              We work with homeowners who want reliable, respectful service and visible results.
              We also help property managers and local businesses keep exteriors clean, safe,
              and professional.
            </p>
            <p className="text-muted-foreground">
              We are building more than a business. We are building relationships in our community.
              And yes, we will even bring you a cup of coffee, because you are not just a customer,
              you are part of this journey with us.
            </p>
            <p className="text-muted-foreground">
              For help choosing the right service, start with our{" "}
              <Link href="/size-guide" className="font-semibold text-primary underline underline-offset-4">
                service guide
              </Link>{" "}
              and compare options based on your property needs.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#B9CED6]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Find Titan Exterior Washing in Cookeville
              </h2>
              <p className="text-muted-foreground">
                Our office is located at 2237 W Broad St, Cookeville, TN 38501. It is a
                short drive from I-40 and Tennessee Tech University, with convenient access from the
                West Broad Street corridor.
              </p>
              <p className="text-muted-foreground">
                Use the map to plan your route or call {PHONE_DISPLAY} with questions about
                scheduling, service scope, or pricing.
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
                <p className="font-semibold text-foreground">Titan Exterior Washing</p>
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

      <section className="bg-[#B9CED6]">
        <div className="container max-w-6xl py-12 md:py-16 space-y-8">
          <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers for homeowners looking for exterior washing in Cookeville, TN.
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
              <h3 className="text-xl font-semibold">Get your exterior washing quote</h3>
              <p className="text-sm text-muted-foreground">
                Ready to get started? Compare service options and contact us for pricing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={RENT_URL} className={buttonVariants({ size: "lg" })}>
                View services
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
