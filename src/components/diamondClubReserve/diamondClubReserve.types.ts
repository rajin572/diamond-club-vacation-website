import { StaticImageData } from "next/image";

export interface ReserveHeroData {
  badge: string;
  headline: {
    primary: string;
    secondary: string;
  };
  subtitle: string;
  ctas: {
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
  backgroundImage: StaticImageData;
}

export interface ReserveAboutData {
  badge: string;
  headline: string;
  paragraphs: string[];
  glance: {
    title: string;
    location: {
      label: string;
      value: string;
    };
    resorts: {
      label: string;
      value: string[];
    };
    highlights: string[];
    cta: {
      label: string;
      href: string;
    };
  };
}

export interface ResortStayItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  linkText: string;
  href: string;
}

export interface ReserveWhereYouStayData {
  badge: string;
  headline: string;
  resorts: ResortStayItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
}

export interface ReserveExperiencesData {
  badge: string;
  headline: string;
  experiences: ExperienceItem[];
}

export interface AttractionItem {
  id: string;
  title: string;
  image: StaticImageData;
}

export interface ReserveExploreData {
  banner: {
    badge: string;
    headline: string;
    description: string;
    linkText: string;
    href: string;
    backgroundImage: StaticImageData;
  };
  attractions: AttractionItem[];
}

export interface ReserveInquiryData {
  headline: {
    part1: string;
    part2: string;
  };
  subtitle: string;
  cta: {
    label: string;
    href: string;
  };
  backgroundImage: StaticImageData;
}

