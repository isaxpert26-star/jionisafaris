import { TourPackage, HotelBooking, CarRental, Review, BlogPost, Booking, BookingStatus, PaymentMethod, GalleryItem } from "./types";

export const INITIAL_TOURS: TourPackage[] = [
  {
    id: "tour-serengeti",
    title: "Serengeti Great Migration Private Canopy",
    duration: "5 Days, 4 Nights",
    price: 8125000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602491453974-09488a76689f?auto=format&fit=crop&w=1200&q=85", // Real majestic male lion on Serengeti plains
    videoUrl: "https://www.youtube.com/embed/gLgVvK_8Z9M", // Serengeti migration video
    description: "Experience the world's most dramatic wildlife spectacle from luxurious private mobile canopy tents in central Serengeti. Follow the million-strong wildebeest and zebras with professional private guides, ending your days with gourmet Swahili dinners under the African night sky.",
    schedule: [
      "Day 1: Arrival in Arusha & Flight to Central Seronera. Sunset game drive followed by a welcome campfire cocktail dinner.",
      "Day 2: Full-day exploration tracking massive herds. Champagne bush breakfast overlooking the endless acacia plains.",
      "Day 3: Balloon Safari at Dawn. Float silently over the migrating herds followed by an elegant traditional outdoor bush breakfast.",
      "Day 4: Travel north to the Mara River point to witness high-stakes crocodile crossing encounters. Obsidian bonfire reception in the evening.",
      "Day 5: Final safari capture, morning nature walk with Maasai guides, and private light aircraft charter flight back to Kilimanjaro Airport."
    ],
    pricingDetails: "Includes private aircraft charter transfers, double luxury canopy suites accommodation, all national park conservation fees, custom 4x4 safari cruiser, all meals prepared by high-end private safari chef, and alcoholic beverages.",
    featured: true,
    guidesAvailable: ["John Mlay (Senior Naturalist)", "Sophia Nkone (Big Five Expert)", "Emmanuel Lekisongo (Maasai Tracker)"]
  },
  {
    id: "tour-ngorongoro",
    title: "Ngorongoro Crater Premium Obsidian Expedition",
    duration: "3 Days, 2 Nights",
    price: 6125000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85", // Beautiful baobab and African wildlife terrain
    videoUrl: "https://www.youtube.com/embed/v9qM3Y02o_4", // Ngorongoro crater video
    description: "Explore the legendary amphitheater of the Ngorongoro Crater. Stay on the sheer rim at a spectacular luxury lodge wrapped in gold and local wood design. Descend into the volcanic floor for guaranteed viewings of the endangered Black Rhino, giant tusker elephants, and pride of crater lions.",
    schedule: [
      "Day 1: Scenic drive from Kilimanjaro through Rift Valley viewpoints. Arrive at the Obsidian Rim Lodge for a breathtaking rim-view dinner.",
      "Day 2: Sunrise descent through the golden crater mists. Full day on the crater floor. Picnic lunch beside the hippo pool.",
      "Day 3: Morning cultural visit to a premium private Maasai Boma. Handcrafted Tanzanite showcase workshop, and departure back."
    ],
    pricingDetails: "Includes private crater floor entry fees, 5-star rim-side luxury lodge, open hatch Land Rover, and exclusive private cultural fees.",
    featured: true,
    guidesAvailable: ["Emmanuel Lekisongo (Maasai Tracker)", "David Soko (Birding Specialist)"]
  },
  {
    id: "tour-zanzibar",
    title: "Zanzibar Spice Island Private Oasis",
    duration: "4 Days, 3 Nights",
    price: 4625000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85", // Authentic crystal clear Zanzibar turquoise beach
    videoUrl: "https://www.youtube.com/embed/qL6r3qFqW-k",
    description: "Indulge in an exquisite beachfront retreat on the powdery white beaches of Zanzibar. Immerse yourself in the rich Swahili heritage of Stone Town, explore spice plantations, dive into translucent turquoise waters of Mnemba atoll, and relax in premium boutique villas.",
    schedule: [
      "Day 1: Arrival at Zanzibar Airport. Luxury yacht transfer to your private beach villa. Candlelit seafood banquet right on the shoreline.",
      "Day 2: Stone Town heritage walking tour. Taste authentic Swahili coffee, explore historic spice markets, and enjoy a sunset dhow sail.",
      "Day 3: Marine reserve diving or snorkeling at Mnemba Marine Conservation Area. Private beach pavilion massage.",
      "Day 4: Leisure sunrise yoga on the sand, spice-infused brunch, and airport transfer."
    ],
    pricingDetails: "Includes oceanfront private pool villa, daily premium seafood menu, all Stone Town transfers and private yacht cruise, diving gear, and a dedicated butler team.",
    featured: false,
    guidesAvailable: ["Amina Khamis (Swahili Historian)", "Rashid Juma (Marine captain)"]
  },
  {
    id: "tour-kilimanjaro",
    title: "Kilimanjaro Summit Premium Ascent",
    duration: "7 Days, 6 Nights",
    price: 9000000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=85", // Real Mt. Kilimanjaro snow cap backdrop with giraffes
    videoUrl: "https://www.youtube.com/embed/D3v-nreP2yQ",
    description: "An exceptional luxury expedition taking the beautiful Lemosho Route to Uhuru Peak. Trek under the safety of a high-altitude expert medical team, premium dome camps featuring heated beds, fine dining mess tents, and top-tier mountain guides with a 98% summit rate.",
    schedule: [
      "Day 1: Lemosho Trailhead into pristine rainforest. Luxury base camp setup.",
      "Day 2: Heather moorland walks. Stunning views of Mount Meru in the sunset sky.",
      "Day 3: Acclimatization hike across Shira Plateau. High-altitude warm dining.",
      "Day 4: Barranco Wall ascent, proving thrilling views and incredible group support.",
      "Day 5: Karanga camp traverse to Barafu base, prepping altitude equipment.",
      "Day 6: Midnight summit bid to Uhuru Peak (5,895m). Touch the sky, descent to Mweka.",
      "Day 7: Celebration lunch, medal award ceremony, elite transfer back to lodge."
    ],
    pricingDetails: "Includes high-altitude specialized doctors, double-staff-ratio porter guide setup, custom sleeping dome tents with heaters, oxygen cylinders, full medical tracking, and park fees ($950/person).",
    featured: false,
    guidesAvailable: ["John Mlay (Senior Naturalist)", "Michael Isaac (Alpine Climber)"]
  }
];

export const INITIAL_HOTELS: HotelBooking[] = [
  {
    id: "hotel-obsidian",
    name: "Ngorongoro Crater Obsidian Ridge Lodge",
    location: "Ngorongoro Crater Rim, Tanzania",
    pricePerNight: 2375000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85", // Beautiful interior/exterior of luxury safari lodge
    amenities: ["Volcanic Rim Heated Infinity Pool", "Maasai Guided Trail Walk", "Gold-Leaf Obsidian Dining Deck", "Helipad & Private Airport Concierge", "En-suite Fireplaces & In-room binoculars"],
    description: "Suspended elegantly on the edge of the Ngorongoro volcano crater, Obsidian Ridge Lodge merges native dark stone layouts with shimmering Tanzanian gold decor. Large floor-to-ceiling windows look direct down into the 2,000ft caldera, offering the single most premium hotel viewpoint in East Africa.",
    featured: true
  },
  {
    id: "hotel-serengeti-camp",
    name: "Serengeti Golden Plains Private Safari Camp",
    location: "Serengit Plains Central, Tanzania",
    pricePerNight: 1950000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85", // Luxury wood & canvas glamping tent in african savannah
    amenities: ["Classic Canvas Slat Dining", "Solar Powered Luxury Hot Tubs", "Night Wildlife Thermography Safaris", "Gourmet Chef Team & Wine Cellar"],
    description: "A premium eco-camp designed along the path of the annual animal migrations. Relive the early explorer spirit with modern refinement, gold accents, premium brass shower systems, and bespoke local wood craft. The camp features direct access to herds passing right outside.",
    featured: true
  },
  {
    id: "hotel-zanzibar-resort",
    name: "Zanzibar Indigo Crest Ocean Suites",
    location: "Nungwi Beach Coast, Zanzibar",
    pricePerNight: 1625000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85", // Beautiful beachfront lounge Zanzibar
    amenities: ["Private Coral Lagoon Entrance", "PADI 5-star Scuba Center", "Spiced-Sandalwood Healing Spa", "Infinity Beachfront Cabanas"],
    description: "An architectural masterpiece on Stone Coast. Blending royal Arabic arches, Swahili woodcarving, and pure gold finishes. Enjoy floating breakfast in private plunge pools overlooking sunset coral reefs.",
    featured: false
  }
];

export const INITIAL_CARS: CarRental[] = [
  {
    id: "car-v8-cruiser",
    name: "Toyota Land Cruiser Custom V8 Safari",
    type: "4x4 Safari Cruiser",
    pricePerDay: 700000,
    capacity: "7 Passengers",
    features: ["Bespoke Electric Pop-up Roof", "In-built Cooler & Champagne Fridge", "USB Multiport & 240V Power Sockets", "Off-road Dual Winches & Mud Terrains", "Noise-insulated Cabin Walls"],
    image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&w=1200&q=85", // Land Cruiser off roading with beautiful tanzania skyline backdrop
    description: "Our crown-jewel vehicle. Fully customized locally with heavy duty safari suspension and a high roof line so you never miss a picture. Comes with a skilled naturalist-driver to navigate tough tracks in Ngorongoro crater."
  },
  {
    id: "car-defender-premium",
    name: "Land Rover Defender Obsidian Edition",
    type: "Luxury Land Rover",
    pricePerDay: 875000,
    capacity: "5 Passengers",
    features: ["360 Skyward Cameras", "Automatic Terrain Response 2", "Satellite Phone & Emergency GPS Beacon", "Premium Premium Leather Recliners"],
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1200&q=85", // Luxury 4x4 off roading near savanna
    description: "The rugged icon reborn for premium travellers. Merges luxury urban prestige with off-road dominance. Perfect for driving from Arusha to Lake Manyara and the Highlands in style."
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-packing",
    title: "The Ultimate Tanzanian Packing List: Serengeti & Ngorongoro Edition",
    summary: "Essential advice on what to pack for a luxury safari tour in Tanzania, explaining textures, layers, and camera setups.",
    content: "When preparing for a safari of this high caliber, the rule of thumb is neutral colors like tan, khaki, and olive green to blend with the savannah. Mornings on the rim of the Ngorongoro Crater are surprisingly cold (approx 8°C / 46°F), while the plains of the Serengeti reach 28°C (82°F) by midday. This article explores essential layers, footwear selection, camera lenses for wild animal action safaris, and high SPF sun protection. Ensure you bring soft bags rather than hard cases as light aircraft bush charters enforce strict spatial luggage configurations (max 15kg/33lbs).",
    author: "Sophia Nkone",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85", // Vintage map & safari binocular aesthetic
    readTime: "5 min read",
    date: "2026-05-18",
    tags: ["Safari Tips", "Packing Guide", "Ngorongoro"]
  },
  {
    id: "blog-migration",
    title: "When is the Great Wildebeest Migration? A Month-by-Month Guide",
    summary: "Track the million-strong herds as they cross between Serengeti and Masai Mara to schedule your perfect booking.",
    content: "The Great Migration is not a single one-off event; it's an endless circular journey. From January to March, the herds group in southern Serengeti for calving season, which sees 500,000 calves born. By June, they move northwards toward the Western Corridor. July to October is famous for the perilous Mara River crossings. Understanding this movement is critical to aligning your Jioni Safaris private mobile canopy lodge booking with the center of the action.",
    author: "John Mlay",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85", // Breathtaking wildlife migration scene on grasslands
    readTime: "8 min read",
    date: "2026-05-20",
    tags: ["Serengeti", "Wildlife", "Great Migration"]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Aris Thorne (United Kingdom)",
    rating: 5,
    comment: "An absolute masterclass of African luxury! The obsidian lodge on the crater rim felt like another planet. Standing on the balcony watching clouds flow into the caldera with a glass of champagne is a memory I will cherish forever.",
    category: "Tour",
    targetName: "Ngorongoro Crater Premium Obsidian Expedition",
    verified: true,
    approved: true,
    date: "2026-05-15"
  },
  {
    id: "rev-2",
    author: "Cecile Dubois (France)",
    rating: 5,
    comment: "Excellent service from Jioni Safaris. Our driver Emmanuel spotted a hunting cheetah in the grass that other cars drove right past. Highly recommend booking the Land Purser V8 Cruiser custom spec, it is extremely smooth and the cooling fridge kept our drinks frosty all day.",
    category: "Car",
    targetName: "Toyota Land Cruiser Custom V8 Safari",
    verified: true,
    approved: true,
    date: "2026-05-19"
  },
  {
    id: "rev-3",
    author: "Brandon Wu (Singapore)",
    rating: 4,
    comment: "Fabulous safari but extremely dusty during the afternoon drive. The staff was top tier and cleaned my camera body every night! The spice plantations tour in Stone town was also highly educational.",
    category: "Tour",
    targetName: "Serengeti Great Migration Private Canopy",
    verified: true,
    approved: true,
    date: "2026-05-21"
  },
  {
    id: "rev-4",
    author: "Hassan Al-Jaber (Kuwait)",
    rating: 5,
    comment: "Pending approval test: Spectacular hotel, best luxury design in East Africa! Outstanding hospitality, Tanzanian obsidian look is fantastic.",
    category: "Hotel",
    targetName: "Ngorongoro Crater Obsidian Ridge Lodge",
    verified: true,
    approved: false, // For Customer Support to moderate
    date: "2026-05-22"
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-8025",
    bookingType: "tour",
    itemId: "tour-ngorongoro",
    itemName: "Ngorongoro Crater Premium Obsidian Expedition",
    amount: 12250000, // For 2 people 
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@yahoo.com",
    customerPhone: "+1-541-754-3010",
    bookingDate: "2026-06-15",
    quantity: 2,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    smsReference: "TX_BANK_HB91207D",
    status: BookingStatus.APPROVED,
    notes: "Requires vegetarian menu and low-altitude room alignment due to knee issues.",
    assignedManager: "Sophia Nkone",
    pdfReceiptGenerated: true,
    createdAt: "2026-05-18T10:20:00Z"
  },
  {
    id: "BK-6194",
    bookingType: "tour",
    itemId: "tour-serengeti",
    itemName: "Serengeti Great Migration Private Canopy",
    amount: 8125000, // 1 person
    customerName: "Dr. Marcus Vance",
    customerEmail: "marcus.vance@gmail.com",
    customerPhone: "+44-20-7946-0958",
    bookingDate: "2026-07-04",
    quantity: 1,
    paymentMethod: PaymentMethod.MPESA,
    smsReference: "MPESA_AP92813X02",
    status: BookingStatus.PENDING,
    notes: "Honeymoon booking. Needs sunset champagne setup outside the mobile canopy.",
    assignedManager: "John Mlay",
    pdfReceiptGenerated: false,
    createdAt: "2026-05-21T18:45:00Z"
  },
  {
    id: "BK-4091",
    bookingType: "hotel",
    itemId: "hotel-obsidian",
    itemName: "Ngorongoro Crater Obsidian Ridge Lodge",
    amount: 7125000, // 3 nights
    customerName: "Yuki Tanaka",
    customerEmail: "yuki.t@tanaka-group.jp",
    customerPhone: "+81-3-1234-5678",
    bookingDate: "2026-05-30",
    quantity: 3,
    paymentMethod: PaymentMethod.TIGOPESA,
    smsReference: "TIGOPESA_TZ81920B",
    status: BookingStatus.PENDING,
    notes: "Requires helipad pickup arrangement if possible.",
    pdfReceiptGenerated: false,
    createdAt: "2026-05-22T12:00:00Z"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Maasai sunset leap over Central Savannah",
    type: "photo",
    url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1200&q=85", // Beautiful sunset and real Maasai people jumping
    uploadedBy: "Super Admin",
    createdAt: "2026-05-10T11:00:00Z"
  },
  {
    id: "gal-2",
    title: "Ngorongoro Crater Cliffside Aerial Video Tour",
    type: "video",
    url: "https://www.youtube.com/embed/v9qM3Y02o_4",
    pricingInfo: "TSh 6,125,000 per expedition ticket",
    scheduleInfo: "Every Tue & Fri departure from Arusha",
    uploadedBy: "Tour Manager",
    createdAt: "2026-05-14T09:30:00Z"
  },
  {
    id: "gal-3",
    title: "Bespoke Land Cruiser Safari Spec Brochure (PDF Summary)",
    type: "pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Standard PDF test file
    pricingInfo: "TSh 700,000 per car per day",
    scheduleInfo: "Full 24h custom off-road navigation with private driver guide assistance",
    uploadedBy: "Super Admin",
    createdAt: "2026-05-15T15:00:00Z"
  }
];
