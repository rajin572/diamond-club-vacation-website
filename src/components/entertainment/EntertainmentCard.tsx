"use client";

import React from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import type { EntertainmentEvent } from "./entertainment.types";

interface EntertainmentCardProps {
  event: EntertainmentEvent;
  onOpenModal: (event: EntertainmentEvent) => void;
}

export const EntertainmentCard: React.FC<EntertainmentCardProps> = ({
  event,
  onOpenModal,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col justify-start items-start gap-4">
      {/* Image container */}
      <div
        onClick={() => onOpenModal(event)}
        className="w-full h-72 sm:h-80 bg-stone-200 rounded-md flex flex-col justify-center items-center gap-2 overflow-hidden relative group cursor-pointer"
      >
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-neutral-500">
            <ImageIcon className="size-6 text-neutral-500 stroke-[1.5]" />
            <span className="text-xs font-outfit text-neutral-500">
              {event.imagePlaceholderText || `${event.title} photo`}
            </span>
          </div>
        )}
      </div>

      {/* Pill Badge */}
      <div
        className={`px-3 py-[5px] rounded-full inline-flex items-center ${event.isTba
            ? "bg-stone-100 text-neutral-500"
            : "bg-violet-100 text-sky-700"
          }`}
      >
        <span className="font-outfit text-xs font-medium leading-4">
          {event.tag}
        </span>
      </div>

      {/* Text Info */}
      <div className="w-full flex flex-col items-start gap-2">
        <h3 className="font-cormorant text-neutral-900 text-2xl sm:text-3xl font-normal leading-tight">
          {event.title}
        </h3>
        <p
          className={`font-outfit text-base leading-6 line-clamp-2 ${event.isTba ? "text-stone-400" : "text-zinc-600"
            }`}
        >
          {event.description}
        </p>

        {/* See Details link */}
        <button
          type="button"
          onClick={() => onOpenModal(event)}
          className="cursor-pointer font-outfit text-neutral-900 text-base font-medium underline underline-offset-4 hover:text-[#00549c] transition-colors pt-1"
        >
          See details
        </button>
      </div>
    </div>
  );
};

export default EntertainmentCard;
