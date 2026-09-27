import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisMainView from "@/components/resorts/stRegis/StRegisMainView";
import EditionMainView from "@/components/resorts/edition/EditionMainView";

interface ResortPageProps {
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

export async function generateMetadata({ params }: ResortPageProps): Promise<Metadata> {
  const { resortId } = await params;

  if (resortId === "st-regis") {
    return {
      title: "The St. Regis Kanai Resort | Diamond Club Vacations",
      description:
        "Beachfront suites, signature dining and the main Passover program, at Kanai in the Riviera Maya.",
    };
  }

  if (resortId === "edition") {
    return {
      title: "The Edition Resort | Diamond Club Vacations",
      description:
        "Contemporary, design-led luxury at Kanai, set between the jungle and the Riviera Maya coast.",
    };
  }

  return {
    title: "Resort Details | Diamond Club Vacations",
  };
}

export default async function ResortPage({ params }: ResortPageProps) {
  const { id: programId, resortId } = await params;

  if (resortId === "st-regis") {
    return <StRegisMainView programId={programId} />;
  }

  if (resortId === "edition") {
    return <EditionMainView programId={programId} />;
  }

  notFound();
}
