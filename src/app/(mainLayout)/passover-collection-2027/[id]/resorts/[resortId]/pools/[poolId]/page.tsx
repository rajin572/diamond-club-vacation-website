import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisPoolDetailView from "@/components/resorts/stRegis/StRegisPoolDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";

interface PoolDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    poolId: string;
  }>;
}

export async function generateStaticParams() {
  return ST_REGIS_RESORT_DATA.pools.map((pool) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    poolId: pool.id,
  }));
}

export async function generateMetadata({ params }: PoolDetailPageProps): Promise<Metadata> {
  const { poolId } = await params;
  const pool = ST_REGIS_RESORT_DATA.pools.find((p) => p.id === poolId);

  if (!pool) {
    return {
      title: "Pool Details | The St. Regis Kanai Resort",
    };
  }

  return {
    title: `${pool.title} | Pools & Beach | The St. Regis Kanai Resort`,
    description: pool.description,
  };
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
  const { id: programId, resortId, poolId } = await params;

  if (resortId !== "st-regis") {
    notFound();
  }

  const pool = ST_REGIS_RESORT_DATA.pools.find((p) => p.id === poolId);
  if (!pool) {
    notFound();
  }

  return (
    <StRegisPoolDetailView
      programId={programId}
      poolId={poolId}
    />
  );
}
