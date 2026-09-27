import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData } from "@/components/programs/programs.types";

export const BLUE_DATA: ProgramData = {
  id: "blue",
  offeringId: "passover-collection-2027",
  title: { part1: "Diamond Club ", part2: "Blue by DCV" },
  badge: "Cancun Mexico",
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
  metaKeywords: ["Diamond Club Blue", "Passover 2027", "Cancun Mexico", "Casa Nizuc"],

  // No `hero`/`tabs`/`whereYouStay`/etc. yet — ProgramMainView renders the lightweight
  // hero + about page from the fields above until this program's full design is ready.
  inquiry: {
    headline: { part1: "Ready to plan your ", part2: "Passover?" },
    subtitle: "Tell us about your group and our team will get back to you with options and availability.",
    cta: { label: "Start your inquiry", href: "/inquire?holiday=passover-2027&destination=blue" },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
