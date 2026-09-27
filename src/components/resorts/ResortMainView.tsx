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
    <div className="w-full flex flex-col bg-[#FCFCFB]">
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
      />

      <ResortWellnessSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        wellness={data.wellness}
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
    </div>
  );
};

export default ResortMainView;
