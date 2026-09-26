import { StaticImageData } from "next/image";

export interface ComingSoonContactItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ComingSoonData {
  badge: string;
  headline: {
    part1: string;
    part2: string;
  };
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  backgroundImage: StaticImageData;
  logo: StaticImageData;
  brandName: string;
  contacts: ComingSoonContactItem[];
}

