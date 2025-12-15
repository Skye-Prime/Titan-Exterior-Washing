import { NextResponse } from "next/server";
import { getAvailableUnits } from "@/lib/wssClient";

export async function GET() {
  try {
    const locationId = process.env.WSS_ENTITY_ID;

    if (!locationId) {
      return NextResponse.json(
        { error: "WSS_ENTITY_ID is not configured" },
        { status: 500 }
      );
    }

    const units = await getAvailableUnits({ locationId });
    return NextResponse.json({ units });
  } catch (error) {
    console.error("Error fetching WSS units", error);
    return NextResponse.json(
      { error: "Failed to fetch units" },
      { status: 500 }
    );
  }
}
