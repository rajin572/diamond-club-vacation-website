import { AllImages } from "../../../public/images/AllImages";
import type { ProgramData } from "@/components/programs/programs.types";

export const GUTTAWAY_DATA: ProgramData = {
  id: "guttaway",
  offeringId: "passover-collection-2027",
  title: { part1: "Guttaway a ", part2: "DCV Program" },
  badge: "Riviera Maya, Amai",
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
  metaKeywords: ["Guttaway a DCV Program", "Passover 2027", "Amai Riviera Maya", "Waldorf Astoria", "Park Hyatt"],

  // No `hero`/`tabs`/`whereYouStay`/etc. yet — ProgramMainView renders the lightweight
  // hero + about page from the fields above until this program's full design is ready.
  inquiry: {
    headline: { part1: "Ready to plan your ", part2: "Passover?" },
    subtitle: "Tell us about your group and our team will get back to you with options and availability.",
    cta: { label: "Start your inquiry", href: "/inquire?holiday=passover-2027&destination=guttaway" },
    backgroundImage: AllImages.passoverInquireBanner,
  },
};
