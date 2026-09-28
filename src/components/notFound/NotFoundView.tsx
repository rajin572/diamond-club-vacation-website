"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import { NOT_FOUND_DATA } from "./notFound.data";
import type { NotFoundProps } from "./notFound.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";

export const NotFoundView: React.FC<NotFoundProps> = ({
  badge = NOT_FOUND_DATA.badge,
  code = NOT_FOUND_DATA.code,
  headline = NOT_FOUND_DATA.headline,
  description = NOT_FOUND_DATA.description,
  primaryCta = NOT_FOUND_DATA.primaryCta,
  secondaryCta = NOT_FOUND_DATA.secondaryCta,
  popularPagesTitle = NOT_FOUND_DATA.popularPagesTitle,
  popularPages = NOT_FOUND_DATA.popularPages,
  image = NOT_FOUND_DATA.image,
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

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
        delay: 0.15,
        defaults: { ease: "premiumOut" },
      });

      // Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0
        );
      }

      // 404 Number
      if (codeRef.current) {
        tl.fromTo(
          codeRef.current,
          { autoAlpha: 0, scale: 0.9, y: 20 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.1
        );
      }

      // Title words
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.04,
          },
          0.25
        );
      }

      // Description & Buttons
      if (descRef.current && buttonsRef.current) {
        tl.fromTo(
          [descRef.current, buttonsRef.current],
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.45
        );
      }

      // Popular pages list
      if (popularRef.current) {
        tl.fromTo(
          popularRef.current,
          { autoAlpha: 0, y: 25 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.65
        );
      }

      // Right image entrance
      if (imageCardRef.current) {
        tl.fromTo(
          imageCardRef.current,
          { autoAlpha: 0, scale: 0.95, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
          0.2
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "w-full min-h-[calc(100vh-5rem)] py-16 sm:py-24 md:py-28 flex items-center bg-[#FCFCFB] overflow-hidden",
        className
      )}
      aria-label="404 Page Not Found"
    >
      <Container>
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column Content */}
          <div className="flex-1 w-full flex flex-col justify-start items-start gap-6 sm:gap-7">
            {/* Overline Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span
                className="size-[5px] rounded-full bg-neutral-900 shrink-0"
                aria-hidden="true"
              />
              <span className="font-outfit text-sm font-medium leading-5 text-neutral-900">
                {badge}
              </span>
            </div>

            {/* Giant 404 Heading */}
            <div
              ref={codeRef}
              className="font-cormorant font-light text-[#00549c] text-[clamp(6rem,14vw,12.5rem)] leading-[0.88] select-none -my-2 tracking-tight"
            >
              {code}
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] text-left"
            >
              <span>{headline.part1}</span>
              <span>{headline.part2}</span>
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="text-zinc-600 font-outfit text-base sm:text-lg font-normal leading-relaxed sm:leading-8 max-w-[520px]"
            >
              {description}
            </p>

            {/* 2 Action Buttons */}
            <div
              ref={buttonsRef}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 w-full"
            >
              {/* Primary: Back to home */}
              <Link
                href={primaryCta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-md"
              >
                <span>{primaryCta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>

              {/* Secondary: Start an inquiry */}
              <Link
                href={secondaryCta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm outline outline-1 outline-[#00549c] hover:bg-[#00549c]/5 transition-all duration-300 text-[#00549c] font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98"
              >
                <span>{secondaryCta.label}</span>
                <span className="size-6 bg-[#00549c] rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-white stroke-[2.2]" />
                </span>
              </Link>
            </div>

            {/* Popular Pages Section */}
            <div
              ref={popularRef}
              className="w-full max-w-[520px] pt-8 mt-2 border-t border-neutral-900/10 flex flex-col items-start gap-1"
            >
              <div className="text-neutral-500 font-outfit text-sm font-normal leading-5 pb-1">
                {popularPagesTitle}
              </div>

              {popularPages.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group w-full py-4 border-b border-neutral-900/10 flex items-center justify-between gap-4 transition-colors duration-200 hover:border-neutral-900/30"
                >
                  <div className="flex-1 flex flex-col items-start gap-0.5">
                    <span className="font-outfit text-neutral-900 text-base sm:text-lg font-medium leading-6 group-hover:text-[#00549c] transition-colors duration-200">
                      {item.title}
                    </span>
                    <span className="font-outfit text-zinc-600 text-sm sm:text-base font-normal leading-5">
                      {item.subtitle}
                    </span>
                  </div>

                  <span className="size-5 flex items-center justify-center text-neutral-900 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="size-4 stroke-[1.8] text-neutral-800 group-hover:text-[#00549c]" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column Image */}
          <div
            ref={imageCardRef}
            className="w-full lg:w-[500px] xl:w-[540px] h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] rounded-xl overflow-hidden relative shadow-2xl shrink-0 bg-slate-900"
          >
            <Image
              src={image}
              alt="Diamond Club Vacations Luxury Resort"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
            />
            {/* Subtle luxury vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFoundView;
