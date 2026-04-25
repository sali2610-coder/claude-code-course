"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border/60"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 end-[-80px] size-[500px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 start-[-120px] size-[500px] rounded-full bg-secondary/25 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Heart className="size-3.5" /> בגאווה של גננת, בקליק של מקצוענית
          </span>
          <h1 className="text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            הכל לגן —{" "}
            <span className="text-brand-gradient">בקליק אחד.</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            ספרייה דיגיטלית של חומרי הוראה מעוצבים, מוכנים להדפסה, לחגים,
            לאוריינות ולעיצוב הגן. בחירה → תשלום → הורדה מיידית.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-brand-gradient px-6 text-base text-white shadow-lg shadow-primary/30"
            >
              <a href="#gallery">
                <ShoppingBag className="size-5" />
                לחנות הקבצים
                <ArrowLeft className="size-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <a href="#how">איך זה עובד?</a>
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Download className="size-4 text-primary" /> הורדה מיידית
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <Heart className="size-4 text-primary" /> מעוצב באהבה לגננות
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] rounded-3xl bg-brand-gradient p-1 shadow-2xl shadow-primary/40">
            <div className="grid h-full grid-cols-2 grid-rows-3 gap-2 overflow-hidden rounded-[calc(1.5rem-4px)] bg-white/95 p-3">
              {["pesach", "names", "hanukkah", "labels", "reading", "signs"].map(
                (id, i) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="overflow-hidden rounded-xl shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/products/${id}-cover.svg`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
