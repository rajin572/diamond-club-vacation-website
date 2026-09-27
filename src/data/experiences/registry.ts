import type { ExperienceCategoryData } from "@/components/experiences/experiences.types";
import type { KidsProgramData } from "@/components/kidsProgram/kidsProgram.types";
import type { KidsDayCampData } from "@/components/kidsDayCamp/kidsDayCamp.types";
import { ATTRACTIONS_BY_PROGRAM } from "./attractions.data";
import { ENTERTAINMENT_BY_PROGRAM } from "./entertainment.data";
import { SCHOLARS_BY_PROGRAM } from "./scholars.data";
import { KIDS_PROGRAM_BY_PROGRAM } from "./kids-program.data";
import { KIDS_DAY_CAMP_BY_PROGRAM } from "./kids-day-camp.data";

const registryByType: Record<string, Record<string, ExperienceCategoryData>> = {
  attractions: ATTRACTIONS_BY_PROGRAM,
  entertainment: ENTERTAINMENT_BY_PROGRAM,
  scholars: SCHOLARS_BY_PROGRAM,
};

export function getExperienceData(programId: string, experienceType: string): ExperienceCategoryData | undefined {
  return registryByType[experienceType]?.[programId];
}

export function getExperienceTypesForProgram(programId: string): string[] {
  return Object.keys(registryByType).filter((type) => registryByType[type][programId]);
}

export function getKidsProgramData(programId: string): KidsProgramData | undefined {
  return KIDS_PROGRAM_BY_PROGRAM[programId];
}

export function getKidsDayCampData(programId: string): KidsDayCampData | undefined {
  return KIDS_DAY_CAMP_BY_PROGRAM[programId];
}
