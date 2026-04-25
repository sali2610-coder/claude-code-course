import { NextResponse } from "next/server";
import { createGrowCharge } from "@/lib/grow";
import { PRODUCTS, SITE } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { productId } = (await req.json()) as { productId: string };
    const product = PRODUCTS.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }

    if (!process.env.GROW_API_KEY) {
      return NextResponse.json(
        {
          checkoutUrl: `${SITE.siteUrl}/success?productId=${product.id}&demo=1`,
        },
        { status: 200 }
      );
    }

    const { checkoutUrl } = await createGrowCharge({
      productId: product.id,
      productName: product.name,
      amount: product.price,
      successUrl: `${SITE.siteUrl}/success?productId=${product.id}`,
      cancelUrl: `${SITE.siteUrl}/#gallery`,
      notifyUrl: `${SITE.siteUrl}/api/grow-webhook`,
    });

    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("[api/checkout]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
