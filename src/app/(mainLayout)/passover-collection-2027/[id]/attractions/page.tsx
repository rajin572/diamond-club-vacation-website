import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import AttractionsView from "@/components/attractions/AttractionsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const canonicalUrl = `/passover-collection-2027/${id}/experiences/attractions`;

  return {
    title: "Attractions | Passover 2027",
    description:
      "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Attractions | ${siteConfig.name}`,
      description:
        "Cenotes, Mayan ruins, eco parks and the second-largest coral reef in the world, all within reach of the resort.",
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function AttractionsDirectPage({ params }: PageProps) {
  const { id: programId } = await params;
  return <AttractionsView programId={programId} />;
}
