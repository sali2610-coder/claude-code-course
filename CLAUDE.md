# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**גננת בקליק (Ganenet Be-Click)** — One-page storefront (Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, Framer Motion) selling digital pedagogical files for kindergarten teachers. Hebrew RTL only.

## Commands

| Purpose | Command |
|---|---|
| Dev server (Turbopack) | `npm run dev` |
| Production build | `npm run build` |
| Start built app | `npm run start` |
| Lint | `npm run lint` |
| Add a shadcn component | `npx shadcn@latest add <name>` |

No test suite is configured yet.

## Architecture

**Single page, single source of products.** [app/page.tsx](app/page.tsx) composes all sections; each section is a self-contained client/server component under [components/sections/](components/sections/). Product catalog lives in [lib/constants.ts](lib/constants.ts) as a typed array — no DB. Types in [types/product.ts](types/product.ts).

**Two orthogonal flows:**

1. **Lead capture (forms).** Newsletter + Contact forms submit to [app/api/lead/route.ts](app/api/lead/route.ts), which validates and forwards a normalized `FormPayload` to an external webhook (Make/Zapier) via [lib/webhook.ts](lib/webhook.ts). The shape (`{formType, email, ...}`) is defined in [types/product.ts](types/product.ts).

2. **Purchase flow (Grow/MeshulamPay).**
   - Client clicks "רכישה" → POST to [app/api/checkout/route.ts](app/api/checkout/route.ts) with `productId`.
   - Server looks up the product in `PRODUCTS` and calls `createGrowCharge` in [lib/grow.ts](lib/grow.ts), which hits Grow's `createPaymentProcess` endpoint and returns a hosted checkout URL.
   - Client is redirected to Grow; after payment, Grow calls [app/api/grow-webhook/route.ts](app/api/grow-webhook/route.ts) server-to-server. This route verifies the signature (HMAC-SHA256, timing-safe), then forwards a `purchase-lead` payload to the same Make/Zapier webhook with a download URL. Make is expected to email the customer.
   - Customer redirects to [app/success/page.tsx](app/success/page.tsx).
   - **If `GROW_API_KEY` is unset, `/api/checkout` falls back to a demo success URL** — useful for UI development without Grow credentials.

**RTL.** Root `<html>` has `lang="he" dir="rtl"`. shadcn was initialized with `--rtl`, so Radix primitives respect RTL. Use logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) instead of directional ones.

**Theming.** Pink/purple brand palette in [app/globals.css](app/globals.css) via `--primary` / `--secondary` OKLCH vars. Two project-specific utilities: `bg-brand-gradient` and `text-brand-gradient` (defined in the same file).

**Watermarks on previews.** Preview images in [public/products/](public/products/) are pre-rendered SVGs with the watermark baked in — never applied at runtime. Replace with real imagery by overwriting files of the same name.

## Environment variables

See [.env.example](.env.example) — copy to `.env.local` and fill in.

- `NEXT_PUBLIC_WEBHOOK_URL` — Make/Zapier endpoint for all form submissions. If empty in dev, [lib/webhook.ts](lib/webhook.ts) logs to console instead of sending (safe for local UI work).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — international format, no `+` (e.g. `972500000000`).
- `GROW_API_KEY`, `GROW_USER_ID`, `GROW_PAGE_CODE` — required to hit Grow live. Without them, checkout falls back to demo mode.
- `GROW_WEBHOOK_SECRET` — HMAC secret for verifying `/api/grow-webhook` POSTs. If set, unsigned/invalid requests get 401.

## Working directory

All operations must stay within `/Users/salihalif/Desktop/My-Projects/Claude-Code-Course`.
