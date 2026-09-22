import { InquireFormValues, InquireHoliday, InquireStepDef } from "./inquire.types";

export const INQUIRE_STEPS: InquireStepDef[] = [
  { id: 1, label: "Choose your vacation" },
  { id: 2, label: "Your trip" },
  { id: 3, label: "Add-ons" },
  { id: 4, label: "About you" },
  { id: 5, label: "Contact details" },
  { id: 6, label: "Review" },
];

/**
 * Gradient stand-ins for real property photography -- no licensed photos of
 * these resorts exist in the project yet. Swap `gradientClassName` for a
 * `next/image` background per destination once photos are available.
 */
export const INQUIRE_HOLIDAYS: InquireHoliday[] = [
  {
    id: "passover-2027",
    label: "Passover 2027",
    dates: "April 20, 2027 – May 2, 2027",
    gradientClassName: "bg-gradient-to-br from-[#0a2540] via-[#0f3d68] to-[#00549C]",
    destinations: [
      {
        id: "diamond-club-reserve",
        name: "Diamond Club Reserve",
        description: "Our most exclusive Passover experience, at Kanai in the Riviera Maya.",
        dates: "April 20, 2027 – May 2, 2027",
        gradientClassName: "bg-gradient-to-br from-[#0a2540] via-[#0f3d68] to-[#00549C]",
      },
      {
        id: "diamond-club-gold",
        name: "Diamond Club Gold",
        description: "Elevated Passover for the whole family, in the Riviera Maya.",
        dates: "April 20, 2027 – May 2, 2027",
        gradientClassName: "bg-gradient-to-br from-[#2a2115] via-[#5c4326] to-[#a9843f]",
      },
      {
        id: "diamond-club-blue",
        name: "Diamond Club Blue",
        description: "Luxury made accessible, at Casa Nizuc in Cancun.",
        dates: "April 20, 2027 – May 2, 2027",
        gradientClassName: "bg-gradient-to-br from-[#0d2b3a] via-[#146b8c] to-[#3ea6c9]",
      },
    ],
  },
  {
    id: "sukkot-2026",
    label: "Sukkot 2026",
    dates: "September 25 – October 5, 2026",
    gradientClassName: "bg-gradient-to-br from-[#1c2e1a] via-[#3a5c33] to-[#6c8f4e]",
    destinations: [
      {
        id: "cancun-mexico",
        name: "Cancun, Mexico",
        description: "A luxury Sukkot getaway in Cancun.",
        dates: "September 25 – October 5, 2026",
        gradientClassName: "bg-gradient-to-br from-[#0d2b3a] via-[#146b8c] to-[#3ea6c9]",
      },
      {
        id: "jerusalem-meals-only",
        name: "Jerusalem (meals only)",
        description: "A meaningful Sukkot program in Jerusalem, meals only.",
        dates: "September 25 – October 5, 2026",
        gradientClassName: "bg-gradient-to-br from-[#3a2410] via-[#7a4a1a] to-[#c9963f]",
      },
    ],
  },
];

export const HEARD_ABOUT_OPTIONS = [
  "Google search",
  "Instagram",
  "Facebook",
  "Passover listings",
  "Totally Jewish Travel",
  "Email",
  "Newspaper",
  "Returning guest",
  "Other",
];

export const COMMUNITY_STYLE_OPTIONS = [
  "Sephardi",
  "Ashkenazi",
  "Chabad",
  "Modern Orthodox",
  "Yeshivish",
  "Chassidish",
];

export const CHILD_AGE_OPTIONS = [
  "Under 1",
  ...Array.from({ length: 17 }, (_, i) => String(i + 1)),
];

export const INQUIRE_DEFAULT_VALUES: InquireFormValues = {
  holiday: "",
  destinationId: "",
  adults: 1,
  children: 0,
  rooms: 1,
  childAges: [],
  connectingRooms: "",
  additionalRoom: "",
  earlyArrival: "",
  joinedBefore: "",
  previousPrograms: "",
  wantsCallback: "",
  heardAboutUs: "",
  communityStyle: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  region: "",
  agreeToContact: false,
};

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// When backend endpoints are deployed, uncomment the following queries/mutations:
//
// export const useGetInquireHolidaysQuery = () => {
//   // GET: Fetch holidays/destinations dynamically instead of the static list above
//   // return useGetInquireHolidaysQueryImpl();
//   return { data: INQUIRE_HOLIDAYS, isLoading: false };
// };
//
// export const useSubmitInquiryMutation = () => {
//   // POST: Submit the completed inquiry wizard
//   // return useSubmitInquiryMutationImpl();
// };
//
// export const useUpdateInquiryMutation = () => {
//   // PATCH: Update a draft/in-progress inquiry (e.g. autosave between steps)
//   // return useUpdateInquiryMutationImpl();
// };
//
// export const useDeleteInquiryMutation = () => {
//   // DELETE: Cancel/discard a draft inquiry
//   // return useDeleteInquiryMutationImpl();
// };
// =============================================================================
