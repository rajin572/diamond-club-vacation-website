import { redirect } from "next/navigation";
import { experienceHref } from "@/lib/routes";

interface PageProps {
  params: Promise<{ id: string; subId: string }>;
  searchParams: Promise<{ program?: string }>;
}

export default async function ExperienceSubPageRedirect({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { program } = await searchParams;
  const programId = program || "diamond-club-reserve";
  const normalizedId = id.toLowerCase().trim();

  // The nested day-camp sub-route was collapsed into the flat "kids-day-camp" experience type.
  const experienceType = normalizedId === "kids-program" ? "kids-day-camp" : normalizedId;

  redirect(experienceHref("passover-collection-2027", programId, experienceType));
}
