"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { CrayonUnderline } from "@/components/decorations";
import { CATEGORIES, PRODUCTS } from "@/lib/constants";
import type { Category } from "@/types/product";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

const PILL_COLORS: Record<string, string> = {
  all: "bg-card",
  holidays: "bg-primary text-primary-foreground",
  literacy: "bg-secondary",
  design: "bg-tertiary",
};

export function ProductGallery() {
  const [active, setActive] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active),
    [active]
  );

  return (
    <section
      id="gallery"
      className="relative border-y-[3px] border-foreground bg-muted py-16 sm:py-24"
    >
      {/* decorative dots layer */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span className="inline-block -rotate-2 rounded-full border-toy bg-accent px-4 py-1 text-xs font-bold text-accent-foreground shadow-toy-sm">
            ✦ החנות ✦
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
            כל מה שצריך{" "}
            <span className="relative inline-block">
              לגן
              <CrayonUnderline className="text-primary" />
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-foreground/70">
            <span className="font-handwritten text-2xl text-foreground">גללי, הציצי, סנני</span> —
            ובחרי בדיוק את מה שאת צריכה.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3"
        >
          {CATEGORIES.map((cat, i) => {
            const selected = active === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActive(cat.value as Filter)}
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
                className={cn(
                  "rounded-2xl border-toy px-4 py-2 text-xs font-extrabold transition-all toy-press sm:px-5 sm:py-2.5 sm:text-sm",
                  selected
                    ? `${PILL_COLORS[cat.value]} shadow-toy`
                    : "bg-card shadow-toy-sm hover:bg-secondary/40"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center font-handwritten text-2xl text-foreground/70">
            אופס — אין כאן מוצרים. חזרי בקרוב!
          </p>
        )}
      </div>
    </section>
  );
}
