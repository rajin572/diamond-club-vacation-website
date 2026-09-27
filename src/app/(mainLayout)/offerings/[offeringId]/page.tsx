import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { OfferingMainView } from "@/components/offerings";
import { getOffering, offeringsRegistry } from "@/data/offerings/registry";
import { offeringHref } from "@/lib/routes";

interface PageProps {
  params: Promise<{ offeringId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(offeringsRegistry).map((offeringId) => ({ offeringId }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { offeringId } = await params;
  const offering = getOffering(offeringId);

  if (!offering) {
    return { title: "Offering Not Found" };
  }

  const pageTitle = `${offering.hero.headline.primary} ${offering.hero.headline.secondary}`;
  const pageDescription = offering.hero.subtext;
  const pageUrl = offeringHref(offeringId);

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [{ url: typeof offering.hero.backgroundImage === "string" ? offering.hero.backgroundImage : offering.hero.backgroundImage.src, alt: pageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
    },
  };
}

export default async function OfferingPage({ params }: PageProps) {
  const { offeringId } = await params;
  const offering = getOffering(offeringId);

  if (!offering) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${offering.hero.headline.primary} ${offering.hero.headline.secondary}`,
    description: offering.hero.subtext,
    touristType: ["Family", "Luxury Traveler", "Kosher Travel"],
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    offers: offering.programsSection.programs.map((program) => ({
      "@type": "Offer",
      name: `${program.title.part1}${program.title.part2}`,
      description: program.description,
      url: `${siteConfig.siteUrl}${offeringHref(offeringId)}/programs/${program.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <OfferingMainView data={offering} />
    </>
  );
}
