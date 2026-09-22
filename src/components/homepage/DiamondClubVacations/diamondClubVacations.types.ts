import type { StaticImageData } from "next/image";

export interface DiamondClubVacationsImageItem {
  src: StaticImageData | string;
  alt: string;
  caption?: string;
}

export interface DiamondClubVacationsContent {
  badge: string;
  headline: {
    primary: string;
    accent: string;
  };
  paragraphs: string[];
  images: {
    left: DiamondClubVacationsImageItem;
    right: DiamondClubVacationsImageItem;
  };
}

