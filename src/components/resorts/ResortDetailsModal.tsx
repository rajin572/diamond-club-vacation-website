"use client";

import React, { useEffect, useRef } from "react";
import { X, Check, Map as MapIcon } from "lucide-react";
import type { ResortDetailsData } from "./resorts.types";
import { gsap } from "@/lib/gsap-util";

interface ResortDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  details?: ResortDetailsData;
}

export const ResortDetailsModal: React.FC<ResortDetailsModalProps> = ({
  isOpen,
  onClose,
  title = "Resort details",
  details,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, y: 20, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !details) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resort-details-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-[#FCFCFB] rounded-xl shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden flex flex-col gap-8 max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            id="resort-details-title"
            className="font-cormorant font-normal text-3xl sm:text-4xl lg:text-5xl text-[#131313]"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="size-10 sm:size-11 rounded-full border border-[rgba(19,19,19,0.15)] flex items-center justify-center text-[#131313] hover:bg-black/5 hover:border-[#131313] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00549c]"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Check-in / Check-out Card */}
        <div className="bg-[#F6F4EE] rounded-lg p-6 sm:p-8 grid grid-cols-2 gap-6 border border-[#ECE8DC]">
          <div className="flex flex-col gap-1">
            <span className="font-outfit text-sm text-[#73716D]">Check-in</span>
            <span className="font-cormorant text-2xl sm:text-4xl text-[#131313] font-normal">
              {details.checkIn}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-outfit text-sm text-[#73716D]">Check-out</span>
            <span className="font-cormorant text-2xl sm:text-4xl text-[#131313] font-normal">
              {details.checkOut}
            </span>
          </div>
        </div>

        {/* Facilities */}
        <div className="flex flex-col gap-4">
          <h3 className="font-outfit text-sm text-[#73716D]">Facilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8">
            {details.facilities.map((fac, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Check className="size-4 text-[#00549C] stroke-[2.2] shrink-0" />
                <span className="font-outfit text-base text-[#131313] font-normal">{fac}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="w-full h-44 sm:h-52 bg-[#EAE6DD] rounded-lg flex flex-col items-center justify-center gap-3 text-[#73716D] p-6 text-center">
          <MapIcon className="size-7 stroke-[1.6]" />
          <span className="font-outfit text-sm sm:text-base font-normal">
            {details.mapNote || `Map — ${details.address}`}
          </span>
        </div>

        {/* Address */}
        <p className="font-outfit text-sm sm:text-base text-[#131313] font-medium leading-relaxed">
          {details.address}
        </p>

        {/* About blurb */}
        <p className="font-outfit text-base sm:text-lg text-[#5E6062] leading-relaxed">
          {details.description}
        </p>
      </div>
    </div>
  );
};

export default ResortDetailsModal;
