import { StaticImageData } from "next/image";

export interface PassoverHeroData {
  badge?: string;
  headline: {
    primary: string;
    secondary: string;
  };
  subtext: string;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: StaticImageData;
}

export interface ProgramHighlight {
  id: string;
  text: string;
}

export interface PassoverProgramItem {
  id: string;
  badge: string;
  title: {
    part1: string;
    part2: string;
  };
  subtitle: string;
  description: string;
  highlights: ProgramHighlight[];
  images: {
    primary: {
      src: StaticImageData;
      alt: string;
    };
    secondary: {
      src: StaticImageData;
      alt: string;
    };
  };
  cta: {
    label: string;
    href: string;
  };
}

export interface ComparisonRow {
  category: string;
  reserve: string;
  guttaway: string;
  blue: string;
}

export interface PassoverCompareData {
  badge: string;
  headline: string;
  programs: {
    id: string;
    name: string;
    subtitle?: string;
  }[];
  rows: ComparisonRow[];
}

export interface PassoverInquiryData {
  headline: string;
  subtext: string;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: StaticImageData;
}
