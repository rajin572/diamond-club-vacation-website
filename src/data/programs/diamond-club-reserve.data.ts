import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData, ProgramWhereYouStayData } from "@/components/programs/programs.types";

const WHERE_YOU_STAY: ProgramWhereYouStayData = {
  badge: "Where you'll stay",
  headline: "Two five-diamond resorts, one gated sanctuary",
  resorts: [
    {
      id: "st-regis",
      title: "The St. Regis Kanai Resort",
      description: "Beachfront suites, signature dining and the main Passover program.",
      image: AllImages.regisResturant,
      linkText: "View resort",
    },
    {
      id: "edition",
      title: "The Edition Resort",
      description: "Contemporary rooms and suites beside the mangrove reserve and the beach club.",
      image: AllImages.edisonResturant,
      linkText: "View resort",
    },
  ],
};

export const DIAMOND_CLUB_RESERVE_DATA: ProgramData = {
  id: "diamond-club-reserve",
  offeringId: "passover-collection-2027",
  title: { part1: "Diamond Club ", part2: "Reserve" },
  badge: "Reserve · Riviera Maya, Kanai",
  subtitle: "Our most exclusive Passover experience",
  description:
    "Experience Diamond Club Reserve for Passover 2027 at The St. Regis Kanai Resort and The Edition Resort in the Riviera Maya. Two five-diamond resorts, one exclusive sanctuary.",
  highlights: [
    { id: "res-1", text: "The highest level of luxury accommodations" },
    { id: "res-2", text: "Exclusive service and personal attention" },
    { id: "res-3", text: "Premium dining and signature experiences" },
    { id: "res-4", text: "Limited availability" },
  ],
  images: {
    primary: { src: AllImages.diamondClubReserveHero, alt: "Diamond Club Reserve — Passover 2027" },
    secondary: {
      src: AllImages.diamondClubReserver2,
      alt: "Diamond Club Reserve private luxury suite interior and ocean terrace",
    },
  },
  metaKeywords: [
    "Diamond Club Reserve",
    "Passover 2027",
    "The St. Regis Kanai Resort",
    "The Edition Resort",
    "Riviera Maya Passover",
    "Luxury kosher vacation",
    "Kanai Mexico luxury resort",
    "Glatt Kosher Passover resort",
  ],

  hero: {
    badge: "Passover 2027 · The Riviera Maya, Kanai",
    headline: { primary: "Diamond Club", secondary: "Reserve" },
    subtitle: "Our most exclusive Passover experience",
    ctas: {
      primary: { label: "Inquire about this program", href: "/inquire?holiday=passover-2027&destination=diamond-club-reserve" },
      secondary: { label: "Where you'll stay", href: "#where-youll-stay" },
    },
    backgroundImage: AllImages.diamondClubReserveHero,
  },

  tabs: [
    { id: "about-this-event", label: "About this event", href: "#about-this-event" },
    { id: "where-youll-stay", label: "Where you'll stay", href: "#where-youll-stay" },
    { id: "experiences", label: "Experiences", href: "#experiences" },
    { id: "explore", label: "Explore", href: "#explore" },
  ],

  about: {
    badge: "About this event",
    headline: "Two iconic resorts, one exclusive Passover",
    paragraphs: [
      "This Passover, Diamond Club hosts its renowned program in Kanai at two of the Riviera Maya's most celebrated resorts: The St. Regis Kanai Resort and The Edition Resort, both exclusively reserved for our guests.",
      "Choose the resort that suits your family. The St. Regis offers timeless, residential-style luxury with signature butler service, while The Edition brings a contemporary, design-led atmosphere. Guests at either resort share the full Diamond Club program: dining, entertainment, scholars and the kids program.",
      "Kanai is a 680-acre gated sanctuary set within a protected mangrove reserve, with 91% of its landscape left untouched. Two miles of white sand beach sit just half a mile from one of the world's largest coral reefs.",
    ],
    glance: {
      title: "At a glance",
      location: { label: "Location", value: "Kanai, The Riviera Maya" },
      resorts: {
        label: "Choose your resort",
        value: WHERE_YOU_STAY.resorts.map((r) => r.title),
      },
      highlights: [
        "The highest level of luxury accommodations",
        "Exclusive service and personal attention",
        "Premium dining and signature experiences",
        "Limited availability",
      ],
      cta: { label: "Inquire about Reserve", href: "/inquire?holiday=passover-2027&destination=diamond-club-reserve" },
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
        id: "scholars",
        title: "Scholars",
        description: "Talks and classes with renowned speakers.",
        image: AllImages.scholars,
        row: 1,
        linkTo: "scholars",
      },
      {
        id: "our-chefs",
        title: "Our Chefs",
        description: "Signature kosher menus from our executive chefs.",
        image: AllImages.ourChefs,
        row: 2,
      },
      {
        id: "kosher-supervision",
        title: "Kosher Supervision",
        description: "Every kitchen and every meal under trusted supervision.",
        image: AllImages.koshaSupervision,
        row: 2,
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
    headline: { part1: "Reserve your place for ", part2: "Passover 2027" },
    subtitle: "Availability is limited. Tell us about your group and our team will be in touch.",
    cta: { label: "Inquire about Reserve", href: "/inquire?holiday=passover-2027&destination=diamond-club-reserve" },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
