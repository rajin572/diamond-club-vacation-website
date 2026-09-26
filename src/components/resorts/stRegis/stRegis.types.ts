import type { StaticImageData } from "next/image";

export interface StRegisRoom {
  id: string;
  title: string;
  bedConfig: string;
  size: string;
  view: string;
  description: string;
  image: StaticImageData | string;
  gallery: (StaticImageData | string)[];
  features: {
    bedsAndBedding: string[];
    bathroom: string[];
    furniture: string[];
    foodAndBeverage: string[];
    internetAndPhones: string[];
    hospitality: string[];
    specialFeatures: string[];
  };
}

export interface StRegisDiningVenue {
  id: string;
  title: string;
  cuisine: string;
  category: "latin" | "steakhouse" | "mediterranean" | "international" | "cafe";
  categoryLabel: string;
  mealPeriod: string;
  hours: string;
  location: string;
  description: string;
  image: StaticImageData | string;
  gallery: (StaticImageData | string)[];
  kashrutNotes: string;
  dressCode: string;
}

export interface StRegisPoolItem {
  id: string;
  title: string;
  type: "pools" | "cabanas" | "beach";
  typeLabel: string;
  atmosphere: string;
  hours: string;
  location: string;
  description: string;
  image: StaticImageData | string;
  gallery: (StaticImageData | string)[];
  amenities: string[];
}

export interface StRegisWellnessItem {
  id: string;
  title: string;
  category: "deck" | "fitness";
  description: string;
  image: StaticImageData | string;
  timing: string;
}

export interface StRegisSpaData {
  title: string;
  hours: string;
  location: string;
  description: string;
  image: StaticImageData | string;
  gallery: (StaticImageData | string)[];
  treatments: {
    title: string;
    description: string;
    duration: string;
  }[];
  amenities: string[];
}

export interface StRegisGalleryPhoto {
  id: string;
  title: string;
  category: "all" | "resort" | "rooms" | "pools" | "dining" | "spa" | "events";
  image: StaticImageData | string;
}

export interface StRegisResortData {
  programId: string;
  programTitle: string;
  resortId: string;
  resortName: string;
  tagline: string;
  heroImage: StaticImageData | string;
  rooms: StRegisRoom[];
  dining: StRegisDiningVenue[];
  pools: StRegisPoolItem[];
  wellness: StRegisWellnessItem[];
  spa: StRegisSpaData;
  gallery: StRegisGalleryPhoto[];
}
