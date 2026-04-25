import { Sparkles } from "lucide-react";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 font-bold text-foreground">
          <span className="grid size-7 place-items-center rounded-lg bg-brand-gradient text-white">
            <Sparkles className="size-4" />
          </span>
          {SITE.name}
        </div>
        <div>© {year} {SITE.name}. כל הזכויות שמורות.</div>
        <div>
          פיתוח:{" "}
          <a
            href="https://salihaleef.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary"
          >
            סאלי חליף · Web Coding
          </a>
        </div>
      </div>
    </footer>
  );
}
