import Image from "next/image"
import { ShieldCheck, Phone, Clock } from "lucide-react"
import { WHATSAPP_NUMBER, waLink } from "@/lib/data"

const EXPLORE = [
  { href: "#houses", label: "Housing options" },
  { href: "#items", label: "Household items" },
  { href: "#laptops", label: "Laptops" },
  { href: "#services", label: "Agent services" },
]

export function SiteFooter() {
  return (
    <>
      <section className="border-y border-border bg-background py-10">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="inline-flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-muted-foreground">
            <ShieldCheck className="size-5 text-primary" />
            Managed by students, for students — safe transactions across Kenyan campuses.
          </p>
        </div>
      </section>

      <footer className="bg-foreground text-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div>
            <div className="inline-flex rounded-lg bg-background p-2">
              <Image
                src="/comrades-logo.png"
                alt="Comrades Business Hub Kenya"
                width={220}
                height={64}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-background/60">
              The peer-to-peer commerce and relocation hub for Kenyan university communities.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-background">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide">Contact support</h3>
            <ul className="mt-4 space-y-2 text-sm text-background/70">
              <li>
                <a
                  href={waLink("Hi Comrades Hub!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-whatsapp hover:opacity-90"
                >
                  <Phone className="size-4" /> +{WHATSAPP_NUMBER}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock className="size-4" /> Daily 7:00 AM – 9:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>&copy; {new Date().getFullYear()} Comrades Business Hub Kenya. All rights reserved.</span>
            <span>Built for instant WhatsApp checkout.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
