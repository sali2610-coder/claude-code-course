"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Download, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlobShape, Sparkle, Star, CrayonUnderline } from "@/components/decorations";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

const collageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
      delay: 0.5,
      staggerChildren: 0.08,
      delayChildren: 0.7,
    },
  },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 130, damping: 12 },
  },
};

const COLLAGE_ITEMS = [
  { id: "pesach", rotate: -4, bg: "bg-secondary" },
  { id: "names", rotate: 3, bg: "bg-tertiary" },
  { id: "hanukkah", rotate: -2, bg: "bg-accent" },
  { id: "labels", rotate: 5, bg: "bg-primary" },
  { id: "reading", rotate: -3, bg: "bg-secondary" },
  { id: "signs", rotate: 4, bg: "bg-tertiary" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-[3px] border-foreground"
    >
      {/* atmospheric shapes */}
      <BlobShape className="pointer-events-none absolute -top-24 end-[-100px] -z-10 size-[460px] text-secondary/40" />
      <BlobShape className="pointer-events-none absolute -bottom-32 start-[-140px] -z-10 size-[420px] text-tertiary/35" />
      <Sparkle className="pointer-events-none absolute top-24 end-[12%] -z-10 size-12 text-primary/60 rotate-12" />
      <Sparkle className="pointer-events-none absolute bottom-32 end-[40%] -z-10 size-8 text-accent/70 -rotate-12" />
      <Star className="pointer-events-none absolute top-1/3 start-[8%] -z-10 size-10 text-primary/30 rotate-12" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-7"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border-toy bg-secondary px-4 py-1.5 text-sm font-bold shadow-toy-sm"
          >
            <Sparkles className="size-4" />
            בגאווה של גננת, בקליק של מקצוענית
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            <span className="relative inline-block">
              הכל לגן
              <CrayonUnderline className="text-primary" />
            </span>
            <br />
            <span className="relative inline-block bg-secondary px-3 py-0.5 -rotate-2 mt-2 border-toy shadow-toy">
              בקליק אחד.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-lg text-foreground/75 leading-relaxed"
          >
            ספרייה דיגיטלית של חומרי הוראה מעוצבים, מוכנים להדפסה, לחגים,
            לאוריינות ולעיצוב הגן. <span className="font-handwritten text-2xl text-primary">בחירה → תשלום → הורדה.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-2xl border-toy bg-primary px-7 text-base font-extrabold text-primary-foreground shadow-toy toy-press hover:bg-primary"
            >
              <a href="#gallery">
                <ShoppingBag className="size-5" />
                לחנות הקבצים
                <ArrowLeft className="size-5 transition-transform duration-200 group-hover:-translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-14 rounded-2xl border-toy bg-card px-7 text-base font-extrabold text-foreground shadow-toy-sm toy-press hover:bg-card"
            >
              <a href="#how">איך זה עובד?</a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full border-toy bg-tertiary shadow-toy-sm">
                <Download className="size-3.5" />
              </span>
              הורדה מיידית
            </div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full border-toy bg-accent text-accent-foreground shadow-toy-sm">
                <Star className="size-3.5 text-secondary" />
              </span>
              מעוצב באהבה לגננות
            </div>
          </motion.div>
        </motion.div>

        {/* collage card */}
        <motion.div
          variants={collageVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative aspect-[4/5] rounded-[2rem] border-toy-thick bg-card p-4 shadow-toy-xl"
          >
            {/* tape decoration */}
            <span className="absolute -top-3 start-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-4deg] border-2 border-foreground/40 bg-secondary/80" />
            <div className="grid h-full grid-cols-2 grid-rows-3 gap-3 overflow-hidden rounded-2xl">
              {COLLAGE_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cellVariants}
                  whileHover={{ scale: 1.06, rotate: item.rotate * 1.5 }}
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                  className={`relative overflow-hidden rounded-xl border-toy ${item.bg} shadow-toy-sm`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/products/${item.id}-cover.svg`}
                    alt=""
                    className="h-full w-full object-cover mix-blend-multiply"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* floating stickers */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -end-6 -top-8 z-20 grid size-20 place-items-center rounded-full border-toy bg-primary text-primary-foreground shadow-toy"
          >
            <span className="font-handwritten text-2xl font-bold leading-tight text-center">
              חדש!
              <br />
              ✦✦✦
            </span>
          </motion.div>

          <div className="absolute -start-4 bottom-8 z-20 -rotate-6 rounded-2xl border-toy bg-secondary px-4 py-2 font-handwritten text-xl font-bold shadow-toy-sm">
            8 חבילות מוכנות
          </div>
        </motion.div>
      </div>
    </section>
  );
}
