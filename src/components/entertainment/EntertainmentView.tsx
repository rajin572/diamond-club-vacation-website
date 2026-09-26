"use client";

import React, { useState } from "react";
import EntertainmentBreadcrumb from "./EntertainmentBreadcrumb";
import EntertainmentHeader from "./EntertainmentHeader";
import EntertainmentGrid from "./EntertainmentGrid";
import EntertainmentDetailModal from "./EntertainmentDetailModal";
import EntertainmentInquireBanner from "./EntertainmentInquireBanner";
import { ENTERTAINMENT_DATA } from "./entertainment.data";
import type { EntertainmentEvent } from "./entertainment.types";

interface EntertainmentViewProps {
  programId?: string;
  programTitle?: string;
}

export const EntertainmentView: React.FC<EntertainmentViewProps> = ({
  programId = "diamond-club-reserve",
  programTitle = "Diamond Club Reserve",
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event: EntertainmentEvent) => {
    setSelectedEventId(event.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      {/* Breadcrumb Navigation */}
      <EntertainmentBreadcrumb
        programId={programId}
        programTitle={programTitle}
      />

      {/* Main Section Header */}
      <EntertainmentHeader
        badge={ENTERTAINMENT_DATA.badge}
        headline={ENTERTAINMENT_DATA.headline}
        description={ENTERTAINMENT_DATA.description}
      />

      {/* Events Grid */}
      <EntertainmentGrid
        events={ENTERTAINMENT_DATA.events}
        onOpenModal={handleOpenModal}
      />

      {/* Inquire Banner */}
      <EntertainmentInquireBanner
        programId={programId}
        headline={ENTERTAINMENT_DATA.inquireBanner.headline}
        buttonText={ENTERTAINMENT_DATA.inquireBanner.buttonText}
      />

      {/* Event Details Modal */}
      <EntertainmentDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        events={ENTERTAINMENT_DATA.events}
        initialEventId={selectedEventId || undefined}
      />
    </main>
  );
};

export default EntertainmentView;
