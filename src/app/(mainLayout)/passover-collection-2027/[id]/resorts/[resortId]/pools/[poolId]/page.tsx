import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisPoolDetailView from "@/components/resorts/stRegis/StRegisPoolDetailView";
import EditionPoolDetailView from "@/components/resorts/edition/EditionPoolDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";
import { THE_EDITION_RESORT_DATA } from "@/components/resorts/edition/edition.data";

interface PoolDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    poolId: string;
  }>;
}

export async function generateStaticParams() {
  const stRegisPools = ST_REGIS_RESORT_DATA.pools.map((pool) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    poolId: pool.id,
  }));
  const editionPools = THE_EDITION_RESORT_DATA.pools.map((pool) => ({
    id: "diamond-club-reserve",
    resortId: "edition",
    poolId: pool.id,
  }));
  return [...stRegisPools, ...editionPools];
}

export async function generateMetadata({ params }: PoolDetailPageProps): Promise<Metadata> {
  const { resortId, poolId } = await params;

  if (resortId === "st-regis") {
    const pool = ST_REGIS_RESORT_DATA.pools.find((p) => p.id === poolId);
    if (!pool) return { title: "Pool Details | The St. Regis Kanai Resort" };
    return {
      title: `${pool.title} | Pools & Beach | The St. Regis Kanai Resort`,
      description: pool.description,
    };
  }

  if (resortId === "edition") {
    const pool = THE_EDITION_RESORT_DATA.pools.find((p) => p.id === poolId);
    if (!pool) return { title: "Pool Details | The Edition Resort" };
    return {
      title: `${pool.title} | Pools & Beach | The Edition Resort`,
      description: pool.description,
    };
  }

  return { title: "Pool Details | Diamond Club Vacations" };
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
  const { id: programId, resortId, poolId } = await params;

  if (resortId === "st-regis") {
    const pool = ST_REGIS_RESORT_DATA.pools.find((p) => p.id === poolId);
    if (!pool) notFound();
    return (
      <StRegisPoolDetailView
        programId={programId}
        poolId={poolId}
      />
    );
  }

  if (resortId === "edition") {
    const pool = THE_EDITION_RESORT_DATA.pools.find((p) => p.id === poolId);
    if (!pool) notFound();
    return (
      <EditionPoolDetailView
        programId={programId}
        poolId={poolId}
      />
    );
  }

  notFound();
}
