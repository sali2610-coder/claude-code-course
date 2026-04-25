import { z } from "zod";

const hebrewName = z
  .string()
  .trim()
  .min(2, "השם קצר מדי")
  .max(60, "השם ארוך מדי");

const emailSchema = z.email("כתובת אימייל לא תקינה");

const phoneSchema = z
  .string()
  .trim()
  .regex(/^0\d{1,2}-?\d{7}$|^\+?972\d{8,9}$/, "מספר טלפון לא תקין");

export const newsletterSchema = z.object({
  email: emailSchema,
});

export const contactSchema = z.object({
  name: hebrewName,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  message: z.string().trim().min(5, "הודעה קצרה מדי").max(1000),
});

export const purchaseLeadSchema = z.object({
  email: emailSchema,
  productId: z.string(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type PurchaseLeadInput = z.infer<typeof purchaseLeadSchema>;
