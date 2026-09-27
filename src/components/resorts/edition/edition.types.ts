import type { StaticImageData } from "next/image";

export interface EditionGalleryStructure {
  main: { src: StaticImageData | string; label: string };
  side1: { src: StaticImageData | string; label: string };
  side2: { src: StaticImageData | string; label: string };
  side3: { src: StaticImageData | string; label: string };
  side4: { src: StaticImageData | string; label: string };
  totalPhotos: number;
}

export interface EditionRoom {
  id: string;
  title: string;
  titlePrefix: string;
  titleItalic: string;
  bedConfig: string;
  size: string;
  view: string;
  description: string;
  image: StaticImageData | string;
  gallery: EditionGalleryStructure;
  bedsAndBedding: {
    items: string[];
    note?: string;
  };
  roomFeatures: string[];
  bathFeatures: string[];
}

export interface EditionDiningVenue {
  id: string;
  title: string;
  titlePrefix: string;
  titleItalic: string;
  cuisine: string;
  category: "all" | "seafood" | "mediterranean" | "multiple" | "other";
  categoryLabel: string;
  mealPeriod: string;
  schedule: { days: string; hours: string }[];
  dressCode: string;
  description: string;
  image: StaticImageData | string;
  gallery: EditionGalleryStructure;
}

export interface EditionPoolItem {
  id: string;
  title: string;
  titlePrefix: string;
  titleItalic: string;
  type: "outdoor" | "beach" | "lagoon";
  typeLabel: string;
  location: string;
  schedule: { days: string; hours: string }[];
  description: string;
  image: StaticImageData | string;
  gallery: EditionGalleryStructure;
}

export interface EditionWellnessItem {
  id: string;
  title: string;
  category: "the-spa" | "wellness-deck" | "fitness-center";
  description: string;
  image: StaticImageData | string;
  linkText?: string;
}

export interface EditionSpaData {
  title: string;
  titlePrefix: string;
  titleItalic: string;
  headline: string;
  description: string;
  treatmentsAndFacilities: string[];
  schedule: { days: string; hours: string }[];
  location: string;
  image: StaticImageData | string;
  gallery: EditionGalleryStructure;
}

export interface EditionGalleryPhoto {
  id: string;
  title: string;
  category: "all" | "resort" | "rooms" | "pools" | "dining" | "spa" | "events";
  image: StaticImageData | string;
}

export interface EditionResortData {
  programId: string;
  programTitle: string;
  resortId: string;
  resortName: string;
  tagline: string;
  heroImage: StaticImageData | string;
  rooms: EditionRoom[];
  dining: EditionDiningVenue[];
  pools: EditionPoolItem[];
  wellness: EditionWellnessItem[];
  spa: EditionSpaData;
  gallery: EditionGalleryPhoto[];
}
