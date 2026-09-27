import type { ResortData } from "@/components/resorts/resorts.types";
import { EDITION_RESORT_DATA } from "./edition.data";
import { ST_REGIS_RESORT_DATA } from "./st-regis.data";

export const resortsRegistry = {
  edition: EDITION_RESORT_DATA,
  "st-regis": ST_REGIS_RESORT_DATA,
} satisfies Record<string, ResortData>;

export type ResortId = keyof typeof resortsRegistry;

export function getResort(resortId: string): ResortData | undefined {
  return resortsRegistry[resortId as ResortId];
}

export function getAllResorts(): ResortData[] {
  return Object.values(resortsRegistry);
}

export function getResortsForProgram(programId: string): ResortData[] {
  return getAllResorts().filter((r) => r.programId === programId);
}
