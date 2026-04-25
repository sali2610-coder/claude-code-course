import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const heebo = Heebo({
  variable: "--font-sans",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "גננת בקליק — קבצים דיגיטליים לגננות",
  description:
    "חנות קבצים דיגיטליים לגננות — חומרי הוראה, עיצוב הגן, חגים ואוריינות. בחירה, תשלום והורדה מיידית.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "גננת בקליק",
    description:
      "חנות קבצים דיגיטליים מוכנים לגננות. חגים, אוריינות ועיצוב הגן — הכל בקליק.",
    type: "website",
    locale: "he_IL",
    siteName: "גננת בקליק",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
