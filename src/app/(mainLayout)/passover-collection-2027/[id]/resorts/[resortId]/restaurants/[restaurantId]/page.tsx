import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisRestaurantDetailView from "@/components/resorts/stRegis/StRegisRestaurantDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";

interface RestaurantDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    restaurantId: string;
  }>;
}

export async function generateStaticParams() {
  return ST_REGIS_RESORT_DATA.dining.map((dining) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    restaurantId: dining.id,
  }));
}

export async function generateMetadata({ params }: RestaurantDetailPageProps): Promise<Metadata> {
  const { restaurantId } = await params;
  const dining = ST_REGIS_RESORT_DATA.dining.find((d) => d.id === restaurantId);

  if (!dining) {
    return {
      title: "Dining Details | The St. Regis Kanai Resort",
    };
  }

  return {
    title: `${dining.title} | Dining | The St. Regis Kanai Resort`,
    description: dining.description,
  };
}

export default async function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const { id: programId, resortId, restaurantId } = await params;

  if (resortId !== "st-regis") {
    notFound();
  }

  const dining = ST_REGIS_RESORT_DATA.dining.find((d) => d.id === restaurantId);
  if (!dining) {
    notFound();
  }

  return (
    <StRegisRestaurantDetailView
      programId={programId}
      restaurantId={restaurantId}
    />
  );
}
