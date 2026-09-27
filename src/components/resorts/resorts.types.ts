import type { StaticImageData } from "next/image";

export interface ResortGalleryStructure {
  main: { src: StaticImageData | string; label: string };
  side1: { src: StaticImageData | string; label: string };
  side2: { src: StaticImageData | string; label: string };
  side3: { src: StaticImageData | string; label: string };
  side4: { src: StaticImageData | string; label: string };
  totalPhotos: number;
}

export interface ResortRoom {
  id: string;
  title: string;
  titlePrefix: string;
  titleItalic: string;
  bedConfig: string;
  size: string;
  view: string;
  description: string;
  image: StaticImageData | string;
  gallery: ResortGalleryStructure;
  bedsAndBedding: {
    items: string[];
    note?: string;
  };
  roomFeatures: string[];
  bathFeatures: string[];
}

export type ResortDiningCategory =
  | "all"
  | "seafood"
  | "mediterranean"
  | "multiple"
  | "other"
  | "latin"
  | "steakhouse"
  | "international"
  | "cafe";

export interface ResortDiningVenue {
  id: string;
  title: string;
  titlePrefix?: string;
  titleItalic?: string;
  cuisine: string;
  category: ResortDiningCategory;
  categoryLabel: string;
  mealPeriod: string;
  location?: string;
  schedule: { days: string; hours: string; isClosed?: boolean }[];
  dressCode: string;
  description: string;
  image: StaticImageData | string;
  gallery: ResortGalleryStructure;
  hours?: string;
  kashrutNotes?: string;
}

export interface ResortPoolItem {
  id: string;
  title: string;
  titlePrefix: string;
  titleItalic: string;
  type: "outdoor" | "beach" | "lagoon" | "cabanas" | "pools";
  typeLabel: string;
  atmosphere?: string;
  location: string;
  schedule: { days: string; hours: string }[];
  hours?: string;
  description: string;
  image: StaticImageData | string;
  gallery: ResortGalleryStructure;
  amenities?: string[];
}

export interface ResortWellnessItem {
  id: string;
  title: string;
  category: "the-spa" | "wellness-deck" | "fitness-center" | "soak-rituals";
  description: string;
  image: StaticImageData | string;
  timing?: string;
  linkText?: string;
}

export interface ResortSpaData {
  title: string;
  titlePrefix: string;
  titleItalic: string;
  headline?: string;
  meta?: string[];
  description: string;
  treatmentsAndFacilities: string[];
  schedule: { days: string; hours: string }[];
  hours?: string;
  location: string;
  image: StaticImageData | string;
  gallery: ResortGalleryStructure;
  treatments?: { title: string; description: string; duration: string }[];
  amenities?: string[];
}

export interface ResortGalleryPhoto {
  id: string;
  title: string;
  category: "all" | "resort" | "rooms" | "pools" | "dining" | "spa" | "events";
  image: StaticImageData | string;
}

export interface ResortData {
  programId: string;
  programTitle: string;
  resortId: string;
  resortName: string;
  tagline: string;
  heroImage: StaticImageData | string;
  rooms: ResortRoom[];
  dining: ResortDiningVenue[];
  pools: ResortPoolItem[];
  wellness: ResortWellnessItem[];
  spa: ResortSpaData;
  gallery: ResortGalleryPhoto[];
}
