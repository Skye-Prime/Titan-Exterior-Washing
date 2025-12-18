import { NextRequest, NextResponse } from "next/server";
import { MoveInCostRequest, getMoveInCost } from "@/lib/wssClient";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MoveInCostRequest;
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
    };

    const result = await getMoveInCost({ locationId, payload });
    const hasTotals = [result?.totalDue, result?.total, result?.subtotal, result?.totalCost].some(
      (value) => typeof value === "number" && !Number.isNaN(value)
    );
    const hasLines =
      (Array.isArray(result?.lineItems) && result.lineItems.length > 0) ||
      (result?.costBreakDown && Object.values(result.costBreakDown).some((v) => typeof v === "number"));

    if (!hasTotals && !hasLines) {
      console.error("WSS move-in cost returned no totals", {
        unitId: payload.unitId,
        unitID: payload.unitID,
        rentableObjectId: payload.rentableObjectId,
        insuranceId: payload.insuranceId,
        promoCode: payload.promoCode,
        moveInDate: payload.moveInDate,
        response: result,
      });
      return NextResponse.json(
        {
          error: "WSS did not return pricing details for this unit.",
          response: result,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error calculating WSS move-in cost", error);
    const message =
      error instanceof Error ? error.message : "Failed to calculate move-in cost";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function validatePayload(payload: MoveInCostRequest) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request body";
  }

  if (!payload.unitId && !payload.unitID && !payload.rentableObjectId) {
    return "unitId is required";
  }

  if (!payload.moveInDate && !payload.expectedMoveInDate) {
    return "moveInDate is required";
  }

  if (!payload.taxExemptNumber) {
    // WSS requires this field; default to non-exempt marker.
    payload.taxExemptNumber = "0";
  }

  return null;
}
