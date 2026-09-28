"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shirt } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import ResortBreadcrumb from "./ResortBreadcrumb";
import ResortPhotoModal from "./ResortPhotoModal";
import type { ResortData } from "./resorts.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { resortHref, restaurantHref, inquireHref } from "@/lib/routes";

interface ResortRestaurantDetailViewProps {
  offeringId: string;
  programId: string;
  data: ResortData;
  restaurantId: string;
}

export const ResortRestaurantDetailView: React.FC<ResortRestaurantDetailViewProps> = ({
  offeringId,
  programId,
  data,
  restaurantId,
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const viewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentDining = data.dining.find((d) => d.id === restaurantId) || data.dining[0];
  const otherDining = data.dining.filter((d) => d.id !== currentDining.id).slice(0, 3);

  const galleryList = [
    { id: "main", title: currentDining.gallery.main.label, image: currentDining.gallery.main.src },
    { id: "side1", title: currentDining.gallery.side1.label, image: currentDining.gallery.side1.src },
    { id: "side2", title: currentDining.gallery.side2.label, image: currentDining.gallery.side2.src },
    { id: "side3", title: currentDining.gallery.side3.label, image: currentDining.gallery.side3.src },
    { id: "side4", title: currentDining.gallery.side4.label, image: currentDining.gallery.side4.src },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !viewRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "premiumOut" } });

      if (galleryRef.current) {
        tl.fromTo(galleryRef.current, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
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
        tl.fromTo(contentRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.3);
      }
    },
    { scope: viewRef }
  );

  const openPhotoModal = (idx: number) => {
    setActivePhotoIdx(idx);
    setPhotoModalOpen(true);
  };

  const allDiningHref = `${resortHref(offeringId, programId, data.resortId)}#dining`;
  const inquireUrl = inquireHref({ destination: programId, resort: data.resortId, dining: currentDining.id });

  return (
    <main ref={viewRef} className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col">
      <ResortBreadcrumb
        offeringId={offeringId}
        programId={programId}
        programTitle={data.programTitle}
        resortId={data.resortId}
        resortName={data.resortName}
        currentPage={currentDining.title}
      />

      <section ref={galleryRef} className="w-full pb-8 md:pb-12" aria-label="Dining gallery">
        <Container>
          <div className="w-full flex flex-col lg:flex-row gap-4 h-[420px] sm:h-[480px] lg:h-[560px]">
            <div
              onClick={() => openPhotoModal(0)}
              className="relative w-full lg:w-[58%] h-[240px] sm:h-[300px] lg:h-full rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm shrink-0"
            >
              <Image
                src={currentDining.gallery.main.src}
                alt={currentDining.gallery.main.label}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            </div>

            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 flex-1 h-full">
              {[currentDining.gallery.side1, currentDining.gallery.side2, currentDining.gallery.side3, currentDining.gallery.side4].map(
                (side, idx) => (
                  <div
                    key={idx}
                    onClick={() => (idx === 3 ? openPhotoModal(0) : openPhotoModal(idx + 1))}
                    className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
                  >
                    <Image
                      src={side.src}
                      alt={side.label}
                      fill
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {idx === 3 ? (
                      <>
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPhotoModal(0);
                          }}
                          className="absolute bottom-4 right-4 px-4 py-2 rounded bg-[#FCFCFB] text-[#131313] font-outfit text-sm font-medium shadow-md hover:bg-white hover:text-[#00549C] transition-all duration-200 z-10"
                        >
                          View all {currentDining.gallery.totalPhotos} photos
                        </button>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </Container>
      </section>

      <section ref={contentRef} className="w-full pb-20 md:pb-28" aria-label="Dining details">
        <Container>
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            <div className="flex-1 w-full flex flex-col items-start">
              <h1
                ref={titleRef}
                className="font-cormorant font-light text-[clamp(2.5rem,5.5vw,5rem)] text-[#131313] tracking-[-0.02em] leading-[1.05]"
              >
                {currentDining.titlePrefix} <span className="italic">{currentDining.titleItalic}</span>
              </h1>

              <div className="flex items-center gap-4 pt-3 text-[#5E6062] font-outfit text-base">
                <span>{currentDining.cuisine}</span>
                <span className="size-1 rounded-full bg-[#C6C2BA]" aria-hidden="true" />
                <span>{currentDining.mealPeriod}</span>
              </div>

              <div className="w-full border-t border-[rgba(19,19,19,0.12)] pt-8 mt-8 sm:mt-10 flex flex-col gap-3">
                <span className="font-outfit text-sm font-medium text-[#8C877E]">About {currentDining.title}</span>
                <p className="font-outfit text-lg sm:text-[18px] text-[#3D4046] font-normal leading-[1.65] max-w-2xl">
                  {currentDining.description}
                </p>
                {currentDining.kashrutNotes && (
                  <p className="font-outfit text-sm text-[#8C877E] pt-1">{currentDining.kashrutNotes}</p>
                )}
              </div>

              <div className="w-full border-t border-[rgba(19,19,19,0.12)] pt-8 mt-8 sm:mt-10 flex flex-col gap-10">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Clock className="size-6 text-[#00549C] shrink-0" strokeWidth={1.5} />
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">Schedule</h3>
                  </div>

                  <div className="flex flex-col w-full divide-y divide-[rgba(19,19,19,0.12)] pt-1">
                    {currentDining.schedule.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3.5">
                        <span className="font-outfit text-base text-[#131313]">{item.days}</span>
                        <span className="font-outfit text-base text-[#131313]">{item.hours}</span>
                      </div>
                    ))}
                  </div>

                  {currentDining.location && (
                    <p className="font-outfit text-sm text-[#8C877E] pt-1">{currentDining.location}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Shirt className="size-6 text-[#00549C] shrink-0" strokeWidth={1.5} />
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">Dress code</h3>
                  </div>
                  <p className="font-outfit text-[17px] text-[#131313] leading-relaxed">{currentDining.dressCode}</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[380px] shrink-0 bg-[#F2F0EC] rounded-md p-7 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-28 self-start">
              <h2 className="font-cormorant text-[32px] sm:text-[34px] text-[#131313] font-normal leading-tight">
                {currentDining.title}
              </h2>

              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Cuisine</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">{currentDining.cuisine}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Hours</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                    {currentDining.hours ?? currentDining.schedule[0]?.hours}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Dress code</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">{currentDining.dressCode}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Resort</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">{data.resortName}</span>
                </div>
              </div>

              <Link
                href={inquireUrl}
                className="w-full inline-flex items-center justify-between pl-5 pr-2 py-2.5 rounded bg-[#00549C] text-white font-outfit text-[15px] font-medium hover:bg-[#00427c] transition-all duration-200 shadow-sm group"
              >
                <span>Ask about dining</span>
                <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] transition-transform duration-200 group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.91669 7H11.0834M11.0834 7L7.00002 2.91669M11.0834 7L7.00002 11.0834"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>

              <Link
                href={allDiningHref}
                className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 block pt-1 text-center sm:text-left"
              >
                Back to all dining
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {otherDining.length > 0 && (
        <section className="w-full pb-20 md:pb-28" aria-label="Other dining">
          <Container>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <span className="size-[5px] rounded-full bg-[#BD9343]" aria-hidden="true" />
                  <span className="font-outfit text-sm font-medium text-[#BD9343]">Dining</span>
                </div>

                <h2 className="font-cormorant font-light text-4xl sm:text-5xl lg:text-[64px] text-[#131313] tracking-[-0.015em] leading-[1.05]">
                  More places to eat
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDining.map((venue) => {
                  const href = restaurantHref(offeringId, programId, data.resortId, venue.id);

                  return (
                    <div key={venue.id} className="group flex flex-col justify-start items-start gap-4 w-full">
                      <Link
                        href={href}
                        className="relative w-full h-[240px] sm:h-[260px] rounded-md overflow-hidden bg-[#E4E0D8] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                      >
                        <Image
                          src={venue.image}
                          alt={venue.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      <div className="flex flex-col items-start gap-1 w-full">
                        <Link href={href}>
                          <h3 className="font-cormorant text-2xl text-[#131313] font-normal group-hover:text-[#00549c] transition-colors duration-200">
                            {venue.title}
                          </h3>
                        </Link>
                        <p className="font-outfit text-sm text-[#5E6062]">{venue.cuisine}</p>
                        <Link
                          href={href}
                          className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 pt-1"
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

      <section className="w-full pb-20 md:pb-28" aria-label="Inquiry banner">
        <Container>
          <div className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] rounded-lg overflow-hidden flex flex-col justify-center items-center gap-6 px-6 sm:px-12 text-center bg-slate-900 shadow-lg">
            <Image
              src={data.heroImage}
              alt="Dine with us"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.45]"
            />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
              <h2 className="font-cormorant font-light text-3xl sm:text-5xl lg:text-[68px] text-white tracking-[-0.015em] leading-[1.08]">
                Dine with us for <span className="italic">Passover 2027</span>
              </h2>

              <Link
                href={inquireUrl}
                className="inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded bg-[#00549C] text-white font-outfit text-[15px] font-medium hover:bg-[#00427c] transition-all duration-300 shadow-md group"
              >
                <span>Inquire</span>
                <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.91669 7H11.0834M11.0834 7L7.00002 2.91669M11.0834 7L7.00002 11.0834"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ResortPhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        photos={galleryList}
        initialIndex={activePhotoIdx}
      />
    </main>
  );
};

export default ResortRestaurantDetailView;
