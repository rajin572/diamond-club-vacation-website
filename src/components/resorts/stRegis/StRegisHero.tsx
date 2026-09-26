"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisHeroProps {
  programId?: string;
  onOpenGallery?: () => void;
}

export const StRegisHero: React.FC<StRegisHeroProps> = ({
  onOpenGallery,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const inquireHref = `/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis`;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !heroRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "premiumOut" },
      });

      // Logo reveal
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0
        );
      }

      // Title words reveal
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.04,
          },
          0.1
        );
      }

      // Subtitle reveal
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.3
        );
      }

      // Action buttons reveal
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.45
        );
      }
    },
    { scope: heroRef }
  );

  const handleGalleryClick = (e: React.MouseEvent) => {
    if (onOpenGallery) {
      e.preventDefault();
      onOpenGallery();
    } else {
      const el = document.getElementById("gallery");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section ref={heroRef} className="w-full pt-4 sm:pt-6 pb-8 md:pb-12" aria-label="Resort Hero">
      <Container>
        <div className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] rounded-lg md:rounded-xl overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 shadow-lg bg-slate-900">
          {/* Background Image with subtle zoom */}
          <Image
            src={AllImages.stRegisResortMain}
            alt="The St. Regis Kanai Resort"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Luxury Gradient Overlay matching Figma */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#050F1F]/90 via-[#050F1F]/40 to-black/10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col justify-end items-start gap-4 sm:gap-6 max-w-4xl">
            {/* Elegant St. Regis Emblem Tag */}
            <div
              ref={logoRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 font-outfit text-xs sm:text-sm tracking-widest uppercase font-medium select-none"
            >
              <span className="size-1.5 rounded-full bg-[#BD9343]" />
              The St. Regis Kanai · Riviera Maya
            </div>

            {/* Headline */}
            <h1
              ref={titleRef}
              className="font-cormorant font-light text-white text-[clamp(2.5rem,6vw,6rem)] leading-[0.98] tracking-tight text-left"
            >
              The St. Regis Kanai <span className="font-normal italic text-[#f4ecd8]">Resort</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-outfit text-white/90 text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed max-w-2xl font-light"
            >
              Beachfront suites, signature dining and the main Passover program, at Kanai in the Riviera Maya.
            </p>

            {/* Action Buttons */}
            <div
              ref={actionsRef}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {/* Primary Inquire Button */}
              <Link
                href={inquireHref}
                className="group inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white px-5 sm:px-6 py-3 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Inquire about this resort</span>
                <span className="size-6 sm:size-7 rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <ArrowUpRight className="size-3.5 sm:size-4" />
                </span>
              </Link>

              {/* Outline View Gallery Button */}
              <button
                type="button"
                onClick={handleGalleryClick}
                className="group inline-flex items-center gap-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/60 hover:border-white px-5 sm:px-6 py-3 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <span>View gallery</span>
                <span className="size-6 sm:size-7 rounded-[3px] bg-white/20 group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#131313] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                  <ArrowUpRight className="size-3.5 sm:size-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StRegisHero;
