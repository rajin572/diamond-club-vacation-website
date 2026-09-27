"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { OfferingProgramSummary } from "./offerings.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";
import { programHref } from "@/lib/routes";

interface OfferingProgramRowProps {
  offeringId: string;
  program: OfferingProgramSummary;
  index: number;
  isReversed?: boolean;
}

export const OfferingProgramRow: React.FC<OfferingProgramRowProps> = ({
  offeringId,
  program,
  isReversed = false,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const primaryImgRef = useRef<HTMLDivElement>(null);
  const secondaryImgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const href = programHref(offeringId, program.id);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rowRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (primaryImgRef.current && secondaryImgRef.current) {
        tl.fromTo(primaryImgRef.current, { autoAlpha: 0, y: 50, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, 0);
        tl.fromTo(
          secondaryImgRef.current,
          { autoAlpha: 0, y: 70, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 },
          0.15
        );
      }

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.1);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.05 },
          0.2
        );
      }

      if (subtitleRef.current && descRef.current) {
        tl.fromTo(
          [subtitleRef.current, descRef.current],
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.4
        );
      }

      if (listRef.current) {
        const items = listRef.current.querySelectorAll("li");
        tl.fromTo(items, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.08 }, 0.55);
      }

      if (ctaRef.current) {
        tl.fromTo(ctaRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.7);
      }

      if (primaryImgRef.current && secondaryImgRef.current && rowRef.current) {
        gsap.to(primaryImgRef.current, {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: rowRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });

        gsap.to(secondaryImgRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: rowRef.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    },
    { scope: rowRef }
  );

  return (
    <div ref={rowRef} id={program.id} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 border-t border-gray-200">
      <div
        className={cn(
          "w-full flex flex-col gap-10 md:gap-14 lg:gap-16 items-start",
          isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        <div className="w-full lg:w-[48%] flex justify-center lg:justify-start items-end gap-3 sm:gap-4 md:gap-6 shrink-0">
          <div
            ref={primaryImgRef}
            className="relative w-[56%] sm:w-[320px] md:w-[340px] aspect-[340/440] rounded-sm overflow-hidden shadow-lg group"
          >
            <Image
              src={program.images.primary.src}
              alt={program.images.primary.alt}
              fill
              sizes="(max-width: 768px) 55vw, 340px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>

          <div
            ref={secondaryImgRef}
            className="relative w-[44%] sm:w-[240px] md:w-[260px] aspect-[260/340] rounded-sm overflow-hidden shadow-md group -mb-4 sm:-mb-6"
          >
            <Image
              src={program.images.secondary.src}
              alt={program.images.secondary.alt}
              fill
              sizes="(max-width: 768px) 45vw, 260px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-300" />
          </div>
        </div>

        <div className="w-full lg:w-[52%] flex flex-col justify-start items-start gap-8 lg:gap-14">
          <div className="flex flex-col items-start gap-3 sm:gap-4">
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" aria-hidden="true" />
              <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">{program.badge}</span>
            </div>

            <h2
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-normal leading-[1.05] text-[clamp(2.5rem,4.5vw,5.25rem)]"
            >
              <span>{program.title.part1}</span>
              <span>{program.title.part2}</span>
            </h2>
          </div>

          <div className="w-full flex flex-col items-start gap-5 lg:pl-16 xl:pl-24">
            <h3 ref={subtitleRef} className="text-neutral-900 font-outfit text-lg sm:text-xl font-medium leading-snug">
              {program.subtitle}
            </h3>

            <p ref={descRef} className="text-zinc-600 font-outfit text-base leading-relaxed max-w-lg">
              {program.description}
            </p>

            <ul ref={listRef} className="w-full py-2 flex flex-col items-start gap-3.5">
              {program.highlights.map((highlight) => (
                <li
                  key={highlight.id}
                  className="inline-flex items-center gap-3 text-neutral-900 font-outfit text-sm sm:text-base font-normal leading-6"
                >
                  <span className="size-4 shrink-0 flex items-center justify-center relative" aria-hidden="true">
                    <span className="size-2 rotate-45 border-[1.5px] border-[#00549c] shrink-0" />
                  </span>
                  <span>{highlight.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3">
              <Link
                ref={ctaRef}
                href={href}
                className="group relative inline-flex items-center gap-3.5 pl-4 pr-2 py-2 rounded-sm outline outline-1 outline-offset-[-1px] outline-[#00549c] text-[#00549c] hover:bg-[#00549c]/5 transition-all duration-300 active:scale-98"
              >
                <span className="font-outfit text-sm sm:text-base font-medium leading-5">{program.ctaLabel}</span>
                <span className="size-6 bg-[#00549c] rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-white stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingProgramRow;
