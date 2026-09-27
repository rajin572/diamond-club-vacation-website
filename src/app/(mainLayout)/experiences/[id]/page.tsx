import { redirect } from "next/navigation";
import { experienceHref } from "@/lib/routes";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ program?: string }>;
}

const DAY_CAMP_ALIASES = ["day-camp-teen-program", "day-camp", "kids-day-camp"];

export default async function ExperienceDynamicRedirect({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { program } = await searchParams;
  const programId = program || "diamond-club-reserve";
  const normalizedId = id.toLowerCase().trim();
  const experienceType = DAY_CAMP_ALIASES.includes(normalizedId) ? "kids-day-camp" : normalizedId;

  redirect(experienceHref("passover-collection-2027", programId, experienceType));
}
