import type { FormPayload } from "@/types/product";
import { SITE } from "@/lib/constants";

type Input = Omit<FormPayload, "source" | "timestamp">;

export async function sendToWebhook(input: Input): Promise<void> {
  const payload: FormPayload = {
    ...input,
    source: "ganenet-beclick",
    timestamp: new Date().toISOString(),
  };

  if (!SITE.webhookUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[webhook:dev] skipping — no NEXT_PUBLIC_WEBHOOK_URL set", payload);
      return;
    }
    throw new Error("Webhook URL not configured");
  }

  const res = await fetch(SITE.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Webhook failed: ${res.status}`);
  }
}
