import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { FindServicesPage } from "@/features/find-services/components/find-services-page";

export default function FindServicesRoute() {
  return (
    <div className="bg-background text-foreground">
      <SiteHeader />
      <main>
        <FindServicesPage />
      </main>
      <SiteFooter />
    </div>
  );
}
