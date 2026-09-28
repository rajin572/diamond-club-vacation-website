import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData, ProgramWhereYouStayData } from "@/components/programs/programs.types";

const WHERE_YOU_STAY: ProgramWhereYouStayData = {
  badge: "Where you'll stay",
  headline: "A private oceanfront sanctuary at Punta Nizuc",
  resorts: [
    {
      id: "casa-nizuc",
      title: "Casa Nizuc",
      description:
        "A tranquil retreat perched above pristine sands, offering timeless luxury, world-class dining, and restorative wellness.",
      image: AllImages.diamondClubBlue1,
      linkText: "View resort",
    },
  ],
};

export const BLUE_DATA: ProgramData = {
  id: "blue",
  offeringId: "passover-collection-2027",
  title: { part1: "Diamond Club ", part2: "Blue by DCV" },
  badge: "Passover 2027 · Cancun Mexico",
  subtitle: "Luxury made accessible",
  description:
    "The hospitality, cuisine and programming you expect from Diamond Club, at the brand-new Casa Nizuc and at exceptional value.",
  highlights: [
    { id: "blu-1", text: "The full Diamond Club Passover experience" },
    { id: "blu-2", text: "Brand-new beachfront resort at Casa Nizuc" },
    { id: "blu-3", text: "Four kosher dining venues & round-the-clock tea room" },
    { id: "blu-4", text: "Full-day camp & dedicated teen lounge" },
    { id: "blu-5", text: "Our most accessible luxury price point" },
  ],
  images: {
    primary: {
      src: AllImages.diamondClubBlue1,
      alt: "Diamond Club Blue by DCV tropical resort pools and beach cabanas in Cancun",
    },
    secondary: {
      src: AllImages.diamondClubBlue2,
      alt: "Diamond Club Blue gourmet kosher culinary presentation and dining",
    },
  },
  metaKeywords: [
    "Diamond Club Blue",
    "Passover 2027",
    "Cancun Mexico",
    "Casa Nizuc",
    "Glatt Kosher Passover",
    "Luxury Passover Program",
  ],

  hero: {
    badge: "Passover 2027 · Cancun Mexico",
    headline: { primary: "Diamond Club Blue", secondary: "by DCV" },
    subtitle:
      "The hospitality, cuisine and programming you expect from Diamond Club, at the brand-new Casa Nizuc and at exceptional value.",
    ctas: {
      primary: {
        label: "Inquire about this program",
        href: "/inquire?holiday=passover-2027&destination=blue",
      },
      secondary: { label: "Explore resort", href: "#where-youll-stay" },
    },
    backgroundImage: AllImages.diamondClubBlue1,
  },

  tabs: [
    { id: "about-this-event", label: "About this event", href: "#about-this-event" },
    { id: "where-youll-stay", label: "Where you'll stay", href: "#where-youll-stay" },
    { id: "experiences", label: "Experiences", href: "#experiences" },
    { id: "explore", label: "Explore", href: "#explore" },
  ],

  about: {
    badge: "About this event",
    headline: "The full Diamond Club Passover experience, at exceptional value",
    paragraphs: [
      "Diamond Club Blue is designed for families who want the warmth, community, and impeccable standards of a DCV Passover, set in the breathtaking beauty of Cancun. Hosted at the brand-new Casa Nizuc, the program combines contemporary luxury with effortless convenience.",
      "From Glatt Kosher master chef dining to world-class entertainment, dynamic day camps, and thought-provoking scholars, every detail has been thoughtfully crafted to provide an extraordinary holiday retreat at our most accessible offering.",
      "Enjoy private beachfront cabanas, pristine coral waters, curated evening shows, and the comprehensive care of Diamond Club hospitality all through Passover 2027.",
    ],
    glance: {
      title: "At a glance",
      location: { label: "Location", value: "Cancun, Mexico" },
      resorts: {
        label: "Featured resort",
        value: WHERE_YOU_STAY.resorts.map((r) => r.title),
      },
      highlights: [
        "The full Diamond Club Passover experience",
        "Brand-new beachfront resort at Casa Nizuc",
        "Four kosher dining venues & round-the-clock tea room",
        "Full-day camp & dedicated teen lounge",
        "Nightly headline concerts and entertainment",
        "Our most accessible luxury price point",
      ],
      cta: {
        label: "Inquire about Diamond Club Blue",
        href: "/inquire?holiday=passover-2027&destination=blue",
      },
    },
  },

  whereYouStay: WHERE_YOU_STAY,

  experiences: {
    badge: "Experiences",
    headline: "Something for every member of the family",
    experiences: [
      {
        id: "entertainment",
        title: "Entertainment",
        description: "Nightly shows, afterparties, concerts and comedic performances.",
        image: AllImages.entertainment,
        row: 1,
        linkTo: "entertainment",
      },
      {
        id: "scholars",
        title: "Scholars & Speakers",
        description: "Inspiring shiurim, lectures and panel discussions with prominent educators.",
        image: AllImages.scholars,
        row: 1,
        linkTo: "scholars",
      },
      {
        id: "kids-program",
        title: "Kids Program",
        description: "Comprehensive day camp, teen outings and evening programming.",
        image: AllImages.kidsProgram,
        row: 1,
        linkTo: "kids-program",
      },
      {
        id: "kids-day-camp",
        title: "Day Camp & Teen Lounge",
        description: "Daily games, sports, crafts, excursions and babysitting services.",
        image: AllImages.experience1,
        row: 2,
        linkTo: "kids-day-camp",
      },
      {
        id: "kosher-supervision",
        title: "Kosher Supervision",
        description: "Every kitchen and meal under strict Mehadrin Glatt Kosher certification.",
        image: AllImages.koshaSupervision,
        row: 2,
      },
      {
        id: "chefs",
        title: "Master Chefs",
        description: "Four distinctive culinary venues curated by international master chefs.",
        image: AllImages.ourChefs,
        row: 2,
      },
    ],
  },

  explore: {
    banner: {
      badge: "Explore",
      headline: "Beyond the resort",
      description:
        "Explore the ancient Mayan heritage, crystal-clear cenotes, and vibrant eco-parks of Cancun and the Riviera Maya.",
      linkText: "View all attractions",
      backgroundImage: AllImages.beyondDiamondClubResturant,
    },
    attractions: [
      { id: "attractions", title: "Local Attractions", image: AllImages.underwaterMuseum },
      { id: "beach-club", title: "Beach Club", image: AllImages.diamondClubBlue1 },
      { id: "la-aldea", title: "La Aldea", image: AllImages.diamondClubBlue2 },
    ],
  },

  inquiry: {
    headline: { part1: "Join Diamond Club Blue for ", part2: "Passover 2027" },
    subtitle: "Availability is limited at Casa Nizuc. Tell us about your group and our team will be in touch.",
    cta: {
      label: "Inquire about Diamond Club Blue",
      href: "/inquire?holiday=passover-2027&destination=blue",
    },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
