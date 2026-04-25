import Link from "next/link";
import { CheckCircle2, Mail, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ productId?: string; demo?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const { productId, demo } = await searchParams;
  const product = PRODUCTS.find((p) => p.id === productId);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto mb-6 grid size-20 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="size-12" />
        </div>
        <h1 className="mb-3 text-3xl font-extrabold">תודה רבה!</h1>
        <p className="mb-6 text-muted-foreground">
          {demo
            ? "זהו מסך דמו — בהפעלה אמיתית התשלום בוצע בהצלחה."
            : "התשלום שלך בוצע בהצלחה."}
          {product && (
            <>
              {" "}קיבלת את: <span className="font-bold text-foreground">{product.name}</span>.
            </>
          )}
        </p>

        <div className="mb-8 flex items-start gap-3 rounded-xl bg-muted p-4 text-start">
          <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
          <div className="text-sm">
            <div className="font-bold">בדקי את תיבת המייל שלך</div>
            <div className="text-muted-foreground">
              שלחנו לך קישור להורדת הקובץ. אם לא הגיע תוך דקות — בדקי בתיקיית הספאם.
            </div>
          </div>
        </div>

        <Button asChild size="lg" className="bg-brand-gradient text-white">
          <Link href="/#gallery">
            <ShoppingBag className="size-5" /> חזרה לחנות
          </Link>
        </Button>
      </div>
    </main>
  );
}
