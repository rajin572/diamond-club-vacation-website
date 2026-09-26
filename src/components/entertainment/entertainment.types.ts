import { StaticImageData } from "next/image";

export interface EntertainmentEvent {
  id: string;
  title: string;
  tag: string;
  isTba?: boolean;
  description: string;
  image?: StaticImageData | string;
  imagePlaceholderText?: string;
  modal: {
    title: string;
    tag: string;
    longDescription: string;
    when: string;
    where: string;
    mainPhotoPlaceholder?: string;
    thumbnails: { id: string; label: string; placeholderText: string }[];
  };
}

export interface EntertainmentData {
  badge: string;
  headline: {
    part1: string;
    part2: string;
  };
  description: string;
  events: EntertainmentEvent[];
  inquireBanner: {
    headline: {
      part1: string;
      part2: string;
    };
    buttonText: string;
  };
}
