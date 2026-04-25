"use client";

import { motion } from "framer-motion";
import { Download, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "בחרי קובץ",
    description:
      "גללי בחנות, הציצי בתצוגה המקדימה וודאי שהקובץ מדויק עבור הגן שלך.",
  },
  {
    icon: ShieldCheck,
    title: "תשלום מאובטח",
    description:
      "סליקה מאובטחת באשראי דרך מערכת Grow/MeshulamPay — קצר, בטוח וללא רישום.",
  },
  {
    icon: Download,
    title: "הורדה מיידית",
    description:
      "מיד לאחר התשלום תקבלי למייל קישור להורדת הקובץ — מוכן להדפסה.",
  },
  {
    icon: Sparkles,
    title: "נהני עם הילדים",
    description: "הדפיסי, גזרי, והביאי קסם לגן — במינימום מאמץ, במקסימום חיוך.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            איך זה <span className="text-brand-gradient">עובד?</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            פשוט, מהיר וללא כאב ראש — כדי שתוכלי להתמקד בילדים.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="absolute -top-6 start-1/2 -translate-x-1/2 rtl:translate-x-1/2">
                <div className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-primary/30">
                  <step.icon className="size-6" />
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2 text-xs font-bold text-primary">
                  שלב {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
