"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Scholar } from "./scholars.types";

interface ScholarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scholars: Scholar[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export const ScholarDetailModal: React.FC<ScholarDetailModalProps> = ({
  isOpen,
  onClose,
  scholars,
  currentIndex,
  onIndexChange,
}) => {
  const currentScholar = scholars[currentIndex] || scholars[0];

  const handleNext = useCallback(() => {
    if (scholars.length <= 1) return;
    onIndexChange((currentIndex + 1) % scholars.length);
  }, [currentIndex, scholars.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (scholars.length <= 1) return;
    onIndexChange((currentIndex - 1 + scholars.length) % scholars.length);
  }, [currentIndex, scholars.length, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev]);

  if (!currentScholar) return null;

  const formattedIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotal = String(scholars.length).padStart(2, "0");

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      maxWidth="w-[95vw] sm:max-w-[95vw] md:max-w-[960px]"
      showXCloseButton={false}
      contentClassName="p-0 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row min-h-[520px] md:h-[560px]">
        {/* Left Column: Portrait */}
        <div className="w-full md:w-80 lg:w-96 bg-stone-100/90 flex flex-col justify-center items-center p-8 sm:p-10 flex-shrink-0 border-b md:border-b-0 md:border-r border-stone-200/60">
          <div className="size-48 sm:size-60 lg:size-64 bg-stone-200 rounded-full ring-4 lg:ring-[5px] ring-stone-300 relative overflow-hidden shadow-md flex-shrink-0">
            <Image
              src={currentScholar.image}
              alt={currentScholar.imageAlt}
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Right Column: Bio Content */}
        <div className="flex-1 p-6 sm:p-8 lg:px-11 lg:pt-7 lg:pb-9 flex flex-col justify-between overflow-y-auto">
          {/* Top Bar: Category, Index, Close Button */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-500 text-xs sm:text-sm font-medium font-outfit uppercase tracking-wider">
                Scholars
              </span>
              <span className="text-neutral-500 text-xs sm:text-sm font-normal font-outfit">
                {formattedIndex} / {formattedTotal}
              </span>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="size-9 sm:size-10 rounded-full border border-neutral-900/20 hover:border-neutral-900/60 hover:bg-neutral-100 flex items-center justify-center transition-colors focus:outline-none"
            >
              <X className="size-4 text-neutral-900" />
            </button>
          </div>

          {/* Main Bio Content */}
          <div className="space-y-3.5 my-auto py-4">
            <span className="text-stone-500 text-xs font-medium font-outfit uppercase tracking-wider block">
              {currentScholar.role}
            </span>

            <h2 className="font-cormorant font-light text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {currentScholar.nameHighlight ? (
                <>
                  <span>{currentScholar.nameHighlight.first}</span>
                  <span>{currentScholar.nameHighlight.last}</span>
                </>
              ) : (
                currentScholar.name
              )}
            </h2>

            <p className="text-zinc-700 text-sm sm:text-base font-normal font-outfit leading-relaxed max-w-xl">
              {currentScholar.fullBio}
            </p>
          </div>

          {/* Bottom Row: Dots Pagination & Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {scholars.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => onIndexChange(dotIdx)}
                  className={`rounded-full transition-all duration-300 ${dotIdx === currentIndex
                    ? "size-2.5 bg-neutral-900"
                    : "size-1.5 bg-neutral-900/25 hover:bg-neutral-900/50"
                    }`}
                  aria-label={`Go to scholar ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous scholar"
                className="size-10 sm:size-11 rounded-full border border-neutral-900/20 hover:border-neutral-900/60 hover:bg-white flex items-center justify-center transition-colors focus:outline-none"
              >
                <ChevronLeft className="size-4 text-neutral-800" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next scholar"
                className="size-10 sm:size-11 rounded-full border border-neutral-900/20 hover:border-neutral-900/60 hover:bg-white flex items-center justify-center transition-colors focus:outline-none"
              >
                <ChevronRight className="size-4 text-neutral-800" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReuseModal>
  );
};

export default ScholarDetailModal;
