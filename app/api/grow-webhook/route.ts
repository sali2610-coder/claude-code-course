import { NextResponse } from "next/server";
import { verifyGrowSignature } from "@/lib/grow";
import { sendToWebhook } from "@/lib/webhook";
import { PRODUCTS, SITE } from "@/lib/constants";

type GrowNotify = {
  status?: string;
  asmachta?: string;
  cField1?: string;
  email?: string;
  sum?: number;
};

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-grow-signature");

  if (process.env.GROW_WEBHOOK_SECRET && !verifyGrowSignature(raw, signature)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let body: GrowNotify;
  try {
    body = JSON.parse(raw) as GrowNotify;
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  if (body.status !== "1" && body.status !== "success") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const product = PRODUCTS.find((p) => p.id === body.cField1);
  const downloadUrl = product?.fileUrl
    ? `${SITE.siteUrl}${product.fileUrl}`
    : `${SITE.siteUrl}/files/${body.cField1}.zip`;

  try {
    await sendToWebhook({
      formType: "purchase-lead",
      email: body.email || "",
      productId: body.cField1,
      message: `תשלום בוצע. אסמכתא: ${body.asmachta}. קישור הורדה: ${downloadUrl}`,
    });
  } catch (err) {
    console.error("[grow-webhook] forward failed", err);
  }

  return NextResponse.json({ ok: true });
}
