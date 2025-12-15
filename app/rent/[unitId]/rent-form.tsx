"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  unitId: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  moveInDate: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  notes: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  moveInDate: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  notes: "",
};

export function RentForm({ unitId }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const payload = {
        unitId,
        moveInDate: form.moveInDate,
        notes: form.notes || undefined,
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          addressLine1: form.addressLine1 || undefined,
          addressLine2: form.addressLine2 || undefined,
          city: form.city || undefined,
          state: form.state || undefined,
          postalCode: form.postalCode || undefined,
        },
      };

      const response = await fetch("/api/wss/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Unable to submit reservation right now.");
      }

      setStatus("success");
      setForm(initialState);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="First name" required>
          <Input
            required
            value={form.firstName}
            onChange={handleChange("firstName")}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" required>
          <Input
            required
            value={form.lastName}
            onChange={handleChange("lastName")}
            autoComplete="family-name"
          />
        </Field>
        <Field label="Email" required>
          <Input
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" required>
          <Input
            type="tel"
            required
            value={form.phone}
            onChange={handleChange("phone")}
            autoComplete="tel"
          />
        </Field>
        <Field label="Move-in date" required>
          <Input
            type="date"
            required
            value={form.moveInDate}
            onChange={handleChange("moveInDate")}
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Address line 1" required>
          <Input
            required
            value={form.addressLine1}
            onChange={handleChange("addressLine1")}
            autoComplete="address-line1"
          />
        </Field>
        <Field label="Address line 2">
          <Input
            value={form.addressLine2}
            onChange={handleChange("addressLine2")}
            autoComplete="address-line2"
          />
        </Field>
        <Field label="City">
          <Input
            required
            value={form.city}
            onChange={handleChange("city")}
            autoComplete="address-level2"
          />
        </Field>
        <Field label="State">
          <Input
            required
            value={form.state}
            onChange={handleChange("state")}
            autoComplete="address-level1"
          />
        </Field>
        <Field label="Postal code">
          <Input
            required
            value={form.postalCode}
            onChange={handleChange("postalCode")}
            autoComplete="postal-code"
          />
        </Field>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="notes">Notes</Label>
          <textarea
            id="notes"
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={form.notes}
            onChange={handleChange("notes")}
            placeholder="Gate preferences, special timing, or anything else we should know."
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {status === "success" && (
        <p className="text-sm text-green-600">
          Reservation submitted. We will confirm your move-in shortly.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }))}
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit reservation"}
        </button>
        <p className="text-sm text-muted-foreground">
          By submitting, you agree to finalize your move-in with our team.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required ? <span className="text-red-600">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
