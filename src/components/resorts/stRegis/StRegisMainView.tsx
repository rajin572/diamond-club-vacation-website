"use client";

import React, { useState } from "react";
import StRegisBreadcrumb from "./StRegisBreadcrumb";
import StRegisHero from "./StRegisHero";
import StRegisSectionNav from "./StRegisSectionNav";
import StRegisRoomsSection from "./StRegisRoomsSection";
import StRegisDiningSection from "./StRegisDiningSection";
import StRegisPoolSection from "./StRegisPoolSection";
import StRegisWellnessSection from "./StRegisWellnessSection";
import StRegisSpaSection from "./StRegisSpaSection";
import StRegisGallerySection from "./StRegisGallerySection";
import StRegisInquireBanner from "./StRegisInquireBanner";
import StRegisPhotoModal from "./StRegisPhotoModal";
import { ST_REGIS_RESORT_DATA } from "./stRegis.data";

interface StRegisMainViewProps {
  programId?: string;
}

export const StRegisMainView: React.FC<StRegisMainViewProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const data = ST_REGIS_RESORT_DATA;

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col">
      {/* Breadcrumb */}
      <StRegisBreadcrumb
        programId={programId}
        programTitle={data.programTitle}
        resortName={data.resortName}
      />

      {/* Hero */}
      <StRegisHero
        programId={programId}
        onOpenGallery={() => setGalleryModalOpen(true)}
      />

      {/* Sticky Section Nav */}
      <StRegisSectionNav programId={programId} />

      {/* Rooms & Suites Section */}
      <StRegisRoomsSection
        programId={programId}
        rooms={data.rooms}
      />

      {/* Dining Section */}
      <StRegisDiningSection
        programId={programId}
        dining={data.dining}
      />

      {/* Pools & Beach Section */}
      <StRegisPoolSection
        programId={programId}
        pools={data.pools}
      />

      {/* Wellness & Fitness Section */}
      <StRegisWellnessSection programId={programId} />

      {/* Spa Section */}
      <StRegisSpaSection programId={programId} />

      {/* Gallery Section */}
      <StRegisGallerySection gallery={data.gallery} />

      {/* Inquiry Banner */}
      <StRegisInquireBanner programId={programId} />

      {/* Full Resort Photo Lightbox Modal */}
      <StRegisPhotoModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        photos={data.gallery}
        title="The St. Regis Kanai Resort"
      />
    </main>
  );
};

export default StRegisMainView;
