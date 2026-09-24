"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Container from "../../ui/CustomUi/Container";
import { RESERVE_EXPERIENCES_DATA } from "../diamondClubReserve.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const ReserveExperiences: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const topRowExperiences = RESERVE_EXPERIENCES_DATA.experiences.slice(0, 3);
  const bottomRowExperiences = RESERVE_EXPERIENCES_DATA.experiences.slice(3, 5);

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
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      // Badge entrance
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0
        );
      }

      // Title words reveal
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.04,
          },
          0.1
        );
      }

      // Top row cards reveal
      if (row1Ref.current) {
        tl.fromTo(
          row1Ref.current.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.25
        );
      }

      // Bottom row cards reveal
      if (row2Ref.current) {
        tl.fromTo(
          row2Ref.current.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.4
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="w-full pb-24 md:pb-36 scroll-mt-20"
      aria-label="Experiences"
    >
      <Container>
        <div className="w-full flex flex-col justify-start items-start gap-10 md:gap-12">
          {/* Section Header */}
          <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-5">
            {/* Gold Overline Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span
                className="size-[5px] rounded-full bg-[#BD9343] shrink-0"
                aria-hidden="true"
              />
              <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">
                {RESERVE_EXPERIENCES_DATA.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)] max-w-4xl text-left"
            >
              <span>{RESERVE_EXPERIENCES_DATA.headline}</span>
            </h2>
          </div>

          {/* Cards Grid: Row 1 (3 items) & Row 2 (2 items) */}
          <div className="w-full flex flex-col gap-6">
            {/* Row 1: Entertainment, Kids Program, Scholars */}
            <div
              ref={row1Ref}
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {topRowExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative h-[360px] md:h-96 px-6 sm:px-7 pb-7 rounded-md overflow-hidden flex flex-col justify-end items-start gap-1.5 cursor-pointer shadow-sm"
                >
                  {/* Background Image */}
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300" />

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-start gap-1.5 w-full">
                    <h3 className="font-cormorant text-white text-3xl sm:text-4xl font-semibold leading-tight drop-shadow-sm">
                      {exp.title}
                    </h3>
                    <p className="font-outfit text-white/80 text-sm sm:text-base font-normal leading-6">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Our Chefs, Kosher Supervision */}
            <div
              ref={row2Ref}
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {bottomRowExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative h-[360px] md:h-96 px-6 sm:px-7 pb-7 rounded-md overflow-hidden flex flex-col justify-end items-start gap-1.5 cursor-pointer shadow-sm"
                >
                  {/* Background Image */}
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-300" />

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-start gap-1.5 w-full">
                    <h3 className="font-cormorant text-white text-3xl sm:text-4xl font-semibold leading-tight drop-shadow-sm">
                      {exp.title}
                    </h3>
                    <p className="font-outfit text-white/80 text-sm sm:text-base font-normal leading-6">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReserveExperiences;

