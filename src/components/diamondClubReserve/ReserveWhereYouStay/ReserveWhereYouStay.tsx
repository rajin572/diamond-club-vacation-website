"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../../ui/CustomUi/Container";
import { RESERVE_WHERE_YOU_STAY_DATA } from "../diamondClubReserve.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ReserveWhereYouStayProps {
  programId?: string;
}

export const ReserveWhereYouStay: React.FC<ReserveWhereYouStayProps> = ({
  programId = "diamond-club-reserve",
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

      // Cards staggered reveal
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.children;
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          0.3
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="where-youll-stay"
      className="w-full pt-10 pb-24 md:pb-36 scroll-mt-20"
      aria-label="Where you'll stay"
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
                {RESERVE_WHERE_YOU_STAY_DATA.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)] max-w-4xl text-left"
            >
              <span>{RESERVE_WHERE_YOU_STAY_DATA.headline}</span>
            </h2>
          </div>

          {/* 2 Five-Diamond Resort Cards */}
          <div
            ref={cardsContainerRef}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6"
          >
            {RESERVE_WHERE_YOU_STAY_DATA.resorts.map((resort) => {
              const resortHref = `/passover-collection-2027/${programId}/resorts/${resort.id}`;

              return (
                <div
                  key={resort.id}
                  className="group flex flex-col justify-start items-start gap-5 w-full"
                >
                  {/* Image Container with subtle hover zoom */}
                  <Link
                    href={resortHref}
                    className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-md overflow-hidden bg-slate-900 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                  >
                    <Image
                      src={resort.image}
                      alt={resort.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle Gradient matching Figma */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-slate-950/80 pointer-events-none" />
                  </Link>

                  {/* Card Meta & Link */}
                  <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 pt-1">
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <Link href={resortHref}>
                        <h3 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl font-normal leading-tight group-hover:text-[#00549c] transition-colors duration-300">
                          {resort.title}
                        </h3>
                      </Link>
                      <p className="font-outfit text-zinc-600 text-base font-normal leading-6 max-w-md">
                        {resort.description}
                      </p>
                    </div>

                    <Link
                      href={resortHref}
                      className="font-outfit text-neutral-900 text-base font-medium underline leading-5 hover:text-[#00549c] transition-colors duration-200 shrink-0 self-start sm:self-center"
                    >
                      {resort.linkText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReserveWhereYouStay;

