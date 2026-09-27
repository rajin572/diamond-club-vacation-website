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
import type { KidsDayCampData } from "./kidsDayCamp.types";

interface KidsDayCampViewProps {
  offeringId: string;
  programId: string;
  data: KidsDayCampData;
}

export const KidsDayCampView: React.FC<KidsDayCampViewProps> = ({ offeringId, programId, data }) => {
  const [isBabysittingModalOpen, setIsBabysittingModalOpen] = useState(false);

  const handleOpenBabysittingModal = () => {
    setIsBabysittingModalOpen(true);
  };

  const handleCloseBabysittingModal = () => {
    setIsBabysittingModalOpen(false);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      <KidsDayCampBreadcrumb offeringId={offeringId} programId={programId} programName={data.programName} />

      <KidsDayCampGallery gallery={data.gallery} />

      <KidsDayCampHeader
        badge={data.hero.badge}
        titlePart1={data.hero.titlePart1}
        titlePart2={data.hero.titlePart2}
        description={data.hero.description}
      />

      <section className="w-full pb-20 sm:pb-28">
        <Container>
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <KidsDayCampSidebar onAskAboutKidsProgram={handleOpenBabysittingModal} />

            <KidsDayCampContent data={data} onOpenBabysitting={handleOpenBabysittingModal} />
          </div>
        </Container>
      </section>

      <KidsDayCampInquireBanner programId={programId} />

      <BabysittingModal
        isOpen={isBabysittingModalOpen}
        onClose={handleCloseBabysittingModal}
        programId={programId}
        data={data.babysittingModal}
      />
    </main>
  );
};

export default KidsDayCampView;
