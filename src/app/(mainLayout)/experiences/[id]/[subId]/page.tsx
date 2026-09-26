import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; subId: string }>;
  searchParams: Promise<{ program?: string }>;
}

export default async function ExperienceSubPageRedirect({
  params,
  searchParams,
}: PageProps) {
  const { id, subId } = await params;
  const { program } = await searchParams;
  const programId = program || "diamond-club-reserve";

  redirect(`/passover-collection-2027/${programId}/experiences/${id.toLowerCase().trim()}/${subId.toLowerCase().trim()}`);
}
