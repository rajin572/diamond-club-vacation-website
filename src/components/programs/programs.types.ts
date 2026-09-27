import type { StaticImageData } from "next/image";

export interface ProgramHeroData {
  badge: string;
  headline: { primary: string; secondary: string };
  subtitle: string;
  ctas: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  backgroundImage: StaticImageData | string;
}

export interface ProgramTabItem {
  id: string;
  label: string;
  href: string;
}

export interface ProgramAboutGlance {
  title: string;
  location: { label: string; value: string };
  resorts?: { label: string; value: string[] };
  highlights: string[];
  cta: { label: string; href: string };
}

export interface ProgramAboutData {
  badge: string;
  headline: string;
  paragraphs: string[];
  glance: ProgramAboutGlance;
}

export interface ProgramResortStayItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  linkText: string;
}

export interface ProgramWhereYouStayData {
  badge: string;
  headline: string;
  resorts: ProgramResortStayItem[];
}

export interface ProgramExperienceTile {
  id: string;
  title: string;
  description: string;
  image: StaticImageData | string;
  row: 1 | 2;
  /** Experience-category slug this tile links to (e.g. "entertainment"). Omit for a non-clickable tile. */
  linkTo?: string;
}

export interface ProgramExperiencesData {
  badge: string;
  headline: string;
  experiences: ProgramExperienceTile[];
}

export interface ProgramAttractionItem {
  id: string;
  title: string;
  image: StaticImageData | string;
}

export interface ProgramExploreData {
  banner: {
    badge: string;
    headline: string;
    description: string;
    linkText: string;
    backgroundImage: StaticImageData | string;
  };
  attractions: ProgramAttractionItem[];
}

export interface ProgramInquiryData {
  headline: { part1: string; part2: string };
  subtitle: string;
  cta: { label: string; href: string };
  backgroundImage: StaticImageData | string;
}

export interface ProgramHighlight {
  id: string;
  text: string;
}

export interface ProgramData {
  id: string;
  offeringId: string;
  title: { part1: string; part2: string };
  badge: string;
  subtitle: string;
  description: string;
  highlights: ProgramHighlight[];
  images: {
    primary: { src: StaticImageData | string; alt: string };
    secondary: { src: StaticImageData | string; alt: string };
  };
  metaKeywords?: string[];
  /** Rich multi-section page. When absent, ProgramMainView renders a lightweight hero + about page from the fields above. */
  hero?: ProgramHeroData;
  tabs?: ProgramTabItem[];
  about?: ProgramAboutData;
  whereYouStay?: ProgramWhereYouStayData;
  experiences?: ProgramExperiencesData;
  explore?: ProgramExploreData;
  inquiry: ProgramInquiryData;
}
