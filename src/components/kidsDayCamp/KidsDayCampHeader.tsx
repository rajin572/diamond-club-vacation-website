"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface KidsDayCampHeaderProps {
  badge?: string;
  titlePart1?: string;
  titlePart2?: string;
  description?: string;
}

export const KidsDayCampHeader: React.FC<KidsDayCampHeaderProps> = ({
  badge = "Kids Program",
  titlePart1 = "Day Camp & ",
  titlePart2 = "Teen Program",
  description = "An action-packed day camp schedule for all your kids, filled with activities, events, sports, games, live shows and entertainment, led by our counselors.",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 105, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.04 },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.3
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full pt-14 pb-10 sm:pt-16 sm:pb-12 bg-[#FCFCFB]">
      <Container>
        <div className="flex flex-col items-start gap-4 sm:gap-5 max-w-4xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/60"
          >
            <span className="size-[5px] bg-neutral-900 rounded-full" />
            <span className="text-neutral-900 text-xs sm:text-sm font-medium font-outfit uppercase tracking-wider">
              {badge}
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="font-cormorant font-light text-neutral-900 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight"
          >
            <span>{titlePart1}</span>
            <span>{titlePart2}</span>
          </h1>

          {/* Subtitle Description */}
          <p
            ref={descRef}
            className="text-zinc-700 text-base sm:text-lg lg:text-xl font-normal font-outfit leading-relaxed max-w-3xl"
          >
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
};

export default KidsDayCampHeader;
