import type { OfferingData } from "@/components/offerings/offerings.types";
import { PASSOVER_COLLECTION_2027_DATA } from "./passover-collection-2027.data";

export const offeringsRegistry = {
  "passover-collection-2027": PASSOVER_COLLECTION_2027_DATA,
} satisfies Record<string, OfferingData>;

export const comingSoonOfferings = {
  "weddings-events": "Weddings & Events",
  "private-events": "Private Events",
} as const;

export type OfferingId = keyof typeof offeringsRegistry;

export function getOffering(offeringId: string): OfferingData | undefined {
  return offeringsRegistry[offeringId as OfferingId];
}

export function getAllOfferings(): OfferingData[] {
  return Object.values(offeringsRegistry);
}

export function getComingSoonOffering(offeringId: string): string | undefined {
  return comingSoonOfferings[offeringId as keyof typeof comingSoonOfferings];
}
