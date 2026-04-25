"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "@/components/decorations";
import { SITE } from "@/lib/constants";

const NAV = [
  { href: "#gallery", label: "החנות" },
  { href: "#how", label: "איך זה עובד" },
  { href: "#newsletter", label: "הרשמה" },
  { href: "#contact", label: "צרו קשר" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.15 }}
      className="sticky top-0 z-40 border-b-[3px] border-foreground bg-background/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-3 font-display text-2xl font-extrabold leading-none"
        >
          <span className="relative grid size-12 place-items-center rounded-2xl border-toy bg-primary text-primary-foreground shadow-toy-sm transition-transform group-hover:-rotate-6">
            <Star className="size-6 text-secondary" />
          </span>
          <span className="flex flex-col">
            <span>{SITE.name}</span>
            <span className="font-handwritten text-base text-primary leading-none -mt-0.5">
              ✦ kindergarten ✦
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-bold transition-all hover:-rotate-2 hover:bg-secondary hover:shadow-toy-sm"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            size="lg"
            className="ms-2 rounded-2xl border-toy bg-primary text-primary-foreground font-bold shadow-toy-sm toy-press hover:bg-primary"
          >
            <a href="#newsletter">הצטרפי לקהילה ✦</a>
          </Button>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-xl border-toy bg-secondary shadow-toy-sm md:hidden toy-press"
          aria-label="פתח תפריט"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t-[3px] border-foreground bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl border-toy bg-card px-4 py-3 text-base font-bold shadow-toy-sm"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-2 rounded-xl border-toy bg-primary text-primary-foreground font-bold shadow-toy-sm toy-press hover:bg-primary"
            >
              <a href="#newsletter" onClick={() => setOpen(false)}>
                הצטרפי לקהילה ✦
              </a>
            </Button>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
