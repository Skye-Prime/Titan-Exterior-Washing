import { NextRequest, NextResponse } from "next/server";
import { MoveInPayload, createMoveIn } from "@/lib/wssClient";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MoveInPayload;
    const validationError = validatePayload(body);
    const locationId = process.env.WSS_ENTITY_ID;

    if (!locationId) {
      return NextResponse.json(
        { error: "WSS_ENTITY_ID is not configured" },
        { status: 500 }
      );
    }

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const payload = {
      ...body,
      insuranceId: body.insuranceId || undefined,
      taxExemptNumber: body.taxExemptNumber || undefined,
      promoCode: body.promoCode || undefined,
      rentableObjectId: body.rentableObjectId || body.unitId || body.unitID,
      expectedMoveInDate: body.expectedMoveInDate || body.moveInDate,
      moveInDate: body.expectedMoveInDate || body.moveInDate,
      payment: {
        ...body.payment,
        postalCode: body.payment?.postalCode || body.customer?.postalCode,
      },
    };

    const result = await createMoveIn({ locationId, payload });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating WSS move-in", error);
    const message =
      error instanceof Error ? error.message : "Failed to complete move-in";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function validatePayload(payload: MoveInPayload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request body";
  }

  const unitId = payload.unitId || payload.unitID || payload.rentableObjectId;
  if (!unitId) {
    return "unitId is required";
  }

  if (!payload.moveInDate && !payload.expectedMoveInDate) {
    return "moveInDate is required";
  }

  if (!payload.taxExemptNumber) {
    payload.taxExemptNumber = "0";
  }

  if (!payload.customer) {
    return "customer details are required";
  }

  const { firstName, lastName, email, phone, addressLine1, city, state, postalCode } = payload.customer;
  if (!firstName || !lastName || !email || !phone || !addressLine1 || !city || !state || !postalCode) {
    return "customer firstName, lastName, email, phone, addressLine1, city, state, and postalCode are required";
  }

  if (!payload.payment) {
    return "payment details are required for move-in";
  }

  const { nameOnCard, cardNumber, expirationMonth, expirationYear, cvv } = payload.payment;
  if (!nameOnCard || !cardNumber || !expirationMonth || !expirationYear || !cvv) {
    return "full payment details are required (nameOnCard, cardNumber, expirationMonth, expirationYear, cvv)";
  }

  return null;
}
