'use client';

import { Header } from '@/components/dashboard/header';
import { HeroSection } from './hero-section';
import { FeaturesSection } from './features-section';
import { HowItWorks } from './how-it-works';
import { CTASection } from './cta-section';
import { Footer } from './footer';

export function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
