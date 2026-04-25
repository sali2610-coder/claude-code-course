import { cn } from "@/lib/utils";

type Props = { className?: string };

export function Squiggle({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={cn("inline-block h-3 w-full", className)}
      aria-hidden
    >
      <path
        d="M 0 6 Q 12.5 0 25 6 T 50 6 T 75 6 T 100 6 T 125 6 T 150 6 T 175 6 T 200 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={cn("inline-block", className)} aria-hidden>
      <path
        d="M50 5 L62 35 L95 38 L70 60 L78 92 L50 75 L22 92 L30 60 L5 38 L38 35 Z"
        fill="currentColor"
        stroke="oklch(0.18 0.04 30)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlobShape({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={cn("inline-block", className)} aria-hidden>
      <path
        d="M163.7 51.6c12.2 18.7 17.6 41.5 9.7 60.1-7.9 18.6-29 33-50.6 39.3-21.6 6.3-43.7 4.5-62.3-6.3-18.6-10.8-33.7-31-37.3-53C19.6 69.5 27.4 45.3 44 30.7c16.6-14.6 41.9-19.6 64.1-13.4 22.2 6.2 43.4 23.6 55.6 34.3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Sparkle({ className }: Props) {
  return (
    <svg viewBox="0 0 60 60" className={cn("inline-block", className)} aria-hidden>
      <path
        d="M30 0 L34 26 L60 30 L34 34 L30 60 L26 34 L0 30 L26 26 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Tape({ className, rotate = -3 }: Props & { rotate?: number }) {
  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cn(
        "inline-block h-5 w-16 bg-secondary/80 border-2 border-foreground/30",
        className
      )}
      aria-hidden
    />
  );
}

export function CrayonUnderline({ className }: Props) {
  return (
    <svg
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className={cn("absolute -bottom-2 left-0 h-3 w-full", className)}
      aria-hidden
    >
      <path
        d="M 4 10 Q 50 2 100 8 T 196 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Confetti({ className }: Props) {
  const items = [
    { left: "8%", top: "15%", color: "var(--color-secondary)", rotate: 12, w: 14, h: 6 },
    { left: "20%", top: "70%", color: "var(--color-tertiary)", rotate: -22, w: 10, h: 10, rounded: true },
    { left: "35%", top: "30%", color: "var(--color-accent)", rotate: 45, w: 18, h: 4 },
    { left: "55%", top: "82%", color: "var(--color-primary)", rotate: -8, w: 12, h: 12 },
    { left: "70%", top: "12%", color: "var(--color-secondary)", rotate: 30, w: 8, h: 8, rounded: true },
    { left: "85%", top: "55%", color: "var(--color-tertiary)", rotate: -45, w: 16, h: 5 },
    { left: "92%", top: "25%", color: "var(--color-accent)", rotate: 18, w: 10, h: 10 },
    { left: "12%", top: "45%", color: "var(--color-primary)", rotate: -30, w: 6, h: 14 },
  ];
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: it.left,
            top: it.top,
            width: it.w,
            height: it.h,
            background: it.color,
            transform: `rotate(${it.rotate}deg)`,
            borderRadius: it.rounded ? "9999px" : "2px",
            border: "1.5px solid oklch(0.18 0.04 30)",
          }}
        />
      ))}
    </div>
  );
}
