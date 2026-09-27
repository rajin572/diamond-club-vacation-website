"use client";

import React, { useState } from "react";
import ExperienceBreadcrumb from "./ExperienceBreadcrumb";
import ExperienceHeader from "./ExperienceHeader";
import ExperienceGrid from "./ExperienceGrid";
import ExperienceInquireBanner from "./ExperienceInquireBanner";
import ExperienceDetailModal from "./ExperienceDetailModal";
import type { ExperienceCategoryData, ExperienceItem } from "./experiences.types";

interface ExperienceCategoryViewProps {
  offeringId: string;
  data: ExperienceCategoryData;
}

export const ExperienceCategoryView: React.FC<ExperienceCategoryViewProps> = ({ offeringId, data }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (_item: ExperienceItem, index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  return (
    <main className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32">
      <ExperienceBreadcrumb
        offeringId={offeringId}
        programId={data.programId}
        programTitle={data.programTitle}
        categoryLabel={data.breadcrumbLabel}
      />

      <ExperienceHeader
        badge={data.header.badge}
        titlePart1={data.header.titlePart1}
        titlePart2={data.header.titlePart2}
        description={data.header.description}
        badgeStyle={data.badgeStyle}
        accentColor={data.accentColor}
      />

      <ExperienceGrid items={data.items} columns={data.gridColumns} onSelect={handleSelect} />

      <ExperienceInquireBanner
        programId={data.programId}
        experienceType={data.experienceType}
        headlinePart1={data.inquireBanner.headlinePart1}
        headlinePart2={data.inquireBanner.headlinePart2}
        buttonText={data.inquireBanner.buttonText}
      />

      <ExperienceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={data.items}
        initialIndex={selectedIndex}
        categoryLabel={data.breadcrumbLabel}
      />
    </main>
  );
};

export default ExperienceCategoryView;
