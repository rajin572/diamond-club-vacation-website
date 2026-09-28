import { StaticImageData } from "next/image";
import type { BabysittingModalData } from "@/components/kidsProgram/kidsProgram.types";

export interface TeamMember {
  id: string;
  role: string;
  name: string;
  bio: string;
  avatar?: string | StaticImageData;
}

export interface DayCampActivity {
  id: string;
  title: string;
  description: string;
}

export interface AgeGroupRow {
  group: string;
  ages: string;
  highlights: string;
}

export interface KidsDayCampData {
  programId: string;
  programName: string;
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
  };
  gallery: {
    mainPhoto: StaticImageData | string;
    counselorsPhoto: StaticImageData | string;
    waterParkPhoto: StaticImageData | string;
    artsCraftsPhoto: StaticImageData | string;
    kidsPhoto: StaticImageData | string;
  };
  overview: {
    title: string;
    description: string;
  };
  team: TeamMember[];
  activities: DayCampActivity[];
  ageGroups: AgeGroupRow[];
  dining: {
    title: string;
    paragraphs: string[];
  };
  babysitting: {
    title: string;
    description: string;
    rateText: string;
    showButton?: boolean;
  };
  babysittingModal: BabysittingModalData;
}
