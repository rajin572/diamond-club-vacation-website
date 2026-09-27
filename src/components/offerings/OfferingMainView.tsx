import React from "react";
import type { OfferingData } from "./offerings.types";
import OfferingHero from "./OfferingHero";
import OfferingPrograms from "./OfferingPrograms";
import OfferingCompare from "./OfferingCompare";
import OfferingInquiryBanner from "./OfferingInquiryBanner";

interface OfferingMainViewProps {
  data: OfferingData;
}

export const OfferingMainView: React.FC<OfferingMainViewProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col bg-background-color">
      <OfferingHero data={data.hero} />
      <OfferingPrograms offeringId={data.id} data={data.programsSection} />
      <OfferingCompare data={data.compare} />
      <OfferingInquiryBanner data={data.inquiry} />
    </div>
  );
};

export default OfferingMainView;
