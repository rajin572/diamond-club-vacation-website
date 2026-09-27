"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import type { ResortRoom } from "./resorts.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { roomHref } from "@/lib/routes";

interface ResortRoomsSectionProps {
  offeringId: string;
  programId: string;
  resortId: string;
  rooms: ResortRoom[];
}

export const ResortRoomsSection: React.FC<ResortRoomsSectionProps> = ({
  offeringId,
  programId,
  resortId,
  rooms,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.035 },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(descRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.25);
      }

      if (cardsRef.current) {
        tl.fromTo(
          cardsRef.current.children,
          { autoAlpha: 0, y: 35 },
          { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" },
          0.3
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="rooms"
      className="w-full py-16 sm:py-24 md:py-28 scroll-mt-28"
      aria-label="Rooms and Suites"
    >
      <Container>
        <div className="flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-2">
            <div className="flex flex-col items-start gap-4 max-w-2xl">
              <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
                <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" />
                <span className="font-outfit text-sm font-medium text-[#BD9343]">Rooms & Suites</span>
              </div>

              <h2
                ref={titleRef}
                className="font-cormorant font-light text-[#131313] text-[clamp(2.25rem,4.5vw,4.25rem)] leading-[1.05] tracking-tight"
              >
                Space to gather, <span className="font-normal italic">quiet to rest</span>
              </h2>
            </div>

            <p ref={descRef} className="font-outfit text-[#5E6062] text-base leading-relaxed max-w-md">
              Every room is prepared for the holiday, with connecting rooms and cribs available on request.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => {
              const href = roomHref(offeringId, programId, resortId, room.id);

              return (
                <div key={room.id} className="group flex flex-col justify-start items-start gap-4 w-full">
                  <Link
                    href={href}
                    className="relative w-full h-[260px] sm:h-[300px] rounded-md overflow-hidden bg-[#E4E0D8] block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                  >
                    <Image
                      src={room.image}
                      alt={room.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col items-start gap-2.5 w-full">
                    <Link href={href}>
                      <h3 className="font-cormorant text-2xl sm:text-[26px] lg:text-[28px] text-[#131313] font-normal leading-tight group-hover:text-[#00549c] transition-colors duration-200">
                        {room.title}
                      </h3>
                    </Link>

                    <div className="flex flex-col gap-0.5 text-sm sm:text-[15px] font-outfit text-[#5E6062]">
                      <p>
                        {room.bedConfig} · {room.view}
                      </p>
                    </div>

                    <Link
                      href={href}
                      className="font-outfit text-[15px] font-medium text-[#131313] underline underline-offset-4 hover:text-[#00549C] transition-colors duration-200 pt-1"
                    >
                      View room
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResortRoomsSection;
