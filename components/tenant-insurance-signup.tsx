"use client";

import * as React from "react";

const REQUIRED_FIELDS = [
  "date",
  "time",
  "location",
  "first",
  "last",
  "address1",
  "city",
  "state",
  "zip",
  "phone",
  "email",
] as const;

type RequiredField = (typeof REQUIRED_FIELDS)[number];

type FormState = {
  date: string;
  time: string;
  location: string;
  first: string;
  middle: string;
  last: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  insuranceRequirement: string;
  coverageLevel: string;
  signatureSafestor: string;
  signatureLiability: string;
};

const INITIAL_FORM: FormState = {
  date: "",
  time: "",
  location: "",
  first: "",
  middle: "",
  last: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  insuranceRequirement: "",
  coverageLevel: "",
  signatureSafestor: "",
  signatureLiability: "",
};

export function TenantInsuranceSignup() {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [form, setForm] = React.useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const isStep1Complete = REQUIRED_FIELDS.every((key) => form[key].trim() !== "");
  const isStep2Complete =
    form.insuranceRequirement.trim() !== "" &&
    form.coverageLevel.trim() !== "" &&
    form.signatureSafestor.trim() !== "" &&
    form.signatureLiability.trim() !== "";

  const handleChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async () => {
    if (!isStep2Complete || status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/tenant-insurance-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step1: {
            date: form.date,
            time: form.time,
            location: form.location,
            first: form.first,
            middle: form.middle,
            last: form.last,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            zip: form.zip,
            phone: form.phone,
            email: form.email,
          },
          step2: {
            insuranceRequirement: form.insuranceRequirement,
            coverageLevel: form.coverageLevel,
            signatureSafestor: form.signatureSafestor,
            signatureLiability: form.signatureLiability,
          },
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Unable to submit the form.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to submit the form."
      );
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      {step === 1 ? (
        <>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Tenant Insurance Signup</h3>
            <p className="text-xs text-slate-500">Step 1 of 2</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 bg-emerald-600" />
            </div>
          </div>

          <form className="space-y-3 text-sm text-slate-700">
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1">
                <span>Today&apos;s date</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  placeholder="Today&apos;s date"
                  value={form.date}
                  onChange={handleChange("date")}
                  required
                />
              </label>
              <label className="space-y-1">
                <span>Time</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  placeholder="--:--"
                  value={form.time}
                  onChange={handleChange("time")}
                  required
                />
              </label>
            </div>

            <label className="space-y-1">
              <span>Location</span>
              <select
                className="w-full rounded border border-slate-200 px-2 py-1"
                value={form.location}
                onChange={handleChange("location")}
                required
              >
                <option value="">Choose a City</option>
                <option value="Cookeville, TN">Cookeville, TN</option>
              </select>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <label className="space-y-1">
                <span>First</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  value={form.first}
                  onChange={handleChange("first")}
                  required
                />
              </label>
              <label className="space-y-1">
                <span>Middle</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  value={form.middle}
                  onChange={handleChange("middle")}
                />
              </label>
              <label className="space-y-1">
                <span>Last</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  value={form.last}
                  onChange={handleChange("last")}
                  required
                />
              </label>
            </div>

            <label className="space-y-1">
              <span>Mailing Address</span>
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="Address Line 1"
                value={form.address1}
                onChange={handleChange("address1")}
                required
              />
            </label>
            <input
              className="w-full rounded border border-slate-200 px-2 py-1"
              placeholder="Address Line 2"
              value={form.address2}
              onChange={handleChange("address2")}
            />
            <div className="grid grid-cols-[2fr_1fr] gap-2">
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="City"
                value={form.city}
                onChange={handleChange("city")}
                required
              />
              <select
                className="w-full rounded border border-slate-200 px-2 py-1"
                value={form.state}
                onChange={handleChange("state")}
                required
              >
                <option value="">State</option>
                <option value="TN">TN</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="Zip Code"
                value={form.zip}
                onChange={handleChange("zip")}
                required
              />
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange("phone")}
                required
              />
            </div>
            <input
              className="w-full rounded border border-slate-200 px-2 py-1"
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            <button
              type="button"
              onClick={() => {
                if (isStep1Complete) setStep(2);
              }}
              disabled={!isStep1Complete}
              className="rounded bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </form>
        </>
      ) : (
        <>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Tenant Insurance Signup</h3>
            <p className="text-xs text-slate-500">Step 2 of 2</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-full bg-emerald-600" />
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <p className="uppercase tracking-wide text-slate-900">
              Section 28 of the rental agreement: 28. Protection of stored
              material:
              <span className="normal-case text-slate-700">
                {" "}
                Occupant hereby acknowledges that he has been advised by Owner
                not to allow stored goods or materials to directly contact
                concrete or wood floors or walls (wood pallets are suggested).
                Occupant also acknowledges that he/she has been advised to cover
                all goods with plastic or other material to protect from dust,
                water, mildew, etc.
              </span>
            </p>

            <p>
              Protecting your property in storage is your responsibility. Rental
              Contract/Addendum I understand that it is a requirement of this
              storage facility that I maintain insurance covering my goods for
              as long as they are in storage. I have elected to meet this
              insurance requirement in the following manner:
            </p>

            <div className="space-y-2">
              <p className="font-semibold uppercase text-slate-900">
                Insurance Requirement <span className="text-rose-500">*</span>
              </p>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="insurance-requirement"
                  value="Purchase SafeStor"
                  checked={form.insuranceRequirement === "Purchase SafeStor"}
                  onChange={handleChange("insuranceRequirement")}
                />
                <span>
                  Option 1 - PURCHASE SAFESTOR (The recommended choice)
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="insurance-requirement"
                  value="Homeowner/Renter policy coverage"
                  checked={
                    form.insuranceRequirement ===
                    "Homeowner/Renter policy coverage"
                  }
                  onChange={handleChange("insuranceRequirement")}
                />
                <span>
                  Option 2 - HOMEOWNER&apos;S / RENTER&apos;S POLICY COVERAGE
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-slate-900">
                Choose One <span className="text-rose-500">*</span>
              </p>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverage-level"
                  value="$5,000 of coverage is $11.95"
                  checked={form.coverageLevel === "$5,000 of coverage is $11.95"}
                  onChange={handleChange("coverageLevel")}
                />
                <span>$5,000 of coverage is $11.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverage-level"
                  value="$10,000 of coverage is $21.95"
                  checked={form.coverageLevel === "$10,000 of coverage is $21.95"}
                  onChange={handleChange("coverageLevel")}
                />
                <span>$10,000 of coverage is $21.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverage-level"
                  value="$15,000 of coverage is $40.95"
                  checked={form.coverageLevel === "$15,000 of coverage is $40.95"}
                  onChange={handleChange("coverageLevel")}
                />
                <span>$15,000 of coverage is $40.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverage-level"
                  value="Parking Space Vehicle - No Coverage"
                  checked={
                    form.coverageLevel === "Parking Space Vehicle - No Coverage"
                  }
                  onChange={handleChange("coverageLevel")}
                />
                <span>Parking Space Vehicle - No Coverage</span>
              </label>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-slate-900">
                PURCHASE SAFESTOR - Purchase the optional SafeStor protection in
                the amount I have specified in my rental contract. SafeStor
                protects your goods from loss due to burglary, fire, smoke,
                tornado, hurricane, and many other unforeseen events or natural
                occurrences, including mold. SIGN BELOW:
                <span className="text-rose-500"> *</span>
              </p>
              <div className="relative">
                <input
                  className="h-28 w-full rounded border border-slate-300 bg-white px-3 py-2"
                  placeholder="Type full name to sign"
                  value={form.signatureSafestor}
                  onChange={handleChange("signatureSafestor")}
                  required
                />
                <span className="absolute right-2 top-2 text-xs text-slate-400">
                  x
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-slate-900">
                I assume full liability and responsibility for any and all loss
                or damage that occurs to my goods from any cause while in
                storage, including without limitation personal, consequential,
                special, or incidental damages, even if storage facility has
                been advised of the possibility or foreseeability of such
                damage. Furthermore I hold this storage facility harmless and
                release them for any damage or injury caused to my property or
                person from any cause, including but not limited to mold,
                mildew and any type of vermin, while utilizing this storage
                facility. Furthermore I will indemnify This Storage Facility for
                any loss or damage that may be caused to This Storage Facility
                as a result of my use of this facility. I acknowledge and
                understand that this storage facility does not insure my goods,
                and has no responsibility to provide insurance. I ACKNOWLEDGE
                AND AGREE THAT ANY LOSS OR DAMAGE TO MY GOODS, OR PERSON, THAT
                OCCURS WHILE MY GOODS ARE IN STORAGE IS FULLY MY RESPONSIBILITY
                AND AT MY EXPENSE, AND I WAIVE THE RIGHT TO SUE FOR ANY SUCH
                DAMAGES.
                <span className="text-rose-500"> *</span>
              </p>
              <div className="relative">
                <input
                  className="h-28 w-full rounded border border-slate-300 bg-white px-3 py-2"
                  placeholder="Type full name to sign"
                  value={form.signatureLiability}
                  onChange={handleChange("signatureLiability")}
                  required
                />
                <span className="absolute right-2 top-2 text-xs text-slate-400">
                  x
                </span>
              </div>
              <p className="text-xs text-slate-500">Sign Above</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStep2Complete || status === "submitting"}
                className="w-fit rounded bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Finish"}
              </button>
              {status === "success" ? (
                <p className="text-xs text-emerald-600">
                  Submission received. We&apos;ll follow up if we need anything
                  else.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-xs text-rose-600">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
