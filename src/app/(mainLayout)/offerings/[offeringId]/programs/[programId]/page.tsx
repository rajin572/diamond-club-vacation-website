import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { ProgramMainView } from "@/components/programs";
import { getProgram, programsRegistry } from "@/data/programs/registry";
import { programHref } from "@/lib/routes";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string }>;
}

export async function generateStaticParams() {
  return Object.values(programsRegistry).map((program) => ({
    offeringId: program.offeringId,
    programId: program.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { offeringId, programId } = await params;
  const program = getProgram(programId);

  if (!program || program.offeringId !== offeringId) {
    return { title: "Program Not Found" };
  }

  const pageTitle = `${program.title.part1}${program.title.part2} | Passover 2027`;
  const pageUrl = programHref(offeringId, programId);
  const ogImage = typeof program.images.primary.src === "string" ? program.images.primary.src : program.images.primary.src.src;

  return {
    title: pageTitle,
    description: program.description,
    keywords: program.metaKeywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${pageTitle} | ${siteConfig.name}`,
      description: program.description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [{ url: ogImage, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${siteConfig.name}`,
      description: program.description,
    },
  };
}

export default async function ProgramPage({ params }: PageProps) {
  const { offeringId, programId } = await params;
  const program = getProgram(programId);

  if (!program || program.offeringId !== offeringId) {
    notFound();
  }

  return <ProgramMainView offeringId={offeringId} data={program} />;
}
