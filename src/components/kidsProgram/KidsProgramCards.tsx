"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { KidsProgramItem } from "./kidsProgram.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface KidsProgramCardsProps {
  programs: KidsProgramItem[];
  programId?: string;
  onOpenBabysittingModal: () => void;
}

export const KidsProgramCards: React.FC<KidsProgramCardsProps> = ({
  programs,
  programId = "diamond-club-reserve",
  onOpenBabysittingModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !cardsRef.current) return;

      gsap.fromTo(
        cardsRef.current.children,
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const dayCampHref = `/passover-collection-2027/${encodeURIComponent(
    programId
  )}/experiences/day-camp-teen-program`;

  return (
    <div ref={containerRef} className="w-full pb-20 md:pb-28 bg-[#FCFCFB]">
      <Container>
        <div
          ref={cardsRef}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-start"
        >
          {programs.map((program) => {
            const isBabysitting = program.id === "babysitting";

            return (
              <div
                key={program.id}
                className="w-full flex flex-col justify-start items-start gap-5"
              >
                {/* Images Container */}
                {program.images.secondary1 ? (
                  /* Day Camp 3-image collage */
                  <Link
                    href={dayCampHref}
                    className="w-full flex items-start gap-2 h-80 sm:h-96 rounded-md overflow-hidden group cursor-pointer"
                  >
                    {/* Left big image */}
                    <div className="flex-1 h-full bg-stone-200 relative overflow-hidden">
                      {program.images.main ? (
                        <Image
                          src={program.images.main}
                          alt={program.title}
                          fill
                          sizes="(max-width: 1024px) 70vw, 40vw"
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="size-full flex flex-col items-center justify-center gap-1.5 text-neutral-500">
                          <ImageIcon className="size-6 stroke-[1.5]" />
                          <span className="text-xs font-outfit">
                            {program.images.mainPlaceholder || "Day camp photo"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right 2 stacked images */}
                    <div className="w-36 sm:w-48 h-full flex flex-col gap-2">
                      <div className="flex-1 bg-stone-200 relative overflow-hidden">
                        {program.images.secondary1 ? (
                          <Image
                            src={program.images.secondary1}
                            alt="Water park"
                            fill
                            sizes="(max-width: 1024px) 30vw, 15vw"
                            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="size-full flex flex-col items-center justify-center gap-1 text-neutral-500">
                            <ImageIcon className="size-5 stroke-[1.5]" />
                            <span className="text-[10px] font-outfit">
                              {program.images.secondary1Placeholder || "Water park"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 bg-stone-200 relative overflow-hidden">
                        {program.images.secondary2 ? (
                          <Image
                            src={program.images.secondary2}
                            alt="Counselors"
                            fill
                            sizes="(max-width: 1024px) 30vw, 15vw"
                            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="size-full flex flex-col items-center justify-center gap-1 text-neutral-500">
                            <ImageIcon className="size-5 stroke-[1.5]" />
                            <span className="text-[10px] font-outfit">
                              {program.images.secondary2Placeholder || "Counselors"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* Babysitting single image */
                  <div
                    onClick={onOpenBabysittingModal}
                    className="w-full h-80 sm:h-96 bg-stone-200 rounded-md relative overflow-hidden group cursor-pointer flex items-center justify-center"
                  >
                    {program.images.main ? (
                      <>
                        <Image
                          src={program.images.main}
                          alt={program.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 text-neutral-500">
                        <ImageIcon className="size-6 stroke-[1.5]" />
                        <span className="text-xs font-outfit">
                          {program.images.mainPlaceholder || "Babysitting photo"}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="w-full flex flex-col items-start gap-2.5">
                  <div className="px-3 py-[5px] bg-violet-100 rounded-full inline-flex">
                    <span className="font-outfit text-sky-700 text-xs font-medium leading-4">
                      {program.tag}
                    </span>
                  </div>

                  <h3 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl font-normal leading-tight">
                    {program.title}
                  </h3>

                  <p className="font-outfit text-zinc-600 text-base leading-relaxed">
                    {program.description}
                  </p>

                  {/* Action Link / Button */}
                  {isBabysitting ? (
                    <button
                      type="button"
                      onClick={onOpenBabysittingModal}
                      className="cursor-pointer font-outfit text-neutral-900 text-base font-medium underline underline-offset-4 hover:text-[#00549c] transition-colors pt-1"
                    >
                      {program.linkText}
                    </button>
                  ) : (
                    <Link
                      href={dayCampHref}
                      className="font-outfit text-neutral-900 text-base font-medium underline underline-offset-4 hover:text-[#00549c] transition-colors pt-1"
                    >
                      {program.linkText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default KidsProgramCards;
