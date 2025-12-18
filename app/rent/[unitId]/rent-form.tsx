"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { MoveInCostResponse, WssUnit } from "@/lib/wssClient";

type Mode = "reserve" | "move-in";

type Props = {
  unitId: string;
  unit?: WssUnit;
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
  insuranceId: string;
  promoCode: string;
  taxExemptNumber: string;
  nameOnCard: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  billingPostal: string;
  autoPay: boolean;
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
  insuranceId: "",
  promoCode: "",
  taxExemptNumber: "",
  nameOnCard: "",
  cardNumber: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
  billingPostal: "",
  autoPay: true,
};

export function RentForm({ unitId, unit }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>(() => {
    const param = searchParams.get("mode");
    return param === "reserve" ? "reserve" : "move-in";
  });
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [cost, setCost] = useState<MoveInCostResponse | null>(null);
  const [costStatus, setCostStatus] = useState<"idle" | "loading" | "error">("idle");
  const [costError, setCostError] = useState<string | null>(null);

  const queryUnitId = searchParams.get("unitID") || undefined;
  const queryRentableId = searchParams.get("rentableObjectId") || undefined;
  const selectedUnitId = queryUnitId || unit?.unitId || unitId;
  const rentableObjectId = queryRentableId || unit?.rentableObjectId;

  const handleChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target instanceof HTMLInputElement && event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    if (!form.moveInDate) {
      setError("Please select your move-in date.");
      setStatus("idle");
      return;
    }

    const basePayload = {
      unitId: selectedUnitId,
      unitID: selectedUnitId,
      rentableObjectId,
      moveInDate: form.moveInDate,
      expectedMoveInDate: form.moveInDate,
      notes: form.notes || undefined,
      promoCode: form.promoCode || undefined,
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

    try {
      if (mode === "reserve") {
        await submitJson("/api/wss/reservations", basePayload);
        setStatus("success");
        setForm(initialState);
        setCost(null);
        router.refresh();
        return;
      }

      const requiredCardFields = [
        form.nameOnCard,
        form.cardNumber,
        form.expirationMonth,
        form.expirationYear,
        form.cvv,
      ];

      if (requiredCardFields.some((value) => !value)) {
        setStatus("idle");
        setError("Please complete the payment section to finish your move-in.");
        return;
      }

      const moveInPayload = {
        ...basePayload,
        insuranceId: form.insuranceId || undefined,
        taxExemptNumber: form.taxExemptNumber || undefined,
        autoPay: form.autoPay,
        payment: {
          nameOnCard: form.nameOnCard,
          cardNumber: form.cardNumber,
          expirationMonth: form.expirationMonth,
          expirationYear: form.expirationYear,
          cvv: form.cvv,
          postalCode: form.billingPostal || form.postalCode,
        },
      };

      await submitJson("/api/wss/movein", moveInPayload);
      setStatus("success");
      setForm(initialState);
      setCost(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const estimateCost = async () => {
    setCostStatus("loading");
    setCostError(null);
    setCost(null);

    if (!form.moveInDate) {
      setCostStatus("idle");
      setCostError("Select a move-in date to estimate your total.");
      return;
    }

    try {
      const payload = {
        unitId: selectedUnitId,
        unitID: selectedUnitId,
        rentableObjectId,
        moveInDate: form.moveInDate,
        expectedMoveInDate: form.moveInDate,
        insuranceId: form.insuranceId || undefined,
        taxExemptNumber: form.taxExemptNumber || undefined,
        promoCode: form.promoCode || undefined,
      };

      const result = (await submitJson("/api/wss/movein/cost", payload)) as MoveInCostResponse;

      if (result && typeof result === "object" && "success" in result && result.success === false) {
        const message =
          (result as { message?: string; error?: string }).message ||
          (result as { error?: string }).error ||
          (Array.isArray((result as { errors?: unknown }).errors)
            ? String((result as { errors?: unknown }).errors?.[0])
            : undefined) ||
          "Move-in cost could not be calculated.";
        throw new Error(message);
      }

      const hasTotals = [result?.totalDue, result?.total, result?.subtotal, result?.totalCost].some(
        (value) => typeof value === "number" && !Number.isNaN(value)
      );
      const hasLines =
        (Array.isArray(result?.lineItems) && result.lineItems.length > 0) ||
        (result?.costBreakDown &&
          Object.values(result.costBreakDown).some((v) => typeof v === "number"));

      if (!hasTotals && !hasLines) {
        const errorDetail =
          (result as { message?: string }).message ||
          (result as { error?: string }).error ||
          (Array.isArray((result as { errors?: unknown }).errors)
            ? String((result as { errors?: unknown }).errors?.[0])
            : undefined);

        throw new Error(
          errorDetail ||
            "We couldn't retrieve pricing from WSS. Please try again or continue checkout."
        );
      }

      setCost(result);
      setCostStatus("idle");
    } catch (err) {
      setCostStatus("error");
      setCostError(err instanceof Error ? err.message : "Unable to calculate total right now.");
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {cost?.success === false && (
        <p className="text-sm text-red-600">
          {("message" in cost && typeof cost.message === "string" && cost.message) ||
            ("error" in cost && typeof cost.error === "string" && cost.error) ||
            "WSS did not return a successful quote. You can still complete the move-in to see the final amount."}
        </p>
      )}
      <div className="space-y-2">
        <div className="inline-flex rounded-md border p-1">
          {(["move-in", "reserve"] as Mode[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={cn(
                "px-3 py-1 text-sm font-medium transition",
                value === mode
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {value === "move-in" ? "Rent now" : "Reserve"}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          {mode === "move-in"
            ? "We’ll charge your card, place you in WSS, and email your access details."
            : "Hold a unit without charges. Our team will confirm your move-in."}
        </p>
      </div>

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
        <Field label="City" required>
          <Input
            required
            value={form.city}
            onChange={handleChange("city")}
            autoComplete="address-level2"
          />
        </Field>
        <Field label="State" required>
          <Input
            required
            value={form.state}
            onChange={handleChange("state")}
            autoComplete="address-level1"
          />
        </Field>
        <Field label="Postal code" required>
          <Input
            required
            value={form.postalCode}
            onChange={handleChange("postalCode")}
            autoComplete="postal-code"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Insurance ID (optional)">
          <Input
            value={form.insuranceId}
            onChange={handleChange("insuranceId")}
            placeholder="Provided by WSS (leave empty if not applicable)"
          />
        </Field>
        <Field label="Tax exempt number (if applicable)">
          <Input
            value={form.taxExemptNumber}
            onChange={handleChange("taxExemptNumber")}
            placeholder="Enter if your organization is tax exempt"
          />
        </Field>
        <Field label="Promo code">
          <Input
            value={form.promoCode}
            onChange={handleChange("promoCode")}
            placeholder="Optional"
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

      {mode === "move-in" ? (
        <div className="space-y-4 rounded-md border p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment details</h3>
            <p className="text-sm text-muted-foreground">
              We’ll process your card now for the move-in total.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name on card" required>
              <Input
                required
                value={form.nameOnCard}
                onChange={handleChange("nameOnCard")}
                autoComplete="cc-name"
              />
            </Field>
            <Field label="Card number" required>
              <Input
                required
                value={form.cardNumber}
                onChange={handleChange("cardNumber")}
                autoComplete="cc-number"
                inputMode="numeric"
              />
            </Field>
            <Field label="Exp. month (MM)" required>
              <Input
                required
                value={form.expirationMonth}
                onChange={handleChange("expirationMonth")}
                autoComplete="cc-exp-month"
                placeholder="MM"
                inputMode="numeric"
              />
            </Field>
            <Field label="Exp. year (YYYY)" required>
              <Input
                required
                value={form.expirationYear}
                onChange={handleChange("expirationYear")}
                autoComplete="cc-exp-year"
                placeholder="YYYY"
                inputMode="numeric"
              />
            </Field>
            <Field label="Security code" required>
              <Input
                required
                value={form.cvv}
                onChange={handleChange("cvv")}
                autoComplete="cc-csc"
                inputMode="numeric"
              />
            </Field>
            <Field label="Billing postal code">
              <Input
                value={form.billingPostal}
                onChange={handleChange("billingPostal")}
                autoComplete="postal-code"
                placeholder="Defaults to your mailing ZIP"
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.autoPay}
              onChange={handleChange("autoPay")}
              className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary"
            />
            <span>Enable autopay for future invoices</span>
          </label>

          <div className="space-y-2">
            <button
              type="button"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              onClick={estimateCost}
              disabled={costStatus === "loading"}
            >
              {costStatus === "loading" ? "Calculating..." : "Estimate move-in total"}
            </button>
            {cost && (
              <div className="rounded-md border bg-muted/40 p-3 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatCurrency(getSubtotal(cost))}</span>
                </div>
                {buildLineItems(cost).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-muted-foreground">
                    <span>{item.description}</span>
                    <span>{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">{formatCurrency(getTax(cost))}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Due now</span>
                  <span>{formatCurrency(getTotal(cost))}</span>
                </div>
                {cost.success === false ? (
                  <p className="text-sm text-red-600">
                    {("message" in cost && typeof cost.message === "string" && cost.message) ||
                      ("error" in cost && typeof cost.error === "string" && cost.error) ||
                      "WSS did not return a successful quote. You can still complete the move-in to see the final amount."}
                  </p>
                ) : null}
              </div>
            )}
            {costError && <p className="text-sm text-red-600">{costError}</p>}
          </div>
        </div>
      ) : null}

      {error && <p className="text-sm text-red-600">{error}</p>}
      {status === "success" && (
        <p className="text-sm text-green-600">
          {mode === "move-in"
            ? "Move-in complete. Check your email for confirmation and gate details."
            : "Reservation submitted. We will confirm your move-in shortly."}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }))}
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Submitting..."
            : mode === "move-in"
              ? "Complete move-in"
              : "Submit reservation"}
        </button>
        <p className="text-sm text-muted-foreground">
          {mode === "move-in"
            ? "Your card will be charged immediately to secure this unit."
            : "By submitting, you agree to finalize your move-in with our team."}
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

async function submitJson(url: string, body: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Unable to submit right now.");
  }

  return response.json();
}

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getSubtotal(cost: MoveInCostResponse) {
  if (typeof cost.subtotal === "number") return cost.subtotal;
  if (typeof cost.total === "number") return cost.total;
  if (typeof cost.totalCost === "number") return cost.totalCost;
  const breakdown = cost.costBreakDown;
  if (breakdown) {
    const rent = breakdown.rent ?? 0;
    const fees = breakdown.fees ?? 0;
    const insurance = breakdown.insurance ?? 0;
    const deposit = breakdown.moveInDeposit ?? 0;
    const retail = breakdown.retail ?? 0;
    return rent + fees + insurance + deposit + retail;
  }
  return undefined;
}

function getTax(cost: MoveInCostResponse) {
  if (typeof cost.totalTax === "number") return cost.totalTax;
  const breakdown = cost.costBreakDown;
  if (breakdown) {
    const taxes = [
      breakdown.rentTax,
      breakdown.feesTax,
      breakdown.insuranceTax,
      breakdown.moveInDepositTax,
      breakdown.retailTax,
      breakdown.discountedTaxAmount ? -breakdown.discountedTaxAmount : 0,
    ].filter((v) => typeof v === "number") as number[];
    return taxes.reduce((sum, value) => sum + value, 0);
  }
  return undefined;
}

function getTotal(cost: MoveInCostResponse) {
  if (typeof cost.totalDue === "number") return cost.totalDue;
  if (typeof cost.total === "number") return cost.total;
  if (typeof cost.totalCost === "number") return cost.totalCost;
  const subtotal = getSubtotal(cost) ?? 0;
  const tax = getTax(cost) ?? 0;
  return subtotal + tax;
}

function buildLineItems(cost: MoveInCostResponse) {
  if (Array.isArray(cost.lineItems) && cost.lineItems.length) {
    return cost.lineItems
      .filter((item) => typeof item.amount === "number")
      .map((item) => ({
        description: item.description || "Charge",
        amount: item.amount as number,
      }));
  }

  const breakdown = cost.costBreakDown;
  if (!breakdown) return [];

  const entries: { description: string; amount: number }[] = [];
  const pushIfPositive = (description: string, amount?: number) => {
    if (typeof amount === "number" && Math.abs(amount) > 0) {
      entries.push({ description, amount });
    }
  };

  pushIfPositive("Rent", breakdown.rent);
  pushIfPositive("Fees", breakdown.fees);
  pushIfPositive("Insurance", breakdown.insurance);
  pushIfPositive("Deposit", breakdown.moveInDeposit);
  pushIfPositive("Retail", breakdown.retail);
  pushIfPositive("Reservation credit", breakdown.reservationDepositCredit ? -breakdown.reservationDepositCredit : undefined);
  return entries;
}
