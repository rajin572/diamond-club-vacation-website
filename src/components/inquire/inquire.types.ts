export type HolidayId = "passover-2027" | "sukkot-2026";

export interface InquireDestination {
  id: string;
  name: string;
  description: string;
  dates: string;
  /** Tailwind gradient stop classes -- stands in for real property photography. */
  gradientClassName: string;
}

export interface InquireHoliday {
  id: HolidayId;
  label: string;
  dates: string;
  gradientClassName: string;
  destinations: InquireDestination[];
}

export interface InquireStepDef {
  id: number;
  label: string;
}

export interface InquireFormValues {
  // Step 1: Choose your vacation
  holiday: HolidayId | "";
  destinationId: string;

  // Step 2: Your trip
  adults: number;
  children: number;
  rooms: number;
  childAges: string[];
  connectingRooms: "yes" | "no" | "";

  // Step 3: Add-ons
  additionalRoom: "yes" | "no" | "";
  earlyArrival: "yes" | "no" | "";

  // Step 4: About you
  joinedBefore: "yes" | "no" | "";
  previousPrograms: string;
  wantsCallback: "yes" | "no" | "";
  heardAboutUs: string;
  communityStyle: string;

  // Step 5: Contact details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  region: string;

  // Step 6: Review
  agreeToContact: boolean;
}
