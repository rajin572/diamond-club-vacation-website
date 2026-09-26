"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../ui/CustomUi/Container";
import { RESERVE_ABOUT_DATA } from "../diamondClubReserve.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ReserveAboutProps {
  inquireHref?: string;
}

export const ReserveAbout: React.FC<ReserveAboutProps> = ({
  inquireHref,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

      // Badge
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
            stagger: 0.05,
          },
          0.1
        );
      }

      // Paragraphs staggered rise
      if (paragraphsRef.current) {
        tl.fromTo(
          paragraphsRef.current.children,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          0.3
        );
      }

      // Right card lift & scale
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { autoAlpha: 0, y: 40, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 },
          0.35
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-this-event"
      className="w-full py-16 sm:py-24 md:py-28 scroll-mt-20"
      aria-label="About this event"
    >
      <Container>
        <div className="w-full flex flex-col lg:flex-row justify-start items-start gap-12 lg:gap-16 xl:gap-20">
          {/* Left Column: Descriptive Story */}
          <div className="flex-1 flex flex-col justify-start items-start gap-6 sm:gap-8">
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
                {RESERVE_ABOUT_DATA.badge}
              </span>
            </div>

            {/* Title */}
            <h2
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.1] text-[clamp(2.25rem,4.5vw,4.25rem)] text-left"
            >
              <span>{RESERVE_ABOUT_DATA.headline}</span>
            </h2>

            {/* Paragraphs */}
            <div
              ref={paragraphsRef}
              className="flex flex-col items-start gap-5 sm:gap-6 text-zinc-700 font-outfit text-base sm:text-lg font-normal leading-relaxed"
            >
              {RESERVE_ABOUT_DATA.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: "At a glance" Luxury Card */}
          <div
            ref={cardRef}
            className="w-full lg:w-[380px] xl:w-[420px] p-7 sm:p-9 bg-stone-100 rounded-md flex flex-col justify-start items-start gap-6 sm:gap-7 shadow-sm shrink-0"
          >
            <div className="text-neutral-500 font-outfit text-sm font-medium leading-5 tracking-wide uppercase">
              {RESERVE_ABOUT_DATA.glance.title}
            </div>

            {/* Info items */}
            <div className="w-full flex flex-col items-start gap-4">
              {/* Location */}
              <div className="w-full pb-4 border-b border-neutral-900/10 flex flex-col items-start gap-1">
                <span className="text-neutral-500 font-outfit text-sm font-normal leading-5">
                  {RESERVE_ABOUT_DATA.glance.location.label}
                </span>
                <span className="text-neutral-900 font-outfit text-base font-medium leading-6">
                  {RESERVE_ABOUT_DATA.glance.location.value}
                </span>
              </div>

              {/* Choose your resort */}
              <div className="w-full pb-4 border-b border-neutral-900/10 flex flex-col items-start gap-1">
                <span className="text-neutral-500 font-outfit text-sm font-normal leading-5">
                  {RESERVE_ABOUT_DATA.glance.resorts.label}
                </span>
                <div className="text-neutral-900 font-outfit text-base font-medium leading-6 flex flex-col">
                  {RESERVE_ABOUT_DATA.glance.resorts.value.map((resort, idx) => (
                    <span key={idx}>{resort}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Diamond Bullet Highlights */}
            <div className="w-full flex flex-col items-start gap-3.5">
              {RESERVE_ABOUT_DATA.glance.highlights.map((highlight, idx) => (
                <div key={idx} className="w-full inline-flex items-start gap-2.5">
                  <span
                    className="size-4 shrink-0 flex items-center justify-center relative mt-1"
                    aria-hidden="true"
                  >
                    <span className="size-2 rotate-45 border-[1.5px] border-[#00549c] shrink-0" />
                  </span>
                  <span className="flex-1 text-neutral-900 font-outfit text-sm sm:text-base font-normal leading-6">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2 w-full">
              <Link
                href={inquireHref || RESERVE_ABOUT_DATA.glance.cta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-md"
              >
                <span>{RESERVE_ABOUT_DATA.glance.cta.label}</span>
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

export default ReserveAbout;

