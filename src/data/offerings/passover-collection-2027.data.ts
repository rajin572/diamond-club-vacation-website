import { AllImages } from "../../../public/images/AllImages";
import type { OfferingData } from "@/components/offerings/offerings.types";

export const PASSOVER_COLLECTION_2027_DATA: OfferingData = {
  id: "passover-collection-2027",

  hero: {
    headline: { primary: "Passover Collection", secondary: "2027" },
    subtext: "World-class hospitality, exceptional moments.",
    cta: { label: "Inquire", href: "/inquire?holiday=passover-2027" },
    backgroundImage: AllImages.passoverHero,
  },

  programsSection: {
    badge: "Passover Collection 2027",
    title: "Three programs, one standard of excellence",
    description:
      "Choose the Passover experience that fits your family. Every program shares the same attention to service, dining and detail.",
    programs: [
      {
        id: "diamond-club-reserve",
        badge: "Riviera Maya, Kanai",
        title: { part1: "Diamond Club ", part2: "Reserve" },
        subtitle: "Our most exclusive Passover experience",
        description:
          "Hosted at Diamond Club Resort and Casa Nizuc, reserved exclusively for our guests, for a luxurious and intimate five-diamond Passover.",
        highlights: [
          { id: "res-1", text: "The highest level of luxury accommodations" },
          { id: "res-2", text: "Exclusive service and personal attention" },
          { id: "res-3", text: "Premium dining and signature experiences" },
          { id: "res-4", text: "Limited availability" },
        ],
        images: {
          primary: {
            src: AllImages.diamondClubReserver1,
            alt: "Diamond Club Reserve resort oceanfront villa and pool in Riviera Maya, Kanai",
          },
          secondary: {
            src: AllImages.diamondClubReserver2,
            alt: "Diamond Club Reserve private luxury suite interior and ocean terrace",
          },
        },
        ctaLabel: "Explore program",
      },
      {
        id: "guttaway",
        badge: "Riviera Maya, Amai",
        title: { part1: "Guttaway a ", part2: "DCV Program" },
        subtitle: "Elevated Passover for the whole family",
        description:
          "Set across two five-diamond beachfront resorts, with world-class accommodations, exceptional dining and programs for every generation.",
        highlights: [
          { id: "gut-1", text: "Luxury accommodations and amenities" },
          { id: "gut-2", text: "Exceptional dining and entertainment" },
          { id: "gut-3", text: "Family-oriented programs" },
          { id: "gut-4", text: "Outstanding value" },
        ],
        images: {
          primary: {
            src: AllImages.guttawayDCVProgram1,
            alt: "Guttaway a DCV Program pristine beachfront lounge and turquoise waters in Amai",
          },
          secondary: {
            src: AllImages.guttawayDCVProgram2,
            alt: "Guttaway a DCV Program fine dining and festive family gathering",
          },
        },
        ctaLabel: "Explore program",
      },
      {
        id: "blue",
        badge: "Cancun Mexico",
        title: { part1: "Diamond Club ", part2: "Blue by DCV" },
        subtitle: "Luxury made accessible",
        description:
          "The hospitality, cuisine and programming you expect from Diamond Club, at the brand-new Casa Nizuc and at exceptional value.",
        highlights: [
          { id: "blu-1", text: "The full Diamond Club Passover experience" },
          { id: "blu-2", text: "Beautiful resort and excellent dining" },
          { id: "blu-3", text: "Family-friendly atmosphere" },
          { id: "blu-4", text: "Our most accessible price point" },
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
        ctaLabel: "Explore program",
      },
    ],
  },

  compare: {
    badge: "Compare",
    headline: { lead: "Find the ", accent: "right fit", tail: " for your family" },
    columns: [
      { id: "diamond-club-reserve", name: "Diamond Club\nReserve" },
      { id: "guttaway", name: "Guttaway a DCV\nProgram" },
      { id: "blue", name: "Diamond Club Blue\nby DCV" },
    ],
    rows: [
      {
        category: "Resorts",
        values: {
          "diamond-club-reserve": "The St. Regis Kanai Resort & The Edition Resort",
          guttaway: "Waldorf Astoria & Park Hyatt",
          blue: "Casa Nizuc Resort & Spa",
        },
      },
      {
        category: "Location",
        values: {
          "diamond-club-reserve": "Kanai, Riviera Maya",
          guttaway: "Amai, Riviera Maya",
          blue: "Cancun, Mexico",
        },
      },
      {
        category: "Best for",
        values: {
          "diamond-club-reserve": "Guests who want the most exclusive experience",
          guttaway: "Families who want elevated luxury and value",
          blue: "Families who want the full experience, accessibly priced",
        },
      },
      {
        category: "Kids & teen program",
        values: { "diamond-club-reserve": "Included", guttaway: "Included", blue: "Included" },
      },
      {
        category: "Scholars",
        values: { "diamond-club-reserve": "Included", guttaway: "Included", blue: "Included" },
      },
      {
        category: "Entertainment",
        values: {
          "diamond-club-reserve": "Nightly programming",
          guttaway: "Nightly programming",
          blue: "Nightly programming",
        },
      },
      {
        category: "Spa & wellness",
        values: { "diamond-club-reserve": "On property", guttaway: "On property", blue: "On property" },
      },
    ],
  },

  inquiry: {
    headline: { part1: "Ready to plan ", part2: "your Passover?" },
    subtext: "Tell us about your group and our team will get back to you with options and availability.",
    cta: { label: "Start your inquiry", href: "/inquire?holiday=passover-2027" },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
