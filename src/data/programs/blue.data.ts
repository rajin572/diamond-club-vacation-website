import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData, ProgramWhereYouStayData } from "@/components/programs/programs.types";

const WHERE_YOU_STAY: ProgramWhereYouStayData = {
  badge: "Where you'll stay",
  headline: "One resort, the whole experience",
  resorts: [
    {
      id: "casa-nizuc",
      title: "Casa Nizuc",
      description:
        "A Tribute Portfolio Resort in the Aldea Nizuc, between turquoise water and mangrove forest.",
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
    badge: "Passover 2027 · Cancun, Mexico",
    headline: { primary: "Diamond Blue", secondary: "by DCV" },
    subtitle:
      "The hospitality, cuisine and programming you expect from Diamond Club, at the brand-new Casa Nizuc and at exceptional value.",
    ctas: {
      primary: {
        label: "Inquire about this program",
        href: "/inquire?holiday=passover-2027&destination=blue",
      },
      secondary: { label: "Where you'll stay", href: "#where-youll-stay" },
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
    headline: "An exceptional Passover, made accessible",
    paragraphs: [
      "Diamond Blue by DCV was created to make an exceptional Passover experience more accessible. Enjoy the hospitality, outstanding cuisine, attentive service and thoughtful programming you expect from Diamond Club Vacations, all at an exceptional value.",
      "Set at the brand-new Casa Nizuc Resort, Diamond Blue brings together great food, entertainment and warm hospitality for a memorable Passover in the Riviera Maya.",
    ],
    glance: {
      title: "At a glance",
      location: { label: "Location", value: "Cancun, Mexico" },
      resorts: {
        label: "Where you stay",
        value: ["Casa Nizuc Resort"],
      },
      highlights: [
        "Full Diamond Club Passover experience",
        "Beautiful resort and excellent dining",
        "Family-friendly atmosphere",
        "Most accessible price point",
      ],
      cta: {
        label: "Inquire about Diamond Blue",
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
        description: "Nightly shows, DJ parties, kumzitz and comedy.",
        image: AllImages.entertainment,
        row: 1,
        linkTo: "entertainment",
      },
      {
        id: "kids-program",
        title: "Kids Program",
        description: "Day camp, teen program and babysitting.",
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
    ],
  },

  explore: {
    banner: {
      badge:
        "Cenotes, Mayan ruins and eco parks, plus the Aldea Nizuc beach club and La Aldea, right on the property.",
      headline: "Beyond the resort",
      description:
        "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
      linkText: "View all attractions",
      backgroundImage: AllImages.beyondDiamondClubResturant,
    },
    attractions: [
      { id: "attractions", title: "Attractions", image: AllImages.underwaterMuseum },
      { id: "beach-club", title: "Beach Club", image: AllImages.diamondClubBlue1 },
      { id: "la-aldea", title: "La Aldea", image: AllImages.diamondClubBlue2 },
    ],
  },

  inquiry: {
    headline: { part1: "Join Diamond Blue for ", part2: "Passover 2027" },
    subtitle: "Availability is limited. Tell us about your group and our team will be in touch.",
    cta: {
      label: "Inquire about Diamond Blue",
      href: "/inquire?holiday=passover-2027&destination=blue",
    },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
