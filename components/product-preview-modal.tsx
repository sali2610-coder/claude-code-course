"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

// drag distance/velocity above which we commit to changing image; lower
// thresholds feel responsive, higher ones reduce accidental swipes.
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

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
  const [direction, setDirection] = useState(0);
  const images = [product.coverImage, ...product.previewImages];

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setIdx(0);
      setDirection(0);
    }
    onOpenChange(nextOpen);
  }

  function go(delta: number) {
    setDirection(delta);
    setIdx((i) => (i + delta + images.length) % images.length);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-3xl overflow-hidden overflow-y-auto rounded-2xl border-toy-thick bg-card p-0 shadow-toy-lg sm:rounded-3xl sm:shadow-toy-xl">
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div className="relative aspect-[5/4] touch-pan-y overflow-hidden border-b-[3px] border-foreground bg-muted sm:aspect-[4/3] md:aspect-auto md:border-b-0 md:border-e-[3px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {idx === 0 ? (
                <motion.img
                  key={`cover-${product.id}`}
                  layoutId={`product-cover-${product.id}`}
                  src={images[0]}
                  alt={`${product.name} — תמונה 1`}
                  drag={images.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (
                      info.offset.x < -SWIPE_DISTANCE ||
                      info.velocity.x < -SWIPE_VELOCITY
                    ) {
                      go(1);
                    } else if (
                      info.offset.x > SWIPE_DISTANCE ||
                      info.velocity.x > SWIPE_VELOCITY
                    ) {
                      go(-1);
                    }
                  }}
                  className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
                />
              ) : (
                <motion.img
                  key={`preview-${idx}`}
                  src={images[idx]}
                  alt={`${product.name} — תמונה ${idx + 1}`}
                  custom={direction}
                  initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.4 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0.4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    if (
                      info.offset.x < -SWIPE_DISTANCE ||
                      info.velocity.x < -SWIPE_VELOCITY
                    ) {
                      go(1);
                    } else if (
                      info.offset.x > SWIPE_DISTANCE ||
                      info.velocity.x > SWIPE_VELOCITY
                    ) {
                      go(-1);
                    }
                  }}
                  className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
                />
              )}
            </AnimatePresence>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="הקודם"
                  className="absolute start-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border-toy bg-card shadow-toy-sm toy-press sm:start-3 sm:size-10"
                >
                  <ChevronRight className="size-4 rtl:rotate-180 sm:size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="הבא"
                  className="absolute end-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border-toy bg-card shadow-toy-sm toy-press sm:end-3 sm:size-10"
                >
                  <ChevronLeft className="size-4 rtl:rotate-180 sm:size-5" />
                </button>
                <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDirection(i > idx ? 1 : -1);
                        setIdx(i);
                      }}
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

          <div className="flex flex-col gap-4 p-5 sm:gap-5 sm:p-6">
            <DialogHeader className="text-right">
              <DialogTitle className="font-display text-2xl sm:text-3xl">
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
