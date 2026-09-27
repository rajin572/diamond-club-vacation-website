import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResortRoomDetailView } from "@/components/resorts";
import { getResort, resortsRegistry } from "@/data/resorts/registry";

interface PageProps {
  params: Promise<{ offeringId: string; programId: string; resortId: string; roomId: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.values(resortsRegistry).flatMap((resort) =>
    resort.rooms.map((room) => ({
      programId: resort.programId,
      resortId: resort.resortId,
      roomId: room.id,
    }))
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
