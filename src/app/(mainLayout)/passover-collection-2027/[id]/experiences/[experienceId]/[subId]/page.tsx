import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import KidsDayCampView from "@/components/kidsDayCamp/KidsDayCampView";

interface PageProps {
  params: Promise<{ id: string; experienceId: string; subId: string }>;
}

export async function generateStaticParams() {
  return [
    {
      id: "diamond-club-reserve",
      experienceId: "kids-program",
      subId: "day-camp-teen-program",
    },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: programId, experienceId, subId } = await params;
  const isDayCamp =
    experienceId === "kids-program" &&
    (subId === "day-camp-teen-program" || subId === "day-camp" || subId === "kids-day-camp");

  if (isDayCamp) {
    const title = "Day Camp & Teen Program | Passover 2027";
    const description =
      "An action-packed day camp schedule for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.";

    const canonicalUrl = `/passover-collection-2027/${programId}/experiences/${experienceId}/${subId}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${title} | ${siteConfig.name}`,
        description,
        url: canonicalUrl,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
      },
    };
  }

  return {
    title: "Experience Not Found",
  };
}

export default async function ExperienceSubPage({ params }: PageProps) {
  const { id: programId, experienceId, subId } = await params;

  const isDayCamp =
    experienceId === "kids-program" &&
    (subId === "day-camp-teen-program" || subId === "day-camp" || subId === "kids-day-camp");

  if (isDayCamp) {
    return <KidsDayCampView programId={programId} />;
  }

  notFound();
}
