"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisInquireBannerProps {
  programId?: string;
  headline?: string;
  ctaText?: string;
}

export const StRegisInquireBanner: React.FC<StRegisInquireBannerProps> = ({
  headline = "Stay with us for Passover 2027",
  ctaText = "Inquire about this resort",
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
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0
        );
      }

      if (btnRef.current) {
        tl.fromTo(
          btnRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.3
        );
      }
    },
    { scope: bannerRef }
  );

  const inquireHref = `/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis`;

  return (
    <section className="w-full pb-20 sm:pb-28 md:pb-36" aria-label="Resort Inquiry">
      <Container>
        <div
          ref={bannerRef}
          className="relative w-full h-[320px] sm:h-[380px] md:h-[400px] rounded-lg md:rounded-xl overflow-hidden flex flex-col justify-center items-center gap-6 sm:gap-8 px-6 text-center shadow-lg bg-slate-900"
        >
          {/* Background Image */}
          <Image
            src={AllImages.passoverInquireBanner || AllImages.stRegisResortMain}
            alt="Passover 2027 Resort Inquiry"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[1px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-white text-[clamp(2rem,5vw,4.5rem)] leading-[1.08] tracking-tight"
            >
              {headline.includes("Passover 2027") ? (
                <>
                  {headline.replace("Passover 2027", "")}
                  <span className="font-normal italic text-[#f4ecd8]">Passover 2027</span>
                </>
              ) : (
                headline
              )}
            </h2>

            <Link
              ref={btnRef}
              href={inquireHref}
              className="group inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white px-6 sm:px-7 py-3.5 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{ctaText}</span>
              <span className="size-6 sm:size-7 rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight className="size-3.5 sm:size-4" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StRegisInquireBanner;
