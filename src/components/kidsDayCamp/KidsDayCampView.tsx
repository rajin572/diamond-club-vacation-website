"use client";

import React, { useState } from "react";
import Container from "@/components/ui/CustomUi/Container";
import KidsDayCampBreadcrumb from "./KidsDayCampBreadcrumb";
import KidsDayCampGallery from "./KidsDayCampGallery";
import KidsDayCampHeader from "./KidsDayCampHeader";
import KidsDayCampSidebar from "./KidsDayCampSidebar";
import KidsDayCampContent from "./KidsDayCampContent";
import KidsDayCampInquireBanner from "./KidsDayCampInquireBanner";
import BabysittingModal from "@/components/kidsProgram/BabysittingModal";
import { kidsDayCampData } from "./kidsDayCamp.data";
import { kidsProgramData } from "@/components/kidsProgram/kidsProgram.data";

/* 
 * =======================================================================
 * REDUX / RTK QUERY INTEGRATION (READY FOR BACKEND CONNECTION)
 * =======================================================================
 * import { 
 *   useGetKidsDayCampDetailsQuery,
 *   useSubmitCampInquiryMutation 
 * } from "@/redux/features/kidsProgram/kidsProgramApi";
 * 
 * In production:
 * const { data: apiData, isLoading, error } = useGetKidsDayCampDetailsQuery({ programId });
 * const [submitCampInquiry, { isLoading: isSubmitting }] = useSubmitCampInquiryMutation();
 * const campData = apiData?.data || kidsDayCampData;
 * =======================================================================
 */

interface KidsDayCampViewProps {
  programId?: string;
}

export const KidsDayCampView: React.FC<KidsDayCampViewProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const [isBabysittingModalOpen, setIsBabysittingModalOpen] = useState(false);

  // Static design mock fallback
  const campData = kidsDayCampData;

  const handleOpenBabysittingModal = () => {
    setIsBabysittingModalOpen(true);
  };

  const handleCloseBabysittingModal = () => {
    setIsBabysittingModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      {/* 1. Breadcrumbs */}
      <KidsDayCampBreadcrumb
        programId={programId}
        programName={campData.programName}
      />

      {/* 2. Gallery Section */}
      <KidsDayCampGallery gallery={campData.gallery} />

      {/* 3. Header Title & Subtitle */}
      <KidsDayCampHeader
        badge={campData.hero.badge}
        titlePart1={campData.hero.titlePart1}
        titlePart2={campData.hero.titlePart2}
        description={campData.hero.description}
      />

      {/* 4. Two-Column Layout (Sticky Nav + Content) */}
      <section className="w-full pb-20 sm:pb-28">
        <Container>
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            {/* Sticky Sidebar */}
            <KidsDayCampSidebar
              onAskAboutKidsProgram={handleOpenBabysittingModal}
            />

            {/* Main Content Sections */}
            <KidsDayCampContent
              data={campData}
              onOpenBabysitting={handleOpenBabysittingModal}
            />
          </div>
        </Container>
      </section>

      {/* 5. Inquire Banner */}
      <KidsDayCampInquireBanner programId={programId} />

      {/* 6. Babysitting Modal */}
      <BabysittingModal
        isOpen={isBabysittingModalOpen}
        onClose={handleCloseBabysittingModal}
        programId={programId}
        data={kidsProgramData.babysittingModal}
      />
    </main>
  );
};

export default KidsDayCampView;
