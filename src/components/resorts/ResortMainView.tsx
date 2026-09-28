"use client";

import React, { useState } from "react";
import type { ResortData } from "./resorts.types";
import ResortBreadcrumb from "./ResortBreadcrumb";
import ResortHero from "./ResortHero";
import ResortSectionNav from "./ResortSectionNav";
import ResortRoomsSection from "./ResortRoomsSection";
import ResortDiningSection from "./ResortDiningSection";
import ResortPoolSection from "./ResortPoolSection";
import ResortWellnessSection from "./ResortWellnessSection";
import ResortSpaSection from "./ResortSpaSection";
import ResortGallerySection from "./ResortGallerySection";
import ResortInquireBanner from "./ResortInquireBanner";
import ResortPhotoModal from "./ResortPhotoModal";

interface ResortMainViewProps {
  offeringId: string;
  programId: string;
  data: ResortData;
}

export const ResortMainView: React.FC<ResortMainViewProps> = ({ offeringId, programId, data }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col">
      <ResortBreadcrumb
        offeringId={offeringId}
        programId={programId}
        programTitle={data.programTitle}
        resortId={data.resortId}
        resortName={data.resortName}
      />

      <ResortHero
        programId={programId}
        resortId={data.resortId}
        resortName={data.resortName}
        shortName={data.shortName}
        tagline={data.tagline}
        heroImage={data.heroImage}
        onOpenGallery={() => setGalleryOpen(true)}
      />

      <ResortSectionNav programId={programId} resortId={data.resortId} />

      <ResortRoomsSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        rooms={data.rooms}
      />

      <ResortDiningSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        dining={data.dining}
      />

      <ResortPoolSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        pools={data.pools}
        intro={data.poolsIntro}
      />

      <ResortWellnessSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        wellness={data.wellnessActivities ?? data.wellness}
      />

      <ResortSpaSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        spa={data.spa}
      />

      <ResortGallerySection resortName={data.resortName} gallery={data.gallery} />

      <ResortInquireBanner
        programId={programId}
        resortId={data.resortId}
        resortName={data.resortName}
        heroImage={data.heroImage}
      />

      <ResortPhotoModal
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        photos={data.gallery}
        title={data.resortName}
      />
    </main>
  );
};

export default ResortMainView;
