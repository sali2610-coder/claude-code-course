import crypto from "crypto";

type CreateChargeInput = {
  productId: string;
  productName: string;
  amount: number;
  successUrl: string;
  cancelUrl: string;
  notifyUrl: string;
};

type GrowResponse = {
  status: number;
  data?: { url?: string };
  err?: string;
};

const GROW_API_URL =
  process.env.GROW_API_URL ||
  "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess";

export async function createGrowCharge(
  input: CreateChargeInput
): Promise<{ checkoutUrl: string }> {
  const pageCode = process.env.GROW_PAGE_CODE;
  const apiKey = process.env.GROW_API_KEY;
  const userId = process.env.GROW_USER_ID;

  if (!pageCode || !apiKey || !userId) {
    throw new Error("Grow credentials missing");
  }

  const body = {
    pageCode,
    userId,
    apiKey,
    sum: input.amount,
    description: input.productName,
    paymentType: "regular",
    successUrl: input.successUrl,
    cancelUrl: input.cancelUrl,
    notifyUrl: input.notifyUrl,
    cField1: input.productId,
  };

  const res = await fetch(GROW_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await res.json()) as GrowResponse;

  if (json.status !== 1 || !json.data?.url) {
    throw new Error(`Grow error: ${json.err || "unknown"}`);
  }

  return { checkoutUrl: json.data.url };
}

export function verifyGrowSignature(payload: string, signature: string | null) {
  const secret = process.env.GROW_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex")
    );
  } catch {
    return false;
  }
}
