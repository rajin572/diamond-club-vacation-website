"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../../ui/CustomUi/Container";
import { RESERVE_EXPLORE_DATA } from "../diamondClubReserve.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const ReserveExplore: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerBgRef = useRef<HTMLDivElement>(null);
  const bannerBadgeRef = useRef<HTMLDivElement>(null);
  const bannerTitleRef = useRef<HTMLHeadingElement>(null);
  const bannerDescRef = useRef<HTMLParagraphElement>(null);
  const bannerLinkRef = useRef<HTMLAnchorElement>(null);
  const attractionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = bannerTitleRef.current
        ? SplitText.create(bannerTitleRef.current, {
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

      // Banner Entrance
      if (bannerRef.current) {
        tl.fromTo(
          bannerRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0
        );
      }

      // Banner Badge
      if (bannerBadgeRef.current) {
        tl.fromTo(
          bannerBadgeRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.1
        );
      }

      // Banner Title
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.05,
          },
          0.15
        );
      }

      // Banner Desc & Link
      if (bannerDescRef.current && bannerLinkRef.current) {
        tl.fromTo(
          [bannerDescRef.current, bannerLinkRef.current],
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          0.35
        );
      }

      // Attractions Staggered Reveal
      if (attractionsRef.current) {
        tl.fromTo(
          attractionsRef.current.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.45
        );
      }

      // Banner background parallax
      if (bannerBgRef.current && sectionRef.current) {
        gsap.to(bannerBgRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      id="explore"
      className="w-full pb-24 md:pb-36 scroll-mt-20"
      aria-label="Explore beyond the resort"
    >
      <Container>
        <div className="w-full flex flex-col justify-start items-start gap-6">
          {/* Top Hero Banner: Beyond the resort */}
          <div
            ref={bannerRef}
            className="group relative w-full h-[400px] sm:h-[460px] md:h-[480px] px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 md:pb-14 rounded-md overflow-hidden flex flex-col justify-end items-start gap-3 sm:gap-4 shadow-sm"
          >
            {/* Background Image with subtle parallax */}
            <div
              ref={bannerBgRef}
              className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
            >
              <Image
                src={RESERVE_EXPLORE_DATA.banner.backgroundImage}
                alt={RESERVE_EXPLORE_DATA.banner.headline}
                fill
                sizes="(max-width: 1550px) 100vw, 1550px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
              />
              {/* Dark Gradient Overlay matching Figma */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-slate-950/85" />
            </div>

            {/* Content pinned to bottom */}
            <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-4 max-w-2xl">
              {/* Badge */}
              <div
                ref={bannerBadgeRef}
                className="inline-flex items-center gap-2.5 select-none"
              >
                <span
                  className="size-[5px] rounded-full bg-stone-200 shrink-0"
                  aria-hidden="true"
                />
                <span className="font-outfit text-sm font-medium leading-5 text-stone-200">
                  {RESERVE_EXPLORE_DATA.banner.badge}
                </span>
              </div>

              {/* Title */}
              <h2
                ref={bannerTitleRef}
                className="font-cormorant font-light text-white tracking-tight leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] text-left"
              >
                <span>{RESERVE_EXPLORE_DATA.banner.headline}</span>
              </h2>

              {/* Description */}
              <p
                ref={bannerDescRef}
                className="text-white/90 font-outfit text-sm sm:text-base font-normal leading-relaxed max-w-[520px]"
              >
                {RESERVE_EXPLORE_DATA.banner.description}
              </p>

              {/* View all attractions link */}
              <Link
                ref={bannerLinkRef}
                href={RESERVE_EXPLORE_DATA.banner.href}
                className="font-outfit text-white text-base font-medium underline leading-5 hover:text-stone-200 transition-colors pt-1 inline-block"
              >
                {RESERVE_EXPLORE_DATA.banner.linkText}
              </Link>
            </div>
          </div>

          {/* Bottom 3 Attraction Cards */}
          <div
            ref={attractionsRef}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {RESERVE_EXPLORE_DATA.attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="group flex flex-col justify-start items-start gap-3.5 w-full cursor-pointer"
              >
                {/* Image Container with subtle hover zoom */}
                <div className="relative w-full h-56 rounded-md overflow-hidden bg-slate-900 shadow-sm">
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>

                {/* Title below image */}
                <h3 className="font-cormorant text-neutral-900 text-2xl sm:text-3xl font-semibold leading-8 group-hover:text-[#00549c] transition-colors duration-300">
                  {attraction.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReserveExplore;

