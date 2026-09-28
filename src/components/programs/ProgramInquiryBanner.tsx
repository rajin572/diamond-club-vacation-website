"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { ProgramInquiryData } from "./programs.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ProgramInquiryBannerProps {
  data: ProgramInquiryData;
  inquireHref: string;
}

export const ProgramInquiryBanner: React.FC<ProgramInquiryBannerProps> = ({ data, inquireHref }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (cardRef.current) {
        tl.fromTo(cardRef.current, { autoAlpha: 0, scale: 0.98, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.9 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.04 },
          0.15
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.35);
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.45);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full pb-20 md:pb-28" aria-label="Inquire about this program">
      <Container>
        <div
          ref={cardRef}
          className="relative w-full min-h-[380px] md:h-96 rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center p-8 sm:p-12 md:p-16 gap-6 shadow-xl"
        >
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={data.backgroundImage}
              alt={`${data.headline.part1}${data.headline.part2}`}
              fill
              sizes="(max-width: 1550px) 100vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gray-950/75" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 max-w-4xl">
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-white tracking-tight leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)] text-center"
            >
              <span>{data.headline.part1}</span>
              <span>{data.headline.part2}</span>
            </h2>

            <p
              ref={subtitleRef}
              className="text-white/90 font-outfit text-base sm:text-lg font-normal leading-relaxed max-w-xl text-center"
            >
              {data.subtitle}
            </p>

            <div ref={ctaRef} className="pt-1">
              <Link
                href={inquireHref || data.cta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/30"
              >
                <span>{data.cta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramInquiryBanner;
