"use client"

import Image from "next/image"
import { MapPin, Droplet, MessageSquare } from "lucide-react"
import type { House, Product } from "@/lib/data"
import { formatKES, inquireLink } from "@/lib/data"

export function ProductCard({
  item,
  onOpen,
}: {
  item: House | Product
  onOpen: () => void
}) {
  const isHouse = item.type === "houses"

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="relative h-48 w-full overflow-hidden bg-secondary">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-foreground/85 px-2 py-1 text-xs font-bold uppercase tracking-wide text-background">
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-baseline justify-between gap-2">
          <span className="font-heading text-xl font-extrabold text-primary">
            {formatKES(item.price)}
            {isHouse && <span className="text-xs font-normal text-muted-foreground">/mo</span>}
          </span>
          {isHouse && <span className="text-xs font-medium text-muted-foreground">{(item as House).sub}</span>}
        </div>

        <h3 className="font-heading text-base font-bold text-card-foreground text-balance">{item.title}</h3>

        {isHouse ? (
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li className="flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-primary" /> {(item as House).location}
            </li>
            <li className="flex items-center gap-1.5">
              <Droplet className="size-3.5 shrink-0 text-primary" /> {(item as House).features[0]}
            </li>
          </ul>
        ) : (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{(item as Product).desc}</p>
        )}

        <span
          role="link"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation()
            window.open(inquireLink(item.title, item.price), "_blank", "noopener,noreferrer")
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors group-hover:bg-primary"
        >
          <MessageSquare className="size-4" /> Inquire via WhatsApp
        </span>
      </div>
    </button>
  )
}
