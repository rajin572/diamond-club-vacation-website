"use client";

import React, { useState, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import { AllImages } from "../../../../public/images/AllImages";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface WellnessActivity {
  id: string;
  title: string;
  category: "deck" | "fitness";
  description: string;
  image: StaticImageData | string;
  timing?: string;
}

const WELLNESS_ACTIVITIES: WellnessActivity[] = [
  {
    id: "yoga",
    title: "Salt & Soul Yoga",
    category: "deck",
    description: "Yoga classes, meditation and wellness workshops on the open-air deck.",
    image: AllImages.stRegisGallery1,
    timing: "Daily · 7:30 AM & 9:00 AM",
  },
  {
    id: "soak",
    title: "Soak Rituals",
    category: "deck",
    description: "A private wellness experience in the hydrotherapy circuit.",
    image: AllImages.stRegisGallery3,
    timing: "By appointment · 10:00 AM – 8:00 PM",
  },
  {
    id: "meditation",
    title: "Meditation",
    category: "deck",
    description: "Guided sessions to start or close the day.",
    image: AllImages.stRegisGallery2,
    timing: "Daily · Sunrise & Sunset",
  },
  {
    id: "rola-spin",
    title: "Rola Spin Classes",
    category: "fitness",
    description: "Indoor cycling with the resort fitness team.",
    image: AllImages.stRegisGallery4,
    timing: "Daily · 8:30 AM & 5:00 PM",
  },
  {
    id: "hiit-pilates",
    title: "HIIT · Pilates · Zumba",
    category: "fitness",
    description: "Daily classes for every level, in the studio or outdoors.",
    image: AllImages.stRegisGallery1,
    timing: "Daily · Morning & Afternoon",
  },
  {
    id: "latin-dance",
    title: "Latin Dance Classes",
    category: "fitness",
    description: "Salsa, merengue and bachata through the week.",
    image: AllImages.stRegisGallery3,
    timing: "Afternoons · 4:00 PM",
  },
  {
    id: "aqua-zumba",
    title: "Aqua Zumba",
    category: "fitness",
    description: "Low-impact classes in the pool.",
    image: AllImages.stRegisFamilyPool,
    timing: "Daily · 11:30 AM",
  },
  {
    id: "athletic-club",
    title: "Athletic Club",
    category: "fitness",
    description: "Courts and outdoor sports across the property.",
    image: AllImages.stRegisMainPoolBeach,
    timing: "Open daily · 7:00 AM – 8:00 PM",
  },
];

interface StRegisWellnessSectionProps {
  programId?: string;
}

export const StRegisWellnessSection: React.FC<StRegisWellnessSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<"deck" | "fitness">("deck");
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      if (listRef.current) {
        tl.fromTo(
          listRef.current.children,
          { autoAlpha: 0, y: 30 },
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

  return (
    <section
      ref={sectionRef}
      id="wellness"
      className="w-full py-16 sm:py-24 md:py-32 scroll-mt-28"
      aria-label="Wellness and Fitness"
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
                  Wellness & Fitness
                </span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                Move, stretch and <span className="font-normal italic">switch off</span>
              </h2>
            </div>

            <p
              ref={descRef}
              className="font-outfit text-[#5E6062] text-base leading-relaxed max-w-xs"
            >
              Classes run daily through the holiday. Times are confirmed on arrival.
            </p>
          </div>

          {/* Tabs */}
          <div
            ref={tabsRef}
            className="flex items-center gap-8 border-b border-[rgba(19,19,19,0.14)]"
          >
            <button
              onClick={() => setActiveTab("deck")}
              className={`pb-3.5 font-outfit text-base sm:text-[17px] transition-colors relative ${activeTab === "deck"
                  ? "text-[#131313] font-medium"
                  : "text-[#5E6062] hover:text-[#131313]"
                }`}
            >
              Wellness Deck
              {activeTab === "deck" && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131313]"
                  aria-hidden="true"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("fitness")}
              className={`pb-3.5 font-outfit text-base sm:text-[17px] transition-colors relative ${activeTab === "fitness"
                  ? "text-[#131313] font-medium"
                  : "text-[#5E6062] hover:text-[#131313]"
                }`}
            >
              Fitness Center
              {activeTab === "fitness" && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131313]"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {/* Activities Rows */}
          <div
            ref={listRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6"
          >
            {WELLNESS_ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-5 py-5 border-b border-[rgba(19,19,19,0.12)] group hover:border-[#131313] transition-colors duration-200"
              >
                {/* Thumbnail */}
                <div className="relative w-[130px] sm:w-[140px] h-[95px] sm:h-[104px] rounded-[6px] overflow-hidden bg-[#E4E0D8] shrink-0">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="140px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col items-start gap-1 flex-1">
                  <h3 className="font-outfit text-base sm:text-[18px] font-medium text-[#131313] group-hover:text-[#00549C] transition-colors">
                    {activity.title}
                  </h3>
                  <p className="font-outfit text-sm text-[#5E6062] line-clamp-2">
                    {activity.description}
                  </p>
                  <Link
                    href={`/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis&topic=${activity.id}`}
                    className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors pt-1"
                  >
                    See details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StRegisWellnessSection;
