"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Image as ImageIcon } from "lucide-react";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import type { AttractionItem } from "./attractions.types";

interface AttractionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  attractions: AttractionItem[];
  initialAttractionId?: string;
}

export const AttractionDetailModal: React.FC<AttractionDetailModalProps> = ({
  isOpen,
  onClose,
  attractions,
  initialAttractionId,
}) => {
  const [prevInitialId, setPrevInitialId] = useState(initialAttractionId);
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialAttractionId) {
      const idx = attractions.findIndex((a) => a.id === initialAttractionId);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  // Adjust state during render if initialAttractionId changed from parent
  if (initialAttractionId !== prevInitialId) {
    setPrevInitialId(initialAttractionId);
    if (initialAttractionId) {
      const idx = attractions.findIndex((a) => a.id === initialAttractionId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }

  if (!attractions || attractions.length === 0) return null;

  const currentAttraction = attractions[currentIndex] || attractions[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : attractions.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < attractions.length - 1 ? prev + 1 : 0));
  };

  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    attractions.length
  ).padStart(2, "0")}`;

  const handleOpenMap = () => {
    const url =
      currentAttraction.mapUrl ||
      `https://maps.google.com/?q=${encodeURIComponent(
        currentAttraction.mapQuery || currentAttraction.title
      )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      maxWidth="max-w-[94vw] sm:max-w-[94vw] lg:max-w-[1040px]"
      showXCloseButton={false}
      contentClassName="p-0 overflow-hidden"
    >
      <div className="w-full flex flex-col lg:flex-row min-h-[540px] lg:h-[580px] overflow-y-auto lg:overflow-hidden">
        {/* Left Column: Attraction Photo */}
        <div className="w-full lg:w-[540px] h-64 sm:h-80 lg:h-full bg-stone-200 relative flex items-center justify-center overflow-hidden shrink-0">
          {currentAttraction.image ? (
            <Image
              src={currentAttraction.image}
              alt={currentAttraction.title}
              fill
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-neutral-500">
              <ImageIcon className="size-6 text-neutral-500 stroke-[1.5]" />
              <span className="text-xs font-outfit">
                {currentAttraction.imagePlaceholderText || "Attraction Photo"}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Info & Navigation */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-neutral-900/10">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-neutral-500 text-sm font-medium font-outfit">
                Attractions
              </span>
              <span className="text-neutral-400 text-xs font-normal font-outfit">
                {formattedCounter}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="size-9 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
            >
              <X className="size-4 text-neutral-900" />
            </button>
          </div>

          {/* Middle Content */}
          <div className="flex-1 flex flex-col items-start justify-center gap-4 py-6">
            {/* Tag Pill */}
            <div className="px-3 py-1 bg-violet-100 rounded-full inline-flex">
              <span className="text-sky-700 text-xs font-medium font-outfit">
                {currentAttraction.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {currentAttraction.title}
            </h2>

            {/* Description */}
            <p className="text-zinc-700 font-outfit text-sm sm:text-base font-normal leading-relaxed">
              {currentAttraction.description}
            </p>

            {/* See on Map Button */}
            <button
              type="button"
              onClick={handleOpenMap}
              className="mt-2 pl-4 pr-5 py-2.5 rounded-sm border border-neutral-900 inline-flex items-center gap-2.5 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer group"
            >
              <MapPin className="size-4 text-neutral-900 group-hover:text-white transition-colors stroke-[1.7]" />
              <span className="text-neutral-900 group-hover:text-white font-outfit text-base font-medium leading-5 transition-colors">
                See on map
              </span>
            </button>
          </div>

          {/* Bottom Bar Controls */}
          <div className="w-full flex items-center justify-between pt-4 border-t border-neutral-900/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {attractions.map((att, i) => (
                <button
                  key={att.id}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === currentIndex
                      ? "size-2.5 bg-neutral-900"
                      : "size-1.5 bg-neutral-900/20 hover:bg-neutral-900/40"
                    }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous attraction"
                className="size-10 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4 text-neutral-900" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next attraction"
                className="size-10 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
              >
                <ChevronRight className="size-4 text-neutral-900" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReuseModal>
  );
};

export default AttractionDetailModal;
