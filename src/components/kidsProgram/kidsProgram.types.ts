import { StaticImageData } from "next/image";

export interface KidsProgramItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  linkText: string;
  href?: string;
  isModalTrigger?: boolean;
  images: {
    main?: StaticImageData | string;
    mainPlaceholder?: string;
    secondary1?: StaticImageData | string;
    secondary1Placeholder?: string;
    secondary2?: StaticImageData | string;
    secondary2Placeholder?: string;
  };
}

export interface BabysittingModalData {
  category: string;
  tag: string;
  title: string;
  description: string;
  when: string;
  where: string;
  privateNote: string;
  ctaText: string;
  image?: StaticImageData | string;
  imagePlaceholderText?: string;
}

export interface KidsProgramData {
  badge: string;
  headline: {
    part1: string;
    part2: string;
  };
  description: string;
  programs: KidsProgramItem[];
  babysittingModal: BabysittingModalData;
  inquireBanner: {
    headline: {
      part1: string;
      part2: string;
    };
    buttonText: string;
  };
}
