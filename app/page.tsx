import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { ProductGallery } from "@/components/sections/product-gallery";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Newsletter } from "@/components/sections/newsletter";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGallery />
        <HowItWorks />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
