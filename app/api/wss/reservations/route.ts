import { NextRequest, NextResponse } from "next/server";
import { ReservationPayload, createReservation } from "@/lib/wssClient";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReservationPayload;
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

    const result = await createReservation({ locationId, payload: body });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating WSS reservation", error);
    return NextResponse.json(
      { error: "Failed to create reservation" },
      { status: 500 }
    );
  }
}

function validatePayload(payload: ReservationPayload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request body";
  }

  if (!payload.unitId) {
    return "unitId is required";
  }

  if (!payload.moveInDate) {
    return "moveInDate is required";
  }

  if (!payload.customer) {
    return "customer details are required";
  }

  const { firstName, lastName, email, phone } = payload.customer;
  if (!firstName || !lastName || !email || !phone) {
    return "customer firstName, lastName, email, and phone are required";
  }

  const { addressLine1, city, state, postalCode } = payload.customer;
  if (!addressLine1 || !city || !state || !postalCode) {
    return "customer addressLine1, city, state, and postalCode are required";
  }

  return null;
}
