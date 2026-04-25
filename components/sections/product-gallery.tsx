"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/constants";
import type { Category } from "@/types/product";
import { cn } from "@/lib/utils";

type Filter = Category | "all";

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
    <section id="gallery" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            החנות — <span className="text-brand-gradient">כל מה שצריך לגן</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            גללי, הציצי, סנני — ובחרי בדיוק את מה שאת צריכה.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const selected = active === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActive(cat.value as Filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                  selected
                    ? "border-transparent bg-brand-gradient text-white shadow-md shadow-primary/30"
                    : "border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            אין עדיין מוצרים בקטגוריה הזו — חזרי בקרוב.
          </p>
        )}
      </div>
    </section>
  );
}
