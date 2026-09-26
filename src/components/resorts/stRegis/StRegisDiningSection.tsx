"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import type { StRegisDiningVenue } from "./stRegis.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisDiningSectionProps {
  programId?: string;
  dining: StRegisDiningVenue[];
}

const CUISINE_FILTERS = [
  { id: "all", label: "All" },
  { id: "latin", label: "Latin American" },
  { id: "steakhouse", label: "Steakhouse" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "international", label: "International" },
  { id: "cafe", label: "Café & desserts" },
];

export const StRegisDiningSection: React.FC<StRegisDiningSectionProps> = ({
  programId = "diamond-club-reserve",
  dining,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (chipsRef.current) {
        tl.fromTo(
          chipsRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.3
        );
      }

      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          0.35
        );
      }
    },
    { scope: sectionRef }
  );

  const filteredDining =
    selectedCategory === "all"
      ? dining
      : dining.filter((d) => d.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      id="dining"
      className="w-full py-16 sm:py-24 md:py-32 scroll-mt-28"
      aria-label="Dining and Restaurants"
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
                  Dining
                </span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                Nine kitchens, <span className="font-normal italic">one standard</span> of kashrut
              </h2>
            </div>

            <p
              ref={descRef}
              className="font-outfit text-[#5E6062] text-base leading-relaxed max-w-md"
            >
              Menus change daily through the holiday. Reservations for dinner venues are handled by your concierge.
            </p>
          </div>

          {/* Cuisine Filter Chips */}
          <div
            ref={chipsRef}
            className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1"
          >
            {CUISINE_FILTERS.map((chip) => {
              const isActive = selectedCategory === chip.id;

              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedCategory(chip.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-outfit text-sm transition-all duration-200 shrink-0 ${isActive
                      ? "bg-[#00549C] text-white font-medium shadow-sm"
                      : "bg-transparent text-[#131313] border border-[rgba(19,19,19,0.18)] hover:border-[#131313]"
                    }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Restaurant Cards Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6"
          >
            {filteredDining.map((item) => {
              const diningHref = `/passover-collection-2027/${programId}/resorts/st-regis/restaurants/${item.id}`;

              return (
                <div
                  key={item.id}
                  className="group flex flex-col justify-start items-start gap-4 w-full"
                >
                  {/* Photo */}
                  <Link
                    href={diningHref}
                    className="relative w-full h-[240px] sm:h-[260px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex justify-between items-start w-full gap-4 pt-1">
                    <div className="flex flex-col items-start gap-1">
                      <Link href={diningHref}>
                        <h3 className="font-cormorant text-2xl sm:text-[28px] text-[#131313] font-normal leading-tight group-hover:text-[#00549c] transition-colors duration-200">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="font-outfit text-sm sm:text-[15px] text-[#5E6062]">
                        {item.categoryLabel}
                      </p>
                    </div>

                    <Link
                      href={diningHref}
                      className="font-outfit text-sm sm:text-[14px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 shrink-0 self-center"
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

export default StRegisDiningSection;
