"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Bed, Smartphone, Bath } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import EditionBreadcrumb from "./EditionBreadcrumb";
import EditionPhotoModal from "./EditionPhotoModal";
import { THE_EDITION_RESORT_DATA } from "./edition.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface EditionRoomDetailViewProps {
  programId?: string;
  roomId?: string;
}

export const EditionRoomDetailView: React.FC<EditionRoomDetailViewProps> = ({
  programId = "diamond-club-reserve",
  roomId = "deluxe-room",
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const viewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find room or fallback to deluxe-room
  const currentRoom =
    THE_EDITION_RESORT_DATA.rooms.find((r) => r.id === roomId) ||
    THE_EDITION_RESORT_DATA.rooms[0];

  const otherRooms = THE_EDITION_RESORT_DATA.rooms
    .filter((r) => r.id !== currentRoom.id)
    .slice(0, 3);

  // 5-photo list for lightbox
  const galleryList = [
    { id: "main", title: currentRoom.gallery.main.label, image: currentRoom.gallery.main.src },
    { id: "side1", title: currentRoom.gallery.side1.label, image: currentRoom.gallery.side1.src },
    { id: "side2", title: currentRoom.gallery.side2.label, image: currentRoom.gallery.side2.src },
    { id: "side3", title: currentRoom.gallery.side3.label, image: currentRoom.gallery.side3.src },
    { id: "side4", title: currentRoom.gallery.side4.label, image: currentRoom.gallery.side4.src },
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

  const allRoomsHref = `/passover-collection-2027/${programId}/resorts/edition#rooms`;
  const inquireHref = `/inquire?holiday=passover-2027&destination=${programId}&resort=edition&room=${currentRoom.id}`;

  return (
    <main
      ref={viewRef}
      className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col"
    >
      {/* Breadcrumb */}
      <EditionBreadcrumb
        programId={programId}
        programTitle={THE_EDITION_RESORT_DATA.programTitle}
        resortName={THE_EDITION_RESORT_DATA.resortName}
        currentPage={currentRoom.title}
      />

      {/* 5-Photo Gallery Mosaic matching Figma */}
      <section ref={galleryRef} className="w-full pb-8 md:pb-12" aria-label="Room gallery">
        <Container>
          <div className="w-full flex flex-col lg:flex-row gap-4 h-[420px] sm:h-[480px] lg:h-[560px]">
            {/* Left Main Photo (approx 58%) */}
            <div
              onClick={() => openPhotoModal(0)}
              className="relative w-full lg:w-[58%] h-[240px] sm:h-[300px] lg:h-full rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm shrink-0"
            >
              <Image
                src={currentRoom.gallery.main.src}
                alt={currentRoom.gallery.main.label}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            </div>

            {/* Right 2x2 Grid of 4 Photos (approx 42%) */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 flex-1 h-full">
              {/* Photo 1: Bedroom */}
              <div
                onClick={() => openPhotoModal(1)}
                className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
              >
                <Image
                  src={currentRoom.gallery.side1.src}
                  alt={currentRoom.gallery.side1.label}
                  fill
                  sizes="21vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Photo 2: Bathroom */}
              <div
                onClick={() => openPhotoModal(2)}
                className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
              >
                <Image
                  src={currentRoom.gallery.side2.src}
                  alt={currentRoom.gallery.side2.label}
                  fill
                  sizes="21vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Photo 3: Terrace */}
              <div
                onClick={() => openPhotoModal(3)}
                className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
              >
                <Image
                  src={currentRoom.gallery.side3.src}
                  alt={currentRoom.gallery.side3.label}
                  fill
                  sizes="21vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Photo 4: Kitchen / Plunge pool with "View all X photos" button */}
              <div
                onClick={() => openPhotoModal(4)}
                className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
              >
                <Image
                  src={currentRoom.gallery.side4.src}
                  alt={currentRoom.gallery.side4.label}
                  fill
                  sizes="21vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />

                {/* Pill Button overlaid on bottom-right photo */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPhotoModal(0);
                  }}
                  className="absolute bottom-4 right-4 px-4 py-2 rounded bg-[#FCFCFB] text-[#131313] font-outfit text-sm font-medium shadow-md hover:bg-white hover:text-[#00549C] transition-all duration-200 z-10"
                >
                  View all {currentRoom.gallery.totalPhotos} photos
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Room Content: 2-Column Layout matching Figma */}
      <section ref={contentRef} className="w-full pb-20 md:pb-28" aria-label="Room details">
        <Container>
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            {/* Left Column: Heading, Meta, About, and 3 Feature Groups */}
            <div className="flex-1 w-full flex flex-col items-start">
              {/* Heading */}
              <h1
                ref={titleRef}
                className="font-cormorant font-light text-[clamp(2.5rem,5.5vw,5rem)] text-[#131313] tracking-[-0.02em] leading-[1.05]"
              >
                {currentRoom.titlePrefix}{" "}
                <span className="italic">{currentRoom.titleItalic}</span>
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-5 pt-3 text-[#5E6062] font-outfit text-sm sm:text-base">
                <span>{currentRoom.size}</span>
                <span className="size-1 rounded-full bg-[#C6C2BA]" aria-hidden="true" />
                <span>{currentRoom.view}</span>
                <span className="size-1 rounded-full bg-[#C6C2BA]" aria-hidden="true" />
                <span>{currentRoom.bedConfig}</span>
              </div>

              {/* About this room */}
              <div className="w-full border-t border-[rgba(19,19,19,0.12)] pt-8 mt-8 sm:mt-10 flex flex-col gap-3">
                <span className="font-outfit text-sm font-medium text-[#8C877E]">
                  About this room
                </span>
                <p className="font-outfit text-lg sm:text-[18px] text-[#3D4046] font-normal leading-[1.65] max-w-2xl">
                  {currentRoom.description}
                </p>
              </div>

              {/* Features (3 Exact Groups from Figma) */}
              <div className="w-full border-t border-[rgba(19,19,19,0.12)] pt-8 mt-8 sm:mt-10 flex flex-col gap-10">
                {/* 1. Beds and bedding */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Bed className="size-6 text-[#00549C] shrink-0" strokeWidth={1.5} />
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Beds and bedding
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                    {currentRoom.bedsAndBedding.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="size-4 text-[#00549C] shrink-0" strokeWidth={2.5} />
                        <span className="font-outfit text-base text-[#131313]">{item}</span>
                      </div>
                    ))}
                  </div>

                  {currentRoom.bedsAndBedding.note && (
                    <p className="font-outfit text-sm text-[#8C877E] pt-1">
                      {currentRoom.bedsAndBedding.note}
                    </p>
                  )}
                </div>

                {/* 2. Room features */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Smartphone className="size-6 text-[#00549C] shrink-0" strokeWidth={1.5} />
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Room features
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                    {currentRoom.roomFeatures.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="size-4 text-[#00549C] shrink-0" strokeWidth={2.5} />
                        <span className="font-outfit text-base text-[#131313]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Bath and bathroom features */}
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <Bath className="size-6 text-[#00549C] shrink-0" strokeWidth={1.5} />
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Bath and bathroom features
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                    {currentRoom.bathFeatures.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <Check className="size-4 text-[#00549C] shrink-0" strokeWidth={2.5} />
                        <span className="font-outfit text-base text-[#131313]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Room summary (sticky) matching Figma */}
            <div className="w-full lg:w-[380px] shrink-0 bg-[#F2F0EC] rounded-md p-7 sm:p-8 flex flex-col gap-6 lg:sticky lg:top-28 self-start">
              <h2 className="font-cormorant text-[32px] sm:text-[34px] text-[#131313] font-normal leading-tight">
                {currentRoom.title}
              </h2>

              <div className="flex flex-col w-full">
                {/* Size */}
                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Size</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                    {currentRoom.size}
                  </span>
                </div>

                {/* View */}
                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">View</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                    {currentRoom.view}
                  </span>
                </div>

                {/* Beds */}
                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Beds</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                    {currentRoom.bedConfig}
                  </span>
                </div>

                {/* Resort */}
                <div className="flex justify-between items-center py-3 border-b border-[rgba(19,19,19,0.12)]">
                  <span className="font-outfit text-sm text-[#8C877E]">Resort</span>
                  <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                    {THE_EDITION_RESORT_DATA.resortName}
                  </span>
                </div>
              </div>

              <Link
                href={allRoomsHref}
                className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 block pt-1"
              >
                Back to all rooms
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Other rooms at this resort matching Figma */}
      {otherRooms.length > 0 && (
        <section className="w-full pb-20 md:pb-28" aria-label="Other rooms">
          <Container>
            <div className="flex flex-col gap-8">
              {/* Section Header */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2.5">
                  <span className="size-[5px] rounded-full bg-[#BD9343]" aria-hidden="true" />
                  <span className="font-outfit text-sm font-medium text-[#BD9343]">
                    Rooms & Suites
                  </span>
                </div>

                <h2 className="font-cormorant font-light text-4xl sm:text-5xl lg:text-[64px] text-[#131313] tracking-[-0.015em] leading-[1.05]">
                  Other rooms <span className="italic">at this resort</span>
                </h2>
              </div>

              {/* Room Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherRooms.map((room) => {
                  const roomHref = `/passover-collection-2027/${programId}/resorts/edition/rooms/${room.id}`;

                  return (
                    <div
                      key={room.id}
                      className="group flex flex-col justify-start items-start gap-4 w-full"
                    >
                      <Link
                        href={roomHref}
                        className="relative w-full h-[240px] sm:h-[260px] rounded-md overflow-hidden bg-[#E4E0D8] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                      >
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      <div className="flex flex-col items-start gap-1 w-full">
                        <Link href={roomHref}>
                          <h3 className="font-cormorant text-2xl text-[#131313] font-normal group-hover:text-[#00549c] transition-colors duration-200">
                            {room.title}
                          </h3>
                        </Link>
                        <p className="font-outfit text-sm text-[#5E6062]">
                          {room.bedConfig} · {room.view}
                        </p>
                        <Link
                          href={roomHref}
                          className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 pt-1"
                        >
                          View room
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

      {/* Inquiry Banner matching Figma */}
      <section className="w-full pb-20 md:pb-28" aria-label="Inquiry banner">
        <Container>
          <div className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] rounded-lg overflow-hidden flex flex-col justify-center items-center gap-6 px-6 sm:px-12 text-center bg-slate-900 shadow-lg">
            <Image
              src={THE_EDITION_RESORT_DATA.heroImage}
              alt="Stay with us"
              fill
              sizes="100vw"
              className="object-cover object-center brightness-[0.45]"
            />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
              <h2 className="font-cormorant font-light text-3xl sm:text-5xl lg:text-[68px] text-white tracking-[-0.015em] leading-[1.08]">
                Ask about this room for <span className="italic">Passover 2027</span>
              </h2>

              <Link
                href={inquireHref}
                className="inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 rounded bg-[#00549C] text-white font-outfit text-[15px] font-medium hover:bg-[#00427c] transition-all duration-300 shadow-md group"
              >
                <span>Inquire</span>
                <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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

      {/* Lightbox Modal */}
      <EditionPhotoModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        photos={galleryList}
        initialIndex={activePhotoIdx}
      />
    </main>
  );
};

export default EditionRoomDetailView;
