"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import DiamondClubVacationsBadge from "./DiamondClubVacationsBadge";

interface DiamondClubVacationsContentProps {
  badge: string;
  headline: {
    primary: string;
    accent: string;
  };
  paragraphs: string[];
  className?: string;
}

export const DiamondClubVacationsContent: React.FC<DiamondClubVacationsContentProps> = ({
  badge,
  headline,
  paragraphs,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      if (prefersReducedMotion()) {
        return;
      }

      const splitHeadline = headlineRef.current
        ? SplitText.create(headlineRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const splitParagraphs = bodyRef.current
        ? SplitText.create(bodyRef.current.querySelectorAll("p"), {
          type: "lines",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      if (badgeRef.current) {
        tl.from(badgeRef.current, {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (splitHeadline?.lines?.length) {
        tl.from(
          splitHeadline.lines,
          {
            yPercent: 110,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.35"
        );
      }

      if (splitParagraphs?.lines?.length) {
        tl.from(
          splitParagraphs.lines,
          {
            yPercent: 100,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      return () => {
        splitHeadline?.revert();
        splitParagraphs?.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex w-full max-w-[32.5rem] flex-col items-center justify-center gap-8 text-center",
        className
      )}
    >
      {/* 1. Golden Eyebrow Badge */}
      <div ref={badgeRef}>
        <DiamondClubVacationsBadge label={badge} />
      </div>

      {/* 2. Headline: Where luxury meets kosher */}
      <h2
        ref={headlineRef}
        className="text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.0] tracking-[-0.015em] text-[#131313]"
      >
        <span className="font-['Cormorant_Garamond'] block">
          {headline.primary}
        </span>
        <span className="font-['Cormorant_Garamond'] italic block">
          {headline.accent}
        </span>
      </h2>

      {/* 3. Description Paragraphs */}
      <div
        ref={bodyRef}
        className="flex w-full max-w-[27.5rem] flex-col items-center gap-4 text-center"
      >
        {paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="font-outfit text-[clamp(0.9375rem,1.1vw,1rem)] font-normal leading-[1.625] text-[#5E6062]"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DiamondClubVacationsContent;
