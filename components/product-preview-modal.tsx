"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, ShoppingCart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBuy: () => void;
  buying: boolean;
};

export function ProductPreviewModal({
  product,
  open,
  onOpenChange,
  onBuy,
  buying,
}: Props) {
  const [idx, setIdx] = useState(0);
  const images = [product.coverImage, ...product.previewImages];

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) setIdx(0);
    onOpenChange(nextOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-3xl border-toy-thick bg-card p-0 shadow-toy-xl">
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/3] border-b-[3px] border-foreground bg-muted md:aspect-auto md:border-b-0 md:border-e-[3px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[idx]}
              alt={`${product.name} — תמונה ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setIdx((i) => (i - 1 + images.length) % images.length)
                  }
                  aria-label="הקודם"
                  className="absolute start-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border-toy bg-card shadow-toy-sm toy-press"
                >
                  <ChevronRight className="size-5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  aria-label="הבא"
                  className="absolute end-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border-toy bg-card shadow-toy-sm toy-press"
                >
                  <ChevronLeft className="size-5 rtl:rotate-180" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={`תמונה ${i + 1}`}
                      className={`h-2.5 rounded-full border-2 border-foreground transition-all ${
                        i === idx ? "w-7 bg-primary" : "w-2.5 bg-card"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 p-6">
            <DialogHeader className="text-right">
              <DialogTitle className="font-display text-3xl">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-foreground/70">
                <span className="font-handwritten text-lg text-primary">
                  הקובץ הסופי מגיע ללא סימן מים ✦
                </span>
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-foreground/85">
              {product.description}
            </p>

            <div className="mt-auto rounded-2xl border-toy bg-muted p-4 shadow-toy-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-foreground/70">מחיר:</span>
                <span className="-rotate-2 rounded-xl border-toy bg-secondary px-3 py-1 font-display text-2xl shadow-toy-sm">
                  ₪{product.price}
                </span>
              </div>
              <Button
                type="button"
                onClick={onBuy}
                disabled={buying}
                size="lg"
                className="w-full rounded-xl border-toy bg-primary font-bold text-primary-foreground shadow-toy toy-press hover:bg-primary"
              >
                {buying ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <ShoppingCart className="size-5" />
                )}
                {buying ? "מעבירה לתשלום..." : "לרכישה מאובטחת"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
