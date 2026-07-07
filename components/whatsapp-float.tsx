import { MessageCircle } from "lucide-react"
import { waLink } from "@/lib/data"

export function WhatsappFloat() {
  return (
    <a
      href={waLink("Hi Comrades Hub, I have a question.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Comrades Hub on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-whatsapp/40 transition-transform hover:scale-110"
    >
      <MessageCircle className="size-7" />
    </a>
  )
}
