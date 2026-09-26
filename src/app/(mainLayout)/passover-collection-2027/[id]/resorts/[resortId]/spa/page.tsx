import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisSpaDetailView from "@/components/resorts/stRegis/StRegisSpaDetailView";

interface SpaDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { id: "diamond-club-reserve", resortId: "st-regis" },
  ];
}

export async function generateMetadata({ params }: SpaDetailPageProps): Promise<Metadata> {
  const { resortId } = await params;

  if (resortId !== "st-regis") {
    return {
      title: "Spa | Diamond Club Vacations",
    };
  }

  return {
    title: "The Spa | The St. Regis Kanai Resort",
    description:
      "Hydrotherapy pools, hammam and steam rooms, massages, facials and a full salon at The St. Regis Kanai.",
  };
}

export default async function SpaDetailPage({ params }: SpaDetailPageProps) {
  const { id: programId, resortId } = await params;

  if (resortId !== "st-regis") {
    notFound();
  }

  return <StRegisSpaDetailView programId={programId} />;
}
