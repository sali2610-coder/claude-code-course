"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { SITE } from "@/lib/constants";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const waUrl = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    "היי! אני רוצה לדבר על חומרים לגן"
  )}`;

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "contact", ...values }),
      });
      if (!res.ok) throw new Error("fail");
      toast.success("ההודעה נשלחה — אחזור אלייך בהקדם!");
      form.reset();
    } catch {
      toast.error("משהו השתבש. נסי שוב או כתבי לי בוואטסאפ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            <span className="text-brand-gradient">דברי איתי</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            בקשה מיוחדת? הצעה? מחפשת קובץ שלא מצאת? אשמח לשמוע.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-600">
                <MessageCircle className="size-5" />
              </div>
              <div>
                <div className="font-bold">וואטסאפ</div>
                <div className="text-sm text-muted-foreground">
                  הכי מהיר — תגובה בתוך שעות ספורות
                </div>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>
              <div>
                <div className="font-bold">מייל</div>
                <div className="text-sm text-muted-foreground">
                  hello@ganenet-beclick.co.il
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary/10 text-secondary">
                <Phone className="size-5" />
              </div>
              <div>
                <div className="font-bold">טלפון</div>
                <div className="text-sm text-muted-foreground">
                  ימים א׳–ה׳, 9:00–16:00
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl>
                        <Input placeholder="מי את?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>טלפון (אופציונלי)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="050-1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ההודעה שלך</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="על מה תרצי לדבר?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                className="h-12 bg-brand-gradient text-base text-white"
              >
                {submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Send className="size-5" />
                )}
                שליחה
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
