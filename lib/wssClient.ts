const DEFAULT_BASE_URL = "https://api.webselfstorage.com/v3";

type FetchMethod = "GET" | "POST";

export type WssUnit = {
  id: string;
  // WSS "unitID" (size code) when returned in responses.
  unitId?: string;
  // WSS rentableObjectId when returned from move-in availability.
  rentableObjectId?: string;
  unitNumber?: string;
  name?: string;
  size?: string;
  type?: string;
  access?: string;
  isInside?: boolean;
  isClimate?: boolean;
  rate?: number;
  currency?: string;
  available?: boolean;
  availableCount?: number;
  description?: string;
  climate?: string | boolean;
  doors?: string;
  floor?: string;
  elevation?: string;
  sizeDescriptions?: string[];
  imageUrl?: string;
  orderGrouping?: string;
};

type WssLocationResponse = {
  success?: boolean;
  location?: {
    units?: unknown[];
  };
};

type WssLocationUnit = {
  unitId?: string;
  rentableObjectId?: string;
  unitSize?: string;
  length?: number;
  width?: number;
  height?: number;
  monthly?: number;
  vacantUnits?: number;
  bonusComments?: string;
  sizeDescriptionsField?: string[];
  accessType?: string;
  isInside?: boolean;
  isClimate?: boolean;
  unitFeature?: {
    access?: string;
    climate?: string;
    doors?: string;
    elevation?: string;
    floor?: string;
    product?: string;
  };
  unitTypeImage?: {
    imageExists?: boolean;
    mainImage?: string;
    thumbImage?: string;
  };
};

type WssMoveInResponse = {
  success?: boolean;
  availableUnits?: {
    rentableObjectId?: string;
    unitSize?: string;
    length?: number;
    width?: number;
    height?: number;
    monthly?: number;
    bonusComments?: string;
    sizeDescriptionsField?: string[];
    vacantUnits?: number;
    orderGrouping?: string;
    units?: { unitId?: string; unitNumber?: string }[];
  }[];
};

type WssImagesResponse = {
  success?: boolean;
  imageLinks?: string[];
};

export type ReservationPayload = {
  unitId: string;
  unitID?: string;
  rentableObjectId?: string;
  moveInDate: string;
  expectedMoveInDate?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  notes?: string;
  promoCode?: string;
  [key: string]: unknown;
};

export type MoveInCostRequest = {
  unitId: string;
  unitID?: string;
  rentableObjectId?: string;
  insuranceId?: string;
  taxExemptNumber?: string;
  moveInDate: string;
  expectedMoveInDate?: string;
  promoCode?: string;
};

export type MoveInCostResponse = {
  success?: boolean;
  total?: number;
  totalDue?: number;
  subtotal?: number;
  totalCost?: number;
  totalTax?: number;
  lineItems?: { description?: string; amount?: number }[];
  costBreakDown?: {
    discountedRent?: number;
    discountedTaxAmount?: number;
    fees?: number;
    feesTax?: number;
    insurance?: number;
    insuranceTax?: number;
    moveInDeposit?: number;
    moveInDepositTax?: number;
    rent?: number;
    rentTax?: number;
    reservationDepositCredit?: number;
    retail?: number;
    retailTax?: number;
  };
  [key: string]: unknown;
};

export type MoveInPayload = MoveInCostRequest & {
  customer: ReservationPayload["customer"];
  payment: {
    nameOnCard: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    postalCode?: string;
  };
  autoPay?: boolean;
  notes?: string;
  [key: string]: unknown;
};

function getClientConfig() {
  const baseURL = process.env.WSS_API_BASE_URL || DEFAULT_BASE_URL;
  const apiKey = process.env.WSS_API_KEY;

  if (!apiKey) {
    throw new Error("WSS_API_KEY is not configured");
  }

  return { baseURL, apiKey };
}

async function request<T>(
  path: string,
  method: FetchMethod,
  body?: unknown,
  searchParams?: Record<string, string>
): Promise<T> {
  const { baseURL, apiKey } = getClientConfig();
  const normalizedBase = `${baseURL.replace(/\/$/, "")}/`;
  const normalizedPath = path.replace(/^\//, "");
  const url = new URL(normalizedPath, normalizedBase);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // WSS expects Bearer token in Authorization.
      Authorization: `Bearer ${apiKey}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const responseText = await response.text();

  if (!response.ok) {
    const errorMessage = buildErrorMessage(response, responseText, url.toString());
    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(responseText) as T;
  } catch {
    throw new Error(
      `WSS response was not valid JSON (status ${response.status}): ${responseText}`
    );
  }
}

export async function getAvailableUnits(params: { locationId: string }) {
  const locationPromise = request<WssLocationResponse>(
    `/location/${encodeURIComponent(params.locationId)}`,
    "GET"
  );
  const moveInPromise = request<WssMoveInResponse>(
    `/movein/${encodeURIComponent(params.locationId)}`,
    "GET"
  );
  const imagesPromise = request<WssImagesResponse>(
    `/location/${encodeURIComponent(params.locationId)}/images`,
    "GET"
  );

  const [location, moveIn, images] = await Promise.allSettled([
    locationPromise,
    moveInPromise,
    imagesPromise,
  ]);

  const locationUnits =
    location.status === "fulfilled"
      ? normalizeLocationUnits(location.value?.location?.units || [])
      : [];

  const moveInUnits =
    moveIn.status === "fulfilled"
      ? normalizeMoveInUnits(moveIn.value?.availableUnits || [])
      : [];

  const imageLinks =
    images.status === "fulfilled" ? images.value?.imageLinks || [] : [];

  if (locationUnits.length === 0 && moveInUnits.length === 0) {
    throw new Error("No units returned from WSS");
  }

  return mergeUnits(moveInUnits, locationUnits, imageLinks);
}

export async function createReservation(params: { locationId: string; payload: ReservationPayload }) {
  const payload = normalizeReservationPayload(params.payload);

  // WSS API: POST /v3/reservation/{entity}
  return request<unknown>(
    `/reservation/${encodeURIComponent(params.locationId)}`,
    "POST",
    payload
  );
}

export async function getMoveInCost(params: { locationId: string; payload: MoveInCostRequest }) {
  const payload = normalizeMoveInPayload(params.payload);

  return request<MoveInCostResponse>(
    `/movein/${encodeURIComponent(params.locationId)}/cost`,
    "GET",
    undefined,
    {
      unitId: payload.unitId,
      unitID: payload.unitID,
      rentableObjectId: payload.rentableObjectId,
      insuranceId: payload.insuranceId,
      taxExemptNumber: payload.taxExemptNumber,
      moveInDate: payload.expectedMoveInDate || payload.moveInDate,
      expectedMoveInDate: payload.expectedMoveInDate || payload.moveInDate,
      promoCode: payload.promoCode,
    }
  );
}

export async function createMoveIn(params: { locationId: string; payload: MoveInPayload }) {
  const payload = normalizeMoveInPayload(params.payload);

  // WSS API: POST /v3/movein/{entity}
  return request<unknown>(
    `/movein/${encodeURIComponent(params.locationId)}`,
    "POST",
    payload
  );
}

function normalizeReservationPayload(payload: ReservationPayload) {
  const normalized = normalizeUnitAndDate(payload);

  return {
    ...payload,
    ...normalized,
  };
}

function normalizeMoveInPayload<T extends MoveInCostRequest | MoveInPayload>(payload: T) {
  const normalized = normalizeUnitAndDate(payload);
  return {
    ...payload,
    ...normalized,
    taxExemptNumber:
      payload.taxExemptNumber ||
      ("taxExemptNumber" in payload && payload.taxExemptNumber === "" ? "0" : "0"),
  };
}

function normalizeUnitAndDate(
  payload:
    | ReservationPayload
    | MoveInCostRequest
    | MoveInPayload
    | {
      unitId?: string;
      unitID?: string;
      rentableObjectId?: string;
      moveInDate?: string;
      expectedMoveInDate?: string;
    }
) {
  const unitId = payload.unitID || payload.unitId || payload.rentableObjectId;
  const moveInDate = payload.expectedMoveInDate || payload.moveInDate;

  return {
    unitId,
    unitID: unitId,
    rentableObjectId: "rentableObjectId" in payload
      ? payload.rentableObjectId ?? unitId
      : unitId,
    moveInDate: moveInDate || payload.moveInDate,
    expectedMoveInDate: moveInDate || payload.expectedMoveInDate,
  };
}

function normalizeMoveInUnits(data: unknown[]): WssUnit[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((raw) => {
      const unit = raw as WssMoveInResponse["availableUnits"][number];
      const rate = unit?.monthly;
      const rentableObjectId = unit?.rentableObjectId
        ? String(unit.rentableObjectId)
        : undefined;
      const unitId = unit?.units?.[0]?.unitId
        ? String(unit.units[0].unitId)
        : rentableObjectId;
      const id =
        unitId ||
        rentableObjectId ||
        (unit?.units?.[0]?.unitNumber ? String(unit.units[0].unitNumber) : undefined);
      const size =
        unit?.unitSize ||
        deriveSizeFromDimensions(unit?.length, unit?.width) ||
        undefined;

      if (!id) return null;

      return {
        id: String(id),
        unitId,
        rentableObjectId,
        unitNumber: unit?.units?.[0]?.unitNumber,
        size,
        rate: typeof rate === "number" ? rate : undefined,
        description: unit?.bonusComments,
        available: (unit?.vacantUnits ?? 0) > 0,
        availableCount: unit?.vacantUnits,
        sizeDescriptions: unit?.sizeDescriptionsField || [],
        orderGrouping: unit?.orderGrouping,
      };
    })
    .filter((unit): unit is WssUnit => Boolean(unit));
}

function normalizeLocationUnits(data: unknown[]): WssUnit[] {
  if (!Array.isArray(data)) return [];

  return data
    .map((raw) => {
      const unit = raw as WssLocationUnit;
      const rate = unit?.monthly;
      const unitId = unit?.unitId ? String(unit.unitId) : undefined;
      const rentableObjectId = unit?.rentableObjectId
        ? String(unit.rentableObjectId)
        : undefined;
      const id = unitId || rentableObjectId;
      const size =
        unit?.unitSize ||
        deriveSizeFromDimensions(unit?.length, unit?.width) ||
        undefined;
      const imageUrl =
        unit?.unitTypeImage?.mainImage ||
        unit?.unitTypeImage?.thumbImage ||
        undefined;
      const access =
        unit?.unitFeature?.access ||
        unit?.accessType ||
        (unit as Record<string, unknown>).access ||
        undefined;
      const isClimate =
        typeof unit?.isClimate === "boolean"
          ? unit.isClimate
          : typeof (unit as Record<string, unknown>).is_climate === "boolean"
            ? (unit as Record<string, boolean>).is_climate
            : undefined;

      if (!id) return null;

      return {
        id: String(id),
        unitId,
        rentableObjectId,
        size,
        rate: typeof rate === "number" ? rate : undefined,
        available: (unit?.vacantUnits ?? 0) > 0,
        availableCount: unit?.vacantUnits,
        description: unit?.bonusComments,
        type: unit?.unitFeature?.product,
        access,
        isInside: unit?.isInside,
        isClimate,
        climate: unit?.unitFeature?.climate ?? isClimate,
        doors: unit?.unitFeature?.doors,
        floor: unit?.unitFeature?.floor,
        elevation: unit?.unitFeature?.elevation,
        sizeDescriptions: unit?.sizeDescriptionsField || [],
        imageUrl,
        orderGrouping: unit?.orderGrouping,
      };
    })
    .filter((unit): unit is WssUnit => Boolean(unit));
}

function mergeUnits(moveIn: WssUnit[], location: WssUnit[], fallbackImages: string[]) {
  const byId = new Map<string, WssUnit>();

  // Seed with move-in (availability/rate is most current).
  for (const unit of moveIn) {
    byId.set(unit.id, unit);
  }

  // Merge location details in.
  for (const detail of location) {
    const existing = byId.get(detail.id);
    if (existing) {
      byId.set(detail.id, {
        ...detail,
        ...existing, // keep availability/rate from move-in if present
        unitId: existing.unitId || detail.unitId,
        rentableObjectId: existing.rentableObjectId || detail.rentableObjectId,
        rate: existing.rate ?? detail.rate,
        available: existing.available ?? detail.available,
        availableCount: existing.availableCount ?? detail.availableCount,
        description: existing.description || detail.description,
        size: existing.size || detail.size,
        type: existing.type || detail.type,
        sizeDescriptions:
          existing.sizeDescriptions?.length
            ? existing.sizeDescriptions
            : detail.sizeDescriptions,
      });
    } else {
      byId.set(detail.id, detail);
    }
  }

  const defaultImage = fallbackImages?.[0];

  return Array.from(byId.values()).map((unit) =>
    unit.imageUrl ? unit : { ...unit, imageUrl: unit.imageUrl || defaultImage }
  );
}

function deriveSizeFromDimensions(length?: number, width?: number) {
  if (!length || !width) return undefined;
  return `${Number(length)}' x ${Number(width)}'`;
}

async function safeParseJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function buildErrorMessage(response: Response, responseText: string, url?: string) {
  // Try to pull message out of JSON body first.
  try {
    const parsed = JSON.parse(responseText) as { message?: string; error?: string };
    if (parsed.message) return parsed.message;
    if (parsed.error) return parsed.error;
  } catch {
    // fall through to raw text
  }

  const snippet = responseText?.slice(0, 300);
  const base = snippet
    ? `WSS request failed with status ${response.status}: ${snippet}`
    : `WSS request failed with status ${response.status}`;

  return url ? `${base} (url: ${url})` : base;
}
