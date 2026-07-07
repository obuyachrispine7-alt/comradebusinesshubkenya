import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#home" className={`flex items-center gap-2 ${className}`} aria-label="Comrades Business Hub Kenya home">
      <Image
        src="/comrades-logo.png"
        alt="Comrades Business Hub Kenya logo"
        width={220}
        height={64}
        priority
        className="h-9 w-auto md:h-10"
      />
    </a>
  )
}
