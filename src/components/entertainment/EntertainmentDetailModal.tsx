"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import type { EntertainmentEvent } from "./entertainment.types";

interface EntertainmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EntertainmentEvent[];
  initialEventId?: string;
}

export const EntertainmentDetailModal: React.FC<EntertainmentDetailModalProps> = ({
  isOpen,
  onClose,
  events,
  initialEventId,
}) => {
  const [prevInitialId, setPrevInitialId] = useState(initialEventId);
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (initialEventId) {
      const idx = events.findIndex((e) => e.id === initialEventId);
      if (idx !== -1) return idx;
    }
    return 0;
  });

  if (initialEventId !== prevInitialId) {
    setPrevInitialId(initialEventId);
    if (initialEventId) {
      const idx = events.findIndex((e) => e.id === initialEventId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }

  if (!events || events.length === 0) return null;

  const currentEvent = events[currentIndex] || events[0];
  const { modal } = currentEvent;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < events.length - 1 ? prev + 1 : 0));
  };

  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(
    events.length
  ).padStart(2, "0")}`;

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      maxWidth="max-w-[94vw] sm:max-w-[94vw] lg:max-w-[1040px]"
      showXCloseButton={false}
      contentClassName="p-0 overflow-hidden"
    >
      <div className="w-full flex flex-col lg:flex-row min-h-[560px] lg:h-[600px] overflow-y-auto lg:overflow-hidden">
        {/* Left Column: Photos Gallery */}
        <div className="w-full lg:w-[540px] flex flex-col gap-1 bg-stone-200 shrink-0">
          {/* Main Photo */}
          <div className="w-full h-64 sm:h-80 lg:flex-1 bg-stone-200 relative flex items-center justify-center overflow-hidden">
            {currentEvent.image ? (
              <Image
                src={currentEvent.image}
                alt={currentEvent.title}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-neutral-500">
                <ImageIcon className="size-6 text-neutral-500 stroke-[1.5]" />
                <span className="text-xs font-outfit">
                  {modal.mainPhotoPlaceholder || "Main Photo"}
                </span>
              </div>
            )}
          </div>

          {/* 3 Thumbnails */}
          <div className="w-full h-24 sm:h-28 flex items-center gap-1">
            {modal.thumbnails.map((thumb) => (
              <div
                key={thumb.id}
                className="flex-1 h-full bg-stone-300 relative flex flex-col items-center justify-center gap-1 p-2 text-center"
              >
                <ImageIcon className="size-4 text-neutral-600 stroke-[1.5]" />
                <span className="text-[10px] sm:text-xs font-outfit text-neutral-600 truncate max-w-full">
                  {thumb.placeholderText}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info & Details */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-neutral-900/10">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-neutral-500 text-sm font-medium font-outfit">
                Entertainment
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
            {/* Tag */}
            <div className="px-3 py-1 bg-violet-100 rounded-full inline-flex">
              <span className="text-sky-700 text-xs font-medium font-outfit">
                {modal.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {modal.title}
            </h2>

            {/* Long Description */}
            <p className="text-zinc-700 font-outfit text-sm sm:text-base font-normal leading-relaxed">
              {modal.longDescription}
            </p>

            {/* Metadata rows */}
            <div className="w-full pt-2 flex flex-col">
              <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                <span className="w-16 text-neutral-500 text-sm font-outfit">
                  When
                </span>
                <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">
                  {modal.when}
                </span>
              </div>
              <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                <span className="w-16 text-neutral-500 text-sm font-outfit">
                  Where
                </span>
                <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">
                  {modal.where}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar Controls */}
          <div className="w-full flex items-center justify-between pt-4 border-t border-neutral-900/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {events.map((ev, i) => (
                <button
                  key={ev.id}
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
                aria-label="Previous entertainment"
                className="size-10 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-4 text-neutral-900" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next entertainment"
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

export default EntertainmentDetailModal;
