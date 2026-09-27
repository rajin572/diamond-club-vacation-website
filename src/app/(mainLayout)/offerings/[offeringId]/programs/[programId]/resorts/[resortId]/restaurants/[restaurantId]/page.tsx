import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResortRestaurantDetailView } from "@/components/resorts";
import { getResort, resortsRegistry } from "@/data/resorts/registry";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string; restaurantId: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.values(resortsRegistry).flatMap((resort) =>
    resort.dining.map((venue) => ({
      programId: resort.programId,
      resortId: resort.resortId,
      restaurantId: venue.id,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resortId, restaurantId } = await params;
  const resort = getResort(resortId);
  const venue = resort?.dining.find((d) => d.id === restaurantId);

  if (!venue) {
    return { title: "Restaurant Not Found" };
  }

  return {
    title: `${venue.title} | ${resort!.resortName}`,
    description: venue.description,
  };
}

export default async function RestaurantPage({ params }: PageProps) {
  const { offeringId, programId, resortId, restaurantId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId || !resort.dining.some((d) => d.id === restaurantId)) {
    notFound();
  }

  return (
    <ResortRestaurantDetailView offeringId={offeringId} programId={programId} data={resort} restaurantId={restaurantId} />
  );
}
