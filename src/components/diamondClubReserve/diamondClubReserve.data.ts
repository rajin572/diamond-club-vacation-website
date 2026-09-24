import { AllImages } from "../../../public/images/AllImages";
import type {
  ReserveHeroData,
  ReserveAboutData,
  ReserveWhereYouStayData,
  ReserveExperiencesData,
  ReserveExploreData,
  ReserveInquiryData,
} from "./diamondClubReserve.types";

/**
 * Diamond Club Reserve Hero Data
 * Figma Node: 40015056:102
 */
export const RESERVE_HERO_DATA: ReserveHeroData = {
  badge: "Passover 2027 · The Riviera Maya, Kanai",
  headline: {
    primary: "Diamond Club",
    secondary: "Reserve",
  },
  subtitle: "Our most exclusive Passover experience",
  ctas: {
    primary: {
      label: "Inquire about this program",
      href: "/inquire?program=reserve",
    },
    secondary: {
      label: "Where you'll stay",
      href: "#where-youll-stay",
    },
  },
  backgroundImage: AllImages.diamondClubReserveHero,
};

/**
 * In-Page Navigation Tabs
 */
export const RESERVE_NAV_TABS = [
  { id: "about-this-event", label: "About this event", href: "#about-this-event" },
  { id: "where-youll-stay", label: "Where you'll stay", href: "#where-youll-stay" },
  { id: "experiences", label: "Experiences", href: "#experiences" },
  { id: "explore", label: "Explore", href: "#explore" },
];

/**
 * About This Event Data
 */
export const RESERVE_ABOUT_DATA: ReserveAboutData = {
  badge: "About this event",
  headline: "Two iconic resorts, one exclusive Passover",
  paragraphs: [
    "This Passover, Diamond Club hosts its renowned program in Kanai at two of the Riviera Maya's most celebrated resorts: The St. Regis Kanai Resort and The Edition Resort, both exclusively reserved for our guests.",
    "Choose the resort that suits your family. The St. Regis offers timeless, residential-style luxury with signature butler service, while The Edition brings a contemporary, design-led atmosphere. Guests at either resort share the full Diamond Club program: dining, entertainment, scholars and the kids program.",
    "Kanai is a 680-acre gated sanctuary set within a protected mangrove reserve, with 91% of its landscape left untouched. Two miles of white sand beach sit just half a mile from one of the world's largest coral reefs.",
  ],
  glance: {
    title: "At a glance",
    location: {
      label: "Location",
      value: "Kanai, The Riviera Maya",
    },
    resorts: {
      label: "Choose your resort",
      value: ["The St. Regis Kanai Resort", "The Edition Resort"],
    },
    highlights: [
      "The highest level of luxury accommodations",
      "Exclusive service and personal attention",
      "Premium dining and signature experiences",
      "Limited availability",
    ],
    cta: {
      label: "Inquire about Reserve",
      href: "/inquire?program=reserve",
    },
  },
};

/**
 * Where You'll Stay Data
 */
export const RESERVE_WHERE_YOU_STAY_DATA: ReserveWhereYouStayData = {
  badge: "Where you'll stay",
  headline: "Two five-diamond resorts, one gated sanctuary",
  resorts: [
    {
      id: "st-regis",
      title: "The St. Regis Kanai Resort",
      description: "Beachfront suites, signature dining and the main Passover program.",
      image: AllImages.regisResturant,
      linkText: "View resort",
      href: "/inquire?program=reserve&resort=st-regis",
    },
    {
      id: "edition",
      title: "The Edition Resort",
      description: "Contemporary rooms and suites beside the mangrove reserve and the beach club.",
      image: AllImages.edisonResturant,
      linkText: "View resort",
      href: "/inquire?program=reserve&resort=edition",
    },
  ],
};

/**
 * Experiences Data
 */
export const RESERVE_EXPERIENCES_DATA: ReserveExperiencesData = {
  badge: "Experiences",
  headline: "Something for every member of the family",
  experiences: [
    {
      id: "entertainment",
      title: "Entertainment",
      description: "Nightly shows, concerts, comedy and kumzitz.",
      image: AllImages.entertainment,
    },
    {
      id: "kids-program",
      title: "Kids Program",
      description: "Day camp, teen program, trips and babysitting.",
      image: AllImages.kidsProgram,
    },
    {
      id: "scholars",
      title: "Scholars",
      description: "Talks and classes with renowned speakers.",
      image: AllImages.scholars,
    },
    {
      id: "our-chefs",
      title: "Our Chefs",
      description: "Signature kosher menus from our executive chefs.",
      image: AllImages.ourChefs,
    },
    {
      id: "kosher-supervision",
      title: "Kosher Supervision",
      description: "Every kitchen and every meal under trusted supervision.",
      image: AllImages.koshaSupervision,
    },
  ],
};

/**
 * Explore / Beyond The Resort Data
 */
export const RESERVE_EXPLORE_DATA: ReserveExploreData = {
  banner: {
    badge: "Explore",
    headline: "Beyond the resort",
    description:
      "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
    linkText: "View all attractions",
    href: "/inquire?program=reserve&topic=attractions",
    backgroundImage: AllImages.beyondDiamondClubResturant,
  },
  attractions: [
    {
      id: "underwater-museum",
      title: "Underwater museum",
      image: AllImages.underwaterMuseum,
    },
    {
      id: "mayan-ruins",
      title: "Mayan ruins",
      image: AllImages.mayanRuins,
    },
    {
      id: "eco-adventure-parks",
      title: "Eco & adventure parks",
      image: AllImages.ecoAdventureParks,
    },
  ],
};

/**
 * Bottom Inquiry Banner Data
 */
export const RESERVE_INQUIRY_DATA: ReserveInquiryData = {
  headline: {
    part1: "Reserve your place for ",
    part2: "Passover 2027",
  },
  subtitle: "Availability is limited. Tell us about your group and our team will be in touch.",
  cta: {
    label: "Inquire about Reserve",
    href: "/inquire?program=reserve",
  },
  backgroundImage: AllImages.passoverInquireBanner,
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries & mutations:
//
// export const useGetDiamondClubReservePageQuery = () => {
//   // GET: Fetch all Diamond Club Reserve program content dynamically
//   // return useGetReservePageQuery();
//   return {
//     data: {
//       hero: RESERVE_HERO_DATA,
//       about: RESERVE_ABOUT_DATA,
//       stay: RESERVE_WHERE_YOU_STAY_DATA,
//       experiences: RESERVE_EXPERIENCES_DATA,
//       explore: RESERVE_EXPLORE_DATA,
//       inquiry: RESERVE_INQUIRY_DATA,
//     },
//     isLoading: false,
//   };
// };
//
// export const useCreateReserveBookingInquiryMutation = () => {
//   // POST: Submit a bespoke booking inquiry specifically for Diamond Club Reserve
//   // const [createInquiry, { isLoading }] = useCreateReserveInquiryMutation();
//   // return { createInquiry, isLoading };
// };
//
// export const useUpdateReserveContentMutation = () => {
//   // PATCH: Update program itinerary, speaker lists, or chef highlights
//   // const [updateReserve, { isLoading }] = useUpdateReserveContentMutation();
//   // return { updateReserve, isLoading };
// };
//
// export const useDeleteReserveExperienceItemMutation = () => {
//   // DELETE: Remove or archive an experience item or attraction
//   // const [deleteItem, { isLoading }] = useDeleteExperienceMutation();
//   // return { deleteItem, isLoading };
// };
// =============================================================================

