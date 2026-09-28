"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AllImages } from "../../../public/images/AllImages";
import Container from "@/components/ui/CustomUi/Container";
import type { OfferingHeroData } from "./offerings.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface OfferingHeroProps {
  data: OfferingHeroData;
}

export const OfferingHero: React.FC<OfferingHeroProps> = ({ data }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "premiumOut" } });

      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.08, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "premiumSoft" },
          0
        );
      }

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { autoAlpha: 0, y: -20, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1 },
          0.2
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 120, autoAlpha: 0, rotate: 2 },
          { yPercent: 0, autoAlpha: 1, rotate: 0, duration: 1.1, stagger: 0.05 },
          0.35
        );
      }

      if (subtextRef.current) {
        tl.fromTo(subtextRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.7);
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 24, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
          0.85
        );
      }

      if (bgImageRef.current && sectionRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-8 md:pb-12 overflow-hidden"
      aria-label="Offering Hero"
    >
      <Container>
        <div
          ref={heroCardRef}
          className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:min-h-[620px] rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-center items-center text-center px-4 sm:px-8 md:px-16 py-12 md:py-16 shadow-2xl"
        >
          <div ref={bgImageRef} className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none">
            <Image
              src={data.backgroundImage}
              alt={`${data.headline.primary} ${data.headline.secondary}`}
              fill
              priority
              sizes="(max-width: 1550px) 100vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-neutral-950/50 backdrop-brightness-[0.82]" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/30 to-neutral-950/60" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto gap-4 sm:gap-6">
            <div
              ref={logoRef}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white/95 p-2.5 sm:p-3 shadow-xl backdrop-blur-xs relative flex items-center justify-center transition-transform duration-500 hover:scale-105"
            >
              <Image
                src={AllImages.logo}
                alt="Diamond Club Vacations Emblem"
                width={80}
                height={80}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            <h1
              ref={titleRef}
              className="text-white font-cormorant font-medium tracking-tight text-center leading-[1.08] text-[clamp(2.5rem,5.5vw,5.5rem)]"
            >
              <span>{data.headline.primary}</span> <span className="font-light">{data.headline.secondary}</span>
            </h1>

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
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm outline outline-1 outline-white/80 hover:outline-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98"
              >
                <span>{data.cta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-4 text-neutral-900 stroke-[2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OfferingHero;
