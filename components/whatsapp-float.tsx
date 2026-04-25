"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function WhatsAppFloat() {
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "היי! יש לי שאלה על גננת בקליק"
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="צרי איתנו קשר בוואטסאפ"
      className="fixed bottom-6 left-6 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-500/40 transition-transform hover:scale-110"
    >
      <MessageCircle className="size-7" />
      <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-green-400/50" />
    </a>
  );
}
