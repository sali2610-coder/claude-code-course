import { Star } from "@/components/decorations";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t-[3px] border-foreground bg-foreground py-8 text-background sm:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-stripes opacity-20" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 text-center text-sm sm:px-6 md:flex-row md:text-start">
        <div className="flex items-center gap-3 font-display text-xl">
          <span className="grid size-10 place-items-center rounded-xl border-2 border-background bg-primary">
            <Star className="size-5 text-secondary" />
          </span>
          {SITE.name}
        </div>
        <div className="text-xs font-bold opacity-90 sm:text-sm">© {year} {SITE.name}. כל הזכויות שמורות.</div>
        <div className="font-handwritten text-base sm:text-lg">
          <span className="opacity-80">פיתוח: </span>
          <a
            href="https://salihaleef.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary underline-offset-4 hover:underline"
          >
            סאלי חליף ✦
          </a>
        </div>
      </div>
    </footer>
  );
}
