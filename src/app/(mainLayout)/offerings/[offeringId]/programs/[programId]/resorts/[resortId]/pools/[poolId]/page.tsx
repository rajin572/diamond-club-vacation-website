import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResortPoolDetailView } from "@/components/resorts";
import { getResort, getResortRouteParams } from "@/data/resorts/registry";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string; poolId: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return getResortRouteParams().flatMap(({ resort, params }) =>
    resort.pools.map((pool) => ({ ...params, poolId: pool.id }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resortId, poolId } = await params;
  const resort = getResort(resortId);
  const pool = resort?.pools.find((p) => p.id === poolId);

  if (!pool) {
    return { title: "Pool Not Found" };
  }

  return {
    title: `${pool.title} | ${resort!.resortName}`,
    description: pool.description,
  };
}

export default async function PoolPage({ params }: PageProps) {
  const { offeringId, programId, resortId, poolId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId || !resort.pools.some((p) => p.id === poolId)) {
    notFound();
  }

  return <ResortPoolDetailView offeringId={offeringId} programId={programId} data={resort} poolId={poolId} />;
}
