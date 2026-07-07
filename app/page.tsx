import { SiteHeader } from "@/components/site-header"
import { Marketplace } from "@/components/marketplace"
import { ServicesSection } from "@/components/services-section"
import { SubmissionPortal } from "@/components/submission-portal"
import { SiteFooter } from "@/components/site-footer"
import { WhatsappFloat } from "@/components/whatsapp-float"

export default function Page() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <SiteHeader />
      <main>
        <Marketplace />
        <ServicesSection />
        <SubmissionPortal />
      </main>
      <SiteFooter />
      <WhatsappFloat />
    </div>
  )
}
