"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductPreviewModal } from "@/components/product-preview-modal";
import type { Product } from "@/types/product";

type Props = { product: Product; index?: number };

// gentle tilt; kept small so rotated corners + chunky shadow stay inside the
// viewport on narrow mobile screens.
const TILT = [-1, 0.8, -1.3, 0.6, 1.2, -0.7, 1, -0.4];
const TAPE_COLORS = ["bg-secondary", "bg-tertiary", "bg-accent/70", "bg-primary/80"];
const TAPE_ROT = [-6, 4, -3, 7, -8, 2, -5, 5];

export function ProductCard({ product, index = 0 }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [buying, setBuying] = useState(false);

  const tilt = TILT[index % TILT.length];
  const tapeRot = TAPE_ROT[index % TAPE_ROT.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];

  async function handleBuy() {
    setBuying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const { checkoutUrl } = (await res.json()) as { checkoutUrl: string };
      window.location.href = checkoutUrl;
    } catch {
      toast.error("לא הצלחנו לפתוח את דף התשלום. נסי שוב בעוד רגע.");
      setBuying(false);
    }
  }

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 60, rotate: tilt - 4, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 14,
          delay: (index % 6) * 0.08,
        }}
        whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
        className="group relative flex flex-col rounded-2xl border-toy-thick bg-card p-3 shadow-toy"
      >
        {/* tape decoration */}
        <span
          style={{ transform: `rotate(${tapeRot}deg)` }}
          className={`absolute -top-3 start-1/2 z-10 h-6 w-20 -translate-x-1/2 border-2 border-foreground/40 ${tapeColor}`}
          aria-hidden
        />

        {/* image area */}
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          aria-label={`תצוגה מקדימה של ${product.name}`}
          className="relative block aspect-[4/3] overflow-hidden rounded-xl border-toy bg-muted transition-transform group-hover:rotate-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.coverImage}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center bg-foreground/0 p-3 opacity-0 transition-all group-hover:bg-foreground/15 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border-toy bg-card px-3 py-1.5 text-xs font-extrabold shadow-toy-sm">
              <Eye className="size-3.5" /> הצצה
            </span>
          </div>
        </button>

        <div className="flex flex-1 flex-col gap-3 p-3 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight sm:text-2xl">
              {product.name}
            </h3>
            <span className="shrink-0 -rotate-3 rounded-xl border-toy bg-secondary px-3 py-1 text-base font-extrabold shadow-toy-sm">
              ₪{product.price}
            </span>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-foreground/75">
            {product.description}
          </p>
          <div className="mt-auto flex gap-2 pt-2">
            <Button
              type="button"
              className="flex-1 rounded-xl border-toy bg-card font-bold text-foreground shadow-toy-sm toy-press hover:bg-card"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="size-4" /> הצצה
            </Button>
            <Button
              type="button"
              onClick={handleBuy}
              disabled={buying}
              className="flex-1 rounded-xl border-toy bg-primary font-bold text-primary-foreground shadow-toy-sm toy-press hover:bg-primary"
            >
              {buying ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ShoppingCart className="size-4" />
              )}
              {buying ? "רגע..." : "רכישה"}
            </Button>
          </div>
        </div>
      </motion.article>

      <ProductPreviewModal
        product={product}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        onBuy={handleBuy}
        buying={buying}
      />
    </>
  );
}
