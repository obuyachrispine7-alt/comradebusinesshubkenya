"use client"

import { useMemo, useState } from "react"
import { Search, Home, ShoppingBag, Laptop, Layers, Info } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { houses, householdItems, laptops, type House, type HouseType, type Product } from "@/lib/data"

type Cat = "all" | "houses" | "items" | "laptops"

const HOUSE_TABS: { id: HouseType; label: string }[] = [
  { id: "single", label: "Single Rooms" },
  { id: "bedsitter", label: "Bedsitters" },
  { id: "onebed", label: "1 Bedroom" },
]

const CATEGORIES: { id: Exclude<Cat, "all">; label: string; icon: typeof Home; target: string }[] = [
  { id: "houses", label: "Houses", icon: Home, target: "houses" },
  { id: "items", label: "Household Items", icon: ShoppingBag, target: "items" },
  { id: "laptops", label: "Laptops", icon: Laptop, target: "laptops" },
]

export function Marketplace() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Cat>("all")
  const [houseTab, setHouseTab] = useState<HouseType>("single")
  const [selected, setSelected] = useState<House | Product | null>(null)

  const q = query.trim().toLowerCase()
  const matches = (haystack: string) => haystack.toLowerCase().includes(q)

  const showHouses = category === "all" || category === "houses"
  const showItems = category === "all" || category === "items"
  const showLaptops = category === "all" || category === "laptops"

  const tabHouses = useMemo(
    () => houses.filter((h) => h.houseType === houseTab && matches(`${h.title} ${h.location} ${h.tag}`)),
    [houseTab, q],
  )
  const filteredItems = useMemo(() => householdItems.filter((i) => matches(`${i.title} ${i.desc} ${i.tag}`)), [q])
  const filteredLaptops = useMemo(() => laptops.filter((l) => matches(`${l.title} ${l.desc} ${l.tag}`)), [q])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const jumpTo = (id: Exclude<Cat, "all">, target: string) => {
    setCategory(id)
    setQuery("")
    scrollTo(target)
  }

  return (
    <>
      {/* Hero */}
      <section id="home" className="scroll-mt-16 border-b border-border bg-secondary/50">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            For students, by students · around Nairobi
          </span>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-5xl">
            Your one-stop hub for houses, deals & connections
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            Connecting university students across Kenya to vetted listings, affordable second-hand gear, and roommates —
            instantly on WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("houses")}
              className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse listings
            </button>
            <button
              type="button"
              onClick={() => scrollTo("sell")}
              className="rounded-md border-2 border-foreground px-6 py-3 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Sell / Post an item
            </button>
          </div>

          {/* Search */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-sm sm:flex-row">
            <label className="sr-only" htmlFor="cat">
              Category
            </label>
            <select
              id="cat"
              value={category}
              onChange={(e) => setCategory(e.target.value as Cat)}
              className="rounded-md border border-border bg-secondary px-3 py-3 text-sm font-medium text-foreground outline-none sm:w-48"
            >
              <option value="all">All categories</option>
              <option value="houses">Houses</option>
              <option value="items">Household Items</option>
              <option value="laptops">Laptops</option>
            </select>
            <div className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <label className="sr-only" htmlFor="search">
                Search listings
              </label>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, room type or location..."
                className="w-full rounded-md border border-border bg-background py-3 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 md:grid-cols-4">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => jumpTo(c.id, c.target)}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/50 p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-sm"
            >
              <c.icon className="size-7 text-primary" />
              <span className="text-sm font-semibold text-foreground">{c.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => scrollTo("services")}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/50 p-5 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-sm"
          >
            <Layers className="size-7 text-primary" />
            <span className="text-sm font-semibold text-foreground">Services</span>
          </button>
        </div>
      </div>

      {/* Houses */}
      {showHouses && (
        <section id="houses" className="scroll-mt-16 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Student Housing</h2>
            <p className="mt-1 text-muted-foreground">
              Vetted bedsitters, single rooms and apartments near campus paths.
            </p>

            <div className="mt-6 flex gap-6 border-b-2 border-border">
              {HOUSE_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setHouseTab(t.id)}
                  className={`relative -mb-0.5 py-3 text-sm font-bold transition-colors ${
                    houseTab === t.id ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t.label}
                  {houseTab === t.id && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>

            {tabHouses.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tabHouses.map((h) => (
                  <ProductCard key={h.id} item={h} onOpen={() => setSelected(h)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No matching listings in this category yet.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Household items */}
      {showItems && (
        <section id="items" className="scroll-mt-16 border-y border-border bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Household Essentials</h2>
            <p className="mt-1 text-muted-foreground">
              Moving in or decluttering? Grab affordable, campus-ready furniture and gear.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-r-xl border-l-4 border-primary bg-card p-4 text-sm font-medium text-card-foreground">
              <Info className="size-5 shrink-0 text-primary" />
              <span>
                <strong>Discarding gear?</strong> We buy empty gas cylinders directly — reach us on the floating chat.
              </span>
            </div>

            {filteredItems.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((it) => (
                  <ProductCard key={it.id} item={it} onOpen={() => setSelected(it)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No items match your search.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Laptops */}
      {showLaptops && (
        <section id="laptops" className="scroll-mt-16 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Campus Laptops</h2>
            <p className="mt-1 text-muted-foreground">
              Reliable machines tuned for assignments, coding and entertainment.
            </p>

            {filteredLaptops.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLaptops.map((l) => (
                  <ProductCard key={l.id} item={l} onOpen={() => setSelected(l)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
                No laptops match your search.
              </p>
            )}
          </div>
        </section>
      )}

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
