"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Image as ImageIcon } from "lucide-react";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import type { ExperienceItem } from "./experiences.types";
import { isBioItem } from "./experiences.types";

interface ExperienceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ExperienceItem[];
  initialIndex?: number;
  categoryLabel: string;
}

const ModalDots: React.FC<{ items: ExperienceItem[]; currentIndex: number; onSelect: (index: number) => void }> = ({
  items,
  currentIndex,
  onSelect,
}) => (
  <div className="flex items-center gap-2">
    {items.map((it, i) => (
      <button
        key={it.id}
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        className={`rounded-full transition-all duration-300 ${i === currentIndex ? "size-2.5 bg-neutral-900" : "size-1.5 bg-neutral-900/20 hover:bg-neutral-900/40"
          }`}
      />
    ))}
  </div>
);

const ModalNavButtons: React.FC<{ onPrev: () => void; onNext: () => void }> = ({ onPrev, onNext }) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={onPrev}
      aria-label="Previous"
      className="size-10 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
    >
      <ChevronLeft className="size-4 text-neutral-900" />
    </button>
    <button
      type="button"
      onClick={onNext}
      aria-label="Next"
      className="size-10 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
    >
      <ChevronRight className="size-4 text-neutral-900" />
    </button>
  </div>
);

export const ExperienceDetailModal: React.FC<ExperienceDetailModalProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex,
  categoryLabel,
}) => {
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);
  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);

  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    if (initialIndex !== undefined) setCurrentIndex(initialIndex);
  }

  if (!items || items.length === 0) return null;

  const modalItems = isBioItem(items[0]) ? items.filter((it) => !it.isTba) : items;
  const current = modalItems[currentIndex] || modalItems[0] || items[0];

  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : modalItems.length - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev < modalItems.length - 1 ? prev + 1 : 0));

  const formattedCounter = `${String(currentIndex + 1).padStart(2, "0")} / ${String(modalItems.length).padStart(2, "0")}`;

  if (isBioItem(current)) {
    return (
      <ReuseModal
        open={isOpen}
        onOpenChange={(open) => !open && onClose()}
        maxWidth="w-[95vw] sm:max-w-[95vw] md:max-w-[960px]"
        showXCloseButton={false}
        contentClassName="p-0 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row min-h-[520px] md:h-[560px]">
          <div className="w-full md:w-80 lg:w-96 bg-stone-100/90 flex flex-col justify-center items-center p-8 sm:p-10 flex-shrink-0 border-b md:border-b-0 md:border-r border-stone-200/60">
            <div className="size-48 sm:size-60 lg:size-64 bg-stone-200 rounded-full ring-4 lg:ring-[5px] ring-stone-300 relative overflow-hidden shadow-md flex-shrink-0">
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(max-width: 768px) 75vw, 100vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-8 lg:px-11 lg:pt-7 lg:pb-9 flex flex-col justify-between overflow-y-auto">
            <div className="flex items-center justify-between pb-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-neutral-500 text-xs sm:text-sm font-medium font-outfit uppercase tracking-wider">
                  {categoryLabel}
                </span>
                <span className="text-neutral-500 text-xs sm:text-sm font-normal font-outfit">{formattedCounter}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="size-9 sm:size-10 rounded-full border border-neutral-900/20 hover:border-neutral-900/60 hover:bg-neutral-100 flex items-center justify-center transition-colors focus:outline-none"
              >
                <X className="size-4 text-neutral-900" />
              </button>
            </div>

            <div className="space-y-3.5 my-auto py-4">
              <span className="text-stone-500 text-xs font-medium font-outfit uppercase tracking-wider block">
                {current.role}
              </span>

              <h2 className="font-cormorant font-light text-neutral-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {current.nameHighlight ? (
                  <>
                    <span>{current.nameHighlight.first}</span>
                    <span>{current.nameHighlight.last}</span>
                  </>
                ) : (
                  current.name
                )}
              </h2>

              <p className="text-zinc-700 text-sm sm:text-base font-normal font-outfit leading-relaxed max-w-xl">
                {current.fullBio}
              </p>
            </div>

            {modalItems.length > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/60">
                <ModalDots items={modalItems} currentIndex={currentIndex} onSelect={setCurrentIndex} />
                <ModalNavButtons onPrev={handlePrev} onNext={handleNext} />
              </div>
            )}
          </div>
        </div>
      </ReuseModal>
    );
  }

  const hasRichModal = Boolean(current.modal);

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      maxWidth="max-w-[94vw] sm:max-w-[94vw] lg:max-w-[1040px]"
      showXCloseButton={false}
      contentClassName="p-0 overflow-hidden"
    >
      <div className="w-full flex flex-col lg:flex-row min-h-[540px] lg:h-[580px] overflow-y-auto lg:overflow-hidden">
        <div className="w-full lg:w-[540px] flex flex-col gap-1 bg-stone-200 shrink-0">
          <div
            className={`w-full h-64 sm:h-80 ${hasRichModal ? "lg:flex-1" : "lg:h-full"} bg-stone-200 relative flex items-center justify-center overflow-hidden`}
          >
            {current.image ? (
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 100vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex flex-col items-center gap-1.5 text-neutral-500">
                <ImageIcon className="size-6 text-neutral-500 stroke-[1.5]" />
                <span className="text-xs font-outfit">
                  {current.modal?.mainPhotoPlaceholder || current.imagePlaceholderText || "Photo"}
                </span>
              </div>
            )}
          </div>

          {hasRichModal && current.modal!.thumbnails.length > 0 && (
            <div className="w-full h-24 sm:h-28 flex items-center gap-1">
              {current.modal!.thumbnails.map((thumb) => (
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
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div className="w-full flex items-center justify-between pb-4 border-b border-neutral-900/10">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-neutral-500 text-sm font-medium font-outfit">{categoryLabel}</span>
              <span className="text-neutral-400 text-xs font-normal font-outfit">{formattedCounter}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="size-9 rounded-full border border-neutral-900/20 flex items-center justify-center hover:bg-neutral-900/5 transition-colors cursor-pointer"
            >
              <X className="size-4 text-neutral-900" />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-start justify-center gap-4 py-6">
            <div className="px-3 py-1 bg-violet-100 rounded-full inline-flex">
              <span className="text-sky-700 text-xs font-medium font-outfit">{current.modal?.tag ?? current.tag}</span>
            </div>

            <h2 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">
              {current.modal?.title ?? current.title}
            </h2>

            <p className="text-zinc-700 font-outfit text-sm sm:text-base font-normal leading-relaxed">
              {current.modal?.longDescription ?? current.description}
            </p>

            {hasRichModal ? (
              <div className="w-full pt-2 flex flex-col">
                <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                  <span className="w-16 text-neutral-500 text-sm font-outfit">When</span>
                  <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">{current.modal!.when}</span>
                </div>
                <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                  <span className="w-16 text-neutral-500 text-sm font-outfit">Where</span>
                  <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">{current.modal!.where}</span>
                </div>
              </div>
            ) : (
              (current.mapUrl || current.mapQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    const url =
                      current.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(current.mapQuery || current.title)}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }}
                  className="mt-2 pl-4 pr-5 py-2.5 rounded-sm border border-neutral-900 inline-flex items-center gap-2.5 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer group"
                >
                  <MapPin className="size-4 text-neutral-900 group-hover:text-white transition-colors stroke-[1.7]" />
                  <span className="text-neutral-900 group-hover:text-white font-outfit text-base font-medium leading-5 transition-colors">
                    View on Google Maps
                  </span>
                </button>
              )
            )}
          </div>

          {items.length > 1 && (
            <div className="w-full flex items-center justify-between pt-4 border-t border-neutral-900/10">
              <ModalDots items={items} currentIndex={currentIndex} onSelect={setCurrentIndex} />
              <ModalNavButtons onPrev={handlePrev} onNext={handleNext} />
            </div>
          )}
        </div>
      </div>
    </ReuseModal>
  );
};

export default ExperienceDetailModal;
