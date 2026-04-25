"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <section id="newsletter" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 text-white shadow-2xl shadow-primary/30 sm:p-14">
          <div className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -start-10 size-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
              <Gift className="size-4" /> מתנה ראשונה בחינם
            </div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              הצטרפי לקהילת הגננות שלנו
            </h2>
            <p className="mt-3 text-white/90">
              ותקבלי קובץ הדפסה חינמי מייד למייל + עדכונים על מוצרים חדשים.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
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
                          className="h-12 bg-white text-foreground placeholder:text-muted-foreground"
                          disabled={submitting || done}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-right text-white" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || done}
                  className="h-12 bg-white px-6 text-base font-bold text-primary hover:bg-white/90"
                >
                  {submitting ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : done ? (
                    "✓ נרשמת!"
                  ) : (
                    "שלחי לי"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
