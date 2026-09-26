import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisRoomDetailView from "@/components/resorts/stRegis/StRegisRoomDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    roomId: string;
  }>;
}

export async function generateStaticParams() {
  return ST_REGIS_RESORT_DATA.rooms.map((room) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    roomId: room.id,
  }));
}

export async function generateMetadata({ params }: RoomDetailPageProps): Promise<Metadata> {
  const { roomId } = await params;
  const room = ST_REGIS_RESORT_DATA.rooms.find((r) => r.id === roomId);

  if (!room) {
    return {
      title: "Room Details | The St. Regis Kanai Resort",
    };
  }

  return {
    title: `${room.title} | The St. Regis Kanai Resort`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id: programId, resortId, roomId } = await params;

  if (resortId !== "st-regis") {
    notFound();
  }

  const room = ST_REGIS_RESORT_DATA.rooms.find((r) => r.id === roomId);
  if (!room) {
    notFound();
  }

  return <StRegisRoomDetailView programId={programId} roomId={roomId} />;
}
