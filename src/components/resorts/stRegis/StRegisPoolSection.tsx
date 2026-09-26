"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import type { StRegisPoolItem } from "./stRegis.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisPoolSectionProps {
  programId?: string;
  pools: StRegisPoolItem[];
}

const POOL_TABS = [
  { id: "all", label: "Pools" },
  { id: "cabanas", label: "Cabanas" },
  { id: "beach", label: "Beach" },
];

export const StRegisPoolSection: React.FC<StRegisPoolSectionProps> = ({
  programId = "diamond-club-reserve",
  pools,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.25
        );
      }

      if (tabsRef.current) {
        tl.fromTo(
          tabsRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.3
        );
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.35
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="pools"
      className="w-full py-16 sm:py-24 md:py-32 scroll-mt-28"
      aria-label="Pools and Beach"
    >
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
            <div className="flex flex-col items-start gap-4 max-w-2xl">
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2.5 select-none"
              >
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">
                  Pools & Beach
                </span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                Water, shade and <span className="font-normal italic">two miles of sand</span>
              </h2>
            </div>

            <p
              ref={descRef}
              className="font-outfit text-[#5E6062] text-base leading-relaxed max-w-md"
            >
              Cabanas can be reserved through your concierge before arrival.
            </p>
          </div>

          {/* Underlined Tab Nav */}
          <div
            ref={tabsRef}
            className="flex items-center gap-8 border-b border-[rgba(19,19,19,0.14)]"
          >
            {POOL_TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3.5 font-outfit text-base sm:text-[17px] transition-colors relative ${isActive
                      ? "text-[#131313] font-medium"
                      : "text-[#5E6062] hover:text-[#131313]"
                    }`}
                >
                  {tab.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131313]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pool Cards Grid */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6"
          >
            {pools.map((pool) => {
              const poolHref = `/passover-collection-2027/${programId}/resorts/st-regis/pools/${pool.id}`;

              return (
                <div
                  key={pool.id}
                  className="group flex flex-col justify-start items-start gap-4 w-full"
                >
                  {/* Photo */}
                  <Link
                    href={poolHref}
                    className="relative w-full h-[250px] sm:h-[280px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                  >
                    <Image
                      src={pool.image}
                      alt={pool.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col items-start gap-2 w-full pt-1">
                    <Link href={poolHref}>
                      <h3 className="font-cormorant text-2xl sm:text-[28px] text-[#131313] font-normal leading-tight group-hover:text-[#00549c] transition-colors duration-200">
                        {pool.title}
                      </h3>
                    </Link>

                    <div className="flex flex-col gap-0.5 text-sm sm:text-[15px] font-outfit text-[#5E6062]">
                      <p>{pool.atmosphere}</p>
                      <p>{pool.hours}</p>
                    </div>

                    <Link
                      href={poolHref}
                      className="font-outfit text-sm sm:text-[14px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 pt-1"
                    >
                      View details
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

export default StRegisPoolSection;
