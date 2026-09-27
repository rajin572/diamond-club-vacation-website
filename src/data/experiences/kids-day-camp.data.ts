import { AllImages } from "../../../public/images/AllImages";
import type { KidsDayCampData } from "@/components/kidsDayCamp/kidsDayCamp.types";

export const KIDS_DAY_CAMP_BY_PROGRAM: Record<string, KidsDayCampData> = {
  "diamond-club-reserve": {
    programId: "diamond-club-reserve",
    programName: "Diamond Club Reserve",
    hero: {
      badge: "Kids Program",
      titlePart1: "Day Camp & ",
      titlePart2: "Teen Program",
      description:
        "An action-packed day camp schedule for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.",
    },
    gallery: {
      mainPhoto: AllImages.kidsProgram,
      counselorsPhoto: AllImages.experience1,
      waterParkPhoto: AllImages.ecoAdventureParks,
      artsCraftsPhoto: AllImages.experience2,
      kidsPhoto: AllImages.aboutPoolLeft,
    },
    overview: {
      title: "An unforgettable Passover for every age",
      description:
        "We make sure every child, from our youngest guests to our teens, has an incredible Passover filled with fun, friendship, adventure and meaningful experiences.",
    },
    team: [
      {
        id: "shlomo-meisels",
        role: "Day Camp Director",
        name: "Shlomo Meisels",
        bio: "Oversees the complete children’s program, keeping it organized, exciting and memorable from start to finish.",
      },
      {
        id: "soussan-sports",
        role: "Sports",
        name: "Soussan Sports",
        bio: "Professional sports programming with coaching, tournaments, competitions, team activities and outdoor fun.",
      },
      {
        id: "sara-kiddies",
        role: "Kiddies Program",
        name: "Led by Sara",
        bio: "A warm and nurturing environment for our youngest guests, with age-appropriate games, crafts and supervised play.",
      },
    ],
    activities: [
      {
        id: "kids-day-camp",
        title: "Kids Day Camp",
        description:
          "Action-packed days filled with treasure hunts, arts & crafts, sports, pool activities, blow-ups, shows, competitions, themed activities, entertainment and more.",
      },
      {
        id: "teen-program",
        title: "Teen Program",
        description:
          "Dedicated programming created for teens, including sports, social events, entertainment, outings and activities designed for their age group.",
      },
      {
        id: "chol-hamoed-trips",
        title: "Chol Hamoed Trips & Adventures",
        description: "The excitement goes beyond the resort, with special off-property trips and experiences during Chol Hamoed.",
      },
      {
        id: "evening-entertainment",
        title: "Evening Entertainment",
        description: "Special activities, shows, competitions and extended Chol Hamoed programming for our older children.",
      },
    ],
    ageGroups: [
      { group: "Infants", ages: "18 months – 2 years", highlights: "Supervised play in the baby room" },
      { group: "Toddlers", ages: "3 – 5", highlights: "Age-appropriate games, crafts and activities" },
      { group: "Children", ages: "6 – 9", highlights: "Day camp, pool activities, shows and competitions" },
      { group: "Pre-Teens", ages: "10 – 12", highlights: "Extended evening programming during Chol Hamoed" },
      { group: "Teens", ages: "13+", highlights: "Dedicated activities, sports, social events and outings" },
    ],
    dining: {
      title: "Children’s dining",
      paragraphs: [
        "Delicious, kid-friendly meals are served nightly in our dedicated Children’s Dining Room.",
        "Camp and dining hours are coordinated with the overall entertainment and activity schedule, giving parents time to relax and enjoy the program while the kids are having an incredible experience of their own.",
      ],
    },
    babysitting: {
      title: "Babysitting",
      description: "Babysitting is available during camp hours in our dedicated baby room.",
      rateText: "Private babysitting is also available for $20 per hour.",
    },
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
  },
};
