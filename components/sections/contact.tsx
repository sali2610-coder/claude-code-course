"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
import { Sparkle, CrayonUnderline } from "@/components/decorations";
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
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24">
      <Sparkle className="pointer-events-none absolute end-[8%] top-12 size-10 text-primary -rotate-12" />
      <Sparkle className="pointer-events-none absolute start-[6%] bottom-16 size-14 text-tertiary rotate-12" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-block -rotate-2 rounded-full border-toy bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-toy-sm">
            ✦ צרי קשר ✦
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
            <span className="relative inline-block">
              דברי איתי
              <CrayonUnderline className="text-primary" />
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-foreground/70">
            <span className="font-handwritten text-2xl">בקשה מיוחדת? הצעה? אשמח לשמוע.</span>
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 16,
            }}
            className="flex flex-col gap-4"
          >
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border-toy-thick bg-tertiary p-5 shadow-toy toy-press hover-wobble"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border-toy bg-card shadow-toy-sm">
                <MessageCircle className="size-6" />
              </div>
              <div>
                <div className="font-display text-xl">וואטסאפ</div>
                <div className="text-sm font-bold text-foreground/75">
                  הכי מהיר — תגובה תוך שעות
                </div>
              </div>
            </a>
            <div className="flex items-start gap-4 rounded-2xl border-toy-thick bg-secondary p-5 shadow-toy">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border-toy bg-card shadow-toy-sm">
                <Mail className="size-6" />
              </div>
              <div>
                <div className="font-display text-xl">מייל</div>
                <div className="text-sm font-bold text-foreground/75">
                  hello@ganenet-beclick.co.il
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border-toy-thick bg-accent p-5 text-accent-foreground shadow-toy">
              <div className="grid size-12 shrink-0 place-items-center rounded-xl border-toy bg-card text-foreground shadow-toy-sm">
                <Phone className="size-6" />
              </div>
              <div>
                <div className="font-display text-xl">טלפון</div>
                <div className="text-sm font-bold opacity-90">
                  ימים א׳–ה׳, 9:00–16:00
                </div>
              </div>
            </div>
          </motion.div>

          <Form {...form}>
            <motion.form
              initial={{ opacity: 0, x: 80, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 16,
                delay: 0.1,
              }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 rounded-2xl border-toy-thick bg-card p-5 shadow-toy sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">שם מלא</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="מי את?"
                          className="h-12 rounded-xl border-toy font-medium"
                          {...field}
                        />
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
                      <FormLabel className="font-bold">אימייל</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          className="h-12 rounded-xl border-toy font-medium"
                          {...field}
                        />
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
                    <FormLabel className="font-bold">טלפון (אופציונלי)</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="050-1234567"
                        className="h-12 rounded-xl border-toy font-medium"
                        {...field}
                      />
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
                    <FormLabel className="font-bold">ההודעה שלך</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="על מה תרצי לדבר?"
                        className="rounded-xl border-toy font-medium"
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
                className="h-14 rounded-xl border-toy bg-primary text-base font-extrabold text-primary-foreground shadow-toy toy-press hover:bg-primary"
              >
                {submitting ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <Send className="size-5" />
                )}
                שלחי הודעה ✦
              </Button>
            </motion.form>
          </Form>
        </div>
      </div>
    </section>
  );
}
