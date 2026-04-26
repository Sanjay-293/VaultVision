import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { MarketImpact } from "@/components/landing/MarketImpact";
import { DemoGuide } from "@/components/landing/DemoGuide";


import { Footer } from "@/components/landing/Footer";


export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <MarketImpact />
      <HowItWorks />
      <DemoGuide />
      <Footer />

    </main>
  );
}
