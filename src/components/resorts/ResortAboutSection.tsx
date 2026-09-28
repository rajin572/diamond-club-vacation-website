"use client";

import React, { useRef } from "react";
import { Check } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { ResortAboutData, ResortDetailsData } from "./resorts.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ResortAboutSectionProps {
  about?: ResortAboutData;
  details?: ResortDetailsData;
  onOpenDetails?: () => void;
}

export const ResortAboutSection: React.FC<ResortAboutSectionProps> = ({
  about,
  details,
  onOpenDetails,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.1
        );
      }

      if (leftColRef.current) {
        tl.fromTo(leftColRef.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.25);
      }

      if (cardRef.current) {
        tl.fromTo(cardRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.3);
      }
    },
    { scope: sectionRef }
  );

  if (!about) return null;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full py-16 sm:py-20 md:py-24 border-b border-[rgba(19,19,19,0.06)] scroll-mt-28"
      aria-label="About Resort"
    >
      <Container>
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col items-start gap-3">
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
              <span className="font-outfit text-sm font-medium text-[#BD9343]">About</span>
            </div>

            <h2
              ref={titleRef}
              className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight max-w-4xl"
            >
              {about.headline.lead}{" "}
              <span className="font-normal italic">{about.headline.italic}</span>
            </h2>
          </div>

          {/* 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left 3 paragraphs */}
            <div ref={leftColRef} className="lg:col-span-7 flex flex-col gap-5">
              {about.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-outfit text-[#5E6062] text-base sm:text-[17px] leading-relaxed font-light"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Right Resort details card */}
            {details && (
              <div
                ref={cardRef}
                className="lg:col-span-5 bg-[#F7F5F0] rounded-xl p-6 sm:p-8 border border-[#ECE8DC] flex flex-col gap-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-outfit text-xs font-semibold uppercase tracking-wider text-[#73716D]">
                    Resort details
                  </h3>
                  {onOpenDetails && (
                    <button
                      type="button"
                      onClick={onOpenDetails}
                      className="font-outfit text-xs font-medium text-[#00549C] hover:underline cursor-pointer"
                    >
                      View all details
                    </button>
                  )}
                </div>

                {/* Check-in / out */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E7E2D5]">
                  <div>
                    <span className="block font-outfit text-xs text-[#73716D]">Check-in</span>
                    <span className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      {details.checkIn}
                    </span>
                  </div>
                  <div>
                    <span className="block font-outfit text-xs text-[#73716D]">Check-out</span>
                    <span className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      {details.checkOut}
                    </span>
                  </div>
                </div>

                {/* Facilities */}
                <div className="flex flex-col gap-3 pb-4 border-b border-[#E7E2D5]">
                  <span className="font-outfit text-xs text-[#73716D]">Facilities</span>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {details.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="size-3.5 text-[#00549C] stroke-[2.2] shrink-0" />
                        <span className="font-outfit text-xs sm:text-sm text-[#131313]">{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address & See on map */}
                <div className="flex flex-col gap-2">
                  <span className="font-outfit text-xs text-[#73716D]">Address</span>
                  <p className="font-outfit text-xs sm:text-sm text-[#131313] leading-relaxed">
                    {details.address}
                  </p>
                  {onOpenDetails && (
                    <button
                      type="button"
                      onClick={onOpenDetails}
                      className="font-outfit text-xs font-medium text-[#00549C] hover:underline self-start pt-1 cursor-pointer"
                    >
                      See on map
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResortAboutSection;
