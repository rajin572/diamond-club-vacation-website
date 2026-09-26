import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import EntertainmentView from "@/components/entertainment/EntertainmentView";
import KidsProgramView from "@/components/kidsProgram/KidsProgramView";
import KidsDayCampView from "@/components/kidsDayCamp/KidsDayCampView";
import ScholarsView from "@/components/scholars/ScholarsView";

interface PageProps {
  params: Promise<{ id: string; experienceId: string }>;
}

export async function generateStaticParams() {
  const experiences = [
    "entertainment",
    "kids-program",
    "day-camp-teen-program",
    "scholars",
  ];

  return experiences.map((exp) => ({
    id: "diamond-club-reserve",
    experienceId: exp,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id: programId, experienceId } = await params;

  const metaMap: Record<string, { title: string; description: string }> = {
    entertainment: {
      title: "Entertainment | Passover 2027",
      description:
        "An extraordinary lineup of live music, concerts, comedy, and vibrant evening entertainment for Passover 2027.",
    },
    "kids-program": {
      title: "Kids Program | Passover 2027",
      description:
        "An unforgettable Passover for your children, filled with fun, adventure, sports, entertainment, and professional care.",
    },
    "day-camp-teen-program": {
      title: "Day Camp & Teen Program | Passover 2027",
      description:
        "An action-packed day camp schedule for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.",
    },
    scholars: {
      title: "Scholars | Passover 2027",
      description:
        "Inspiring talks, classes and tefillah led by renowned rabbis and speakers throughout the Passover holiday.",
    },
  };

  const meta = metaMap[experienceId.toLowerCase()];
  if (!meta) {
    return {
      title: "Experience Not Found",
    };
  }

  const canonicalUrl = `/passover-collection-2027/${programId}/experiences/${experienceId}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { id: programId, experienceId } = await params;

  const normalizedExperience = experienceId.toLowerCase().trim();

  switch (normalizedExperience) {
    case "entertainment":
      return <EntertainmentView programId={programId} />;
    case "kids-program":
      return <KidsProgramView programId={programId} />;
    case "day-camp-teen-program":
    case "day-camp":
    case "kids-day-camp":
      return <KidsDayCampView programId={programId} />;
    case "scholars":
      return <ScholarsView programId={programId} />;
    default:
      notFound();
  }
}
