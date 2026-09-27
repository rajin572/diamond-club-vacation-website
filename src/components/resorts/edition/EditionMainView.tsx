"use client";

import React, { useState } from "react";
import EditionBreadcrumb from "./EditionBreadcrumb";
import EditionHero from "./EditionHero";
import EditionSectionNav from "./EditionSectionNav";
import EditionRoomsSection from "./EditionRoomsSection";
import EditionDiningSection from "./EditionDiningSection";
import EditionPoolSection from "./EditionPoolSection";
import EditionWellnessSection from "./EditionWellnessSection";
import EditionSpaSection from "./EditionSpaSection";
import EditionGallerySection from "./EditionGallerySection";
import EditionInquireBanner from "./EditionInquireBanner";
import EditionPhotoModal from "./EditionPhotoModal";
import { THE_EDITION_RESORT_DATA } from "./edition.data";

interface EditionMainViewProps {
  programId?: string;
}

export const EditionMainView: React.FC<EditionMainViewProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const data = THE_EDITION_RESORT_DATA;

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col">
      {/* Breadcrumb */}
      <EditionBreadcrumb
        programId={programId}
        programTitle={data.programTitle}
        resortName={data.resortName}
      />

      {/* Hero */}
      <EditionHero
        programId={programId}
        onOpenGallery={() => setGalleryModalOpen(true)}
      />

      {/* Sticky Section Nav */}
      <EditionSectionNav programId={programId} />

      {/* Rooms & Suites Section */}
      <EditionRoomsSection
        programId={programId}
        rooms={data.rooms}
      />

      {/* Dining Section */}
      <EditionDiningSection
        programId={programId}
        dining={data.dining}
      />

      {/* Pools & Beach Section */}
      <EditionPoolSection
        programId={programId}
        pools={data.pools}
      />

      {/* Wellness & Fitness Section */}
      <EditionWellnessSection programId={programId} />

      {/* Spa Section */}
      <EditionSpaSection programId={programId} />

      {/* Gallery Section */}
      <EditionGallerySection gallery={data.gallery} />

      {/* Inquiry Banner */}
      <EditionInquireBanner programId={programId} />

      {/* Full Resort Photo Lightbox Modal */}
      <EditionPhotoModal
        isOpen={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        photos={data.gallery}
        title="The Edition Resort"
      />
    </main>
  );
};

export default EditionMainView;
