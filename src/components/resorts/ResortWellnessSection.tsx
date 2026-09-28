"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import type { ResortWellnessItem } from "./resorts.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { spaHref, inquireHref } from "@/lib/routes";

interface ResortWellnessSectionProps {
  offeringId: string;
  programId: string;
  resortId: string;
  wellness: ResortWellnessItem[];
  sectionTitle?: { lead: string; italic: string } | string;
  sectionDescription?: string;
}

const CATEGORY_LABELS: Record<ResortWellnessItem["category"], string> = {
  "the-spa": "The Spa",
  "wellness-deck": "Wellness Deck",
  "fitness-center": "Fitness Center",
  "soak-rituals": "Soak Rituals",
};

export const ResortWellnessSection: React.FC<ResortWellnessSectionProps> = ({
  offeringId,
  programId,
  resortId,
  wellness,
  sectionTitle,
  sectionDescription,
}) => {
  const categories = useMemo(() => {
    const seen = new Set<ResortWellnessItem["category"]>();
    for (const item of wellness) seen.add(item.category);
    return Array.from(seen);
  }, [wellness]);

  const [activeTab, setActiveTab] = useState<string>(categories[0] ?? "the-spa");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
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
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
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
        tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.2);
      }

      if (tabsRef.current) {
        tl.fromTo(tabsRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.3);
      }

      if (contentRef.current) {
        tl.fromTo(contentRef.current, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.35);
      }
    },
    { scope: sectionRef }
  );

  const itemsForActiveTab = wellness.filter((item) => item.category === activeTab);

  const renderTitle = () => {
    if (!sectionTitle) {
      return (
        <>
          Move, stretch and <span className="font-normal italic">switch off</span>
        </>
      );
    }
    if (typeof sectionTitle === "object") {
      return (
        <>
          {sectionTitle.lead} <span className="font-normal italic">{sectionTitle.italic}</span>
        </>
      );
    }
    const words = sectionTitle.trim().split(" ");
    const lastWord = words.pop() || "";
    return (
      <>
        {words.join(" ")} <span className="font-normal italic">{lastWord}</span>
      </>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="wellness"
      className="w-full py-16 sm:py-24 md:py-28 scroll-mt-28"
      aria-label="Wellness and Fitness"
    >
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
            <div className="flex flex-col items-start gap-4 max-w-2xl">
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">Wellness & Fitness</span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                {renderTitle()}
              </h2>
            </div>

            <p ref={descRef} className="font-outfit text-[#5E6062] text-base leading-relaxed max-w-md">
              {sectionDescription || "Classes run daily through the holiday. Times are confirmed on arrival."}
            </p>
          </div>

          <div
            ref={tabsRef}
            className="flex items-center gap-8 border-b border-[rgba(19,19,19,0.12)] overflow-x-auto no-scrollbar"
          >
            {categories.map((category) => {
              const isActive = activeTab === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
                  className={`pb-3.5 font-outfit text-base sm:text-[17px] transition-colors relative cursor-pointer shrink-0 ${isActive ? "text-[#131313] font-medium" : "text-[#5E6062] hover:text-[#131313]"
                    }`}
                >
                  {CATEGORY_LABELS[category]}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131313]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          <div ref={contentRef} className="w-full flex flex-col gap-6">
            <h3 className="font-cormorant text-3xl sm:text-[34px] text-[#131313] font-normal">
              {CATEGORY_LABELS[activeTab as ResortWellnessItem["category"]]}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 border-b border-[rgba(19,19,19,0.1)] pb-8">
              {itemsForActiveTab.map((item) => {
                const itemHref =
                  item.category === "the-spa"
                    ? spaHref(offeringId, programId, resortId)
                    : item.linkText
                      ? inquireHref({ destination: programId, resort: resortId, topic: item.id })
                      : null;

                const CardWrapper = itemHref ? Link : "div";

                return (
                  <CardWrapper
                    key={item.id}
                    href={itemHref || "#"}
                    className={`flex items-center gap-5 group ${itemHref ? "cursor-pointer focus:outline-none" : ""
                      }`}
                  >
                    <div className="relative w-36 h-24 sm:w-44 sm:h-28 rounded-md overflow-hidden bg-[#E4E0D8] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1.5">
                      <h4 className="font-outfit text-lg font-medium text-[#131313] group-hover:text-[#00549c] transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="font-outfit text-sm sm:text-base text-[#5E6062] leading-relaxed">
                        {item.description}
                      </p>
                      {item.timing && (
                        <p className="font-outfit text-xs text-[#8C877E]">{item.timing}</p>
                      )}
                      {itemHref && (
                        <span
                          className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 group-hover:text-[#00549C] transition-colors duration-200"
                        >
                          {item.linkText || (item.category === "the-spa" ? "See details" : "Learn more")}
                        </span>
                      )}
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResortWellnessSection;
