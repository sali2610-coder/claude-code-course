"use client";

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 text-xl font-extrabold"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-md shadow-primary/30">
            <Sparkles className="size-5" />
          </span>
          <span className="text-brand-gradient">{SITE.name}</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <Button
            asChild
            size="lg"
            className="bg-brand-gradient text-white shadow-md shadow-primary/30"
          >
            <a href="#newsletter">הצטרפי לקהילה</a>
          </Button>
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-lg border border-border md:hidden"
          aria-label="פתח תפריט"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button
              asChild
              size="lg"
              className="mt-2 bg-brand-gradient text-white"
            >
              <a href="#newsletter" onClick={() => setOpen(false)}>
                הצטרפי לקהילה
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
