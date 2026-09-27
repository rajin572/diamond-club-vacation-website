"use client";

import React, { useState } from "react";
import KidsProgramBreadcrumb from "./KidsProgramBreadcrumb";
import KidsProgramHeader from "./KidsProgramHeader";
import KidsProgramCards from "./KidsProgramCards";
import BabysittingModal from "./BabysittingModal";
import KidsProgramInquireBanner from "./KidsProgramInquireBanner";
import type { KidsProgramData } from "./kidsProgram.types";

interface KidsProgramViewProps {
  offeringId: string;
  programId: string;
  programTitle: string;
  data: KidsProgramData;
}

export const KidsProgramView: React.FC<KidsProgramViewProps> = ({
  offeringId,
  programId,
  programTitle,
  data,
}) => {
  const [isBabysittingModalOpen, setIsBabysittingModalOpen] = useState(false);

  const handleOpenBabysittingModal = () => {
    setIsBabysittingModalOpen(true);
  };

  const handleCloseBabysittingModal = () => {
    setIsBabysittingModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      <KidsProgramBreadcrumb offeringId={offeringId} programId={programId} programTitle={programTitle} />

      <KidsProgramHeader badge={data.badge} headline={data.headline} description={data.description} />

      <KidsProgramCards
        programs={data.programs}
        offeringId={offeringId}
        programId={programId}
        onOpenBabysittingModal={handleOpenBabysittingModal}
      />

      <KidsProgramInquireBanner programId={programId} headline={data.inquireBanner.headline} buttonText={data.inquireBanner.buttonText} />

      <BabysittingModal
        isOpen={isBabysittingModalOpen}
        onClose={handleCloseBabysittingModal}
        programId={programId}
        data={data.babysittingModal}
      />
    </main>
  );
};

export default KidsProgramView;
