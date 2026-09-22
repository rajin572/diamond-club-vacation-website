import { StaticImageData } from "next/image";
import { AllImages } from "../../../../public/images/AllImages";

export interface OfferingItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: StaticImageData;
  logo: StaticImageData;
}

export const OFFERING_ITEMS: OfferingItem[] = [
  {
    id: "passover-collection",
    title: "Passover Collection",
    description: "Three exceptional Passover programs in the Riviera Maya and Cancun. One standard of excellence.",
    href: "/#passover-2027",
    image: AllImages.offeringImg1,
    logo: AllImages.offeringLogo4,
  },
  {
    id: "casa-nizuc",
    title: "Casa Nizuc",
    description: "Year-round luxury kosher hospitality in the heart of the Riviera Maya.",
    href: "/#casa-nizuc",
    image: AllImages.offeringImg2,
    logo: AllImages.offeringLogo2,
  },
  {
    id: "weddings-events",
    title: "Weddings & Events",
    description: "Extraordinary celebrations designed and produced by our expert team.",
    href: "/#weddings-events",
    image: AllImages.offeringImg3,
    logo: AllImages.offeringLogo3,
  },
  {
    id: "private-events",
    title: "Private Events",
    description: "Let us create your dream destination event, planned around your group.",
    href: "/#private-events",
    image: AllImages.offeringImg4,
    logo: AllImages.offeringLogo4,
  },
];
