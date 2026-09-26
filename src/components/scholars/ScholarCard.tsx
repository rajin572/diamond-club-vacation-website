"use client";

import React from "react";
import Image from "next/image";
import { Scholar } from "./scholars.types";

interface ScholarCardProps {
  scholar: Scholar;
  index: number;
  onReadBio: (index: number) => void;
}

export const ScholarCard: React.FC<ScholarCardProps> = ({
  scholar,
  index,
  onReadBio,
}) => {
  return (
    <div className="scholar-card flex-1 p-8 sm:p-10 rounded-lg border border-stone-300/80 bg-white flex flex-col items-center gap-5 text-center transition-all duration-300 hover:shadow-md hover:border-stone-400">
      {/* Circular Portrait */}
      <div className="size-40 sm:size-44 rounded-full ring-4 ring-stone-300 relative overflow-hidden bg-stone-100 flex-shrink-0 shadow-inner">
        <Image
          src={scholar.image}
          alt={scholar.imageAlt}
          fill
          sizes="(max-width: 640px) 160px, 176px"
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="w-full pt-1 flex flex-col items-center gap-2.5">
        <span className="text-stone-500 text-xs font-medium font-outfit uppercase tracking-wider">
          {scholar.role}
        </span>

        <h3 className="font-cormorant font-normal text-neutral-900 text-3xl sm:text-4xl leading-tight">
          {scholar.name}
        </h3>

        <p className="text-zinc-600 text-sm sm:text-base font-normal font-outfit leading-relaxed line-clamp-3 max-w-md">
          {scholar.shortBio}
        </p>

        <button
          type="button"
          onClick={() => onReadBio(index)}
          className="mt-2 text-neutral-900 text-base font-medium font-outfit underline underline-offset-4 decoration-neutral-900/60 hover:decoration-neutral-900 transition-colors py-1 cursor-pointer focus:outline-none"
        >
          Read full bio
        </button>
      </div>
    </div>
  );
};

export default ScholarCard;
