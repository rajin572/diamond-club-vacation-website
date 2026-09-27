"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { OfferingInquiryData } from "./offerings.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface OfferingInquiryBannerProps {
  data: OfferingInquiryData;
}

export const OfferingInquiryBanner: React.FC<OfferingInquiryBannerProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.05 },
          0.1
        );
      }

      if (subtextRef.current) {
        tl.fromTo(subtextRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.3);
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 20, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 }, 0.45);
      }

      if (bgRef.current && sectionRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full pb-20 sm:pb-24 md:pb-28" aria-label="Offering Inquiry Call to Action">
      <Container>
        <div
          ref={cardRef}
          className="relative w-full min-h-[360px] sm:min-h-[400px] md:min-h-[440px] rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 py-12 md:py-16 shadow-2xl"
        >
          <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
            <Image
              src={data.backgroundImage}
              alt={`${data.headline.part1}${data.headline.part2}`}
              fill
              sizes="(max-width: 1550px) 100vw, 1550px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/60 backdrop-brightness-[0.78]" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto gap-4 sm:gap-6">
            <h2
              ref={titleRef}
              className="text-white font-cormorant font-light tracking-tight text-center leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)]"
            >
              <span>{data.headline.part1}</span>
              <span className="font-normal">{data.headline.part2}</span>
            </h2>

            <p
              ref={subtextRef}
              className="text-white/90 font-outfit text-base sm:text-lg md:text-xl font-normal max-w-xl mx-auto leading-relaxed drop-shadow"
            >
              {data.subtext}
            </p>

            <div className="pt-2">
              <Link
                ref={ctaRef}
                href={data.cta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/20"
              >
                <span>{data.cta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-4 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OfferingInquiryBanner;
