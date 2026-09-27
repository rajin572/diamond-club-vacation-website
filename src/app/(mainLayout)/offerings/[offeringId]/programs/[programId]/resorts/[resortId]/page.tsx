import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { ResortMainView } from "@/components/resorts";
import { getResort, resortsRegistry } from "@/data/resorts/registry";
import { resortHref } from "@/lib/routes";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string }>;
}

export async function generateStaticParams() {
  return Object.values(resortsRegistry).map((resort) => ({
    programId: resort.programId,
    resortId: resort.resortId,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { offeringId, programId, resortId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId) {
    return { title: "Resort Not Found" };
  }

  const pageUrl = resortHref(offeringId, programId, resortId);

  return {
    title: `${resort.resortName} | Passover 2027`,
    description: resort.tagline,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${resort.resortName} | ${siteConfig.name}`,
      description: resort.tagline,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function ResortPage({ params }: PageProps) {
  const { offeringId, programId, resortId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId) {
    notFound();
  }

  return <ResortMainView offeringId={offeringId} programId={programId} data={resort} />;
}
