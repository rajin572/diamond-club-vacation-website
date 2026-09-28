import type { StaticImageData } from "next/image";

/** Attractions + Entertainment share this shape (a photo grid of short cards). */
export interface ExperienceGalleryItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image?: StaticImageData | string;
  imagePlaceholderText?: string;
  isTba?: boolean;
  ctaText?: string;
  /** Attraction-only "see on map" link. */
  mapQuery?: string;
  mapUrl?: string;
  /** Entertainment-only rich detail payload (photo thumbnails, when/where). */
  modal?: {
    title: string;
    tag: string;
    longDescription: string;
    when: string;
    where: string;
    mainPhotoPlaceholder?: string;
    thumbnails: { id: string; label: string; placeholderText: string }[];
  };
}

/** Scholars use a bio-card shape instead of a photo gallery. */
export interface ExperienceBioItem {
  id: string;
  name: string;
  nameHighlight?: { first: string; last: string };
  role: string;
  shortBio: string;
  fullBio: string;
  image: StaticImageData | string;
  imageAlt: string;
  isTba?: boolean;
  ctaText?: string;
}

export type ExperienceItem = ExperienceGalleryItem | ExperienceBioItem;

export function isBioItem(item: ExperienceItem): item is ExperienceBioItem {
  return "name" in item;
}

export interface ExperienceCategoryData {
  programId: string;
  programTitle: string;
  /** Slug used in the URL and to look this data up in the registry, e.g. "attractions". */
  experienceType: string;
  variant: "gallery" | "bio";
  breadcrumbLabel: string;
  /** Visual style: "dot" (Attractions/Entertainment) or "pill" (Scholars). */
  badgeStyle: "dot" | "pill";
  accentColor?: string;
  gridColumns?: 2 | 3;
  header: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
  };
  items: ExperienceItem[];
  inquireBanner: {
    headlinePart1: string;
    headlinePart2: string;
    buttonText: string;
  };
}
