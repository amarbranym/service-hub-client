import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { CtaSection } from "@/features/landing/components/cta-section";
import { FeaturedServicesSection } from "@/features/landing/components/featured-services-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { PopularCategoriesSection } from "@/features/landing/components/popular-categories-section";
import { TestimonialsSection } from "@/features/landing/components/testimonials-section";
import { TrustStripSection } from "@/features/landing/components/trust-strip-section";

export function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <PopularCategoriesSection />
        <FeaturedServicesSection />
        <HowItWorksSection />
        <TrustStripSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
