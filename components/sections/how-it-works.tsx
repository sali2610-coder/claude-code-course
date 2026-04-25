"use client";

import { motion } from "framer-motion";
import { Download, MousePointerClick, ShieldCheck, Sparkles } from "lucide-react";
import { CrayonUnderline } from "@/components/decorations";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "בחרי קובץ",
    description: "גללי בחנות, הציצי בתצוגה המקדימה וודאי שהקובץ מדויק עבור הגן שלך.",
    bg: "bg-secondary",
    rotate: -2,
  },
  {
    icon: ShieldCheck,
    title: "תשלום מאובטח",
    description: "סליקה באשראי דרך מערכת מאובטחת — קצר, בטוח וללא רישום.",
    bg: "bg-primary text-primary-foreground",
    rotate: 1.5,
  },
  {
    icon: Download,
    title: "הורדה מיידית",
    description: "מיד לאחר התשלום תקבלי למייל קישור להורדת הקובץ — מוכן להדפסה.",
    bg: "bg-accent text-accent-foreground",
    rotate: -1.5,
  },
  {
    icon: Sparkles,
    title: "נהני עם הילדים",
    description: "הדפיסי, גזרי, והביאי קסם לגן — במינימום מאמץ, במקסימום חיוך.",
    bg: "bg-tertiary",
    rotate: 2,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden py-24">
      {/* stripes background accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-stripes opacity-30" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-stripes opacity-30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-block rotate-2 rounded-full border-toy bg-tertiary px-4 py-1 text-xs font-bold shadow-toy-sm">
            ✦ 4 צעדים ✦
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">
            איך זה{" "}
            <span className="relative inline-block">
              עובד?
              <CrayonUnderline className="text-accent" />
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-foreground/70">
            <span className="font-handwritten text-2xl text-foreground">פשוט, מהיר וללא כאב ראש.</span>
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 80, scale: 0.85, rotate: step.rotate - 6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: step.rotate }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
                mass: 1,
                delay: i * 0.12,
              }}
              whileHover={{
                rotate: 0,
                y: -8,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative rounded-2xl border-toy-thick bg-card p-6 pt-12 text-center shadow-toy"
            >
              {/* big numbered block */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 12,
                  delay: i * 0.12 + 0.2,
                }}
                className={`absolute -top-7 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 grid size-14 place-items-center rounded-2xl border-toy ${step.bg} shadow-toy-sm`}
              >
                <step.icon className="size-7" />
              </motion.div>

              {/* step number */}
              <div className="absolute end-4 top-4 font-handwritten text-3xl font-bold text-foreground/40">
                0{i + 1}
              </div>

              <h3 className="mb-3 font-display text-2xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/75">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
