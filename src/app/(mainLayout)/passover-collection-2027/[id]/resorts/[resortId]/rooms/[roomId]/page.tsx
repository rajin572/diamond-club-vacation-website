import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StRegisRoomDetailView from "@/components/resorts/stRegis/StRegisRoomDetailView";
import EditionRoomDetailView from "@/components/resorts/edition/EditionRoomDetailView";
import { ST_REGIS_RESORT_DATA } from "@/components/resorts/stRegis/stRegis.data";
import { THE_EDITION_RESORT_DATA } from "@/components/resorts/edition/edition.data";

interface RoomDetailPageProps {
  params: Promise<{
    id: string;
    resortId: string;
    roomId: string;
  }>;
}

export async function generateStaticParams() {
  const stRegisRooms = ST_REGIS_RESORT_DATA.rooms.map((room) => ({
    id: "diamond-club-reserve",
    resortId: "st-regis",
    roomId: room.id,
  }));
  const editionRooms = THE_EDITION_RESORT_DATA.rooms.map((room) => ({
    id: "diamond-club-reserve",
    resortId: "edition",
    roomId: room.id,
  }));
  return [...stRegisRooms, ...editionRooms];
}

export async function generateMetadata({ params }: RoomDetailPageProps): Promise<Metadata> {
  const { resortId, roomId } = await params;

  if (resortId === "st-regis") {
    const room = ST_REGIS_RESORT_DATA.rooms.find((r) => r.id === roomId);
    if (!room) return { title: "Room Details | The St. Regis Kanai Resort" };
    return {
      title: `${room.title} | The St. Regis Kanai Resort`,
      description: room.description,
    };
  }

  if (resortId === "edition") {
    const room = THE_EDITION_RESORT_DATA.rooms.find((r) => r.id === roomId);
    if (!room) return { title: "Room Details | The Edition Resort" };
    return {
      title: `${room.title} | The Edition Resort`,
      description: room.description,
    };
  }

  return { title: "Room Details | Diamond Club Vacations" };
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id: programId, resortId, roomId } = await params;

  if (resortId === "st-regis") {
    const room = ST_REGIS_RESORT_DATA.rooms.find((r) => r.id === roomId);
    if (!room) notFound();
    return <StRegisRoomDetailView programId={programId} roomId={roomId} />;
  }

  if (resortId === "edition") {
    const room = THE_EDITION_RESORT_DATA.rooms.find((r) => r.id === roomId);
    if (!room) notFound();
    return <EditionRoomDetailView programId={programId} roomId={roomId} />;
  }

  notFound();
}
