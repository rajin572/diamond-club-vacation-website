"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RESERVE_HERO_DATA } from "../diamondClubReserve.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import Container from "../../ui/CustomUi/Container";

export const ReserveHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);

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
        delay: 0.2,
        defaults: { ease: "premiumOut" },
      });

      // Background subtle zoom-in settling
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.08, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "premiumSoft" },
          0
        );
      }

      // Badge entrance
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.2
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
            stagger: 0.05,
          },
          0.35
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          0.65
        );
      }

      // CTA buttons
      if (ctaGroupRef.current) {
        tl.fromTo(
          ctaGroupRef.current.children,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.8
        );
      }

      // ScrollTrigger Parallax on Background
      if (bgImageRef.current && sectionRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 12,
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
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-6 md:pb-10 overflow-hidden"
      aria-label="Diamond Club Reserve Hero"
    >
      <Container>
        <div
          ref={heroCardRef}
          className="relative w-full min-h-[500px] sm:min-h-[560px] md:min-h-[620px] rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-end items-start px-6 sm:px-10 md:px-16 pb-12 sm:pb-16 shadow-2xl"
        >
          {/* Background Image with Parallax & Gradient Overlay */}
          <div
            ref={bgImageRef}
            className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
          >
            <Image
              src={RESERVE_HERO_DATA.backgroundImage}
              alt="Diamond Club Reserve Oceanfront Luxury Resort"
              fill
              priority
              sizes="(max-width: 1550px) 100vw, 1550px"
              className="object-cover object-center"
            />
            {/* Dark gradient overlay matching Figma */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-950/40 to-slate-950/85" />
          </div>

          {/* Hero Content (Bottom-left aligned) */}
          <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-5 max-w-3xl">
            {/* Top Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span
                className="size-[5px] rounded-full bg-stone-200 shrink-0"
                aria-hidden="true"
              />
              <span className="font-outfit text-sm font-medium leading-5 text-stone-200">
                {RESERVE_HERO_DATA.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="text-white font-cormorant font-medium tracking-tight leading-[1.05] text-[clamp(2.5rem,5.5vw,5.5rem)] text-left"
            >
              <span>{RESERVE_HERO_DATA.headline.primary}</span>{" "}
              <span className="font-light">{RESERVE_HERO_DATA.headline.secondary}</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-white/90 font-outfit text-base sm:text-lg md:text-xl font-normal leading-relaxed drop-shadow"
            >
              {RESERVE_HERO_DATA.subtitle}
            </p>

            {/* Two Action Buttons */}
            <div
              ref={ctaGroupRef}
              className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                href={RESERVE_HERO_DATA.ctas.primary.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/20"
              >
                <span>{RESERVE_HERO_DATA.ctas.primary.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>

              <a
                href={RESERVE_HERO_DATA.ctas.secondary.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm outline outline-1 outline-white/80 hover:outline-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98"
              >
                <span>{RESERVE_HERO_DATA.ctas.secondary.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-neutral-900 stroke-[2.2]" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReserveHero;

