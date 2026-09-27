"use client";

import React from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import type { ExperienceItem, ExperienceGalleryItem, ExperienceBioItem } from "./experiences.types";
import { isBioItem } from "./experiences.types";

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
  onSelect: (item: ExperienceItem, index: number) => void;
}

const GalleryCard: React.FC<{ item: ExperienceGalleryItem; onClick: () => void }> = ({ item, onClick }) => (
  <article className="w-full flex flex-col justify-start items-start gap-4">
    <div
      onClick={onClick}
      className="w-full h-72 sm:h-80 bg-stone-200 rounded-md relative overflow-hidden group cursor-pointer flex items-center justify-center shadow-sm"
    >
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        </>
      ) : (
        <div className="flex flex-col items-center gap-1.5 text-neutral-500">
          <ImageIcon className="size-6 stroke-[1.5]" />
          <span className="text-xs font-outfit">{item.imagePlaceholderText || `${item.title} photo`}</span>
        </div>
      )}
    </div>

    <div className="w-full flex flex-col items-start gap-2.5">
      <div
        className={`px-3 py-[5px] rounded-full inline-flex items-center ${item.isTba ? "bg-stone-100 text-neutral-500" : "bg-violet-100 text-sky-700"
          }`}
      >
        <span className="font-outfit text-xs font-medium leading-4">{item.tag}</span>
      </div>

      <h3
        onClick={onClick}
        className="font-cormorant text-neutral-900 text-3xl sm:text-4xl font-normal leading-tight hover:text-[#00549c] transition-colors cursor-pointer"
      >
        {item.title}
      </h3>

      <p className={`font-outfit text-base leading-relaxed ${item.isTba ? "text-stone-400" : "text-zinc-600"}`}>
        {item.description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer font-outfit text-neutral-900 text-base font-medium underline underline-offset-4 hover:text-[#00549c] transition-colors pt-1"
      >
        See details
      </button>
    </div>
  </article>
);

const BioCard: React.FC<{ item: ExperienceBioItem; onClick: () => void }> = ({ item, onClick }) => (
  <div className="flex-1 p-8 sm:p-10 rounded-lg border border-stone-300/80 bg-white flex flex-col items-center gap-5 text-center transition-all duration-300 hover:shadow-md hover:border-stone-400">
    <div className="size-40 sm:size-44 rounded-full ring-4 ring-[#9A7B3F] relative overflow-hidden bg-stone-100 flex-shrink-0 shadow-inner">
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 640px) 160px, 176px"
        className="object-cover object-center transition-transform duration-500 hover:scale-105"
      />
    </div>

    <div className="w-full pt-1 flex flex-col items-center gap-2.5">
      <span className="text-[#9A7B3F] text-xs font-medium font-outfit uppercase tracking-wider">{item.role}</span>

      <h3 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl leading-tight">{item.name}</h3>

      <p className="text-zinc-600 text-sm sm:text-base font-normal font-outfit leading-relaxed line-clamp-3 max-w-md">
        {item.shortBio}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-2 text-neutral-900 text-base font-medium font-outfit underline underline-offset-4 decoration-neutral-900/60 hover:decoration-neutral-900 transition-colors py-1 cursor-pointer focus:outline-none"
      >
        Read full bio
      </button>
    </div>
  </div>
);

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ item, index, onSelect }) => {
  const handleClick = () => onSelect(item, index);

  if (isBioItem(item)) {
    return <BioCard item={item} onClick={handleClick} />;
  }

  return <GalleryCard item={item} onClick={handleClick} />;
};

export default ExperienceCard;
