import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResortSpaDetailView } from "@/components/resorts";
import { getResort, getResortRouteParams } from "@/data/resorts/registry";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string }>;
}

export async function generateStaticParams() {
  return getResortRouteParams().map(({ params }) => params);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resortId } = await params;
  const resort = getResort(resortId);

  if (!resort) {
    return { title: "Spa Not Found" };
  }

  return {
    title: `${resort.spa.title} | ${resort.resortName}`,
    description: resort.spa.description,
  };
}

export default async function SpaPage({ params }: PageProps) {
  const { offeringId, programId, resortId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId) {
    notFound();
  }

  return <ResortSpaDetailView offeringId={offeringId} programId={programId} data={resort} />;
}
