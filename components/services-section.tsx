import { ArrowUpRight } from "lucide-react"
import { services, waLink } from "@/lib/data"

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-16 border-t border-border bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Direct Agent Services</h2>
        <p className="mt-1 text-muted-foreground">We handle the stress so you can focus on making grades.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="flex flex-col items-start rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ArrowUpRight className="size-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-card-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
              <a
                href={waLink(`Hi Comrades Hub, I want to inquire about your service: ${s.label}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-md border-2 border-foreground px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Inquire directly
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
