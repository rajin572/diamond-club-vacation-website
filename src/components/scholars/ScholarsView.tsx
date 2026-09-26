"use client";

import React, { useState } from "react";
import ScholarsBreadcrumb from "./ScholarsBreadcrumb";
import ScholarsHeader from "./ScholarsHeader";
import ScholarsGrid from "./ScholarsGrid";
import ScholarDetailModal from "./ScholarDetailModal";
import ScholarsInquireBanner from "./ScholarsInquireBanner";
import { scholarsData } from "./scholars.data";

/* 
 * =======================================================================
 * REDUX / RTK QUERY INTEGRATION (READY FOR BACKEND CONNECTION)
 * =======================================================================
 * import { 
 *   useGetScholarsQuery, 
 *   useGetScholarByIdQuery 
 * } from "@/redux/features/scholars/scholarsApi";
 * 
 * In production:
 * const { data: apiData, isLoading, error } = useGetScholarsQuery({ programId });
 * const pageData = apiData?.data || scholarsData;
 * =======================================================================
 */

interface ScholarsViewProps {
  programId?: string;
}

export const ScholarsView: React.FC<ScholarsViewProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarIndex, setSelectedScholarIndex] = useState(0);

  const pageData = scholarsData;

  const handleOpenBio = (index: number) => {
    setSelectedScholarIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      {/* Breadcrumb Navigation */}
      <ScholarsBreadcrumb
        programId={programId}
        programName={pageData.programName}
      />

      {/* Header Section */}
      <ScholarsHeader
        badge={pageData.hero.badge}
        titlePart1={pageData.hero.titlePart1}
        titlePart2={pageData.hero.titlePart2}
        description={pageData.hero.description}
      />

      {/* Scholars Grid */}
      <ScholarsGrid
        scholars={pageData.scholars}
        onReadBio={handleOpenBio}
      />

      {/* Inquire Banner */}
      <ScholarsInquireBanner programId={programId} />

      {/* Scholar Detail Modal */}
      <ScholarDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        scholars={pageData.scholars}
        currentIndex={selectedScholarIndex}
        onIndexChange={setSelectedScholarIndex}
      />
    </main>
  );
};

export default ScholarsView;
