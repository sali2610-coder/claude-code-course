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
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[4/3] bg-muted md:aspect-auto">
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
                  className="absolute start-3 top-1/2 grid -translate-y-1/2 place-items-center rounded-full bg-white/90 p-2 shadow-md backdrop-blur hover:bg-white"
                >
                  <ChevronRight className="size-5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  aria-label="הבא"
                  className="absolute end-3 top-1/2 grid -translate-y-1/2 place-items-center rounded-full bg-white/90 p-2 shadow-md backdrop-blur hover:bg-white"
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
                      className={`h-1.5 rounded-full transition-all ${
                        i === idx ? "w-6 bg-white" : "w-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5 p-6">
            <DialogHeader className="text-right">
              <DialogTitle className="text-2xl font-extrabold">
                {product.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                תצוגה מקדימה — הקובץ הסופי מגיע ללא סימן מים.
              </DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-foreground/80">
              {product.description}
            </p>

            <div className="mt-auto rounded-xl border border-border bg-muted/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">מחיר:</span>
                <span className="text-2xl font-extrabold text-primary">
                  ₪{product.price}
                </span>
              </div>
              <Button
                type="button"
                onClick={onBuy}
                disabled={buying}
                size="lg"
                className="w-full bg-brand-gradient text-white"
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
