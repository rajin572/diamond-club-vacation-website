import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { ExperienceCategoryView } from "@/components/experiences";
import KidsProgramView from "@/components/kidsProgram/KidsProgramView";
import KidsDayCampView from "@/components/kidsDayCamp/KidsDayCampView";
import { getExperienceData, getKidsProgramData, getKidsDayCampData } from "@/data/experiences/registry";
import { getProgram, programsRegistry } from "@/data/programs/registry";
import { experienceHref } from "@/lib/routes";

const CATEGORY_TYPES = ["attractions", "entertainment", "scholars"] as const;

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; experienceType: string }>;
}

export async function generateStaticParams() {
  const programIds = Object.keys(programsRegistry);
  const experienceTypes = [...CATEGORY_TYPES, "kids-program", "kids-day-camp"];

  return programIds.flatMap((programId) =>
    experienceTypes
      .filter(
        (experienceType) =>
          getExperienceData(programId, experienceType) ||
          (experienceType === "kids-program" && getKidsProgramData(programId)) ||
          (experienceType === "kids-day-camp" && getKidsDayCampData(programId))
      )
      .map((experienceType) => ({ programId, experienceType }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { offeringId, programId, experienceType } = await params;
  const canonicalUrl = experienceHref(offeringId, programId, experienceType);

  const categoryData = getExperienceData(programId, experienceType);
  if (categoryData) {
    return {
      title: `${categoryData.breadcrumbLabel} | Passover 2027`,
      description: categoryData.header.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: `${categoryData.breadcrumbLabel} | ${siteConfig.name}`,
        description: categoryData.header.description,
        url: canonicalUrl,
        siteName: siteConfig.name,
        locale: "en_US",
        type: "website",
      },
    };
  }

  if (experienceType === "kids-program") {
    const data = getKidsProgramData(programId);
    if (data) {
      return {
        title: "Kids Program | Passover 2027",
        description: data.description,
        alternates: { canonical: canonicalUrl },
      };
    }
  }

  if (experienceType === "kids-day-camp") {
    const data = getKidsDayCampData(programId);
    if (data) {
      return {
        title: "Day Camp & Teen Program | Passover 2027",
        description: data.hero.description,
        alternates: { canonical: canonicalUrl },
      };
    }
  }

  return { title: "Experience Not Found" };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { offeringId, programId, experienceType } = await params;

  const categoryData = getExperienceData(programId, experienceType);
  if (categoryData) {
    return <ExperienceCategoryView offeringId={offeringId} data={categoryData} />;
  }

  if (experienceType === "kids-program") {
    const data = getKidsProgramData(programId);
    if (data) {
      const program = getProgram(programId);
      return (
        <KidsProgramView
          offeringId={offeringId}
          programId={programId}
          programTitle={program?.title ? `${program.title.part1}${program.title.part2}` : programId}
          data={data}
        />
      );
    }
  }

  if (experienceType === "kids-day-camp") {
    const data = getKidsDayCampData(programId);
    if (data) {
      return <KidsDayCampView offeringId={offeringId} programId={programId} data={data} />;
    }
  }

  notFound();
}
