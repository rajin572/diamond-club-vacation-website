"use client";

import React, { useState } from "react";
import type { ResortData } from "./resorts.types";
import ResortBreadcrumb from "./ResortBreadcrumb";
import ResortHero from "./ResortHero";
import ResortSectionNav from "./ResortSectionNav";
import ResortAboutSection from "./ResortAboutSection";
import ResortRoomsSection from "./ResortRoomsSection";
import ResortDiningSection from "./ResortDiningSection";
import ResortPoolSection from "./ResortPoolSection";
import ResortWellnessSection from "./ResortWellnessSection";
import ResortSpaSection from "./ResortSpaSection";
import ResortGallerySection from "./ResortGallerySection";
import ResortInquireBanner from "./ResortInquireBanner";
import ResortPhotoModal from "./ResortPhotoModal";
import ResortDetailsModal from "./ResortDetailsModal";

interface ResortMainViewProps {
  offeringId: string;
  programId: string;
  data: ResortData;
}

export const ResortMainView: React.FC<ResortMainViewProps> = ({ offeringId, programId, data }) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-20 sm:pt-20 md:pt-20 flex flex-col">
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
        heroCtas={data.heroCtas}
        onOpenGallery={() => setGalleryOpen(true)}
        onOpenDetails={() => setDetailsOpen(true)}
      />

      <ResortSectionNav programId={programId} resortId={data.resortId} />

      {data.about && (
        <ResortAboutSection
          about={data.about}
          details={data.details}
          onOpenDetails={() => setDetailsOpen(true)}
        />
      )}

      <ResortRoomsSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        rooms={data.rooms}
        sectionTitle={data.roomsTitle}
        sectionDescription={data.roomsDescription}
      />

      <ResortDiningSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        dining={data.dining}
        sectionTitle={data.diningTitle}
        sectionDescription={data.diningDescription}
      />

      <ResortPoolSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        pools={data.pools}
        intro={data.poolsIntro}
        sectionTitle={data.poolsTitle}
        sectionDescription={data.poolsDescription}
      />

      <ResortWellnessSection
        offeringId={offeringId}
        programId={programId}
        resortId={data.resortId}
        wellness={data.wellnessActivities ?? data.wellness}
        sectionTitle={data.wellnessTitle}
        sectionDescription={data.wellnessDescription}
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

      {data.details && (
        <ResortDetailsModal
          isOpen={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          title={`Resort details`}
          details={data.details}
        />
      )}
    </main>
  );
};

export default ResortMainView;
