"use client";

import React, { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReuseModal } from "@/components/ui/CustomUi/ReuseModal";

interface PhotoItem {
  id?: string;
  title?: string;
  image: StaticImageData | string;
}

interface StRegisPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  initialIndex?: number;
  title?: string;
}

export const StRegisPhotoModal: React.FC<StRegisPhotoModalProps> = ({
  isOpen,
  onClose,
  photos,
  initialIndex = 0,
  title = "Photo Gallery",
}) => {
  // Use state with initialIndex
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  if (!photos || photos.length === 0) return null;

  // Safe index within bounds
  const activeIndex = Math.min(Math.max(0, currentIndex), photos.length - 1);
  const currentPhoto = photos[activeIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title={title}
      description={`Photo ${activeIndex + 1} of ${photos.length}`}
      maxWidth="sm:max-w-4xl md:max-w-5xl"
      contentClassName="bg-[#050F1F] text-white border-white/10 p-4 sm:p-6"
    >
      <div className="relative w-full flex flex-col items-center justify-center gap-4 py-2">
        {/* Main Image Display */}
        <div className="relative w-full h-[320px] sm:h-[440px] md:h-[540px] rounded-lg overflow-hidden bg-black/60 flex items-center justify-center">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.title || `Photo ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain object-center"
            priority
          />

          {/* Navigation Controls */}
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 size-10 sm:size-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>

        {/* Footer Meta & Thumbnail Carousel Bar */}
        <div className="w-full flex items-center justify-between text-sm text-white/70 px-1 pt-1">
          <p className="font-outfit font-medium text-white">
            {currentPhoto.title || `Photo ${activeIndex + 1}`}
          </p>
          <span className="font-outfit font-light text-xs sm:text-sm">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {photos.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden shrink-0 transition-opacity ${idx === activeIndex
                    ? "ring-2 ring-[#BD9343] opacity-100"
                    : "opacity-40 hover:opacity-80"
                  }`}
              >
                <Image
                  src={item.image}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </ReuseModal>
  );
};

export default StRegisPhotoModal;
