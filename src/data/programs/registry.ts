import type { ProgramData } from "@/components/programs/programs.types";
import { DIAMOND_CLUB_RESERVE_DATA } from "./diamond-club-reserve.data";
import { GUTTAWAY_DATA } from "./guttaway.data";
import { BLUE_DATA } from "./blue.data";

export const programsRegistry = {
  "diamond-club-reserve": DIAMOND_CLUB_RESERVE_DATA,
  guttaway: GUTTAWAY_DATA,
  blue: BLUE_DATA,
} satisfies Record<string, ProgramData>;

export type ProgramId = keyof typeof programsRegistry;

export function getProgram(programId: string): ProgramData | undefined {
  return programsRegistry[programId as ProgramId];
}

export function getAllPrograms(): ProgramData[] {
  return Object.values(programsRegistry);
}

export function getProgramsForOffering(offeringId: string): ProgramData[] {
  return getAllPrograms().filter((p) => p.offeringId === offeringId);
}
