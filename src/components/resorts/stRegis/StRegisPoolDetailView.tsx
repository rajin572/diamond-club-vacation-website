"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import StRegisBreadcrumb from "./StRegisBreadcrumb";
import StRegisPhotoModal from "./StRegisPhotoModal";
import { ST_REGIS_RESORT_DATA } from "./stRegis.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisPoolDetailViewProps {
  programId?: string;
  poolId?: string;
}

export const StRegisPoolDetailView: React.FC<StRegisPoolDetailViewProps> = ({
  programId = "diamond-club-reserve",
  poolId = "family-pool",
}) => {
  const [photoModalOpen, setPhotoModalOpen] = useState<boolean>(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  const viewRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentPool =
    ST_REGIS_RESORT_DATA.pools.find((p) => p.id === poolId) ||
    ST_REGIS_RESORT_DATA.pools[0];

  const otherPools = ST_REGIS_RESORT_DATA.pools.filter(
    (p) => p.id !== currentPool.id
  );

  const displayOtherPools =
    otherPools.length >= 3
      ? otherPools.slice(0, 3)
      : ST_REGIS_RESORT_DATA.pools.slice(0, 3);

  const galleryPhotos = [
    { id: "main", title: currentPool.gallery.main.label, image: currentPool.gallery.main.src },
    { id: "side-1", title: currentPool.gallery.side1.label, image: currentPool.gallery.side1.src },
    { id: "side-2", title: currentPool.gallery.side2.label, image: currentPool.gallery.side2.src },
    { id: "side-3", title: currentPool.gallery.side3.label, image: currentPool.gallery.side3.src },
    { id: "side-4", title: currentPool.gallery.side4.label, image: currentPool.gallery.side4.src },
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

  const inquireHref = `/inquire?holiday=passover-2027&destination=diamond-club-reserve&resort=st-regis&topic=${currentPool.id}`;

  return (
    <main
      ref={viewRef}
      className="w-full min-h-screen bg-[#FCFCFB] pt-24 sm:pt-28 md:pt-32 flex flex-col"
    >
      {/* Breadcrumbs matching Figma Node 40015132:379 */}
      <StRegisBreadcrumb
        programId={programId}
        programTitle="Diamond Club Reserve"
        resortName="The St. Regis Kanai Resort"
        currentPage={currentPool.title}
      />

      {/* Pool Gallery Mosaic matching Figma Node 40015132:389 */}
      <section
        ref={galleryRef}
        className="w-full pt-4 pb-8"
        aria-label="Pool Gallery"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main large photo (820x560 in Figma) */}
            <div
              onClick={() => openPhotoModal(0)}
              className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[560px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group"
            >
              <Image
                src={currentPool.gallery.main.src}
                alt={currentPool.gallery.main.label}
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
                  src={currentPool.gallery.side1.src}
                  alt={currentPool.gallery.side1.label}
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
                  src={currentPool.gallery.side2.src}
                  alt={currentPool.gallery.side2.label}
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
                  src={currentPool.gallery.side3.src}
                  alt={currentPool.gallery.side3.label}
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
                  src={currentPool.gallery.side4.src}
                  alt={currentPool.gallery.side4.label}
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
                  View all {currentPool.gallery.totalPhotos} photos
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Pool Content: 2-Column Layout matching Figma Node 40015132:425 */}
      <section className="w-full pt-12 sm:pt-16 pb-20 sm:pb-28">
        <Container>
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          >
            {/* Left Column: Details */}
            <div className="lg:col-span-8 flex flex-col gap-10 sm:gap-12">
              {/* Heading & Meta matching Figma Node 40015132:427 */}
              <div className="flex flex-col gap-3.5">
                <h1
                  ref={titleRef}
                  className="font-cormorant font-light text-[#131313] text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.02em]"
                >
                  {currentPool.titlePrefix || currentPool.title.split(" ")[0]}{" "}
                  <span className="italic font-light">
                    {currentPool.titleItalic || currentPool.title.split(" ").slice(1).join(" ") || "Pool"}
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-sm sm:text-base font-outfit text-[#5E6062]">
                  <span>Outdoor, on property</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>Beach level</span>
                  <span className="size-1 rounded-full bg-[#C6C2BA]" />
                  <span>All ages</span>
                </div>
              </div>

              {/* About matching Figma Node 40015132:435 */}
              <div className="flex flex-col gap-3 pt-8 border-t border-[rgba(19,19,19,0.12)]">
                <h2 className="font-outfit text-sm font-medium text-[#8C877E]">
                  About {currentPool.title}
                </h2>
                <p className="font-outfit text-base sm:text-lg text-[#3D4046] leading-[30px]">
                  {currentPool.description}
                </p>
              </div>

              {/* Info Blocks matching Figma Node 40015132:636 */}
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
                    {currentPool.schedule.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center py-3.5 border-b border-[rgba(19,19,19,0.12)] font-outfit text-base"
                      >
                        <span className="text-[#131313]">{row.days}</span>
                        <span className="text-[#131313] font-medium">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Block / Location */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="size-6 text-[#131313] stroke-[1.5]" />
                    <h3 className="font-cormorant text-[26px] sm:text-[30px] leading-[34px] text-[#131313] font-normal">
                      Location
                    </h3>
                  </div>
                  <p className="font-outfit text-[17px] leading-[26px] text-[#131313]">
                    {currentPool.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Summary Card matching Figma Node 40015132:523 */}
            <div className="lg:col-span-4 sticky top-28 w-full max-w-[380px]">
              <div className="w-full bg-[#F2F0EC] p-8 rounded-[6px] flex flex-col gap-6">
                <h3 className="font-cormorant text-[34px] leading-[38px] text-[#131313] font-normal">
                  {currentPool.title}
                </h3>

                {/* Facts Table */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Type</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentPool.typeLabel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Location</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentPool.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-[rgba(19,19,19,0.12)]">
                    <span className="font-outfit text-sm text-[#8C877E]">Hours</span>
                    <span className="font-outfit text-[15px] font-medium text-[#131313]">
                      {currentPool.hours}
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
                  <span>Ask about cabanas</span>
                  <span className="size-[26px] rounded-[3px] bg-white flex items-center justify-center text-[#00549C] group-hover:translate-x-0.5 transition-transform duration-200">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>

                <Link
                  href={`/passover-collection-2027/${programId}/resorts/st-regis#pools`}
                  className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors"
                >
                  Back to pools & beach
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Pools Section matching Figma Node 40015132:539 */}
      <section
        className="w-full pb-28 sm:pb-32"
        aria-label="Other Pools at this resort"
      >
        <Container>
          <div className="flex flex-col gap-10">
            {/* Heading */}
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">
                  Pools & Beach
                </span>
              </div>
              <h2 className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.05] tracking-tight">
                More pools to enjoy
              </h2>
            </div>

            {/* Pool Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayOtherPools.map((pool) => {
                const poolHref = `/passover-collection-2027/${programId}/resorts/st-regis/pools/${pool.id}`;

                return (
                  <div
                    key={pool.id}
                    className="group flex flex-col justify-start items-start gap-4 w-full"
                  >
                    <Link
                      href={poolHref}
                      className="relative w-full h-[260px] rounded-[6px] overflow-hidden bg-[#E4E0D8] block"
                    >
                      <Image
                        src={pool.image}
                        alt={pool.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </Link>

                    <div className="flex flex-col items-start gap-1.5 w-full">
                      <Link href={poolHref}>
                        <h3 className="font-cormorant text-[30px] leading-[34px] text-[#131313] font-normal group-hover:text-[#00549C] transition-colors">
                          {pool.title}
                        </h3>
                      </Link>

                      <p className="font-outfit text-[15px] leading-6 text-[#5E6062]">
                        {pool.type === "cabanas" ? "Beach" : `${pool.atmosphere.split("·")[0].trim()} · Beach`}
                      </p>

                      <Link
                        href={poolHref}
                        className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors pt-1"
                      >
                        View pool
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Inquiry Banner matching Figma Node 40015132:577 */}
      <section className="w-full pb-28 sm:pb-32">
        <Container>
          <div className="relative w-full h-[340px] sm:h-[380px] rounded-[8px] overflow-hidden flex flex-col items-center justify-center gap-6 px-6 text-center">
            <Image
              src={ST_REGIS_RESORT_DATA.heroImage}
              alt="Passover 2027 Pool Inquiry"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[rgba(8,13,20,0.55)]" />

            <h2 className="relative z-10 font-cormorant font-light text-white text-[clamp(2.25rem,4.75vw,4.25rem)] leading-[1.05] tracking-tight max-w-4xl">
              Relax with us for <span className="font-light italic">Passover 2027</span>
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
        title={currentPool.title}
      />
    </main>
  );
};

export default StRegisPoolDetailView;
