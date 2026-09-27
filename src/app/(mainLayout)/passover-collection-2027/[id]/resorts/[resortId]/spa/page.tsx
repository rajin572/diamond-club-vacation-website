import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisSpaDetailView from "@/components/resorts/stRegis/StRegisSpaDetailView";
import EditionSpaDetailView from "@/components/resorts/edition/EditionSpaDetailView";

interface SpaDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { id: "diamond-club-reserve", resortId: "st-regis" },
    { id: "diamond-club-reserve", resortId: "edition" },
  ];
}

export async function generateMetadata({ params }: SpaDetailPageProps): Promise<Metadata> {
  const { resortId } = await params;

  if (resortId === "st-regis") {
    return {
      title: "The Spa | The St. Regis Kanai Resort",
      description:
        "Hydrotherapy pools, hammam and steam rooms, massages, facials and a full salon at The St. Regis Kanai.",
    };
  }

  if (resortId === "edition") {
    return {
      title: "The Spa | The Edition Resort",
      description:
        "Hydrotherapy pools, Turkish hammam, steam rooms, massages, facials and salon at The Edition Resort.",
    };
  }

  return {
    title: "Spa | Diamond Club Vacations",
  };
}

export default async function SpaDetailPage({ params }: SpaDetailPageProps) {
  const { id: programId, resortId } = await params;

  if (resortId === "st-regis") {
    return <StRegisSpaDetailView programId={programId} />;
  }

  if (resortId === "edition") {
    return <EditionSpaDetailView programId={programId} />;
  }

  notFound();
}
