import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResortRoomDetailView } from "@/components/resorts";
import { getResort, getResortRouteParams } from "@/data/resorts/registry";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string; roomId: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return getResortRouteParams().flatMap(({ resort, params }) =>
    resort.rooms.map((room) => ({ ...params, roomId: room.id }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resortId, roomId } = await params;
  const resort = getResort(resortId);
  const room = resort?.rooms.find((r) => r.id === roomId);

  if (!room) {
    return { title: "Room Not Found" };
  }

  return {
    title: `${room.title} | ${resort!.resortName}`,
    description: room.description,
  };
}

export default async function RoomPage({ params }: PageProps) {
  const { offeringId, programId, resortId, roomId } = await params;
  const resort = getResort(resortId);

  if (!resort || resort.programId !== programId || !resort.rooms.some((r) => r.id === roomId)) {
    notFound();
  }

  return <ResortRoomDetailView offeringId={offeringId} programId={programId} data={resort} roomId={roomId} />;
}
