"use client"

import { useState, type FormEvent } from "react"
import { Tag, Search, Users } from "lucide-react"
import { waLink } from "@/lib/data"

type Pane = "sell" | "hunt" | "roommate"

const TABS: { id: Pane; label: string; icon: typeof Tag }[] = [
  { id: "sell", label: "Sell / Post Item", icon: Tag },
  { id: "hunt", label: "House Hunting", icon: Search },
  { id: "roommate", label: "Roommate Match", icon: Users },
]

const fieldClass =
  "rounded-md border border-border bg-secondary px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:bg-background"
const labelClass = "text-xs font-bold uppercase tracking-wide text-foreground"

export function SubmissionPortal() {
  const [pane, setPane] = useState<Pane>("sell")

  const submit = (e: FormEvent<HTMLFormElement>, build: (d: FormData) => string) => {
    e.preventDefault()
    const message = build(new FormData(e.currentTarget))
    window.open(waLink(message), "_blank", "noopener,noreferrer")
  }

  return (
    <section id="sell" className="scroll-mt-16 border-y border-border bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
          Request & Submission Portal
        </h2>
        <p className="mt-1 text-muted-foreground">
          Pick a track below and send your request straight to our desk on WhatsApp.
        </p>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-[1fr_2fr]">
          {/* Sidebar */}
          <div className="flex flex-col gap-3 bg-foreground p-6 md:p-8">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPane(t.id)}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  pane === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-white/10 bg-white/5 text-background/80 hover:bg-white/10"
                }`}
              >
                <t.icon className="size-4" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {pane === "sell" && (
              <form
                onSubmit={(e) =>
                  submit(
                    e,
                    (d) =>
                      `--- NEW SELL SUBMISSION ---\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nItem: ${d.get(
                        "title",
                      )}\nAsking price: KES ${d.get("price")}\nLocation: ${d.get("location")}\nDetails: ${d.get("desc")}`,
                  )
                }
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Full name</label>
                    <input name="name" required placeholder="e.g. Alex Owino" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Phone</label>
                    <input name="phone" type="tel" required placeholder="e.g. 0712345678" className={fieldClass} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Item / title</label>
                    <input name="title" required placeholder="e.g. HP EliteBook 840" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Asking price (KES)</label>
                    <input name="price" type="number" required placeholder="e.g. 16500" className={fieldClass} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Location / hostel</label>
                  <input name="location" required placeholder="e.g. Juja / KM Estate" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Details & condition</label>
                  <textarea name="desc" rows={3} required placeholder="Specs, wear, age..." className={fieldClass} />
                </div>
                <SubmitButton>Compile & send to WhatsApp</SubmitButton>
              </form>
            )}

            {pane === "hunt" && (
              <form
                onSubmit={(e) =>
                  submit(
                    e,
                    (d) =>
                      `--- HOUSE HUNT REQUEST ---\nBudget: KES ${d.get("budget")}\nType: ${d.get(
                        "type",
                      )}\nLocation: ${d.get("loc")}\nMove-in: ${d.get("date")}\nNotes: ${d.get("notes")}`,
                  )
                }
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Budget (KES)</label>
                    <input name="budget" type="number" required placeholder="e.g. 7000" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Room type</label>
                    <select name="type" className={fieldClass}>
                      <option>Single Room</option>
                      <option>Bedsitter</option>
                      <option>1 Bedroom Apartment</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Preferred location</label>
                    <input name="loc" required placeholder="e.g. Wendani / Juja Gate" className={fieldClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Move-in date</label>
                    <input name="date" type="date" required className={fieldClass} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Special preferences</label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Instant shower, balcony, inside water tap..."
                    className={fieldClass}
                  />
                </div>
                <SubmitButton>Submit search request</SubmitButton>
              </form>
            )}

            {pane === "roommate" && (
              <form
                onSubmit={(e) =>
                  submit(
                    e,
                    (d) =>
                      `--- ROOMMATE MATCH ---\nGender: ${d.get("gender")}\nShare budget: KES ${d.get(
                        "budget",
                      )}\nArea: ${d.get("loc")}\nLifestyle: ${d.get("habits")}`,
                  )
                }
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Your gender</label>
                    <select name="gender" className={fieldClass}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Share rent per person (KES)</label>
                    <input name="budget" type="number" required placeholder="e.g. 3500" className={fieldClass} />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Preferred area</label>
                  <input name="loc" required placeholder="e.g. Mwihoko / Ruiru / KM" className={fieldClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Study year & lifestyle</label>
                  <textarea
                    name="habits"
                    rows={4}
                    required
                    placeholder="2nd year Engineering. Quiet, non-smoker, early riser..."
                    className={fieldClass}
                  />
                </div>
                <SubmitButton>Find my roommate match</SubmitButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-2 w-full rounded-md bg-primary px-4 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
    >
      {children}
    </button>
  )
}
