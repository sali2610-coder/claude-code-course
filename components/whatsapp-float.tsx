"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export function WhatsAppFloat() {
  const href = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "היי! יש לי שאלה על גננת בקליק"
  )}`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="צרי איתנו קשר בוואטסאפ"
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{
        scale: { type: "spring", stiffness: 220, damping: 11, delay: 1.4 },
        rotate: { type: "spring", stiffness: 220, damping: 11, delay: 1.4 },
        opacity: { duration: 0.4, delay: 1.4 },
        y: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2 },
      }}
      whileHover={{
        scale: 1.15,
        rotate: 12,
        transition: { type: "spring", stiffness: 300, damping: 10 },
      }}
      whileTap={{ scale: 0.9, rotate: -8 }}
      style={{
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0))",
      }}
      className="fixed left-4 z-50 grid size-14 place-items-center rounded-2xl border-toy bg-tertiary shadow-toy sm:left-6 sm:size-16 sm:shadow-toy-lg"
    >
      <MessageCircle className="size-6 sm:size-7" strokeWidth={2.5} />
      <span className="pointer-events-none absolute -end-2 -top-2 grid size-5 place-items-center rounded-full border-2 border-foreground bg-primary text-[10px] font-extrabold text-primary-foreground sm:size-6">
        ✦
      </span>
    </motion.a>
  );
}
