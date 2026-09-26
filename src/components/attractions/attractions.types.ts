import type { StaticImageData } from "next/image";

export interface AttractionItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: StaticImageData | string;
  imagePlaceholderText: string;
  mapQuery?: string;
  mapUrl?: string;
}

export interface AttractionsHeaderData {
  badge: string;
  headline: {
    part1: string;
    part2: string;
  };
  description: string;
}

export interface AttractionsInquireBannerData {
  headlinePart1: string;
  headlinePart2: string;
  buttonText: string;
}

export interface AttractionsPageData {
  programId: string;
  programTitle: string;
  header: AttractionsHeaderData;
  attractions: AttractionItem[];
  inquireBanner: AttractionsInquireBannerData;
}
