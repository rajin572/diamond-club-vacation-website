import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisRestaurantDetailView from "@/components/resorts/stRegis/StRegisRestaurantDetailView";
import EditionRestaurantDetailView from "@/components/resorts/edition/EditionRestaurantDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";
import { THE_EDITION_RESORT_DATA } from "@/components/resorts/edition/edition.data";

interface RestaurantDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    restaurantId: string;
  }>;
}

export async function generateStaticParams() {
  const stRegisDining = ST_REGIS_RESORT_DATA.dining.map((dining) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    restaurantId: dining.id,
  }));
  const editionDining = THE_EDITION_RESORT_DATA.dining.map((dining) => ({
    id: "diamond-club-reserve",
    resortId: "edition",
    restaurantId: dining.id,
  }));
  return [...stRegisDining, ...editionDining];
}

export async function generateMetadata({ params }: RestaurantDetailPageProps): Promise<Metadata> {
  const { resortId, restaurantId } = await params;

  if (resortId === "st-regis") {
    const dining = ST_REGIS_RESORT_DATA.dining.find((d) => d.id === restaurantId);
    if (!dining) return { title: "Dining Details | The St. Regis Kanai Resort" };
    return {
      title: `${dining.title} | Dining | The St. Regis Kanai Resort`,
      description: dining.description,
    };
  }

  if (resortId === "edition") {
    const dining = THE_EDITION_RESORT_DATA.dining.find((d) => d.id === restaurantId);
    if (!dining) return { title: "Dining Details | The Edition Resort" };
    return {
      title: `${dining.title} | Dining | The Edition Resort`,
      description: dining.description,
    };
  }

  return { title: "Dining Details | Diamond Club Vacations" };
}

export default async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const { id: programId, resortId, restaurantId } = await params;

  if (resortId === "st-regis") {
    const dining = ST_REGIS_RESORT_DATA.dining.find((d) => d.id === restaurantId);
    if (!dining) notFound();
    return (
      <StRegisRestaurantDetailView
        programId={programId}
        restaurantId={restaurantId}
      />
    );
  }

  if (resortId === "edition") {
    const dining = THE_EDITION_RESORT_DATA.dining.find((d) => d.id === restaurantId);
    if (!dining) notFound();
    return (
      <EditionRestaurantDetailView
        programId={programId}
        restaurantId={restaurantId}
      />
    );
  }

  notFound();
}
