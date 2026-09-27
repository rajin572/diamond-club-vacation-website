import type { OfferingData } from "@/components/offerings/offerings.types";
import { PASSOVER_COLLECTION_2027_DATA } from "./passover-collection-2027.data";

export const offeringsRegistry = {
  "passover-collection-2027": PASSOVER_COLLECTION_2027_DATA,
} satisfies Record<string, OfferingData>;

export type OfferingId = keyof typeof offeringsRegistry;

export function getOffering(offeringId: string): OfferingData | undefined {
  return offeringsRegistry[offeringId as OfferingId];
}

export function getAllOfferings(): OfferingData[] {
  return Object.values(offeringsRegistry);
}
