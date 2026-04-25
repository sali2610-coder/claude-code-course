"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // back-most blobs drift slowest, foreground stickers drift fastest
  const blobTopY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobBottomY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const sparkleY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const collageY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const stickerY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden border-b-[3px] border-foreground"
    >
      {/* atmospheric shapes */}
      <motion.div style={{ y: blobTopY }} className="pointer-events-none absolute inset-0 -z-10">
        <BlobShape className="absolute -top-24 end-[-120px] size-[300px] text-secondary/40 sm:size-[460px] sm:end-[-100px]" />
      </motion.div>
      <motion.div style={{ y: blobBottomY }} className="pointer-events-none absolute inset-0 -z-10">
        <BlobShape className="absolute -bottom-32 start-[-160px] size-[280px] text-tertiary/35 sm:size-[420px] sm:start-[-140px]" />
      </motion.div>
      <motion.div style={{ y: sparkleY }} className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <Sparkle className="absolute top-24 end-[12%] size-12 rotate-12 text-primary/60" />
        <Sparkle className="absolute bottom-32 end-[40%] size-8 -rotate-12 text-accent/70" />
        <Star className="absolute top-1/3 start-[8%] size-10 rotate-12 text-primary/30" />
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
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
            className="font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="relative inline-block">
              הכל לגן
              <CrayonUnderline className="text-primary" />
            </span>
            <br />
            <span className="relative inline-block bg-secondary px-3 py-0.5 -rotate-2 mt-2 border-toy shadow-toy-sm sm:shadow-toy">
              בקליק אחד.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            ספרייה דיגיטלית של חומרי הוראה מעוצבים, מוכנים להדפסה, לחגים,
            לאוריינות ולעיצוב הגן. <span className="font-handwritten text-xl text-primary sm:text-2xl">בחירה → תשלום → הורדה.</span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex w-full flex-wrap gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="group h-12 flex-1 rounded-2xl border-toy bg-primary px-5 text-sm font-extrabold text-primary-foreground shadow-toy-sm toy-press hover:bg-primary sm:h-14 sm:flex-none sm:px-7 sm:text-base sm:shadow-toy"
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
              className="h-12 flex-1 rounded-2xl border-toy bg-card px-5 text-sm font-extrabold text-foreground shadow-toy-sm toy-press hover:bg-card sm:h-14 sm:flex-none sm:px-7 sm:text-base"
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
          style={{ y: collageY }}
          className="relative mx-auto w-full max-w-[280px] sm:max-w-md"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative aspect-[4/5] rounded-[1.5rem] border-toy-thick bg-card p-3 shadow-toy-lg sm:rounded-[2rem] sm:p-4 sm:shadow-toy-xl"
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
            style={{ y: stickerY }}
            className="absolute -end-3 -top-4 z-20 grid size-14 place-items-center rounded-full border-toy bg-primary text-primary-foreground shadow-toy-sm sm:-end-6 sm:-top-8 sm:size-20 sm:shadow-toy"
          >
            <span className="font-handwritten text-base font-bold leading-tight text-center sm:text-2xl">
              חדש!
              <br />
              ✦✦✦
            </span>
          </motion.div>

          <motion.div
            style={{ y: badgeY }}
            className="absolute -start-2 bottom-6 z-20 -rotate-6 rounded-xl border-toy bg-secondary px-3 py-1.5 font-handwritten text-base font-bold shadow-toy-sm sm:-start-4 sm:bottom-8 sm:rounded-2xl sm:px-4 sm:py-2 sm:text-xl"
          >
            8 חבילות מוכנות
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
