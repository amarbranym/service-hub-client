import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { ServiceDetailsPage } from "@/features/service-details/components/service-details-page";

export default function ServiceDetailsRoute() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main>
        <ServiceDetailsPage />
      </main>
      <SiteFooter />
    </div>
  );
}
