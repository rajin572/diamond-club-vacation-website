"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface EditionSpaSectionProps {
  programId?: string;
}

export const EditionSpaSection: React.FC<EditionSpaSectionProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          0
        );
      }

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.1
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.2
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

      if (detailsRef.current) {
        tl.fromTo(
          detailsRef.current.children,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          0.4
        );
      }
    },
    { scope: sectionRef }
  );

  const spaDetailHref = `/passover-collection-2027/${programId}/resorts/edition/spa`;

  return (
    <section
      ref={sectionRef}
      id="spa"
      className="w-full py-16 sm:py-24 md:py-28 scroll-mt-28"
      aria-label="Edition Spa"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Spa Image */}
          <div
            ref={imageRef}
            className="relative w-full h-[360px] sm:h-[440px] lg:h-[480px] rounded-md overflow-hidden bg-[#E4E0D8] shadow-md"
          >
            <Image
              src={AllImages.editionResortPool2}
              alt="The Spa at The Edition"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right: Spa Content */}
          <div className="flex flex-col items-start gap-7">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
              <span className="font-outfit text-sm font-medium text-[#BD9343]">
                Spa
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
            >
              An afternoon that <span className="font-normal italic">undoes the year</span>
            </h2>

            {/* Description */}
            <p
              ref={descRef}
              className="font-outfit text-[#5E6062] text-base leading-relaxed"
            >
              Hydrotherapy pools, hammam and steam rooms, massages, facials and a full salon, with treatments bookable through your concierge.
            </p>

            {/* Hours & Location */}
            <div ref={detailsRef} className="w-full flex flex-col gap-3">
              <div className="w-full py-3 border-b border-[rgba(19,19,19,0.1)] flex items-start gap-6">
                <span className="w-24 sm:w-28 text-[#8C877E] text-sm sm:text-base font-outfit">
                  Hours
                </span>
                <span className="flex-1 text-[#131313] text-sm sm:text-base font-outfit font-normal">
                  Monday to Sunday · 8:00 AM – 11:00 PM
                </span>
              </div>

              <div className="w-full py-3 border-b border-[rgba(19,19,19,0.1)] flex items-start gap-6">
                <span className="w-24 sm:w-28 text-[#8C877E] text-sm sm:text-base font-outfit">
                  Location
                </span>
                <span className="flex-1 text-[#131313] text-sm sm:text-base font-outfit font-normal">
                  Lower level, main building
                </span>
              </div>
            </div>

            {/* Action Button */}
            <Link
              href={spaDetailHref}
              className="group inline-flex items-center gap-3.5 border border-[#00549C] text-[#00549C] hover:bg-[#00549C] hover:text-white px-5 sm:px-6 py-3 rounded-sm font-outfit text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00549C]"
            >
              <span>Ask about spa treatments</span>
              <span className="size-6 bg-[#00549C] text-white rounded-[3px] flex items-center justify-center group-hover:bg-white group-hover:text-[#00549C] transition-colors duration-200">
                <ArrowUpRight className="size-3.5 stroke-[2.2]" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default EditionSpaSection;
