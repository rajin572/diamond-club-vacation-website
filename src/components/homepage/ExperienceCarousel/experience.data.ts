import { StaticImageData } from "next/image";
import { AllImages } from "../../../../public/images/AllImages";

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  discoverHref?: string;
  /** Omitted for experiences without photography yet -- falls back to PhotoPlaceholder. */
  image?: StaticImageData;
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Nightly shows, DJ parties, concerts and comedy, planned throughout your stay.",
    image: AllImages.experience1,
  },
  {
    id: "kids-program",
    title: "Kids Program",
    description: "Day camp and teen program with sports, trips and evening entertainment, plus babysitting.",
    image: AllImages.experience2,
  },
  {
    id: "scholars",
    title: "Scholars",
    description: "Inspiring talks and classes with renowned rabbis and speakers during the holiday.",
    discoverHref: "/#scholars",
    image: AllImages.experience3,
  },
  {
    id: "our-chefs",
    title: "Our Chefs",
    description: "Signature kosher menus prepared by our executive chefs and their teams.",
    discoverHref: "/#our-chefs",
  },
  {
    id: "kosher-supervision",
    title: "Kosher Supervision",
    description: "Every kitchen and every meal under trusted kosher supervision.",
    discoverHref: "/#kosher-supervision",
  },
];
