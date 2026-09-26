"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface EntertainmentHeaderProps {
  badge: string;
  headline: {
    part1: string;
    part2: string;
  };
  description: string;
}

export const EntertainmentHeader: React.FC<EntertainmentHeaderProps> = ({
  badge,
  headline,
  description,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.04,
          },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.25
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 bg-[#FCFCFB]">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12">
          {/* Left Title & Badge */}
          <div className="flex flex-col items-start gap-4">
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span
                className="size-[5px] rounded-full bg-[#BD9343] shrink-0"
                aria-hidden="true"
              />
              <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">
                {badge}
              </span>
            </div>

            <h1
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[0.98] text-[clamp(3.5rem,7vw,6rem)] text-left"
            >
              <span>{headline.part1}</span>
              <span>{headline.part2}</span>
            </h1>
          </div>

          {/* Right Description */}
          <p
            ref={descRef}
            className="w-full md:max-w-md font-outfit text-zinc-600 text-base sm:text-lg font-normal leading-relaxed md:leading-7"
          >
            {description}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default EntertainmentHeader;
