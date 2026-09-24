import { AllImages } from "../../../public/images/AllImages";
import type {
  PassoverHeroData,
  PassoverProgramItem,
  PassoverCompareData,
  PassoverInquiryData,
} from "./passoverCollection.types";

/**
 * Passover Collection 2027 Hero Data
 * Figma Node: 40015053:239
 */
export const PASSOVER_HERO_DATA: PassoverHeroData = {
  headline: {
    primary: "Passover Collection",
    secondary: "2027",
  },
  subtext: "World-class hospitality, exceptional moments.",
  cta: {
    label: "Inquire",
    href: "/inquire?holiday=passover-2027",
  },
  backgroundImage: AllImages.passoverHero,
};

/**
 * Passover Collection 2027 Three Programs Data
 */
export const PASSOVER_PROGRAMS: PassoverProgramItem[] = [
  {
    id: "reserve",
    badge: "Reserve · Riviera Maya, Kanai",
    title: {
      part1: "Diamond Club ",
      part2: "Reserve",
    },
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
    cta: {
      label: "Explore program",
      href: "/inquire?program=reserve",
    },
  },
  {
    id: "guttaway",
    badge: "Riviera Maya, Amai",
    title: {
      part1: "Guttaway a ",
      part2: "DCV Program",
    },
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
    cta: {
      label: "Explore program",
      href: "/inquire?program=guttaway",
    },
  },
  {
    id: "blue",
    badge: "Cancun Mexico",
    title: {
      part1: "Diamond Club ",
      part2: "Blue by DCV",
    },
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
    cta: {
      label: "Explore program",
      href: "/inquire?program=blue",
    },
  },
];

/**
 * Comparison Table Matrix Data
 */
export const PASSOVER_COMPARE_DATA: PassoverCompareData = {
  badge: "Compare",
  headline: "Find the right fit for your family",
  programs: [
    {
      id: "reserve",
      name: "Diamond Club\nReserve",
    },
    {
      id: "guttaway",
      name: "Guttaway a DCV\nProgram",
    },
    {
      id: "blue",
      name: "Diamond Club Blue\nby DCV",
    },
  ],
  rows: [
    {
      category: "Resorts",
      reserve: "The St. Regis Kanai Resort & The Edition Resort",
      guttaway: "Waldorf Astoria & Park Hyatt",
      blue: "Casa Nizuc Resort & Spa",
    },
    {
      category: "Location",
      reserve: "Kanai, Riviera Maya",
      guttaway: "Amai, Riviera Maya",
      blue: "Cancun, Mexico",
    },
    {
      category: "Best for",
      reserve: "Guests who want the most exclusive experience",
      guttaway: "Families who want elevated luxury and value",
      blue: "Families who want the full experience, accessibly priced",
    },
    {
      category: "Kids & teen program",
      reserve: "Included",
      guttaway: "Included",
      blue: "Included",
    },
    {
      category: "Scholars",
      reserve: "Included",
      guttaway: "Included",
      blue: "Included",
    },
    {
      category: "Entertainment",
      reserve: "Nightly programming",
      guttaway: "Nightly programming",
      blue: "Nightly programming",
    },
    {
      category: "Spa & wellness",
      reserve: "On property",
      guttaway: "On property",
      blue: "On property",
    },
  ],
};

/**
 * Bottom Inquiry Banner Data
 */
export const PASSOVER_INQUIRY_DATA: PassoverInquiryData = {
  headline: "Ready to plan your Passover?",
  subtext:
    "Tell us about your group and our team will get back to you with options and availability.",
  cta: {
    label: "Start your inquiry",
    href: "/inquire?holiday=passover-2027",
  },
  backgroundImage: AllImages.passoverInquireBanner,
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries & mutations:
//
// export const useGetPassoverCollectionDataQuery = () => {
//   // GET: Fetch all Passover Collection 2027 page content (hero, programs, comparison table, inquiry)
//   // return useGetPassoverCollectionQuery();
//   return {
//     data: {
//       hero: PASSOVER_HERO_DATA,
//       programs: PASSOVER_PROGRAMS,
//       compare: PASSOVER_COMPARE_DATA,
//       inquiry: PASSOVER_INQUIRY_DATA,
//     },
//     isLoading: false,
//   };
// };
//
// export const useCreatePassoverProgramMutation = () => {
//   // POST: Create a new Passover program tier
//   // const [createProgram, { isLoading }] = useCreatePassoverProgramMutation();
//   // return { createProgram, isLoading };
// };
//
// export const useUpdatePassoverProgramMutation = () => {
//   // PATCH: Update details, pricing, features, or status of a Passover program
//   // const [updateProgram, { isLoading }] = useUpdatePassoverProgramMutation();
//   // return { updateProgram, isLoading };
// };
//
// export const useDeletePassoverProgramMutation = () => {
//   // DELETE: Remove or archive a program entry
//   // const [deleteProgram, { isLoading }] = useDeletePassoverProgramMutation();
//   // return { deleteProgram, isLoading };
// };
// =============================================================================
