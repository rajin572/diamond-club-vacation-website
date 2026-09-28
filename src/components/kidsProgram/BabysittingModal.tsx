"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import ReuseModal from "@/components/ui/CustomUi/ReuseModal";
import type { BabysittingModalData } from "./kidsProgram.types";
import { inquireHref as buildInquireHref } from "@/lib/routes";

interface BabysittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BabysittingModalData;
  programId: string;
}

export const BabysittingModal: React.FC<BabysittingModalProps> = ({
  isOpen,
  onClose,
  data,
  programId,
}) => {
  const inquireHref = buildInquireHref({ destination: programId, service: "babysitting" });

  return (
    <ReuseModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      maxWidth="max-w-[94vw] sm:max-w-[94vw] lg:max-w-[920px]"
      showXCloseButton={false}
      contentClassName="p-0 overflow-hidden"
    >
      <div className="w-full flex flex-col md:flex-row min-h-[500px] md:h-[540px] overflow-y-auto md:overflow-hidden">
        {/* Left Column: Image */}
        <div className="w-full md:w-96 h-64 md:h-full bg-stone-200 relative flex flex-col items-center justify-center shrink-0 overflow-hidden">
          {data.image ? (
            <Image
              src={data.image}
              alt="Babysitting Service"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-neutral-500">
              <ImageIcon className="size-6 stroke-[1.5]" />
              <span className="text-xs font-outfit">
                {data.imagePlaceholderText || "Babysitting photo"}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-10">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-neutral-900/10">
            <span className="text-neutral-500 text-sm font-medium font-outfit">
              {data.category}
            </span>

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
          <div className="flex-1 flex flex-col items-start justify-center gap-4 py-5">
            {/* Tag */}
            <div className="px-3 py-1 bg-violet-100 rounded-full inline-flex">
              <span className="text-sky-700 text-xs font-medium font-outfit">
                {data.tag}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-cormorant text-neutral-900 text-4xl sm:text-5xl font-light leading-tight">
              {data.title}
            </h2>

            {/* Description */}
            <p className="text-zinc-700 font-outfit text-sm sm:text-base font-normal leading-relaxed">
              {data.description}
            </p>

            {/* Detail Rows */}
            <div className="w-full pt-2 flex flex-col">
              <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                <span className="w-20 text-neutral-500 text-sm font-outfit">
                  When
                </span>
                <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">
                  {data.when}
                </span>
              </div>
              <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                <span className="w-20 text-neutral-500 text-sm font-outfit">
                  Where
                </span>
                <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">
                  {data.where}
                </span>
              </div>
              <div className="w-full py-2.5 border-b border-neutral-900/10 flex items-start gap-6">
                <span className="w-20 text-neutral-500 text-sm font-outfit">
                  Private
                </span>
                <span className="flex-1 text-neutral-900 text-sm sm:text-base font-outfit">
                  {data.privateNote}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-3">
            <Link
              href={inquireHref}
              onClick={onClose}
              className="group inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-base font-medium leading-5 active:scale-98 shadow-md"
            >
              <span>{data.ctaText}</span>
              <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </ReuseModal>
  );
};

export default BabysittingModal;
