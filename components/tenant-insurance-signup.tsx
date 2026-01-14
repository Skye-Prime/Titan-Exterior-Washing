"use client";

import * as React from "react";
import { flushSync } from "react-dom";

const REQUIRED_FIELDS = [
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
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const updateSubmissionTimestamp = React.useCallback(() => {
    const now = new Date();
    setForm((prev) => ({
      ...prev,
      date: now.toLocaleDateString("en-US"),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  }, []);

  React.useEffect(() => {
    if (step === 2) {
      updateSubmissionTimestamp();
    }
  }, [step, updateSubmissionTimestamp]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = formRef.current;
    if (formElement && !formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    const now = new Date();
    flushSync(() => {
      setForm((prev) => ({
        ...prev,
        date: now.toLocaleDateString("en-US"),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    });
    formRef.current?.submit();
  };

  const isStep1Complete = REQUIRED_FIELDS.every((key) => form[key].trim() !== "");

  const handleChange =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  return (
    <form
      ref={formRef}
      action="https://formsubmit.co/rbm360info@gmail.com"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="_subject" value="Tenant Insurance Signup" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {step === 1 ? (
        <>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Tenant Insurance Signup</h3>
            <p className="text-xs text-slate-500">Step 1 of 2</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-1/2 bg-emerald-600" />
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <label className="space-y-1">
              <span>Location</span>
              <select
                className="w-full rounded border border-slate-200 px-2 py-1"
                name="location"
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
                  name="first"
                  value={form.first}
                  onChange={handleChange("first")}
                  required
                />
              </label>
              <label className="space-y-1">
                <span>Middle</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  name="middle"
                  value={form.middle}
                  onChange={handleChange("middle")}
                />
              </label>
              <label className="space-y-1">
                <span>Last</span>
                <input
                  className="w-full rounded border border-slate-200 px-2 py-1"
                  name="last"
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
                name="address1"
                value={form.address1}
                onChange={handleChange("address1")}
                required
              />
            </label>
            <input
              className="w-full rounded border border-slate-200 px-2 py-1"
              placeholder="Address Line 2"
              name="address2"
              value={form.address2}
              onChange={handleChange("address2")}
            />
            <div className="grid grid-cols-[2fr_1fr] gap-2">
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleChange("city")}
                required
              />
              <select
                className="w-full rounded border border-slate-200 px-2 py-1"
                name="state"
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
                name="zip"
                value={form.zip}
                onChange={handleChange("zip")}
                required
              />
              <input
                className="w-full rounded border border-slate-200 px-2 py-1"
                placeholder="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange("phone")}
                required
              />
            </div>
            <input
              className="w-full rounded border border-slate-200 px-2 py-1"
              placeholder="Email"
              name="email"
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
          </div>
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
            <input type="hidden" name="location" value={form.location} />
            <input type="hidden" name="first" value={form.first} />
            <input type="hidden" name="middle" value={form.middle} />
            <input type="hidden" name="last" value={form.last} />
            <input type="hidden" name="address1" value={form.address1} />
            <input type="hidden" name="address2" value={form.address2} />
            <input type="hidden" name="city" value={form.city} />
            <input type="hidden" name="state" value={form.state} />
            <input type="hidden" name="zip" value={form.zip} />
            <input type="hidden" name="phone" value={form.phone} />
            <input type="hidden" name="email" value={form.email} />

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1">
                  <span>Today&apos;s date</span>
                  <input
                    className="w-full rounded border border-slate-200 px-2 py-1"
                    placeholder="Today&apos;s date"
                    name="date"
                    value={form.date}
                    onChange={handleChange("date")}
                    readOnly
                  />
                </label>
                <label className="space-y-1">
                  <span>Time</span>
                  <input
                    className="w-full rounded border border-slate-200 px-2 py-1"
                    placeholder="--:--"
                    name="time"
                    value={form.time}
                    onChange={handleChange("time")}
                    readOnly
                  />
                </label>
              </div>
              <p className="text-xs text-slate-500">
                These will be updated to reflect the time of submission.
              </p>
            </div>

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
                  name="insuranceRequirement"
                  value="Purchase SafeStor"
                  checked={form.insuranceRequirement === "Purchase SafeStor"}
                  onChange={handleChange("insuranceRequirement")}
                  required
                />
                <span>
                  Option 1 - PURCHASE SAFESTOR (The recommended choice)
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="insuranceRequirement"
                  value="Homeowner/Renter policy coverage"
                  checked={
                    form.insuranceRequirement ===
                    "Homeowner/Renter policy coverage"
                  }
                  onChange={handleChange("insuranceRequirement")}
                  required
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
                  name="coverageLevel"
                  value="$5,000 of coverage is $11.95"
                  checked={form.coverageLevel === "$5,000 of coverage is $11.95"}
                  onChange={handleChange("coverageLevel")}
                  required
                />
                <span>$5,000 of coverage is $11.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverageLevel"
                  value="$10,000 of coverage is $21.95"
                  checked={form.coverageLevel === "$10,000 of coverage is $21.95"}
                  onChange={handleChange("coverageLevel")}
                  required
                />
                <span>$10,000 of coverage is $21.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverageLevel"
                  value="$15,000 of coverage is $40.95"
                  checked={form.coverageLevel === "$15,000 of coverage is $40.95"}
                  onChange={handleChange("coverageLevel")}
                  required
                />
                <span>$15,000 of coverage is $40.95</span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="coverageLevel"
                  value="Parking Space Vehicle - No Coverage"
                  checked={
                    form.coverageLevel === "Parking Space Vehicle - No Coverage"
                  }
                  onChange={handleChange("coverageLevel")}
                  required
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
              <input
                className="h-20 w-full rounded border border-slate-300 bg-white px-3 text-2xl text-slate-900"
                placeholder="Type your full name"
                name="signatureSafestor"
                value={form.signatureSafestor}
                onChange={handleChange("signatureSafestor")}
                style={{
                  fontFamily:
                    '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive',
                }}
                required
              />
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
              <input
                className="h-20 w-full rounded border border-slate-300 bg-white px-3 text-2xl text-slate-900"
                placeholder="Type your full name"
                name="signatureLiability"
                value={form.signatureLiability}
                onChange={handleChange("signatureLiability")}
                style={{
                  fontFamily:
                    '"Brush Script MT", "Segoe Script", "Lucida Handwriting", cursive',
                }}
                required
              />
              <p className="text-xs text-slate-500">Sign Above</p>
            </div>

            <button
              type="submit"
              className="w-fit rounded bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </form>
  );
}
