import { NextResponse } from "next/server";
import { sendToWebhook } from "@/lib/webhook";
import type { FormPayload } from "@/types/product";

type LeadBody = Omit<FormPayload, "source" | "timestamp">;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadBody;

    if (!body.formType || !body.email) {
      return NextResponse.json(
        { error: "invalid payload" },
        { status: 400 }
      );
    }

    await sendToWebhook(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/lead]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
