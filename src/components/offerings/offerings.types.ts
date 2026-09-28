import type { StaticImageData } from "next/image";

export interface OfferingHeroData {
  headline: { primary: string; secondary: string };
  subtext: string;
  cta: { label: string; href: string };
  backgroundImage: StaticImageData | string;
}

export interface OfferingProgramHighlight {
  id: string;
  text: string;
}

export interface OfferingProgramSummary {
  id: string;
  badge: string;
  title: { part1: string; part2: string };
  subtitle: string;
  description: string;
  highlights: OfferingProgramHighlight[];
  images: {
    primary: { src: StaticImageData | string; alt: string };
    secondary: { src: StaticImageData | string; alt: string };
  };
  ctaLabel: string;
}

export interface OfferingProgramsSectionData {
  badge: string;
  title: string;
  description: string;
  programs: OfferingProgramSummary[];
}

export interface OfferingCompareColumn {
  id: string;
  name: string;
}

export interface OfferingCompareRow {
  category: string;
  values: Record<string, string>;
}

export interface OfferingCompareData {
  badge: string;
  /** `accent` is rendered in a heavier weight between `lead` and `tail`. */
  headline: { lead: string; accent: string; tail: string };
  columns: OfferingCompareColumn[];
  rows: OfferingCompareRow[];
}

export interface OfferingInquiryData {
  headline: { part1: string; part2: string };
  subtext: string;
  cta: { label: string; href: string };
  backgroundImage: StaticImageData | string;
}

export interface OfferingData {
  id: string;
  hero: OfferingHeroData;
  programsSection: OfferingProgramsSectionData;
  compare: OfferingCompareData;
  inquiry: OfferingInquiryData;
}
