export const WHATSAPP_NUMBER = "254786368272"

export type Category = "houses" | "items" | "laptops"

export type HouseType = "single" | "bedsitter" | "onebed"

export interface House {
  id: string
  type: "houses"
  houseType: HouseType
  tag: string
  title: string
  price: number
  sub: string
  location: string
  image: string
  features: string[]
}

export interface Product {
  id: string
  type: "items" | "laptops"
  tag: string
  title: string
  price: number
  image: string
  desc: string
}

export interface Service {
  id: string
  title: string
  label: string
  desc: string
}

export const houses: House[] = [
  // SINGLE ROOMZ
  {
    id: "s1",
    type: "houses",
    houseType: "single",
    tag: "Single Room",
    title: "Single Room in KM",
    price: 4500,
    sub: "No deposit",
    location: "KM Estate",
    image: "/house-single.png",
    features: [
      "Water throughout, included in rent",
      "Wifi subscription available",
      "Electricity on prepaid token",
      "Available on 1st, 2nd & 3rd floor",
    ],
  },
  // BEDSITTER ROOMZ
  {
    id: "b1",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "Modern Spacious Bedsitter",
    price: 6500,
    sub: "KES 6,500 deposit",
    location: "Wendani",
    image: "/house-bedsitter.png",
    features: [
      "Spacious with modern tiles",
      "Water throughout at 150 per unit",
      "Electricity token · Wifi subscription",
      "Garbage free · Security guaranteed · 4th floor",
    ],
  },
  {
    id: "b2",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "Bedsitter in Lacasa",
    price: 8500,
    sub: "KES 7,500 deposit",
    location: "Lacasa, Wendani",
    image: "/house-bedsitter.png",
    features: [
      "Kitchen cabinets & wardrobe/closet",
      "Water throughout, included in rent",
      "Electricity token · Wifi subscription",
      "Garbage 200 · Security provided · 1st floor",
    ],
  },
  {
    id: "b3",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "Spacious Bedsitter Near School",
    price: 7000,
    sub: "KES 1,000 deposit",
    location: "KM, near School",
    image: "/house-bedsitter.png",
    features: [
      "Wall shelves & kitchen shelves",
      "Water throughout (outside tap)",
      "Electricity token · Wifi subscription",
      "Garbage free · Security tight · 3rd floor",
    ],
  },
  {
    id: "b4",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "No Deposit Bedsitter Near School",
    price: 6600,
    sub: "No deposit",
    location: "KM, near School",
    image: "/house-bedsitter.png",
    features: [
      "Water included in rent",
      "Electricity token · Wifi subscription",
      "Garbage free · Security tight",
      "Ground floor",
    ],
  },
  {
    id: "b5",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "CCTV Secured Bedsitter",
    price: 8500,
    sub: "KES 8,500 deposit",
    location: "Wendani, near Primary",
    image: "/house-bedsitter.png",
    features: [
      "CCTV surveillance 24/7",
      "Water at 150 per unit",
      "Electricity token · Wifi subscription",
      "Garbage free · Ground floor",
    ],
  },
  {
    id: "b6",
    type: "houses",
    houseType: "bedsitter",
    tag: "Bedsitter",
    title: "Bedsitter in Wendani Junior",
    price: 8000,
    sub: "KES 8,000 deposit",
    location: "Wendani Junior",
    image: "/house-bedsitter.png",
    features: [
      "Water at 130 per unit (2.5k refundable water depo)",
      "Electricity provided in token",
      "Garbage 200 · Security guaranteed",
      "Ground floor & 3rd floor",
    ],
  },
  // 1 BEDROOMZ
  {
    id: "ob1",
    type: "houses",
    houseType: "onebed",
    tag: "1 Bedroom",
    title: "Modern 1-Bedroom in Lacasa",
    price: 13000,
    sub: "KES 12,000 deposit",
    location: "Lacasa, Wendani",
    image: "/house-onebed.png",
    features: [
      "Up to standard & modern",
      "Water throughout, included in rent",
      "Electricity token · Wifi subscription",
      "Garbage 200 · First floor",
    ],
  },
  {
    id: "ob2",
    type: "houses",
    houseType: "onebed",
    tag: "1 Bedroom",
    title: "1-Bedroom Near Alvo House",
    price: 12000,
    sub: "KES 12,000 deposit",
    location: "Wendani, near Alvo House",
    image: "/house-onebed.png",
    features: [
      "Water at 150 per unit",
      "Electricity token · Wifi subscription",
      "Security provided",
      "4th floor",
    ],
  },
  {
    id: "ob3",
    type: "houses",
    houseType: "onebed",
    tag: "1 Bedroom",
    title: "1-Bedroom Near Lacasa",
    price: 12000,
    sub: "KES 11,000 deposit",
    location: "Near Lacasa, Wendani",
    image: "/house-onebed.png",
    features: [
      "Water throughout, included in rent",
      "Electricity token · Wifi subscription",
      "Garbage 200 · Security provided",
      "Ground floor",
    ],
  },
  {
    id: "ob4",
    type: "houses",
    houseType: "onebed",
    tag: "1 Bedroom",
    title: "Tiled 1-Bedroom Near Primary",
    price: 11000,
    sub: "KES 11,000 deposit",
    location: "Wendani, near Primary",
    image: "/house-onebed.png",
    features: [
      "Tiled (bedroom not tiled)",
      "Water throughout at 150 per unit",
      "Electricity token · Wifi subscription",
      "Garbage 200 · Security provided · 2nd & 3rd floor",
    ],
  },
  {
    id: "ob5",
    type: "houses",
    houseType: "onebed",
    tag: "1 Bedroom",
    title: "Modern 1-Bedroom in Sukari",
    price: 15000,
    sub: "KES 15,000 deposit",
    location: "Sukari",
    image: "/house-onebed.png",
    features: [
      "Separate open kitchen · ring bell",
      "Water depo 2,500 · Electricity token",
      "Wifi subscription · Security provided",
      "Garbage 200 · 2nd floor",
    ],
  },
]

export const householdItems: Product[] = [
  { id: "item1", type: "items", tag: "Storage", title: "Multilayer Shoe Rack", price: 1000, image: "/item-shoe-rack.png", desc: "Sturdy metallic composite frame with a light, space-saving profile." },
  { id: "item2", type: "items", tag: "Study", title: "Classic Student Study Table", price: 1400, image: "/item-study-table.png", desc: "Ergonomic wooden desktop optimised for long study sessions." },
  { id: "item3", type: "items", tag: "Kitchen", title: "Compact Kitchen Utility Table", price: 1400, image: "/item-kitchen-table.png", desc: "Water-resistant coating, fits neatly into any kitchen corner." },
  { id: "item4", type: "items", tag: "Living Room", title: "Sturdy Coffee Table", price: 1700, image: "/item-coffee-table.png", desc: "Polished dark mahogany shade with handy storage underneath." },
  { id: "item5", type: "items", tag: "Kitchen", title: "Commercial Chips Cooker", price: 2500, image: "/item-chips-cooker.png", desc: "Rapid heating coil design. A perfect startup asset for hostel entrepreneurs." },
  { id: "item6", type: "items", tag: "Gas Utility", title: "Empty Gas Cylinder (13KG)", price: 2000, image: "/item-gas-cylinder.png", desc: "Safety-tested brass valve connections. Easily refilled at major hubs." },
  { id: "item7", type: "items", tag: "Bedding", title: "3.5x6 High Density Bed", price: 3500, image: "/item-bed-single.png", desc: "Solid timber joints with no creaking. Comfortable and durable." },
  { id: "item8", type: "items", tag: "Study", title: "Executive Office Desk", price: 3500, image: "/item-office-desk.png", desc: "Integrated lockable drawers for secure file keeping." },
  { id: "item9", type: "items", tag: "Bedding", title: "4x6 Joint Timber Bed", price: 4000, image: "/item-bed-double.png", desc: "Premium structural support struts. Ideal for roommates sharing." },
  { id: "item10", type: "items", tag: "Living Room", title: "Modern 3-Seater Sofa", price: 6000, image: "/item-sofa.png", desc: "Thick woven blue fabric with soft, high-density interior foam." },
  { id: "item11", type: "items", tag: "Bedding", title: "4x6 Wooden Bed", price: 3500, image: "/item-bed-4x6.jpg", desc: "Solid polished wooden 4 by 6 bed frame with a comfortable mattress. Delivery cost depends on location." },
]

export const laptops: Product[] = [
  { id: "lap1", type: "laptops", tag: "HP EliteBook", title: "HP Business EliteBook", price: 16000, image: "/laptop.png", desc: "Intel Core i5 · 8GB RAM · 256GB SSD. Clean body, great for coding and assignments." },
  { id: "lap2", type: "laptops", tag: "Lenovo ThinkPad", title: "Lenovo ThinkPad", price: 17000, image: "/laptop.png", desc: "Intel Core i5 · 8GB DDR RAM · 240GB SSD. Reliable workhorse for campus life." },
]

export const services: Service[] = [
  { id: "srv1", title: "House Hunting Agent", label: "House hunting", desc: "We track vacant rooms, verify water availability, and handle lease validation for you." },
  { id: "srv2", title: "Buy & Sell Assist", label: "Buy/sell household items & electronics", desc: "Instant valuation and fast cash for graduating students clearing their gear." },
  { id: "srv3", title: "Roommate Matching", label: "Roommate hookups", desc: "Get matched with safe peers who share your budget and lifestyle." },
  { id: "srv4", title: "Hostel Allocation", label: "Hostel allocation hookups", desc: "Skip the bottlenecks with our deep campus accommodation networks." },
  { id: "srv5", title: "Cheque Brokerage", label: "Cheque selling", desc: "Fast, transparent clearance for university cheques and payouts." },
]

export const formatKES = (num: number) => `KES ${num.toLocaleString("en-US")}`

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function inquireLink(itemName: string, price: number) {
  return waLink(`Hi Comrades Hub, I'm interested in ${itemName} - ${formatKES(price)}`)
}
