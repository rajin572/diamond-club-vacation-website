"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shirt, ShieldCheck, ArrowUpRight } from "lucide-react";
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

  const galleryList = (currentDining.gallery && currentDining.gallery.length > 0)
    ? currentDining.gallery.map((img, i) => ({ id: `img-${i}`, title: `${currentDining.title} photo ${i + 1}`, image: img }))
    : [{ id: "main", title: currentDining.title, image: currentDining.image }];

  const mainPhoto = galleryList[0];
  const sidePhotos = galleryList.slice(1, 5);

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
      {/* Breadcrumb */}
      <StRegisBreadcrumb
        programId={programId}
        programTitle="Diamond Club Reserve"
        resortName="The St. Regis Kanai Resort"
        detailLabel={currentDining.title}
      />

      {/* 5-Photo Gallery */}
      <section className="w-full pt-6 pb-12 sm:pb-16" aria-label="Restaurant Photos">
        <Container>
          <div
            ref={galleryRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full"
          >
            {/* Main Photo */}
            <div
              onClick={() => openPhotoModal(0)}
              className="lg:col-span-7 relative h-[340px] sm:h-[460px] lg:h-[560px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
            >
              <Image
                src={mainPhoto.image}
                alt={currentDining.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>

            {/* Side Photos */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              {sidePhotos.map((photo, i) => {
                const isLast = i === sidePhotos.length - 1 || i === 3;

                return (
                  <div
                    key={photo.id}
                    onClick={() => openPhotoModal(i + 1)}
                    className="relative h-[165px] sm:h-[224px] lg:h-[272px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 20vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {isLast && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPhotoModal(0);
                          }}
                          className="px-3.5 py-2 rounded-[4px] bg-[#FCFCFB] text-[#131313] font-outfit text-xs sm:text-sm font-medium shadow-md hover:bg-white transition-all duration-200"
                        >
                          View all {galleryList.length} photos
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Content & Sticky Sidebar */}
      <section className="w-full pb-20 sm:pb-28" aria-label="Restaurant Details">
        <Container>
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left Column */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <div className="flex flex-col items-start gap-4">
                <h1
                  ref={titleRef}
                  className="font-cormorant font-light italic text-[#131313] text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-tight"
                >
                  {currentDining.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-outfit text-[#5E6062]">
                  <span>{currentDining.cuisine}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentDining.mealPeriod}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentDining.location}</span>
                </div>
              </div>

              {/* About */}
              <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(19,19,19,0.12)]">
                <h2 className="font-outfit text-sm font-medium text-[#8C877E] uppercase tracking-wider">
                  About {currentDining.title}
                </h2>
                <p className="font-outfit text-base sm:text-lg text-[#3D4046] leading-relaxed">
                  {currentDining.description}
                </p>
              </div>

              {/* Info Blocks */}
              <div className="flex flex-col gap-8 pt-6 border-t border-[rgba(19,19,19,0.12)]">
                {/* Schedule */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[#131313]">
                    <Clock className="size-5 text-[#8C877E]" />
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-normal">
                      Schedule & Service Hours
                    </h3>
                  </div>
                  <div className="flex flex-col border border-[rgba(19,19,19,0.08)] rounded-[6px] overflow-hidden">
                    <div className="flex justify-between items-center px-5 py-3.5 bg-white border-b border-[rgba(19,19,19,0.08)] font-outfit text-sm sm:text-base">
                      <span className="text-[#131313] font-medium">Holiday Dinner Service</span>
                      <span className="text-[#131313]">{currentDining.hours}</span>
                    </div>
                    <div className="flex justify-between items-center px-5 py-3.5 bg-[#F9F9F8] font-outfit text-sm sm:text-base">
                      <span className="text-[#5E6062]">Reservations</span>
                      <span className="text-[#00549C] font-medium">Handled by Concierge</span>
                    </div>
                  </div>
                </div>

                {/* Dress Code */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#131313]">
                    <Shirt className="size-5 text-[#8C877E]" />
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-normal">
                      Dress Code
                    </h3>
                  </div>
                  <p className="font-outfit text-base text-[#131313] pl-7">
                    {currentDining.dressCode}
                  </p>
                </div>

                {/* Kashrut Supervision */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#131313]">
                    <ShieldCheck className="size-5 text-[#BD9343]" />
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-normal">
                      Kosher Supervision
                    </h3>
                  </div>
                  <p className="font-outfit text-base text-[#131313] pl-7">
                    {currentDining.kashrutNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Summary Card matching Figma Node 40015131:506 */}
            <div className="lg:col-span-4 sticky top-28 w-full">
              <div className="w-full bg-[#F2F0EC] p-6 sm:p-8 rounded-[6px] flex flex-col gap-6 shadow-sm border border-[rgba(19,19,19,0.06)]">
                <h3 className="font-cormorant text-3xl text-[#131313] font-normal">
                  {currentDining.title}
                </h3>

                <div className="flex flex-col w-full border-t border-[rgba(19,19,19,0.12)]">
                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Cuisine</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentDining.cuisine}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Hours</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentDining.hours}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Dress code</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentDining.dressCode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Resort</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      The St. Regis Kanai
                    </span>
                  </div>
                </div>

                <Link
                  href={inquireHref}
                  className="group w-full flex items-center justify-between bg-[#00549C] hover:bg-[#00427a] text-white px-5 py-3 rounded-[4px] font-outfit text-[15px] font-medium transition-all duration-300 shadow-md"
                >
                  <span>Ask about dining</span>
                  <span className="size-6 rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>

                <Link
                  href={`/passover-collection-2027/${programId}/resorts/st-regis#dining`}
                  className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors text-center"
                >
                  Back to all dining
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Restaurants Section */}
      {otherDining.length > 0 && (
        <section
          className="w-full py-16 sm:py-20 border-t border-[rgba(19,19,19,0.08)] bg-[#F8F8F7]"
          aria-label="Other Restaurants"
        >
          <Container>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-2 select-none">
                  <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                  <span className="font-outfit text-sm font-medium text-[#BD9343]">
                    Dining
                  </span>
                </div>
                <h2 className="font-cormorant font-light text-[#131313] text-3xl sm:text-4xl">
                  More places to eat
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDining.map((dining) => {
                  const diningHref = `/passover-collection-2027/${programId}/resorts/st-regis/restaurants/${dining.id}`;

                  return (
                    <div
                      key={dining.id}
                      className="group flex flex-col justify-start items-start gap-4 w-full"
                    >
                      <Link
                        href={diningHref}
                        className="relative w-full h-[240px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block"
                      >
                        <Image
                          src={dining.image}
                          alt={dining.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </Link>

                      <div className="flex flex-col items-start gap-1 w-full">
                        <Link href={diningHref}>
                          <h3 className="font-cormorant text-2xl text-[#131313] font-normal group-hover:text-[#00549c] transition-colors">
                            {dining.title}
                          </h3>
                        </Link>
                        <p className="font-outfit text-sm text-[#5E6062]">
                          {dining.cuisine} · {dining.mealPeriod.split("·")[0]}
                        </p>
                        <Link
                          href={diningHref}
                          className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors pt-1"
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
      )}

      {/* Inquiry Banner */}
      <section className="w-full py-16 sm:py-24" aria-label="Inquiry">
        <Container>
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-lg overflow-hidden flex flex-col justify-center items-center gap-6 px-6 text-center bg-slate-900 shadow-md">
            <Image
              src={currentDining.image}
              alt={currentDining.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
              <h2 className="font-cormorant font-light text-white text-[clamp(2rem,4.5vw,4rem)] leading-[1.08]">
                Dine with us for <span className="font-normal italic text-[#f4ecd8]">Passover 2027</span>
              </h2>
              <Link
                href={inquireHref}
                className="group inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white px-6 py-3.5 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-md"
              >
                <span>Ask about dining</span>
                <span className="size-6 rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Photo Lightbox Modal */}
      <StRegisPhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        photos={galleryList}
        initialIndex={activePhotoIdx}
        title={currentDining.title}
      />
    </main>
  );
};

export default StRegisRestaurantDetailView;
