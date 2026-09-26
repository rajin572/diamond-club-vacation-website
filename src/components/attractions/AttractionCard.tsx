"use client";

import React from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import type { AttractionItem } from "./attractions.types";

interface AttractionCardProps {
  attraction: AttractionItem;
  onSelect: (attraction: AttractionItem) => void;
}

export const AttractionCard: React.FC<AttractionCardProps> = ({
  attraction,
  onSelect,
}) => {
  return (
    <article className="w-full flex flex-col justify-start items-start gap-4">
      {/* Image Container with subtle hover zoom */}
      <div
        onClick={() => onSelect(attraction)}
        className="w-full h-80 sm:h-96 bg-stone-200 rounded-md relative overflow-hidden group cursor-pointer flex items-center justify-center shadow-sm"
      >
        {attraction.image ? (
          <>
            <Image
              src={attraction.image}
              alt={attraction.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-neutral-500">
            <ImageIcon className="size-6 stroke-[1.5]" />
            <span className="text-xs font-outfit">
              {attraction.imagePlaceholderText || "Attraction photo"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-start gap-2.5">
        {/* Tag Pill */}
        <div className="px-3 py-[5px] bg-violet-100 rounded-full inline-flex">
          <span className="font-outfit text-sky-700 text-xs font-medium leading-4">
            {attraction.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(attraction)}
          className="font-cormorant text-neutral-900 text-3xl sm:text-4xl font-normal leading-tight hover:text-[#00549c] transition-colors cursor-pointer"
        >
          {attraction.title}
        </h3>

        {/* Description */}
        <p className="font-outfit text-zinc-600 text-base leading-relaxed">
          {attraction.description}
        </p>

        {/* See Details Link */}
        <button
          type="button"
          onClick={() => onSelect(attraction)}
          className="cursor-pointer font-outfit text-neutral-900 text-base font-medium underline underline-offset-4 hover:text-[#00549c] transition-colors pt-1"
        >
          See details
        </button>
      </div>
    </article>
  );
};

export default AttractionCard;
