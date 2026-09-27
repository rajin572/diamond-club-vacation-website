"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { StaticImageData } from "next/image";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { inquireHref } from "@/lib/routes";

interface ResortInquireBannerProps {
  programId: string;
  resortId: string;
  resortName: string;
  heroImage: StaticImageData | string;
}

export const ResortInquireBanner: React.FC<ResortInquireBannerProps> = ({
  programId,
  resortId,
  resortName,
  heroImage,
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const href = inquireHref({ destination: programId, resort: resortId });

  useGSAP(
    () => {
      if (prefersReducedMotion() || !bannerRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
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

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" }, 0.25);
      }
    },
    { scope: bannerRef }
  );

  return (
    <section className="w-full pb-20 sm:pb-28" aria-label="Inquiry Banner">
      <Container>
        <div
          ref={bannerRef}
          className="relative w-full h-[360px] sm:h-[400px] rounded-lg md:rounded-xl overflow-hidden flex flex-col justify-center items-center gap-6 p-6 sm:p-10 shadow-lg bg-slate-900"
        >
          <Image
            src={heroImage}
            alt={`${resortName} Passover 2027`}
            fill
            sizes="100vw"
            className="object-cover object-center brightness-50"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 pointer-events-none"
            aria-hidden="true"
          />

          <h2
            ref={titleRef}
            className="relative z-10 font-cormorant font-light text-white text-center text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-tight max-w-4xl"
          >
            Stay with us for <span className="font-normal italic">Passover 2027</span>
          </h2>

          <div ref={ctaRef} className="relative z-10">
            <Link
              href={href}
              className="group inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white px-5 sm:px-6 py-3 rounded-sm font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Inquire about this resort</span>
              <span className="size-6 bg-white rounded-[3px] flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight className="size-3.5 stroke-[2.2]" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResortInquireBanner;
