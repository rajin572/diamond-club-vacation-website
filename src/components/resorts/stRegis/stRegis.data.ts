import { AllImages } from "../../../../public/images/AllImages";
import type { StRegisResortData } from "./stRegis.types";

export const ST_REGIS_RESORT_DATA: StRegisResortData = {
  programId: "diamond-club-reserve",
  programTitle: "Diamond Club Reserve",
  resortId: "st-regis",
  resortName: "The St. Regis Kanai Resort",
  tagline:
    "Beachfront suites, signature dining and the main Passover program, at Kanai in the Riviera Maya.",
  heroImage: AllImages.stRegisResortMain,

  rooms: [
    {
      id: "deluxe-room",
      title: "Deluxe Room",
      bedConfig: "1 King or 2 Queen beds · Ocean view",
      size: "592 sq ft · 55 sq m",
      view: "Ocean view",
      description:
        "Every room is prepared for the holiday, with connecting rooms and cribs available on request.",
      image: AllImages.stRegisGallery1,
      gallery: [
        AllImages.stRegisGallery1,
        AllImages.stRegisGallery2,
        AllImages.stRegisGallery3,
        AllImages.stRegisGallery4,
        AllImages.stRegisResortMain,
      ],
      features: {
        bedsAndBedding: [
          "1 King or 2 Queen beds",
          "Cribs permitted on request",
          "Rollaway bed available for select layouts",
          "Pillowtop mattress with 400-thread-count Frette linens",
        ],
        bathroom: [
          "Marble bathroom with double vanity",
          "Separate deep soaking tub and rain shower",
          "Remède luxury bath amenities",
          "Plush bathrobes and slippers",
        ],
        furniture: [
          "Private furnished terrace with ocean panorama",
          "Handcrafted contemporary Mexican wood furnishings",
          "Work desk with ergonomic seating",
          "Comfortable lounge seating area",
        ],
        foodAndBeverage: [
          "Kosher Passover mini-bar and refreshments",
          "Complimentary bottled water replenished twice daily",
          "Nespresso coffee machine with kosher capsules",
          "Electric kettle upon request",
        ],
        internetAndPhones: [
          "High-speed complimentary Wi-Fi across resort",
          "Dual-line cordless speakerphones with voicemail",
          "55-inch UHD Smart TV with international channels",
          "Bedside USB charging and universal power sockets",
        ],
        hospitality: [
          "Signature St. Regis Butler Service 24/7",
          "Unpacking and packing services",
          "Complimentary beverage service upon arrival",
          "Twice-daily housekeeping with evening turndown",
        ],
        specialFeatures: [
          "Pre-set Shabbat and Yom Tov keys / access options",
          "Automatic blackout drapery and climate control",
          "In-room electronic safe suitable for laptop",
          "Connecting rooms available for families",
        ],
      },
    },
    {
      id: "grand-luxe-suite",
      title: "Grand Luxe Plunge Pool Suite",
      bedConfig: "1 King or 2 Queen beds · Ocean view",
      size: "950 sq ft · 88 sq m",
      view: "Direct oceanfront view",
      description:
        "Expansive living area with an oversized private terrace featuring a personal plunge pool.",
      image: AllImages.stRegisGallery2,
      gallery: [
        AllImages.stRegisGallery2,
        AllImages.stRegisGallery3,
        AllImages.stRegisGallery4,
        AllImages.stRegisGallery1,
      ],
      features: {
        bedsAndBedding: [
          "1 King bed in private master bedroom",
          "Queen sofa bed in living room",
          "Cribs permitted on request",
        ],
        bathroom: [
          "Oversized dual-vanity master bathroom",
          "Outdoor open-air rain shower and deep soaking tub",
          "Full powder room for guests",
        ],
        furniture: [
          "Expansive private terrace with plunge pool",
          "Separate dining room seating 6 guests",
          "Curated local Riviera Maya artwork",
        ],
        foodAndBeverage: [
          "Full-size kosher Passover pantry bar",
          "Concierge pre-stocking service",
        ],
        internetAndPhones: [
          "High-speed fiber-optic Wi-Fi",
          "Sonos premium sound system",
        ],
        hospitality: [
          "Dedicated St. Regis Suite Butler",
          "Priority Passover dining reservations",
        ],
        specialFeatures: [
          "Private heated plunge pool on terrace",
          "Direct beach access pathways",
        ],
      },
    },
    {
      id: "riviera-luxe-room",
      title: "Riviera Luxe Room",
      bedConfig: "1 King bed · Ocean view",
      size: "680 sq ft · 63 sq m",
      view: "Panoramic ocean & mangrove view",
      description:
        "Sun-drenched haven with floor-to-ceiling glass walls showcasing unobstructed Caribbean vistas.",
      image: AllImages.stRegisGallery3,
      gallery: [
        AllImages.stRegisGallery3,
        AllImages.stRegisGallery4,
        AllImages.stRegisGallery1,
        AllImages.stRegisGallery2,
      ],
      features: {
        bedsAndBedding: [
          "1 King bed with custom featherbed topper",
          "Hypoallergenic bedding options available",
        ],
        bathroom: [
          "Freestanding oval tub overlooking the ocean",
          "Glass-enclosed rain shower",
        ],
        furniture: [
          "Wraparound furnished balcony with daybed",
          "Indoor breakfast table and reading armchairs",
        ],
        foodAndBeverage: [
          "Kosher Passover refreshments and wine selection",
        ],
        internetAndPhones: [
          "High-speed Wi-Fi and Bluetooth sound system",
        ],
        hospitality: [
          "Signature 24/7 St. Regis Butler Service",
        ],
        specialFeatures: [
          "Panoramic corner perspective of the Kanai reserve",
        ],
      },
    },
  ],

  dining: [
    {
      id: "toro",
      title: "Toro",
      cuisine: "Latin American & Grill",
      category: "latin",
      categoryLabel: "Latin American",
      mealPeriod: "Dinner · Daily 6:30 PM – 11:00 PM",
      hours: "Daily 6:30 PM – 11:00 PM",
      location: "Oceanfront Boardwalk",
      description:
        "A vibrant Latin American dining experience featuring prime cuts, wood-fired specialties, and handcrafted mocktails, all Glatt Kosher for Passover.",
      image: AllImages.regisResturant,
      gallery: [
        AllImages.regisResturant,
        AllImages.stRegisGallery4,
        AllImages.stRegisGallery1,
        AllImages.stRegisGallery2,
      ],
      kashrutNotes: "Strictly Glatt Kosher Mehadrin, Cholov Yisroel, Non-Gebrochts",
      dressCode: "Smart Casual / Resort Evening",
    },
    {
      id: "chaya",
      title: "Chaya",
      cuisine: "Eastern Mediterranean Fine Dining",
      category: "mediterranean",
      categoryLabel: "Mediterranean",
      mealPeriod: "Breakfast, Lunch & Dinner",
      hours: "Daily 7:00 AM – 10:30 PM",
      location: "Main Building Lobby Level",
      description:
        "Fresh Mediterranean flavors combining herbs, cold-pressed olive oils, and seasonal Riviera Maya produce prepared according to strict Passover tradition.",
      image: AllImages.stRegisGallery4,
      gallery: [
        AllImages.stRegisGallery4,
        AllImages.regisResturant,
        AllImages.stRegisGallery2,
      ],
      kashrutNotes: "Strictly Glatt Kosher Mehadrin, Mashgiach Temidi on site",
      dressCode: "Resort Casual during day, Elegant in evening",
    },
    {
      id: "st-regis-bar",
      title: "The St. Regis Bar",
      cuisine: "Artisan Tapas & Signature Mixology",
      category: "cafe",
      categoryLabel: "Café & Desserts",
      mealPeriod: "Evenings · 5:00 PM – 1:00 AM",
      hours: "Daily 5:00 PM – 1:00 AM",
      location: "Second Level Terrace",
      description:
        "Intimate lounge setting with sweeping constellation-inspired architecture, serving kosher boutique wines, spirits, and late-night delicacies.",
      image: AllImages.stRegisGallery2,
      gallery: [
        AllImages.stRegisGallery2,
        AllImages.stRegisGallery3,
        AllImages.regisResturant,
      ],
      kashrutNotes: "Supervised kosher Passover wine and spirits list",
      dressCode: "Smart Casual",
    },
  ],

  pools: [
    {
      id: "family-pool",
      title: "Family Pool",
      type: "pools",
      typeLabel: "Family Pool",
      atmosphere: "Outdoor, on property · Family-friendly",
      hours: "Daily · 8:00 AM – 6:00 PM",
      location: "Central Resort Courtyard",
      description:
        "Expansive zero-entry heated pool designed for all ages, surrounded by cushioned loungers and attentive poolside beverage service.",
      image: AllImages.stRegisFamilyPool,
      gallery: [
        AllImages.stRegisFamilyPool,
        AllImages.stRegisMainPoolBeach,
        AllImages.stRegisSerenityPool,
      ],
      amenities: [
        "Complimentary towel service",
        "Sunscreen and aloe amenities",
        "Child life vests available",
        "Poolside kosher snacks & ice cream",
      ],
    },
    {
      id: "serenity-pool",
      title: "Serenity Pool",
      type: "pools",
      typeLabel: "Serenity Pool",
      atmosphere: "Adults only, on property · Quiet sanctuary",
      hours: "Daily · 8:00 AM – 6:00 PM",
      location: "South Wing Garden Level",
      description:
        "A peaceful adults-only oasis overlooking the lush mangroves, offering private daybeds, chilled towels, and uninterrupted relaxation.",
      image: AllImages.stRegisSerenityPool,
      gallery: [
        AllImages.stRegisSerenityPool,
        AllImages.stRegisMainPoolBeach,
        AllImages.stRegisFamilyPool,
      ],
      amenities: [
        "Adults-only tranquility (18+)",
        "Dedicated quiet zone",
        "Shaded pergolas and daybeds",
        "Continuous hydration service",
      ],
    },
    {
      id: "main-pool",
      title: "Main Pool & Beach",
      type: "beach",
      typeLabel: "Beachfront Pool",
      atmosphere: "Beachfront · Panoramic ocean views",
      hours: "Daily · 7:00 AM – Sunset",
      location: "Beachfront Promenade",
      description:
        "Sweeping multi-tiered pool meeting the turquoise Caribbean shores with two miles of pristine white sand beach.",
      image: AllImages.stRegisMainPoolBeach,
      gallery: [
        AllImages.stRegisMainPoolBeach,
        AllImages.stRegisFamilyPool,
        AllImages.stRegisSerenityPool,
      ],
      amenities: [
        "Direct beachfront access",
        "Luxury private cabana rentals",
        "Beach volleyball & water sports",
        "Full kosher seaside bar",
      ],
    },
  ],

  wellness: [
    {
      id: "salt-soul-yoga",
      title: "Salt & Soul Yoga",
      category: "deck",
      description:
        "Morning gentle vinyasa and sound meditation on the open-air ocean deck to greet the Riviera Maya sunrise.",
      image: AllImages.stRegisGallery1,
      timing: "Daily · 7:30 AM & 9:00 AM",
    },
    {
      id: "soak-rituals",
      title: "Soak Rituals",
      category: "deck",
      description:
        "A private sensory wellness experience in the mineral-rich hydrotherapy circuit and thermal plunge baths.",
      image: AllImages.stRegisGallery3,
      timing: "By appointment · 10:00 AM – 8:00 PM",
    },
    {
      id: "reformer-pilates",
      title: "Reformer Pilates",
      category: "fitness",
      description:
        "Core alignment and strengthening classes led by certified master instructors in our state-of-the-art studio.",
      image: AllImages.stRegisGallery2,
      timing: "Daily · 10:00 AM & 4:00 PM",
    },
  ],

  spa: {
    title: "The St. Regis Spa",
    hours: "Monday to Sunday · 8:00 AM – 11:00 PM",
    location: "Lower level, main building",
    description:
      "Hydrotherapy pools, hammam and steam rooms, massages, facials and a full salon, with treatments bookable through your concierge.",
    image: AllImages.stRegisGallery4,
    gallery: [
      AllImages.stRegisGallery4,
      AllImages.stRegisGallery3,
      AllImages.stRegisGallery2,
      AllImages.stRegisGallery1,
    ],
    treatments: [
      {
        title: "Signature Maya Obsidian Stone Massage",
        description:
          "Warm volcanic stones combined with aromatic indigenous oils release deep muscle tension and restore harmonic balance.",
        duration: "80 minutes",
      },
      {
        title: "Cellular Renewal Facial",
        description:
          "Advanced antioxidant peptide infusion targeting hydration, cellular repair, and immediate radiant luminosity.",
        duration: "60 minutes",
      },
      {
        title: "Hydrotherapy Thermal Circuit",
        description:
          "Sequential immersion through eucalyptus steam, herbal sauna, sensation ice showers, and mineral vitality whirlpools.",
        duration: "90 minutes",
      },
    ],
    amenities: [
      "Separate men's and women's relaxation sanctuaries",
      "Traditional Turkish hammam & steam baths",
      "Full-service hair and nail beauty salon",
      "Private outdoor spa garden and cold plunge",
    ],
  },

  gallery: [
    {
      id: "g1",
      title: "Resort Exterior",
      category: "resort",
      image: AllImages.stRegisResortMain,
    },
    {
      id: "g2",
      title: "Family Pool",
      category: "pools",
      image: AllImages.stRegisFamilyPool,
    },
    {
      id: "g3",
      title: "Beachfront Promenade",
      category: "pools",
      image: AllImages.stRegisMainPoolBeach,
    },
    {
      id: "g4",
      title: "Serenity Pool",
      category: "pools",
      image: AllImages.stRegisSerenityPool,
    },
    {
      id: "g5",
      title: "Deluxe Suite",
      category: "rooms",
      image: AllImages.stRegisGallery1,
    },
    {
      id: "g6",
      title: "Plunge Pool Balcony",
      category: "rooms",
      image: AllImages.stRegisGallery2,
    },
    {
      id: "g7",
      title: "Toro Restaurant",
      category: "dining",
      image: AllImages.regisResturant,
    },
    {
      id: "g8",
      title: "Spa Relaxation",
      category: "spa",
      image: AllImages.stRegisGallery4,
    },
  ],
};
