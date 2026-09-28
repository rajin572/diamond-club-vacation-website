"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import Container from "@/components/ui/CustomUi/Container";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface GalleryPhotos {
  mainPhoto: StaticImageData | string;
  counselorsPhoto: StaticImageData | string;
  waterParkPhoto: StaticImageData | string;
  artsCraftsPhoto: StaticImageData | string;
  kidsPhoto: StaticImageData | string;
}

interface KidsDayCampGalleryProps {
  gallery: GalleryPhotos;
}

export const KidsDayCampGallery: React.FC<KidsDayCampGalleryProps> = ({ gallery }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const photoList = [
    { src: gallery.mainPhoto, title: "Day camp — main activities" },
    { src: gallery.counselorsPhoto, title: "Our dedicated counselors" },
    { src: gallery.waterParkPhoto, title: "Water park adventures" },
    { src: gallery.artsCraftsPhoto, title: "Arts & crafts workshop" },
    { src: gallery.kidsPhoto, title: "Outdoor games & sports" },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const items = containerRef.current.querySelectorAll(".gallery-tile");
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 30, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "premiumOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % photoList.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + photoList.length) % photoList.length);
  };

  return (
    <section ref={containerRef} className="w-full pt-8 pb-4 bg-[#FCFCFB]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[560px]">
          {/* Main Large Photo (Left Column - 7 cols) */}
          <div
            onClick={() => setSelectedImageIndex(0)}
            className="gallery-tile lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-full rounded-md overflow-hidden bg-stone-200 cursor-pointer group shadow-sm"
          >
            <Image
              src={gallery.mainPhoto}
              alt="Day camp — main photo"
              fill
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-outfit px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
              <Eye className="size-3.5" />
              <span>Day camp — main photo</span>
            </div>
          </div>

          {/* Right 2x2 Grid of 4 Photos (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-[320px] sm:h-[420px] lg:h-full">
            {/* Photo 1: Counselors */}
            <div
              onClick={() => setSelectedImageIndex(1)}
              className="gallery-tile relative rounded-md overflow-hidden bg-stone-200 cursor-pointer group shadow-sm h-full"
            >
              <Image
                src={gallery.counselorsPhoto}
                alt="Counselors photo"
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-outfit px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                Counselors
              </div>
            </div>

            {/* Photo 2: Water park */}
            <div
              onClick={() => setSelectedImageIndex(2)}
              className="gallery-tile relative rounded-md overflow-hidden bg-stone-200 cursor-pointer group shadow-sm h-full"
            >
              <Image
                src={gallery.waterParkPhoto}
                alt="Water park photo"
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-outfit px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                Water park
              </div>
            </div>

            {/* Photo 3: Arts & crafts */}
            <div
              onClick={() => setSelectedImageIndex(3)}
              className="gallery-tile relative rounded-md overflow-hidden bg-stone-200 cursor-pointer group shadow-sm h-full"
            >
              <Image
                src={gallery.artsCraftsPhoto}
                alt="Arts & crafts photo"
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
              <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[11px] font-outfit px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                Arts &amp; crafts
              </div>
            </div>

            {/* Photo 4: Kids photo with "View all photos" button */}
            <div
              onClick={() => setSelectedImageIndex(4)}
              className="gallery-tile relative rounded-md overflow-hidden bg-stone-200 cursor-pointer group shadow-sm h-full"
            >
              <Image
                src={gallery.kidsPhoto}
                alt="Kids photo"
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" />
              {/* Figma Button: View all photos */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(0);
                  }}
                  className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-neutral-50/95 hover:bg-white text-neutral-900 text-xs sm:text-sm font-medium font-outfit rounded-sm shadow-md transition-all duration-200 hover:shadow-lg active:scale-98 flex items-center gap-1.5"
                >
                  <Eye className="size-3.5 text-neutral-700" />
                  <span>View all photos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Lightbox Modal */}
      <ReuseModal
        open={selectedImageIndex !== null}
        onOpenChange={(open) => !open && setSelectedImageIndex(null)}
        maxWidth="max-w-4xl sm:max-w-4xl"
        showXCloseButton={false}
        contentClassName="p-0 bg-black/95 text-white overflow-hidden"
      >
        {selectedImageIndex !== null && (
          <div className="relative flex flex-col h-[75vh]">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 z-10 bg-black/40">
              <div className="text-sm font-outfit text-stone-300">
                {photoList[selectedImageIndex].title} ({selectedImageIndex + 1} / {photoList.length})
              </div>
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Center Image */}
            <div className="relative flex-1 w-full">
              <Image
                src={photoList[selectedImageIndex].src}
                alt={photoList[selectedImageIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Prev / Next controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        )}
      </ReuseModal>
    </section>
  );
};

export default KidsDayCampGallery;
