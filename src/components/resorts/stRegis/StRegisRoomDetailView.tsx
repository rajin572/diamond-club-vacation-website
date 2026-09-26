"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import StRegisBreadcrumb from "./StRegisBreadcrumb";
import StRegisPhotoModal from "./StRegisPhotoModal";
import { ST_REGIS_RESORT_DATA } from "./stRegis.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisRoomDetailViewProps {
  programId?: string;
  roomId?: string;
}

export const StRegisRoomDetailView: React.FC<StRegisRoomDetailViewProps> = ({
  programId = "diamond-club-reserve",
  roomId = "deluxe-room",
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const viewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find room or default to deluxe-room
  const currentRoom =
    ST_REGIS_RESORT_DATA.rooms.find((r) => r.id === roomId) ||
    ST_REGIS_RESORT_DATA.rooms[0];

  const otherRooms = ST_REGIS_RESORT_DATA.rooms.filter(
    (r) => r.id !== currentRoom.id
  );

  const galleryList = (currentRoom.gallery && currentRoom.gallery.length > 0)
    ? currentRoom.gallery.map((img, i) => ({ id: `img-${i}`, title: `${currentRoom.title} photo ${i + 1}`, image: img }))
    : [{ id: "main", title: currentRoom.title, image: currentRoom.image }];

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

  const inquireHref = `/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis&room=${currentRoom.id}`;

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
        detailLabel={currentRoom.title}
      />

      {/* 5-Photo Collage Gallery matching Figma */}
      <section className="w-full pt-6 pb-12 sm:pb-16" aria-label="Room Photos">
        <Container>
          <div
            ref={galleryRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 w-full"
          >
            {/* Main Large Photo */}
            <div
              onClick={() => openPhotoModal(0)}
              className="lg:col-span-7 relative h-[340px] sm:h-[460px] lg:h-[560px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
            >
              <Image
                src={mainPhoto.image}
                alt={currentRoom.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
            </div>

            {/* Side 2x2 Grid */}
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

                    {/* View all photos overlay button */}
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

      {/* Room Details & Sticky Summary Sidebar (2 columns) */}
      <section className="w-full pb-20 sm:pb-28" aria-label="Room Details">
        <Container>
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left Column: Details & Features */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Heading & Meta */}
              <div className="flex flex-col items-start gap-4">
                <h1
                  ref={titleRef}
                  className="font-cormorant font-light text-[#131313] text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-tight"
                >
                  {currentRoom.title.split(" ")[0]}{" "}
                  <span className="font-normal italic">
                    {currentRoom.title.split(" ").slice(1).join(" ") || "Room"}
                  </span>
                </h1>

                {/* Meta Pills */}
                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-outfit text-[#5E6062]">
                  <span>{currentRoom.size}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentRoom.view}</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>{currentRoom.bedConfig}</span>
                </div>
              </div>

              {/* About This Room */}
              <div className="flex flex-col gap-3 pt-6 border-t border-[rgba(19,19,19,0.12)]">
                <h2 className="font-outfit text-sm font-medium text-[#8C877E] uppercase tracking-wider">
                  About this room
                </h2>
                <p className="font-outfit text-base sm:text-lg text-[#3D4046] leading-relaxed">
                  {currentRoom.description}
                </p>
              </div>

              {/* Features Groups */}
              <div className="flex flex-col gap-10 pt-6 border-t border-[rgba(19,19,19,0.12)]">
                {/* Beds and Bedding */}
                {currentRoom.features.bedsAndBedding?.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Beds and bedding
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRoom.features.bedsAndBedding.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="size-4 text-[#00549C] shrink-0 mt-1" />
                          <span className="font-outfit text-sm sm:text-base text-[#131313]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bathroom Features */}
                {currentRoom.features.bathroom?.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-[rgba(19,19,19,0.08)]">
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Bath and bathroom features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRoom.features.bathroom.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="size-4 text-[#00549C] shrink-0 mt-1" />
                          <span className="font-outfit text-sm sm:text-base text-[#131313]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Furniture and Layout */}
                {currentRoom.features.furniture?.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-[rgba(19,19,19,0.08)]">
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Furniture and layout
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRoom.features.furniture.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="size-4 text-[#00549C] shrink-0 mt-1" />
                          <span className="font-outfit text-sm sm:text-base text-[#131313]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hospitality & Butler */}
                {currentRoom.features.hospitality?.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-[rgba(19,19,19,0.08)]">
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Signature Butler & Hospitality
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRoom.features.hospitality.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="size-4 text-[#00549C] shrink-0 mt-1" />
                          <span className="font-outfit text-sm sm:text-base text-[#131313]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Passover & Holiday Amenities */}
                {currentRoom.features.specialFeatures?.length > 0 && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-[rgba(19,19,19,0.08)]">
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-[#131313] font-normal">
                      Passover holiday features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentRoom.features.specialFeatures.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="size-4 text-[#BD9343] shrink-0 mt-1" />
                          <span className="font-outfit text-sm sm:text-base text-[#131313]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Summary Card matching Figma Node 40015065:339 */}
            <div className="lg:col-span-4 sticky top-28 w-full">
              <div className="w-full bg-[#F2F0EC] p-6 sm:p-8 rounded-[6px] flex flex-col gap-6 shadow-sm border border-[rgba(19,19,19,0.06)]">
                <h3 className="font-cormorant text-3xl text-[#131313] font-normal">
                  {currentRoom.title}
                </h3>

                {/* Facts Table */}
                <div className="flex flex-col w-full border-t border-[rgba(19,19,19,0.12)]">
                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Size</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentRoom.size}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">View</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentRoom.view}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Beds</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      {currentRoom.bedConfig.split("·")[0].trim()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Resort</span>
                    <span className="font-outfit text-sm sm:text-[15px] font-medium text-[#131313]">
                      The St. Regis Kanai
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={inquireHref}
                  className="group w-full flex items-center justify-between bg-[#00549C] hover:bg-[#00427a] text-white px-5 py-3 rounded-[4px] font-outfit text-[15px] font-medium transition-all duration-300 shadow-md"
                >
                  <span>Inquire about this room</span>
                  <span className="size-6 rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>

                {/* Back to all rooms */}
                <Link
                  href={`/passover-collection-2027/${programId}/resorts/st-regis#rooms`}
                  className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors text-center"
                >
                  Back to all rooms
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Rooms at this Resort */}
      {otherRooms.length > 0 && (
        <section
          className="w-full py-16 sm:py-20 border-t border-[rgba(19,19,19,0.08)] bg-[#F8F8F7]"
          aria-label="Other Rooms"
        >
          <Container>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-2 select-none">
                  <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                  <span className="font-outfit text-sm font-medium text-[#BD9343]">
                    Rooms & Suites
                  </span>
                </div>
                <h2 className="font-cormorant font-light text-[#131313] text-3xl sm:text-4xl">
                  Other rooms <span className="font-normal italic">at this resort</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherRooms.map((room) => {
                  const roomHref = `/passover-collection-2027/${programId}/resorts/st-regis/rooms/${room.id}`;

                  return (
                    <div
                      key={room.id}
                      className="group flex flex-col justify-start items-start gap-4 w-full"
                    >
                      <Link
                        href={roomHref}
                        className="relative w-full h-[240px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block"
                      >
                        <Image
                          src={room.image}
                          alt={room.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </Link>

                      <div className="flex flex-col items-start gap-2 w-full">
                        <Link href={roomHref}>
                          <h3 className="font-cormorant text-2xl text-[#131313] font-normal group-hover:text-[#00549c] transition-colors">
                            {room.title}
                          </h3>
                        </Link>
                        <p className="font-outfit text-sm text-[#5E6062]">
                          {room.bedConfig}
                        </p>
                        <Link
                          href={roomHref}
                          className="font-outfit text-sm font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors"
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

      {/* Inquiry Banner */}
      <section className="w-full py-16 sm:py-24" aria-label="Inquiry">
        <Container>
          <div className="relative w-full h-[320px] sm:h-[380px] rounded-lg overflow-hidden flex flex-col justify-center items-center gap-6 px-6 text-center bg-slate-900 shadow-md">
            <Image
              src={currentRoom.image}
              alt={currentRoom.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
              <h2 className="font-cormorant font-light text-white text-[clamp(2rem,4.5vw,4rem)] leading-[1.08]">
                Ask about this room for <span className="font-normal italic text-[#f4ecd8]">Passover 2027</span>
              </h2>
              <Link
                href={inquireHref}
                className="group inline-flex items-center gap-3.5 bg-[#00549C] hover:bg-[#00427a] text-white px-6 py-3.5 rounded-[4px] font-outfit text-sm sm:text-base font-medium transition-all duration-300 shadow-md"
              >
                <span>Inquire about this room</span>
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
        title={currentRoom.title}
      />
    </main>
  );
};

export default StRegisRoomDetailView;
