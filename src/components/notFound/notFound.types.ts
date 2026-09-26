import { StaticImageData } from "next/image";

export interface PopularPageItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface NotFoundData {
  badge: string;
  code: string;
  headline: {
    part1: string;
    part2: string;
  };
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  popularPagesTitle: string;
  popularPages: PopularPageItem[];
  image: StaticImageData;
}

export interface NotFoundProps {
  badge?: string;
  code?: string;
  headline?: {
    part1: string;
    part2: string;
  };
  description?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  popularPagesTitle?: string;
  popularPages?: PopularPageItem[];
  image?: StaticImageData;
  className?: string;
}
