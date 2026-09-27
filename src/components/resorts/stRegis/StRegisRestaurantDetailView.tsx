"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shirt, ArrowRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import StRegisBreadcrumb from "./StRegisBreadcrumb";
import StRegisPhotoModal from "./StRegisPhotoModal";
import { ST_REGIS_RESORT_DATA } from "./stRegis.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisRestaurantDetailViewProps {
  programId?: string;
  restaurantId?: string;
}

export const StRegisRestaurantDetailView: React.FC<StRegisRestaurantDetailViewProps> = ({
  programId = "diamond-club-reserve",
  restaurantId = "toro",
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const viewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentDining =
    ST_REGIS_RESORT_DATA.dining.find((d) => d.id === restaurantId) ||
    ST_REGIS_RESORT_DATA.dining[0];

  const otherDining = ST_REGIS_RESORT_DATA.dining.filter(
    (d) => d.id !== currentDining.id
  );

  const displayOtherDining =
    otherDining.length >= 3
      ? otherDining.slice(0, 3)
      : ST_REGIS_RESORT_DATA.dining.slice(0, 3);

  const galleryPhotos = [
    { id: "main", title: currentDining.gallery.main.label, image: currentDining.gallery.main.src },
    { id: "side-1", title: currentDining.gallery.side1.label, image: currentDining.gallery.side1.src },
    { id: "side-2", title: currentDining.gallery.side2.label, image: currentDining.gallery.side2.src },
    { id: "side-3", title: currentDining.gallery.side3.label, image: currentDining.gallery.side3.src },
    { id: "side-4", title: currentDining.gallery.side4.label, image: currentDining.gallery.side4.src },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !viewRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "premiumOut" },
      });

      if (galleryRef.current) {
        tl.fromTo(
          galleryRef.current,
          { autoAlpha: 0, y: 25 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0
        );
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.15
        );
      }

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.3
        );
      }
    },
    { scope: viewRef }
  );

  const openPhotoModal = (idx: number) => {
    setActivePhotoIdx(idx);
    setPhotoModalOpen(true);
  };

  const inquireHref = `/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis&topic=${currentDining.id}`;

  return (
    <main
      ref={viewRef}
      className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col"
    >
      {/* Breadcrumbs matching Figma Node 40015131:362 */}
      <StRegisBreadcrumb
        programId={programId}
        programTitle="Diamond Club Reserve"
        resortName="The St. Regis Kanai Resort"
        currentPage={currentDining.title}
      />

      {/* Restaurant Gallery Mosaic matching Figma Node 40015131:372 */}
      <section
        ref={galleryRef}
        className="w-full pt-4 pb-8"
        aria-label="Restaurant Gallery"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main large photo (820x560 in Figma) */}
            <div
              onClick={() => openPhotoModal(0)}
              className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[560px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
            >
              <Image
                src={currentDining.gallery.main.src}
                alt={currentDining.gallery.main.label}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>

            {/* 2x2 side grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[360px] sm:h-[460px] lg:h-[560px]">
              <div
                onClick={() => openPhotoModal(1)}
                className="relative h-full rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
              >
                <Image
                  src={currentDining.gallery.side1.src}
                  alt={currentDining.gallery.side1.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 21vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div
                onClick={() => openPhotoModal(2)}
                className="relative h-full rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
              >
                <Image
                  src={currentDining.gallery.side2.src}
                  alt={currentDining.gallery.side2.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 21vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div
                onClick={() => openPhotoModal(3)}
                className="relative h-full rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
              >
                <Image
                  src={currentDining.gallery.side3.src}
                  alt={currentDining.gallery.side3.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 21vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* 4th photo with "View all photos" button overlay */}
              <div
                onClick={() => openPhotoModal(4)}
                className="relative h-full rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
              >
                <Image
                  src={currentDining.gallery.side4.src}
                  alt={currentDining.gallery.side4.label}
                  fill
                  sizes="(max-width: 1024px) 50vw, 21vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPhotoModal(0);
                  }}
                  className="absolute bottom-4 right-4 bg-[#FCFCFB] text-[#131313] hover:bg-white px-4 py-2.5 rounded-[4px] font-outfit text-sm font-medium shadow-md transition-all duration-200"
                >
                  View all {currentDining.gallery.totalPhotos} photos
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Dining Content: 2-Column Layout matching Figma Node 40015131:408 */}
      <section className="w-full pt-12 sm:pt-16 pb-20 sm:pb-28">
        <Container>
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          >
            {/* Left Column: Details */}
            <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-12">
              {/* Heading & Meta matching Figma Node 40015131:410 */}
              <div className="flex flex-col gap-3.5">
                <h1
                  ref={titleRef}
                  className="font-cormorant font-light italic text-[#131313] text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.02em]"
                >
                  {currentDining.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-sm sm:text-base font-outfit text-[#5E6062]">
                  <span>{currentDining.cuisine}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentDining.mealPeriod}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentDining.location}</span>
                </div>
              </div>

              {/* About matching Figma Node 40015131:418 */}
              <div className="flex flex-col gap-3 pt-8 border-t border-[rgba(19,19,19,0.12)]">
                <h2 className="font-outfit text-sm font-medium text-[#8C877E]">
                  About {currentDining.title}
                </h2>
                <p className="font-outfit text-base sm:text-lg text-[#3D4046] leading-[30px]">
                  {currentDining.description}
                </p>
              </div>

              {/* Info Blocks matching Figma Node 40015131:619 */}
              <div className="flex flex-col gap-10 pt-8 border-t border-[rgba(19,19,19,0.12)]">
                {/* Block / Schedule */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-[#131313] stroke-[1.5]" />
                    <h3 className="font-cormorant text-[26px] sm:text-[30px] leading-[34px] text-[#131313] font-normal">
                      Schedule
                    </h3>
                  </div>

                  <div className="flex flex-col w-full">
                    {currentDining.schedule.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3.5 border-b border-[rgba(19,19,19,0.12)] font-outfit text-base"
                      >
                        <span className="text-[#131313]">{row.days}</span>
                        <span
                          className={`font-medium ${row.isClosed ? "text-[#C8372D]" : "text-[#131313]"
                            }`}
                        >
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block / Dress code */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Shirt className="size-6 text-[#131313] stroke-[1.5]" />
                    <h3 className="font-cormorant text-[26px] sm:text-[30px] leading-[34px] text-[#131313] font-normal">
                      Dress code
                    </h3>
                  </div>
                  <p className="font-outfit text-[17px] leading-[26px] text-[#131313]">
                    {currentDining.dressCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Summary Card matching Figma Node 40015131:506 */}
            <div className="lg:col-span-4 sticky top-28 w-full max-w-[380px]">
              <div className="w-full bg-[#F2F0EC] p-8 rounded-[6px] flex flex-col gap-6">
                <h3 className="font-cormorant text-[34px] leading-[38px] text-[#131313] font-normal">
                  {currentDining.title}
                </h3>

                {/* Facts Table */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Cuisine</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentDining.cuisine}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Hours</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentDining.hours}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Closed</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentDining.schedule.find((s) => s.isClosed)?.days || "None"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Dress code</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentDining.dressCode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Resort</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      The St. Regis Kanai
                    </span>
                  </div>
                </div>

                {/* Button / Primary */}
                <Link
                  href={inquireHref}
                  className="w-full flex items-center justify-between bg-[#00549C] hover:bg-[#00427a] text-white pl-4 pr-2 py-2 rounded-[4px] font-outfit text-[15px] font-medium transition-all duration-300 shadow-md group"
                >
                  <span>Ask about dining</span>
                  <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>

                <Link
                  href={`/passover-collection-2027/${programId}/resorts/st-regis#dining`}
                  className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors"
                >
                  Back to all dining
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Restaurants Section matching Figma Node 40015131:522 */}
      <section
        className="w-full pb-28 sm:pb-32"
        aria-label="Other Restaurants at this resort"
      >
        <Container>
          <div className="flex flex-col gap-10">
            {/* Heading */}
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">
                  Dining
                </span>
              </div>
              <h2 className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight">
                More places to eat
              </h2>
            </div>

            {/* Restaurant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayOtherDining.map((dining) => {
                const diningHref = `/passover-collection-2027/${programId}/resorts/st-regis/restaurants/${dining.id}`;

                return (
                  <div
                    key={dining.id}
                    className="group flex flex-col justify-start items-start gap-4 w-full"
                  >
                    <Link
                      href={diningHref}
                      className="relative w-full h-[260px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block"
                    >
                      <Image
                        src={dining.image}
                        alt={dining.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </Link>

                    <div className="flex flex-col items-start gap-1.5 w-full">
                      <Link href={diningHref}>
                        <h3 className="font-cormorant text-[30px] leading-[34px] text-[#131313] font-normal group-hover:text-[#00549C] transition-colors">
                          {dining.title}
                        </h3>
                      </Link>

                      <p className="font-outfit text-[15px] leading-6 text-[#5E6062]">
                        {dining.cuisine}  ·  {dining.mealPeriod}
                      </p>

                      <Link
                        href={diningHref}
                        className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors pt-1"
                      >
                        View restaurant
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Inquiry Banner matching Figma Node 40015131:560 */}
      <section className="w-full pb-28 sm:pb-32">
        <Container>
          <div className="relative w-full h-[340px] sm:h-[380px] rounded-[8px] overflow-hidden flex flex-col items-center justify-center gap-6 px-6 text-center">
            <Image
              src={ST_REGIS_RESORT_DATA.heroImage}
              alt="Passover 2027 Dining Inquiry"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[rgba(8,13,20,0.55)]" />

            <h2 className="relative z-10 font-cormorant font-light text-white text-[clamp(2.25rem,4.75vw,4.25rem)] leading-[1.05] tracking-tight max-w-4xl">
              Dine with us for <span className="font-light italic">Passover 2027</span>
            </h2>

            <Link
              href={inquireHref}
              className="relative z-10 inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white pl-4 pr-2 py-2 rounded-[4px] font-outfit text-[15px] font-medium transition-all duration-300 shadow-md group"
            >
              <span>Inquire</span>
              <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 transition-transform duration-200">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Full Photo Modal */}
      <StRegisPhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        photos={galleryPhotos}
        initialIdx={activePhotoIdx}
        title={currentDining.title}
      />
    </main>
  );
};

export default StRegisRestaurantDetailView;
