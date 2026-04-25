"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductPreviewModal } from "@/components/product-preview-modal";
import type { Product } from "@/types/product";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [buying, setBuying] = useState(false);

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
      >
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          aria-label={`תצוגה מקדימה של ${product.name}`}
          className="relative block aspect-[4/3] overflow-hidden bg-muted"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.coverImage}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/30 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary">
              <Eye className="size-3.5" /> תצוגה מקדימה
            </span>
          </div>
        </button>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
            <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
              ₪{product.price}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {product.description}
          </p>
          <div className="mt-auto flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setPreviewOpen(true)}
            >
              <Eye className="size-4" /> הצצה
            </Button>
            <Button
              type="button"
              onClick={handleBuy}
              disabled={buying}
              className="flex-1 bg-brand-gradient text-white"
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
