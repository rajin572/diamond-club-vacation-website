import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData, ProgramWhereYouStayData } from "@/components/programs/programs.types";

const WHERE_YOU_STAY: ProgramWhereYouStayData = {
  badge: "Where you'll stay",
  headline: "Two resorts on one beachfront sanctuary",
  resorts: [
    {
      id: "waldorf-astoria",
      title: "Waldorf Astoria Riviera Maya",
      description: "Refined suites and personal service, set along the Riviera Maya coastline.",
      image: AllImages.waldorfAstoriaResort,
      linkText: "View resort",
    },
    {
      id: "park-hyatt",
      title: "Park Hyatt Riviera Maya",
      description: "Contemporary architecture among lush jungle, steps from the beach.",
      image: AllImages.parkHyattResort,
      linkText: "View resort",
    },
  ],
};

export const GUTTAWAY_DATA: ProgramData = {
  id: "guttaway",
  offeringId: "passover-collection-2027",
  title: { part1: "Guttaway a DCV", part2: "Program" },
  badge: "The Riviera Maya",
  subtitle: "Elevated Pesach for the Heimish family",
  description:
    "Set across two spectacular five-diamond resorts, Waldorf Astoria Riviera Maya and Park Hyatt Riviera Maya, this beachfront sanctuary spans hundreds of acres of pristine coastline and lush tropical jungle.",
  highlights: [
    { id: "gut-1", text: "Luxury accommodations and amenities" },
    { id: "gut-2", text: "Exceptional dining and entertainment" },
    { id: "gut-3", text: "Family-oriented programs" },
    { id: "gut-4", text: "Outstanding value" },
  ],
  images: {
    primary: {
      src: AllImages.guttawayHero,
      alt: "Guttaway a DCV Program beachfront sanctuary and turquoise waters in Riviera Maya",
    },
    secondary: {
      src: AllImages.guttawayDCVProgram2,
      alt: "Guttaway a DCV Program fine dining and festive family gathering",
    },
  },
  metaKeywords: [
    "Guttaway a DCV Program",
    "Passover 2027",
    "Riviera Maya",
    "Waldorf Astoria Riviera Maya",
    "Park Hyatt Riviera Maya",
    "Family Passover vacation",
    "Kosher Passover program",
    "Glatt Kosher Mexico resort",
  ],

  hero: {
    badge: "Passover 2027 · The Riviera Maya",
    headline: { primary: "Guttaway a DCV", secondary: "Program" },
    subtitle: "Elevated Pesach for the Heimish family",
    ctas: {
      primary: {
        label: "Inquire about this program",
        href: "/inquire?holiday=passover-2027&destination=guttaway",
      },
      secondary: { label: "Where you'll stay", href: "#where-youll-stay" },
    },
    backgroundImage: AllImages.guttawayHero,
  },

  tabs: [
    { id: "about-this-event", label: "About this event", href: "#about-this-event" },
    { id: "where-youll-stay", label: "Where you'll stay", href: "#where-youll-stay" },
    { id: "experiences", label: "Experiences", href: "#experiences" },
    { id: "explore", label: "Explore", href: "#explore" },
  ],

  about: {
    badge: "About this event",
    headline: "Two five-diamond resorts, one Passover destination",
    paragraphs: [
      "Guettaway and Diamond Club Vacations come together to create a first-of-its-kind, elevated Heimish Passover: not simply a program, but a destination.",
      "Set across two spectacular five-diamond resorts, Waldorf Astoria Riviera Maya and Park Hyatt Riviera Maya, this beachfront sanctuary spans hundreds of acres of pristine coastline and lush tropical jungle.",
      "Guests enjoy world-class accommodations, exceptional dining, pristine beaches, outstanding amenities and service, thoughtfully curated entertainment and dedicated separate swimming options, all designed to deliver an uncompromising luxury Passover experience.",
      "When two of the world's leading luxury hotel brands and two of the most experienced names in kosher hospitality come together, it's more than a program. It's an experience.",
    ],
    glance: {
      title: "At a glance",
      location: { label: "Location", value: "The Riviera Maya, Mexico" },
      resorts: {
        label: "Choose your resort",
        value: WHERE_YOU_STAY.resorts.map((r) => r.title),
      },
      highlights: [
        "Luxury accommodations and amenities",
        "Exceptional dining and entertainment",
        "Family-oriented programs",
        "Outstanding value",
      ],
      cta: {
        label: "Inquire about Guttaway",
        href: "/inquire?holiday=passover-2027&destination=guttaway",
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
        description: "Nightly shows, concerts, comedy and kumzitz.",
        image: AllImages.entertainment,
        row: 1,
        linkTo: "entertainment",
      },
      {
        id: "kids-program",
        title: "Kids Program",
        description: "Day camp, teen program, trips and babysitting.",
        image: AllImages.kidsProgram,
        row: 1,
        linkTo: "kids-program",
      },
      {
        id: "spa",
        title: "Spa",
        description: "Treatments, hydrotherapy and relaxation.",
        image: AllImages.experience2,
        row: 1,
      },
      {
        id: "kosher-supervision",
        title: "Kosher Supervision",
        description: "Every kitchen and every meal under trusted supervision.",
        image: AllImages.koshaSupervision,
        row: 2,
      },
      {
        id: "chefs",
        title: "Chefs",
        description: "Signature kosher menus from our executive chefs.",
        image: AllImages.ourChefs,
        row: 2,
      },
      {
        id: "scholars",
        title: "Scholars",
        description: "Talks and classes with renowned speakers.",
        image: AllImages.scholars,
        row: 2,
        linkTo: "scholars",
      },
    ],
  },

  explore: {
    banner: {
      badge: "Explore",
      headline: "Beyond the resort",
      description:
        "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
      linkText: "View all attractions",
      backgroundImage: AllImages.beyondDiamondClubResturant,
    },
    attractions: [
      { id: "underwater-museum", title: "Underwater museum", image: AllImages.underwaterMuseum },
      { id: "mayan-ruins", title: "Mayan ruins", image: AllImages.mayanRuins },
      { id: "eco-adventure-parks", title: "Eco & adventure parks", image: AllImages.ecoAdventureParks },
    ],
  },

  inquiry: {
    headline: { part1: "Join Guttaway for ", part2: "Passover 2027" },
    subtitle: "Availability is limited. Tell us about your group and our team will be in touch.",
    cta: {
      label: "Inquire about Guttaway",
      href: "/inquire?holiday=passover-2027&destination=guttaway",
    },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
