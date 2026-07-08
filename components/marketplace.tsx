 "use client"

import { useMemo, useState, useEffect } from "react"
import { Search, Home, ShoppingBag, Laptop, Layers, Info, Smartphone, Zap } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { supabase } from "@/lib/supabase"

// Expanded Category Types to support Electronics and Phones dynamically
type Cat = "all" | "houses" | "items" | "electronics" | "laptops" | "phones"
type HouseType = "all" | "single" | "bedsitter" | "onebed"

const HOUSE_TABS: { id: HouseType; label: string }[] = [
  { id: "all", label: "All Rooms" },
  { id: "single", label: "Single Rooms" },
  { id: "bedsitter", label: "Bedsitters" },
  { id: "onebed", label: "1 Bedroom" },
]

const CATEGORIES: { id: Exclude<Cat, "all">; label: string; icon: typeof Home; target: string }[] = [
  { id: "houses", label: "Houses", icon: Home, target: "houses" },
  { id: "items", label: "Household Items", icon: ShoppingBag, target: "items" },
  { id: "electronics", label: "Electronics", icon: Zap, target: "electronics" },
  { id: "laptops", label: "Laptops", icon: Laptop, target: "laptops" },
  { id: "phones", label: "Phones", icon: Smartphone, target: "phones" },
]

export function Marketplace() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<Cat>("all")
  const [houseTab, setHouseTab] = useState<HouseType>("all")
  const [selected, setSelected] = useState<any | null>(null)
  
  const [dbItems, setDbItems] = useState<any[]>([])
  const [loadingItems, setLoadingItems] = useState(true)

  // Dynamic States for Editable Site Text strings
  const [heroTitle, setHeroTitle] = useState("Your one-stop hub for houses, deals & connections")
  const [heroSubtitle, setHeroSubtitle] = useState("Connecting university students across Kenya to vetted listings, affordable second-hand gear, and roommates — instantly on WhatsApp.")
  const [householdNotice, setHouseholdNotice] = useState("We buy empty gas cylinders directly — reach us on the floating chat.")

  useEffect(() => {
    const fetchLiveContent = async () => {
      // 1. Fetch ALL dynamic products from Supabase
      const { data: itemData } = await supabase
        .from("household_items")
        .select("*")
        .order("created_at", { ascending: false })
      
      if (itemData) {
        const formatted = itemData.map(item => ({
          id: item.id,
          title: item.title,
          price: `KES ${item.price.toLocaleString()}`,
          desc: item.description || "",
          image: item.image_url,
          tag: item.category, // Matches HOUSES, HOUSEHOLD_ITEMS, ELECTRONICS, LAPTOPS, PHONES
          houseType: item.house_type || "single" // Extra field fallback if managing room structures
        }))
        setDbItems(formatted)
      }
      setLoadingItems(false)

      // 2. Fetch live editable text strings from Supabase
      const { data: textData } = await supabase.from("site_settings").select("*")
      if (textData) {
        textData.forEach((row: any) => {
          if (row.key === "hero_title") setHeroTitle(row.value)
          if (row.key === "hero_subtitle") setHeroSubtitle(row.value)
          if (row.key === "household_notice") setHouseholdNotice(row.value)
        })
      }
    }

    fetchLiveContent()
  }, [])

  const q = query.trim().toLowerCase()
  const matches = (item: any) => 
    item.title.toLowerCase().includes(q) || 
    item.desc.toLowerCase().includes(q) || 
    item.tag.toLowerCase().includes(q)

  // Determine visibility states dynamically based on main category selectors
  const showHouses = category === "all" || category === "houses"
  const showItems = category === "all" || category === "items"
  const showElectronics = category === "all" || category === "electronics"
  const showLaptops = category === "all" || category === "laptops"
  const showPhones = category === "all" || category === "phones"

  // Filter sections derived 100% from your live Supabase inventory inputs
  const liveHouses = useMemo(() => {
    return dbItems.filter((i) => {
      if (i.tag !== "HOUSES") return false
      if (houseTab !== "all" && i.houseType !== houseTab) return false
      return matches(i)
    })
  }, [dbItems, houseTab, q])

  const liveHouseholdItems = useMemo(() => {
    return dbItems.filter((i) => i.tag === "HOUSEHOLD_ITEMS" && matches(i))
  }, [dbItems, q])

  const liveElectronics = useMemo(() => {
    return dbItems.filter((i) => i.tag === "ELECTRONICS" && matches(i))
  }, [dbItems, q])

  const liveLaptops = useMemo(() => {
    return dbItems.filter((i) => i.tag === "LAPTOPS" && matches(i))
  }, [dbItems, q])

  const livePhones = useMemo(() => {
    return dbItems.filter((i) => i.tag === "PHONES" && matches(i))
  }, [dbItems, q])

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
            {heroTitle}
          </h1>
          
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            {heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => scrollTo("houses")} className="rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90">Browse listings</button>
            <button type="button" onClick={() => scrollTo("sell")} className="rounded-md border-2 border-foreground px-6 py-3 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background">Sell / Post an item</button>
          </div>

          {/* Search Dropdown with newly configured selections */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-xl border border-border bg-card p-2 shadow-sm sm:flex-row">
            <label className="sr-only" htmlFor="cat">Category</label>
            <select id="cat" value={category} onChange={(e) => setCategory(e.target.value as Cat)} className="rounded-md border border-border bg-secondary px-3 py-3 text-sm font-medium text-foreground outline-none sm:w-48">
              <option value="all">All categories</option>
              <option value="houses">Houses</option>
              <option value="items">Household Items</option>
              <option value="electronics">Electronics</option>
              <option value="laptops">Laptops</option>
              <option value="phones">Phones</option>
            </select>
            <div className="relative flex flex-1 items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <label className="sr-only" htmlFor="search">Search listings</label>
              <input id="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search live items by name or keywords..." className="w-full rounded-md border border-border bg-background py-3 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 py-6 sm:px-6 md:grid-cols-6">
          {CATEGORIES.map((c) => (
            <button key={c.id} type="button" onClick={() => jumpTo(c.id, c.target)} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/50 p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-sm">
              <c.icon className="size-6 text-primary" />
              <span className="text-xs font-semibold text-foreground">{c.label}</span>
            </button>
          ))}
          <button type="button" onClick={() => scrollTo("services")} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-secondary/50 p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-sm">
            <Layers className="size-6 text-primary" />
            <span className="text-xs font-semibold text-foreground">Services</span>
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {loadingItems && (
        <div className="py-12 text-center text-sm text-muted-foreground animate-pulse">
          Syncing live inventory feed from data nodes...
        </div>
      )}

      {/* Houses */}
      {!loadingItems && showHouses && (
        <section id="houses" className="scroll-mt-16 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Student Housing</h2>
            <p className="mt-1 text-muted-foreground">Vetted bedsitters, single rooms and apartments near campus paths.</p>

            <div className="mt-6 flex gap-6 border-b-2 border-border">
              {HOUSE_TABS.map((t) => (
                <button key={t.id} type="button" onClick={() => setHouseTab(t.id)} className={`relative -mb-0.5 py-3 text-sm font-bold transition-colors ${houseTab === t.id ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
                  {t.label}
                  {houseTab === t.id && <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary" />}
                </button>
              ))}
            </div>

            {liveHouses.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {liveHouses.map((h) => (
                  <ProductCard key={h.id} item={h} onOpen={() => setSelected(h)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No housing units listed via admin yet.</p>
            )}
          </div>
        </section>
      )}

      {/* Household Items */}
      {!loadingItems && showItems && (
        <section id="items" className="scroll-mt-16 border-t border-border bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Household Essentials</h2>
            <p className="mt-1 text-muted-foreground">Moving in or decluttering? Grab affordable, campus-ready furniture and gear.</p>

            <div className="mt-6 flex items-center gap-3 rounded-r-xl border-l-4 border-primary bg-card p-4 text-sm font-medium text-card-foreground">
              <Info className="size-5 shrink-0 text-primary" />
              <span>
                <strong>Discarding gear?</strong> {householdNotice}
              </span>
            </div>

            {liveHouseholdItems.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {liveHouseholdItems.map((it) => (
                  <ProductCard key={it.id} item={it} onOpen={() => setSelected(it)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No household elements listed yet.</p>
            )}
          </div>
        </section>
      )}

      {/* Electronics */}
      {!loadingItems && showElectronics && (
        <section id="electronics" className="scroll-mt-16 border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Campus Electronics</h2>
            <p className="mt-1 text-muted-foreground">Dispensers, microwaves, kettles, extension cables, and cooking appliances.</p>

            {liveElectronics.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {liveElectronics.map((el) => (
                  <ProductCard key={el.id} item={el} onOpen={() => setSelected(el)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No electronic equipment available currently.</p>
            )}
          </div>
        </section>
      )}

      {/* Laptops */}
      {!loadingItems && showLaptops && (
        <section id="laptops" className="scroll-mt-16 border-t border-border bg-secondary/20 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Campus Laptops</h2>
            <p className="mt-1 text-muted-foreground">Reliable machines tuned for assignments, coding, and entertainment.</p>

            {liveLaptops.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {liveLaptops.map((l) => (
                  <ProductCard key={l.id} item={l} onOpen={() => setSelected(l)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No computing configurations available right now.</p>
            )}
          </div>
        </section>
      )}

      {/* Phones & Accessories */}
      {!loadingItems && showPhones && (
        <section id="phones" className="scroll-mt-16 border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Phones & Accessories</h2>
            <p className="mt-1 text-muted-foreground">Smartphones, chargers, sub-woofers, and bluetooth audio equipment.</p>

            {livePhones.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {livePhones.map((ph) => (
                  <ProductCard key={ph.id} item={ph} onOpen={() => setSelected(ph)} />
                ))}
              </div>
            ) : (
              <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No mobile listings match at this moment.</p>
            )}
          </div>
        </section>
      )}

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
