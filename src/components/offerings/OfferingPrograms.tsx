"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import OfferingProgramRow from "./OfferingProgramRow";
import type { OfferingProgramsSectionData } from "./offerings.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface OfferingProgramsProps {
  offeringId: string;
  data: OfferingProgramsSectionData;
}

export const OfferingPrograms: React.FC<OfferingProgramsProps> = ({ offeringId, data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.05 },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.3);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-24 md:pb-28"
      aria-label="Offering Programs"
    >
      <Container>
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8 pb-12 sm:pb-16">
          <div className="flex flex-col items-start gap-4 sm:gap-5 max-w-3xl">
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" aria-hidden="true" />
              <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">{data.badge}</span>
            </div>

            <h2
              ref={titleRef}
              className="font-cormorant font-medium text-neutral-900 tracking-tight leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)]"
            >
              <span>{data.title}</span>
            </h2>
          </div>

          <p ref={descRef} className="text-zinc-600 font-outfit text-sm sm:text-base font-normal leading-relaxed max-w-sm">
            {data.description}
          </p>
        </div>

        <div className="w-full flex flex-col">
          {data.programs.map((program, index) => (
            <OfferingProgramRow
              key={program.id}
              offeringId={offeringId}
              program={program}
              index={index}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OfferingPrograms;
