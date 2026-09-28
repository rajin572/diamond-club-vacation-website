"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import type { OfferingCompareData } from "./offerings.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface OfferingCompareProps {
  data: OfferingCompareData;
}

export const OfferingCompare: React.FC<OfferingCompareProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
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
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.05 },
          0.1
        );
      }

      if (tableRef.current) {
        const rows = tableRef.current.querySelectorAll(".compare-row");
        tl.fromTo(
          rows,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05, clearProps: "transform" },
          0.25
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-28 md:pb-36"
      aria-label="Compare Programs"
    >
      <Container>
        <div className="flex flex-col items-start gap-4 sm:gap-5 pb-10 sm:pb-14">
          <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
            <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" aria-hidden="true" />
            <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">{data.badge}</span>
          </div>

          <h2
            ref={titleRef}
            className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.1] text-[clamp(2.25rem,4.5vw,4.5rem)] max-w-3xl"
          >
            <span>{data.headline.lead}</span>
            <span className="font-medium">{data.headline.accent}</span>
            <span>{data.headline.tail}</span>
          </h2>
        </div>

        <div className="w-full overflow-x-auto lg:overflow-visible overflow-y-hidden pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div ref={tableRef} className="min-w-[760px] lg:min-w-full flex flex-col justify-start items-start">
            <div className="compare-row w-full pb-6 sm:pb-7 border-b border-neutral-900/20 flex items-end gap-6 sm:gap-8">
              <div className="w-56 sm:w-64 lg:w-72 shrink-0">
                <span className="sr-only">Features</span>
              </div>

              {data.columns.map((column) => (
                <div key={column.id} className="flex-1 flex flex-col justify-start items-start">
                  <h3 className="font-cormorant font-normal text-neutral-900 text-2xl sm:text-3xl lg:text-4xl leading-tight whitespace-pre-line">
                    {column.name}
                  </h3>
                </div>
              ))}
            </div>

            {data.rows.map((row) => (
              <div
                key={row.category}
                className="compare-row w-full py-5 sm:py-6 border-b border-neutral-900/10 flex items-start gap-6 sm:gap-8 hover:bg-neutral-900/[0.015] transition-colors duration-200"
              >
                <div className="w-56 sm:w-64 lg:w-72 shrink-0">
                  <div className="text-zinc-600 font-outfit text-sm sm:text-base font-medium leading-6">
                    {row.category}
                  </div>
                </div>

                {data.columns.map((column) => (
                  <div key={column.id} className="flex-1 flex flex-col justify-start items-start">
                    <div className="text-neutral-900 font-outfit text-sm sm:text-base font-normal leading-relaxed">
                      {row.values[column.id]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OfferingCompare;
