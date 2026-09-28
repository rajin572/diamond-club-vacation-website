"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/CustomUi/Container";
import type { ResortGalleryPhoto } from "./resorts.types";
import ResortPhotoModal from "./ResortPhotoModal";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ResortGallerySectionProps {
  resortName: string;
  gallery: ResortGalleryPhoto[];
}

const GALLERY_CATEGORIES = [
  { id: "all", label: "Overview" },
  { id: "resort", label: "Resort view" },
  { id: "rooms", label: "Rooms & Suites" },
  { id: "pools", label: "Pools & Beach" },
  { id: "dining", label: "Dining" },
  { id: "spa", label: "Spa" },
  { id: "events", label: "Events" },
];

export const ResortGallerySection: React.FC<ResortGallerySectionProps> = ({ resortName, gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);

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

      if (chipsRef.current) {
        tl.fromTo(chipsRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2);
      }

      if (mosaicRef.current) {
        tl.fromTo(mosaicRef.current, { autoAlpha: 0, y: 35 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0.3);
      }
    },
    { scope: sectionRef }
  );

  const filteredPhotos =
    selectedCategory === "all"
      ? gallery
      : gallery.filter((p) => p.category === selectedCategory || p.category === "all");

  const openPhotoModal = (idx: number) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  const primaryPhoto = filteredPhotos[0] || gallery[0];
  const sidePhotos = filteredPhotos.slice(1, 5);

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        className="w-full py-16 sm:py-24 md:py-28 scroll-mt-28"
        aria-label="Resort Gallery"
      >
        <Container>
          <div className="flex flex-col gap-10 sm:gap-12">
            <div className="flex flex-col items-start gap-4">
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">Gallery</span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                The resort, <span className="font-normal italic">in pictures</span>
              </h2>
            </div>

            <div ref={chipsRef} className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
              {GALLERY_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-outfit text-sm transition-all duration-200 shrink-0 cursor-pointer ${isSelected
                      ? "bg-[#00549C] text-white font-medium shadow-sm"
                      : "bg-transparent text-[#131313] border border-[rgba(19,19,19,0.18)] hover:border-[#131313]"
                      }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div ref={mosaicRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
              <div
                onClick={() => openPhotoModal(0)}
                className="lg:col-span-7 relative h-[360px] sm:h-[460px] lg:h-[520px] rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm"
              >
                <Image
                  src={primaryPhoto.image}
                  alt={primaryPhoto.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[360px] sm:h-[460px] lg:h-[520px]">
                {sidePhotos.map((photo, index) => {
                  const isLast = index === sidePhotos.length - 1;

                  return (
                    <div
                      key={photo.id}
                      onClick={() => openPhotoModal(index + 1)}
                      className="relative rounded-md overflow-hidden bg-[#E4E0D8] cursor-pointer group shadow-sm h-full"
                    >
                      <Image
                        src={photo.image}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 100vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {isLast ? (
                        <div className="absolute inset-0 bg-[#050F1F]/70 backdrop-blur-[2px] flex items-center justify-center p-4 transition-colors duration-300 group-hover:bg-[#050F1F]/80">
                          <span className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-white text-center font-normal">
                            + {gallery.length} photos
                          </span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ResortPhotoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        photos={gallery}
        initialIndex={modalIndex}
        title={resortName}
      />
    </>
  );
};

export default ResortGallerySection;
