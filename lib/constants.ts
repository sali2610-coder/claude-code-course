import type { CategoryOption, Product } from "@/types/product";

export const SITE = {
  name: "גננת בקליק",
  tagline: "הכל לגן — בקליק אחד",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972500000000",
  webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL || "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const CATEGORIES: CategoryOption[] = [
  { value: "all", label: "הכל" },
  { value: "holidays", label: "חגים" },
  { value: "literacy", label: "אוריינות" },
  { value: "design", label: "עיצוב הגן" },
];

export const PRODUCTS: Product[] = [
  {
    id: "pesach-kit-01",
    name: "ערכת פסח יצירתית",
    description:
      "ערכה מלאה לחג הפסח — דפי צביעה, משחק התאמה, סיפור מונגש ולוח פעילויות.",
    price: 39,
    category: "holidays",
    coverImage: "/products/pesach-cover.svg",
    previewImages: [
      "/products/pesach-1.svg",
      "/products/pesach-2.svg",
      "/products/pesach-3.svg",
    ],
  },
  {
    id: "hanukkah-pack-01",
    name: "חבילת חנוכה מיוחדת",
    description:
      "דפי עבודה, כרטיסיות ברכה, שבלונות לחנוכייה ומשחקי זיכרון — הכל מוכן להדפסה.",
    price: 35,
    category: "holidays",
    coverImage: "/products/hanukkah-cover.svg",
    previewImages: [
      "/products/hanukkah-1.svg",
      "/products/hanukkah-2.svg",
      "/products/hanukkah-3.svg",
    ],
  },
  {
    id: "rosh-hashana-01",
    name: "ראש השנה — יצירות ועיצוב",
    description:
      "עיצובי כרטיסי ברכה, דפי צביעה של סמלי החג ומערך פעילות קבוצתית.",
    price: 29,
    category: "holidays",
    coverImage: "/products/rh-cover.svg",
    previewImages: [
      "/products/rh-1.svg",
      "/products/rh-2.svg",
      "/products/rh-3.svg",
    ],
  },
  {
    id: "names-cards-01",
    name: "כרטיסיות שמות לגן",
    description:
      "עיצוב מודרני וצבעוני — כרטיסיות שמות להדפסה לכל ילד/ה בגן, כולל פונטים ידידותיים.",
    price: 25,
    category: "literacy",
    coverImage: "/products/names-cover.svg",
    previewImages: [
      "/products/names-1.svg",
      "/products/names-2.svg",
      "/products/names-3.svg",
    ],
  },
  {
    id: "reading-kit-01",
    name: "ערכת קריאה ראשונית",
    description:
      "דפי תרגול אותיות, כרטיסיות הברות, משחקי זיהוי מילים — מותאם לגילאי טרום חובה וחובה.",
    price: 45,
    category: "literacy",
    coverImage: "/products/reading-cover.svg",
    previewImages: [
      "/products/reading-1.svg",
      "/products/reading-2.svg",
      "/products/reading-3.svg",
    ],
  },
  {
    id: "labels-design-01",
    name: "תוויות פינות הגן",
    description:
      "סט תוויות מעוצבות לכל פינות הגן — פינת הבובות, פינת הקוביות, ספרייה, יצירה ועוד.",
    price: 32,
    category: "design",
    coverImage: "/products/labels-cover.svg",
    previewImages: [
      "/products/labels-1.svg",
      "/products/labels-2.svg",
      "/products/labels-3.svg",
    ],
  },
  {
    id: "signs-pack-01",
    name: "שלטי כללי הגן",
    description:
      "חבילת שלטים מוכנים להדפסה — כללי התנהגות, שגרת בוקר, נהלי שטיפת ידיים ועוד.",
    price: 28,
    category: "design",
    coverImage: "/products/signs-cover.svg",
    previewImages: [
      "/products/signs-1.svg",
      "/products/signs-2.svg",
      "/products/signs-3.svg",
    ],
  },
  {
    id: "birthday-kit-01",
    name: "ערכת יום הולדת בגן",
    description:
      "כתר יום הולדת להדפסה, כרטיסי ברכה, לוח חודשי ימי ההולדת של הגן ועיצוב פינה מיוחדת.",
    price: 30,
    category: "design",
    coverImage: "/products/birthday-cover.svg",
    previewImages: [
      "/products/birthday-1.svg",
      "/products/birthday-2.svg",
      "/products/birthday-3.svg",
    ],
  },
];
