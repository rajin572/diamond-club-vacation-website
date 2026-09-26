"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface EntertainmentInquireBannerProps {
  programId?: string;
  headline?: {
    part1: string;
    part2: string;
  };
  buttonText?: string;
}

export const EntertainmentInquireBanner: React.FC<EntertainmentInquireBannerProps> = ({
  programId = "diamond-club-reserve",
  headline = {
    part1: "Celebrate with us for ",
    part2: "Passover 2027",
  },
  buttonText = "Inquire",
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !bannerRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.04 },
          0
        );
      }

      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { autoAlpha: 0, scale: 0.95, y: 15 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.7 },
          0.2
        );
      }
    },
    { scope: bannerRef }
  );

  const inquireHref = `/inquire?holiday=passover-2027&destination=${encodeURIComponent(
    programId
  )}`;

  return (
    <section ref={bannerRef} className="w-full pb-20 md:pb-28 bg-[#FCFCFB]">
      <Container>
        <div className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden flex flex-col justify-center items-center gap-6 px-6 text-center shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={AllImages.diamondClubResturantExperiencesInquire}
              alt="Passover 2027 Celebration"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
            {/* Dark luxury overlay matching Figma bg-gray-950/60 */}
            <div className="absolute inset-0 bg-gray-950/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
          </div>

          {/* Heading */}
          <h2
            ref={titleRef}
            className="relative z-10 font-cormorant font-light text-white text-[clamp(2.25rem,5vw,4.5rem)] leading-tight max-w-4xl"
          >
            <span>{headline.part1}</span>
            <span>{headline.part2}</span>
          </h2>

          {/* Primary Inquire Button */}
          <Link
            ref={btnRef}
            href={inquireHref}
            className="group relative z-10 inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-base font-medium leading-5 active:scale-98 shadow-md"
          >
            <span>{buttonText}</span>
            <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default EntertainmentInquireBanner;
