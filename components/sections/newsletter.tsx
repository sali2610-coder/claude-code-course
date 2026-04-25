"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Confetti, Star } from "@/components/decorations";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";

export function Newsletter() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: NewsletterInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "newsletter", ...values }),
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
      toast.success("תודה! שלחנו לך מייל אישור.");
      form.reset();
    } catch {
      toast.error("משהו השתבש. נסי שוב בעוד רגע.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="newsletter" className="border-y-[3px] border-foreground bg-accent py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 14,
          }}
          whileHover={{ rotate: 0, transition: { type: "spring", stiffness: 250 } }}
          className="relative overflow-hidden rounded-3xl border-toy-thick bg-secondary p-10 shadow-toy-xl sm:p-14"
        >
          <Confetti />

          {/* corner star */}
          <Star className="pointer-events-none absolute -end-6 -top-6 size-24 text-primary rotate-12" />
          <Star className="pointer-events-none absolute -bottom-8 -start-4 size-16 text-tertiary -rotate-12" />

          <div className="relative text-center">
            <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-toy bg-card px-4 py-1.5 text-sm font-bold shadow-toy-sm">
              <Gift className="size-4" /> מתנה ראשונה בחינם
            </span>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              הצטרפי לקהילת
              <br />
              <span className="inline-block bg-card border-toy px-4 py-1 mt-2 -rotate-1 shadow-toy">
                הגננות שלנו
              </span>
            </h2>
            <p className="mt-5 font-handwritten text-2xl">
              ותקבלי קובץ הדפסה חינמי מייד למייל ✦
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="האימייל שלך"
                          className="h-14 rounded-xl border-toy bg-card px-4 text-base font-bold shadow-toy-sm placeholder:text-foreground/50"
                          disabled={submitting || done}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || done}
                  className="h-14 rounded-xl border-toy bg-primary px-8 text-base font-extrabold text-primary-foreground shadow-toy toy-press hover:bg-primary"
                >
                  {submitting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : done ? (
                    "✓ נרשמת!"
                  ) : (
                    "שלחי לי ✦"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
