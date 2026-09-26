"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/CustomUi/Container";
import type { StRegisGalleryPhoto } from "./stRegis.types";
import { StRegisPhotoModal } from "./StRegisPhotoModal";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface StRegisGallerySectionProps {
  gallery: StRegisGalleryPhoto[];
}

const GALLERY_FILTERS = [
  { id: "all", label: "Overview" },
  { id: "resort", label: "Resort view" },
  { id: "rooms", label: "Rooms & Suites" },
  { id: "pools", label: "Pools & Beach" },
  { id: "dining", label: "Dining" },
  { id: "spa", label: "Spa" },
  { id: "events", label: "Events" },
];

export const StRegisGallerySection: React.FC<StRegisGallerySectionProps> = ({
  gallery,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [initialIndex, setInitialIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);

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

      if (chipsRef.current) {
        tl.fromTo(
          chipsRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          0.25
        );
      }

      if (mosaicRef.current) {
        tl.fromTo(
          mosaicRef.current,
          { autoAlpha: 0, scale: 0.98, y: 30 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
          0.35
        );
      }
    },
    { scope: sectionRef }
  );

  const filteredPhotos =
    selectedFilter === "all"
      ? gallery
      : gallery.filter((p) => p.category === selectedFilter || p.category === "all");

  const openLightbox = (index: number) => {
    setInitialIndex(index);
    setModalOpen(true);
  };

  const primaryPhoto = filteredPhotos[0] || gallery[0];
  const sidePhotos = filteredPhotos.slice(1, 5);

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="w-full py-16 sm:py-24 md:py-32 scroll-mt-28"
        aria-label="Resort Gallery"
      >
        <Container>
          <div className="flex flex-col gap-10 sm:gap-12">
            {/* Header */}
            <div className="flex flex-col items-start gap-4">
              <div
                ref={badgeRef}
                className="inline-flex items-center gap-2.5 select-none"
              >
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">
                  Gallery
                </span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                The resort, <span className="font-normal italic">in pictures</span>
              </h2>
            </div>

            {/* Category Filter Chips */}
            <div
              ref={chipsRef}
              className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1"
            >
              {GALLERY_FILTERS.map((chip) => {
                const isActive = selectedFilter === chip.id;

                return (
                  <button
                    key={chip.id}
                    onClick={() => setSelectedFilter(chip.id)}
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

            {/* Mosaic Gallery Layout matching Figma */}
            <div
              ref={mosaicRef}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full"
            >
              {/* Left Large Photo */}
              {primaryPhoto && (
                <div
                  onClick={() => openLightbox(0)}
                  className="lg:col-span-6 relative h-[360px] sm:h-[460px] lg:h-[530px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
                >
                  <Image
                    src={primaryPhoto.image}
                    alt={primaryPhoto.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                </div>
              )}

              {/* Right 2x2 Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {sidePhotos.map((photo, index) => {
                  const isLastItem = index === 3 || index === sidePhotos.length - 1;

                  return (
                    <div
                      key={photo.id || index}
                      onClick={() => openLightbox(index + 1)}
                      className="relative h-[170px] sm:h-[220px] lg:h-[257px] rounded-[6px] overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
                    >
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* +32 Photos Overlay on last card */}
                      {isLastItem ? (
                        <div className="absolute inset-0 bg-[#07284A]/75 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-4 transition-all duration-300 group-hover:bg-[#07284A]/85">
                          <span className="font-cormorant text-2xl sm:text-3xl lg:text-[34px] text-white font-normal leading-tight">
                            + 32 photos
                          </span>
                          <span className="font-outfit text-xs sm:text-sm text-white/80 mt-1 font-light">
                            View full gallery
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <StRegisPhotoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        photos={gallery}
        initialIndex={initialIndex}
        title="The St. Regis Kanai Resort Gallery"
      />
    </>
  );
};

export default StRegisGallerySection;
