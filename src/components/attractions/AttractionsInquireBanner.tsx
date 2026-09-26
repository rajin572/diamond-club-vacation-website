"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface AttractionsInquireBannerProps {
  programId?: string;
  headlinePart1?: string;
  headlinePart2?: string;
  buttonText?: string;
}

export const AttractionsInquireBanner: React.FC<AttractionsInquireBannerProps> = ({
  programId = "diamond-club-reserve",
  headlinePart1 = "Explore the Riviera Maya for ",
  headlinePart2 = "Passover 2027",
  buttonText = "Inquire",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

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

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.03,
          },
          0
        );
      }

      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { autoAlpha: 0, scale: 0.95 },
          { autoAlpha: 1, scale: 1, duration: 0.6 },
          0.2
        );
      }
    },
    { scope: containerRef }
  );

  const inquireHref = `/inquire?holiday=passover-2027&destination=${encodeURIComponent(
    programId
  )}&topic=attractions`;

  return (
    <section ref={containerRef} className="w-full pb-20 md:pb-28 bg-[#FCFCFB]">
      <Container>
        <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden flex flex-col justify-center items-center gap-6 px-6 sm:px-12 text-center shadow-md">
          {/* Background Image */}
          <Image
            src={AllImages.diamondClubResturantExperiencesInquire || AllImages.passoverInquireBanner}
            alt="Riviera Maya Passover 2027"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-stone-950/65" />

          {/* Headline */}
          <h2
            ref={titleRef}
            className="relative z-10 font-cormorant font-light text-white tracking-tight leading-tight text-3xl sm:text-5xl lg:text-6xl max-w-4xl"
          >
            <span>{headlinePart1}</span>
            <span>{headlinePart2}</span>
          </h2>

          {/* Inquire Button */}
          <div ref={btnRef} className="relative z-10">
            <Link
              href={inquireHref}
              className="pl-5 pr-2.5 py-2.5 bg-[#00549c] hover:bg-[#00427c] text-white rounded-sm inline-flex items-center gap-3.5 transition-colors cursor-pointer group shadow-sm"
            >
              <span className="font-outfit text-base font-medium leading-5">
                {buttonText}
              </span>
              <div className="size-6 bg-white rounded-[3px] flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AttractionsInquireBanner;
