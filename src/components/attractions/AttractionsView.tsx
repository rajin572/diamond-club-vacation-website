"use client";

import React, { useState } from "react";
import AttractionsBreadcrumb from "./AttractionsBreadcrumb";
import AttractionsHeader from "./AttractionsHeader";
import AttractionsGrid from "./AttractionsGrid";
import AttractionDetailModal from "./AttractionDetailModal";
import AttractionsInquireBanner from "./AttractionsInquireBanner";
import { ATTRACTIONS_DATA } from "./attractions.data";
import type { AttractionItem } from "./attractions.types";

/*
 * =======================================================================
 * REDUX / RTK QUERY INTEGRATION (READY FOR BACKEND CONNECTION)
 * =======================================================================
 * import {
 *   useGetAttractionsQuery,
 *   useGetAttractionByIdQuery,
 *   useCreateAttractionMutation,
 *   useUpdateAttractionMutation,
 *   useDeleteAttractionMutation,
 * } from "@/redux/features/attractions/attractionsApi";
 *
 * In production:
 * const { data: apiData, isLoading, error } = useGetAttractionsQuery({ programId });
 * const [createAttraction] = useCreateAttractionMutation();
 * const [updateAttraction] = useUpdateAttractionMutation();
 * const [deleteAttraction] = useDeleteAttractionMutation();
 * const pageData = apiData?.data || ATTRACTIONS_DATA;
 * =======================================================================
 */

interface AttractionsViewProps {
  programId?: string;
  programTitle?: string;
}

export const AttractionsView: React.FC<AttractionsViewProps> = ({
  programId = "diamond-club-reserve",
  programTitle = "Diamond Club Reserve",
}) => {
  const [selectedAttractionId, setSelectedAttractionId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageData = ATTRACTIONS_DATA;

  const handleOpenModal = (attraction: AttractionItem) => {
    setSelectedAttractionId(attraction.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      {/* Breadcrumb Navigation */}
      <AttractionsBreadcrumb
        programId={programId}
        programTitle={programTitle}
      />

      {/* Main Section Header */}
      <AttractionsHeader
        badge={pageData.header.badge}
        headline={pageData.header.headline}
        description={pageData.header.description}
      />

      {/* Attractions Grid */}
      <AttractionsGrid
        attractions={pageData.attractions}
        onSelectAttraction={handleOpenModal}
      />

      {/* Inquire Banner */}
      <AttractionsInquireBanner
        programId={programId}
        headlinePart1={pageData.inquireBanner.headlinePart1}
        headlinePart2={pageData.inquireBanner.headlinePart2}
        buttonText={pageData.inquireBanner.buttonText}
      />

      {/* Attraction Detail Modal */}
      <AttractionDetailModal
        key={selectedAttractionId || "attractions-modal"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        attractions={pageData.attractions}
        initialAttractionId={selectedAttractionId || undefined}
      />
    </main>
  );
};

export default AttractionsView;
