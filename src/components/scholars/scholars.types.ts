import { StaticImageData } from "next/image";

export interface Scholar {
  id: string;
  name: string;
  nameHighlight?: {
    first: string;
    last: string;
  };
  role: string;
  shortBio: string;
  fullBio: string;
  image: StaticImageData | string;
  imageAlt: string;
}

export interface ScholarsPageData {
  programId: string;
  programName: string;
  hero: {
    badge: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
  };
  scholars: Scholar[];
  inquireBanner: {
    part1: string;
    part2: string;
    buttonText: string;
  };
}
