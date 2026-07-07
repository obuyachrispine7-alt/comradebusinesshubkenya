"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, MessageCircle } from "lucide-react"
import type { House, Product } from "@/lib/data"
import { formatKES, inquireLink } from "@/lib/data"

export function ProductModal({
  item,
  onClose,
}: {
  item: House | Product | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [item, onClose])

  if (!item) return null
  const isHouse = item.type === "houses"

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-secondary"
        >
          <X className="size-4" />
        </button>

        <div className="relative h-56 w-full bg-secondary">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" sizes="512px" />
        </div>

        <div className="p-6">
          <span className="mb-2 inline-block rounded-md bg-secondary px-2 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
            {item.tag}
          </span>
          <h2 className="font-heading text-2xl font-extrabold text-card-foreground text-balance">{item.title}</h2>
          <p className="mt-1 font-heading text-2xl font-extrabold text-primary">{formatKES(item.price)}</p>

          {isHouse ? (
            <div className="mt-4 space-y-1.5 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
              <p>
                <span className="font-semibold">Location:</span> {(item as House).location}
              </p>
              <p>
                <span className="font-semibold">Pricing:</span> {(item as House).sub}
              </p>
              <p>
                <span className="font-semibold">Highlights:</span> {(item as House).features.join(", ")}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{(item as Product).desc}</p>
          )}

          <a
            href={inquireLink(item.title, item.price)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-3 font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" /> Complete checkout on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
