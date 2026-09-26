"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  KidsDayCampData,
} from "./kidsDayCamp.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface KidsDayCampContentProps {
  data: KidsDayCampData;
  onOpenBabysitting?: () => void;
}

export const KidsDayCampContent: React.FC<KidsDayCampContentProps> = ({
  data,
  onOpenBabysitting,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !contentRef.current) return;

      const sections = contentRef.current.querySelectorAll(".camp-section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { autoAlpha: 0, y: 25 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "premiumOut",
            scrollTrigger: {
              trigger: sec,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: contentRef }
  );

  return (
    <div ref={contentRef} className="flex-1 space-y-16 sm:space-y-20 min-w-0">
      {/* 1. Overview Section */}
      <section id="overview" className="camp-section space-y-4 sm:space-y-6 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          {data.overview.title}
        </h2>
        <p className="font-outfit text-zinc-700 text-base sm:text-lg leading-relaxed max-w-3xl">
          {data.overview.description}
        </p>
      </section>

      {/* 2. Our Team Section */}
      <section id="our-team" className="camp-section space-y-6 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Our team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.team.map((member) => (
            <div
              key={member.id}
              className="p-6 bg-stone-100 rounded-md flex flex-col justify-start items-start gap-2.5 transition-all duration-300 hover:shadow-sm"
            >
              <div className="font-outfit text-neutral-500 text-xs font-medium uppercase tracking-wider">
                {member.role}
              </div>
              <h3 className="font-cormorant font-normal text-neutral-900 text-2xl sm:text-3xl leading-snug">
                {member.name}
              </h3>
              <p className="font-outfit text-zinc-600 text-sm sm:text-base leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Programs ("What the kids get up to") */}
      <section id="programs" className="camp-section space-y-6 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          What the kids get up to
        </h2>
        <div className="flex flex-col border-b border-neutral-900/10">
          {data.activities.map((act) => (
            <div
              key={act.id}
              className="py-5 border-t border-neutral-900/10 flex flex-col md:flex-row gap-3 md:gap-10 items-start"
            >
              <h3 className="w-full md:w-64 font-outfit text-neutral-900 text-lg font-medium leading-snug">
                {act.title}
              </h3>
              <p className="flex-1 font-outfit text-zinc-600 text-base leading-relaxed">
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Camp Age Groups */}
      <section id="age-groups" className="camp-section space-y-4 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Camp age groups
        </h2>
        <div className="rounded-md border border-neutral-900/10 overflow-hidden bg-white shadow-sm">
          {/* Table Header */}
          <div className="px-5 py-4 bg-stone-100 border-b border-neutral-900/10 grid grid-cols-12 gap-4 text-xs font-medium font-outfit text-neutral-500 uppercase tracking-wider">
            <div className="col-span-3 sm:col-span-3">Group</div>
            <div className="col-span-4 sm:col-span-3">Ages</div>
            <div className="col-span-5 sm:col-span-6">Highlights</div>
          </div>
          {/* Table Rows */}
          {data.ageGroups.map((row, idx) => (
            <div
              key={row.group}
              className={`px-5 py-4 grid grid-cols-12 gap-4 items-center font-outfit text-sm sm:text-base ${idx !== data.ageGroups.length - 1
                  ? "border-b border-neutral-900/10"
                  : ""
                } hover:bg-neutral-50/50 transition-colors`}
            >
              <div className="col-span-3 sm:col-span-3 font-medium text-neutral-900">
                {row.group}
              </div>
              <div className="col-span-4 sm:col-span-3 text-neutral-800">
                {row.ages}
              </div>
              <div className="col-span-5 sm:col-span-6 text-zinc-600">
                {row.highlights}
              </div>
            </div>
          ))}
        </div>
        <p className="font-outfit text-stone-400 text-xs leading-5">
          Teen ages are shown as 13+ for layout. Please confirm the exact range.
        </p>
      </section>

      {/* 5. Children's Dining */}
      <section id="childrens-dining" className="camp-section space-y-4 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          {data.dining.title}
        </h2>
        {data.dining.paragraphs.map((p, idx) => (
          <p
            key={idx}
            className="font-outfit text-zinc-700 text-base sm:text-lg leading-relaxed max-w-3xl"
          >
            {p}
          </p>
        ))}
      </section>

      {/* 6. Babysitting Highlight Box */}
      <section id="babysitting" className="camp-section space-y-4 scroll-mt-28">
        <h2 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
          {data.babysitting.title}
        </h2>
        <div className="p-6 sm:p-7 bg-[#ede9fe]/50 sm:bg-violet-100/60 rounded-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5 flex-1">
            <p className="font-outfit text-neutral-900 text-base sm:text-lg leading-relaxed">
              {data.babysitting.description}
            </p>
            <p className="font-outfit text-[#00549c] text-base sm:text-lg font-medium leading-relaxed">
              {data.babysitting.rateText}
            </p>
          </div>
          {onOpenBabysitting && (
            <button
              type="button"
              onClick={onOpenBabysitting}
              className="group flex-shrink-0 inline-flex items-center gap-3 pl-4 pr-2 py-2 bg-[#00549c] hover:bg-[#00427c] text-white rounded-sm font-outfit text-sm font-medium leading-5 transition-all shadow-sm active:scale-98"
            >
              <span>Ask about babysitting</span>
              <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
              </span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default KidsDayCampContent;
