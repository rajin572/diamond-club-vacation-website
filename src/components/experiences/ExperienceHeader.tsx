"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ExperienceHeaderProps {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  badgeStyle: "dot" | "pill";
  accentColor?: string;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({
  badge,
  titlePart1,
  titlePart2,
  description,
  badgeStyle,
  accentColor = "#BD9343",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
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
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.04 },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25);
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 bg-[#FCFCFB]">
      <Container>
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-12">
          <div className="flex flex-col items-start gap-4">
            {badgeStyle === "pill" ? (
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/60"
              >
                <span className="size-[5px] bg-neutral-900 rounded-full" />
                <span className="text-neutral-900 text-xs sm:text-sm font-medium font-outfit uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            ) : (
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full shrink-0" style={{ backgroundColor: accentColor }} aria-hidden="true" />
                <span className="font-outfit text-sm font-medium leading-5" style={{ color: accentColor }}>
                  {badge}
                </span>
              </div>
            )}

            <h1
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[0.98] text-[clamp(3.5rem,7vw,6rem)] text-left"
            >
              <span>{titlePart1}</span>
              <span>{titlePart2}</span>
            </h1>
          </div>

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

export default ExperienceHeader;
