import { AllImages } from "../../../public/images/AllImages";
import type { KidsProgramData } from "@/components/kidsProgram/kidsProgram.types";

export const KIDS_PROGRAM_BY_PROGRAM: Record<string, KidsProgramData> = {
  "diamond-club-reserve": {
    badge: "Experiences",
    headline: { part1: "Kids ", part2: "Program" },
    description:
      "A full program for every age, from supervised play for the youngest guests to a dedicated teen program, so parents can relax and enjoy the holiday.",
    programs: [
      {
        id: "day-camp-teen-program",
        tag: "Ages 18 months to teens",
        title: "Day Camp & Teen Program",
        description:
          "An action-packed day camp for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.",
        linkText: "See details",
        isModalTrigger: false,
        images: {
          main: AllImages.kidsProgram,
          mainPlaceholder: "Day camp photo",
          secondary1: AllImages.ecoAdventureParks,
          secondary1Placeholder: "Water park photo",
          secondary2: AllImages.entertainment,
          secondary2Placeholder: "Counselors photo",
        },
      },
      {
        id: "babysitting",
        tag: "For infants and toddlers",
        title: "Babysitting",
        description:
          "A free, responsible babysitting service is available during camp hours in our dedicated baby room. Private babysitting is also available.",
        linkText: "See details",
        isModalTrigger: true,
        images: { main: AllImages.kidsProgram, mainPlaceholder: "Babysitting photo" },
      },
    ],
    babysittingModal: {
      category: "Kids Program",
      tag: "Free during camp hours",
      title: "Babysitting",
      description:
        "A free, responsible babysitting service is available during camp hours in our special Toddler’s Camp. Private babysitting is available for a fee.",
      when: "During camp hours",
      where: "Toddler’s Camp",
      privateNote: "Available for a fee",
      ctaText: "Ask about babysitting",
      image: AllImages.kidsProgram,
      imagePlaceholderText: "Babysitting photo",
    },
    inquireBanner: {
      headline: { part1: "Bring the whole family for ", part2: "Passover 2027" },
      buttonText: "Inquire",
    },
  },
  guttaway: {
    badge: "Experiences",
    headline: { part1: "Kids ", part2: "Program" },
    description:
      "A full program for every age, from supervised play for the youngest guests to a dedicated teen program, so parents can relax and enjoy the holiday.",
    programs: [
      {
        id: "day-camp-teen-program",
        tag: "Ages 18 months to teens",
        title: "Day Camp & Teen Program",
        description:
          "An action-packed day camp for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.",
        linkText: "See details",
        isModalTrigger: false,
        images: {
          main: AllImages.kidsProgram,
          mainPlaceholder: "Day camp photo",
          secondary1: AllImages.ecoAdventureParks,
          secondary1Placeholder: "Water park photo",
          secondary2: AllImages.entertainment,
          secondary2Placeholder: "Counselors photo",
        },
      },
      {
        id: "babysitting",
        tag: "For infants and toddlers",
        title: "Babysitting",
        description:
          "A free, responsible babysitting service is available during camp hours in our dedicated baby room. Private babysitting is also available.",
        linkText: "See details",
        isModalTrigger: true,
        images: { main: AllImages.kidsProgram, mainPlaceholder: "Babysitting photo" },
      },
    ],
    babysittingModal: {
      category: "Kids Program",
      tag: "Free during camp hours",
      title: "Babysitting",
      description:
        "A free, responsible babysitting service is available during camp hours in our special Toddler’s Camp. Private babysitting is available for a fee.",
      when: "During camp hours",
      where: "Toddler’s Camp",
      privateNote: "Available for a fee",
      ctaText: "Ask about babysitting",
      image: AllImages.kidsProgram,
      imagePlaceholderText: "Babysitting photo",
    },
    inquireBanner: {
      headline: { part1: "Bring the whole family for ", part2: "Passover 2027" },
      buttonText: "Inquire",
    },
  },
};
