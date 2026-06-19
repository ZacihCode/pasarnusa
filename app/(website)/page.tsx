import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIDiscovery from "@/components/AIDiscovery";
import KategoriProduk from "@/components/Kategori";
import Products from "@/components/Products";
import EventBanner from "@/components/Event";
import Partners from "@/components/Partners";
import CTA from "@/components/CTA";
import BackToTop from "@/components/BackToTop";
import Testimoni from "@/components/Testimoni";
import Rekomendasi from "@/components/Rekomendasi";
import HomeMapSection from "@/components/HomeMapSection";
import FAQSection from "@/components/Faq";
export default function Home() {
  return (
    <div className="bg-custom-main text-custom-main min-h-screen relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <EventBanner />
        <AIDiscovery />
        <Rekomendasi />
        <KategoriProduk />
        <Products />
        <Partners />
        <FAQSection />
        <Testimoni />
        <HomeMapSection />
        <CTA />
      </main>
      <BackToTop />
    </div>
  );
}
