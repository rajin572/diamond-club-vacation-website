import React from "react";
import type { ProgramData } from "./programs.types";
import ProgramHero from "./ProgramHero";
import ProgramTabs from "./ProgramTabs";
import ProgramAbout from "./ProgramAbout";
import ProgramWhereYouStay from "./ProgramWhereYouStay";
import ProgramExperiences from "./ProgramExperiences";
import ProgramExplore from "./ProgramExplore";
import ProgramInquiryBanner from "./ProgramInquiryBanner";
import ProgramSimpleHero from "./ProgramSimpleHero";
import ProgramSimpleAbout from "./ProgramSimpleAbout";
import { inquireHref as buildInquireHref } from "@/lib/routes";

interface ProgramMainViewProps {
  offeringId: string;
  data: ProgramData;
}

/**
 * Renders every program (Diamond Club Reserve, Guttaway, Blue, and any future program) from one
 * component. Sections render only when the program's data includes them — a program with just
 * hero/about content (no `hero`/`tabs`/`whereYouStay`/etc.) gets a lighter page automatically,
 * without a separate component tree.
 */
export const ProgramMainView: React.FC<ProgramMainViewProps> = ({ offeringId, data }) => {
  const inquireHref = buildInquireHref({ destination: data.id });

  if (!data.hero) {
    return (
      <div className="w-full flex flex-col bg-background-color min-h-[70vh]">
        <ProgramSimpleHero data={data} inquireHref={inquireHref} />
        <ProgramSimpleAbout data={data} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-background-color">
      <ProgramHero data={data.hero} inquireHref={inquireHref} />
      {data.tabs && <ProgramTabs tabs={data.tabs} inquireHref={inquireHref} />}
      {data.about && <ProgramAbout data={data.about} inquireHref={inquireHref} />}
      {data.whereYouStay && (
        <ProgramWhereYouStay offeringId={offeringId} programId={data.id} data={data.whereYouStay} />
      )}
      {data.experiences && (
        <ProgramExperiences offeringId={offeringId} programId={data.id} data={data.experiences} />
      )}
      {data.explore && <ProgramExplore offeringId={offeringId} programId={data.id} data={data.explore} />}
      <ProgramInquiryBanner data={data.inquiry} inquireHref={inquireHref} />
    </div>
  );
};

export default ProgramMainView;
