"use client";

import React, { useState } from "react";
import KidsProgramBreadcrumb from "./KidsProgramBreadcrumb";
import KidsProgramHeader from "./KidsProgramHeader";
import KidsProgramCards from "./KidsProgramCards";
import BabysittingModal from "./BabysittingModal";
import KidsProgramInquireBanner from "./KidsProgramInquireBanner";
import { kidsProgramData } from "./kidsProgram.data";

/* 
 * =======================================================================
 * REDUX / RTK QUERY INTEGRATION (READY FOR BACKEND CONNECTION)
 * =======================================================================
 * import { 
 *   useGetKidsProgramQuery, 
 *   useSubmitBabysittingInquiryMutation 
 * } from "@/redux/features/kidsProgram/kidsProgramApi";
 * 
 * In production:
 * const { data: apiData, isLoading, error } = useGetKidsProgramQuery({ programId });
 * const [submitBabysittingInquiry, { isLoading: isSubmitting }] = useSubmitBabysittingInquiryMutation();
 * const program = apiData?.data || kidsProgramData;
 * =======================================================================
 */

interface KidsProgramViewProps {
  programId?: string;
}

export const KidsProgramView: React.FC<KidsProgramViewProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const [isBabysittingModalOpen, setIsBabysittingModalOpen] = useState(false);

  // Static design mock fallback (replace with RTK Query data when API is plugged in)
  const program = kidsProgramData;

  const handleOpenBabysittingModal = () => {
    setIsBabysittingModalOpen(true);
  };

  const handleCloseBabysittingModal = () => {
    setIsBabysittingModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      {/* Breadcrumb Navigation */}
      <KidsProgramBreadcrumb
        programId={programId}
        programTitle="Diamond Club Reserve"
      />

      {/* Hero Header */}
      <KidsProgramHeader
        badge={program.badge}
        headline={program.headline}
        description={program.description}
      />

      {/* Program Cards (Day Camp & Teen collage card, Babysitting card) */}
      <KidsProgramCards
        programs={program.programs}
        programId={programId}
        onOpenBabysittingModal={handleOpenBabysittingModal}
      />

      {/* Inquire Banner */}
      <KidsProgramInquireBanner programId={programId} />

      {/* Babysitting Modal */}
      <BabysittingModal
        isOpen={isBabysittingModalOpen}
        onClose={handleCloseBabysittingModal}
        programId={programId}
        data={program.babysittingModal}
      />
    </main>
  );
};

export default KidsProgramView;
