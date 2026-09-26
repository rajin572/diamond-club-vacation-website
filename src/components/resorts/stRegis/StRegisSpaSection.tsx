"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisSpaSectionProps {
  programId?: string;
}

export const StRegisSpaSection: React.FC<StRegisSpaSectionProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 1 },
          0
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.1
        );
      }

      if (copyRef.current) {
        tl.fromTo(
          copyRef.current.children,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          0.2
        );
      }
    },
    { scope: sectionRef }
  );

  const spaDetailHref = `/passover-collection-2027/${programId}/resorts/st-regis/spa`;

  return (
    <section
      ref={sectionRef}
      id="spa"
      className="w-full py-16 sm:py-24 md:py-32 scroll-mt-28"
      aria-label="The Spa"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Photo */}
          <div
            ref={imageRef}
            className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-[6px] overflow-hidden bg-[#E4E0D8] shadow-md group"
          >
            <Image
              src={AllImages.stRegisGallery4}
              alt="The St. Regis Spa"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Copy & Details */}
          <div ref={copyRef} className="flex flex-col items-start gap-7 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
              <span className="font-outfit text-sm font-medium text-[#BD9343]">
                Spa
              </span>
            </div>

            {/* Headline */}
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
            >
              An afternoon that <span className="font-normal italic">undoes the year</span>
            </h2>

            {/* Description */}
            <p className="font-outfit text-[#5E6062] text-base sm:text-[17px] leading-relaxed">
              Hydrotherapy pools, hammam and steam rooms, massages, facials and a full salon, with treatments bookable through your concierge.
            </p>

            {/* Facts Table */}
            <div className="flex flex-col w-full border-t border-[rgba(19,19,19,0.12)] pt-2">
              <div className="flex items-center justify-between py-3.5 border-b border-[rgba(19,19,19,0.12)]">
                <span className="font-outfit text-sm sm:text-base text-[#8C877E] w-28 shrink-0">
                  Hours
                </span>
                <span className="font-outfit text-sm sm:text-base text-[#131313] text-right font-medium">
                  Monday to Sunday · 8:00 AM – 11:00 PM
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 border-b border-[rgba(19,19,19,0.12)]">
                <span className="font-outfit text-sm sm:text-base text-[#8C877E] w-28 shrink-0">
                  Location
                </span>
                <span className="font-outfit text-sm sm:text-base text-[#131313] text-right font-medium">
                  Lower level, main building
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href={spaDetailHref}
              className="group inline-flex items-center gap-3.5 bg-transparent hover:bg-[#00549C] text-[#00549C] hover:text-white border border-[#00549C] px-5 sm:px-6 py-3 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00549C]"
            >
              <span>Ask about spa treatments</span>
              <span className="size-6 sm:size-7 rounded-[3px] bg-[#00549C] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                <ArrowUpRight className="size-3.5 sm:size-4" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StRegisSpaSection;
