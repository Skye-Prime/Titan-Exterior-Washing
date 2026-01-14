import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TenantInsuranceSignup } from "@/components/tenant-insurance-signup";
import { cn } from "@/lib/utils";
import { CertificateModal } from "@/components/certificate-modal";
import brochureCover from "@/assets/SafeStor Tenant Insurance Brochure Cover Jan 17.png";
import coveragePoster from "@/assets/can-you-afford-to-be-without-coverage.jpg";
import coverageChart from "@/assets/Covererage chart.png";
import certificatePageOne from "@/assets/TN certificate page 1.png";
import certificatePageTwo from "@/assets/TN certificate page 2.png";

const PHONE_DISPLAY = "+1 (931) 209-4395";
const PHONE_LINK = "tel:+19312094395";
const RENT_URL = "/units";
const CLAIMS_PHONE = "800-528-7134";
const CLAIMS_PHONE_DISPLAY = "800-528-7134";
const CLAIMS_PHONE_LINK = "tel:+18005287134";
const CLAIMS_LINK = "https://repwest.com/claims?safestor";

const exclusions = [
  "Financial records, currency, deeds, securities, stamps, jewelry, watches, or collectibles",
  "Furs, garments trimmed with fur, fine art, and antiques",
  "Motorized vehicles or trailers of any kind",
];

const safestorQuestions = [
  "Coverage depends on the coverage amount you select.",
  "Monthly premiums are based on the plan level you choose.",
  "Ask our team for current plan tiers and pricing.",
];

const claimSteps = [
  `Call ${CLAIMS_PHONE} before leaving the property.`,
  "Take photos of all affected goods and the unit number.",
  "Document the possible source of damage (ceilings, walls, floors, etc.).",
  "Start the online claims process and keep copies of your submissions.",
];

export const metadata: Metadata = {
  title: "Tenant Insurance | 360 Storage Solutions",
  description:
    "Tenant insurance details, coverage notes, and SafeStor signup guidance for 360 Storage Solutions in Cookeville, TN.",
  alternates: {
    canonical: "/tenant-insurance",
  },
};

export default function TenantInsurancePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="pt-28">
        <div className="container max-w-5xl text-center">
          <h1 className="text-3xl md:text-4xl font-semibold">Tenant Insurance</h1>
        </div>
      </section>

      <section className="pb-16 pt-10">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="flex justify-center lg:justify-start">
                <span className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Possible claim?
                </span>
              </div>

              <div className="space-y-3 text-center lg:text-left">
                <h2 className="text-xl font-semibold">
                  Insurance is there to cover life&apos;s unexpected events.
                </h2>
                <p className="text-sm text-slate-700">
                  360 Storage Solutions does not insure your goods. Tenant
                  insurance coverage is required. Choose coverage through
                  SafeStor or provide proof of coverage with a copy of your
                  declarations page and policy number.
                </p>
                <p className="text-sm font-semibold text-orange-500">
                  Call today with questions: {PHONE_DISPLAY}
                </p>
              </div>

              <div className="space-y-4">
                <Image
                  src={brochureCover}
                  alt="SafeStor tenant insurance brochure"
                  className="mx-auto h-auto w-[280px] shadow-md"
                />
                <Image
                  src={coveragePoster}
                  alt="SafeStor coverage overview"
                  className="mx-auto h-auto w-[320px] shadow-md"
                />
              </div>
            </div>

            <TenantInsuranceSignup />
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <Image
                src={coverageChart}
                alt="SafeStor coverage chart"
                className="h-auto w-full max-w-[260px] shadow-md"
              />
              <div className="rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">
                  Why protect your possessions with SafeStor?
                </p>
                <p className="mt-2">
                  Protecting your stored goods is your responsibility. SafeStor
                  can help cover loss or damage from covered events.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Frequently asked questions
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    What kinds of property are not covered?
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {exclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    When can I expect to receive my policy?
                    <p className="mt-1">At the time of rental.</p>
                  </li>
                  <li>
                    What should I do if I have a claim?
                    <p className="mt-1">
                      Contact our claims office at {CLAIMS_PHONE}. A claims
                      adjuster will help you personally handle your claim.
                    </p>
                  </li>
                  <li>
                    Is there a deductible?
                    <p className="mt-1">No.</p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  SafeStor questions
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {safestorQuestions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="container max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex justify-center">
              <CertificateModal
                images={[
                  {
                    src: certificatePageOne,
                    alt: "Tennessee insurance certificate page 1",
                  },
                  {
                    src: certificatePageTwo,
                    alt: "Tennessee insurance certificate page 2",
                  },
                ]}
              />
            </div>
            <div className="space-y-4 text-sm text-slate-700">
              <h3 className="text-base font-semibold text-slate-900">
                Possible tenant insurance claim
              </h3>
              <ul className="list-disc space-y-2 pl-5">
                {claimSteps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href={CLAIMS_LINK} className={buttonVariants({ size: "lg" })}>
                  Start a claim online
                </Link>
                <Link
                  href={CLAIMS_PHONE_LINK}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "border-slate-300"
                  )}
                >
                  Call {CLAIMS_PHONE_DISPLAY}
                </Link>
              </div>
              <p className="text-xs text-slate-500">
                Coverage availability and terms may vary. Ask our team for
                current plan details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
