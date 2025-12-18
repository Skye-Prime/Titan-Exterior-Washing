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

    const unitId = body.unitId || (body as { unitID?: string }).unitID || body.rentableObjectId;
    const moveInDate = body.moveInDate || body.expectedMoveInDate;

    // WSS expects a rentableObjectId; map from our unitId for safety.
    const wssPayload = {
      ...body,
      unitId,
      unitID: unitId,
      rentableObjectId: body.rentableObjectId ?? unitId,
      moveInDate,
      expectedMoveInDate: moveInDate,
    };

    const result = await createReservation({ locationId, payload: wssPayload });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating WSS reservation", error);
    const message =
      error instanceof Error ? error.message : "Failed to create reservation";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function validatePayload(payload: ReservationPayload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request body";
  }

  if (!payload.unitId && !(payload as { unitID?: string }).unitID) {
    return "unitId is required";
  }

  if (!payload.moveInDate && !payload.expectedMoveInDate) {
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
