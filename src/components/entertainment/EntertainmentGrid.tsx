"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import EntertainmentCard from "./EntertainmentCard";
import type { EntertainmentEvent } from "./entertainment.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface EntertainmentGridProps {
  events: EntertainmentEvent[];
  onOpenModal: (event: EntertainmentEvent) => void;
}

export const EntertainmentGrid: React.FC<EntertainmentGridProps> = ({
  events,
  onOpenModal,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <div className="w-full pb-20 md:pb-28 bg-[#FCFCFB]">
      <Container>
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-6 md:gap-y-12"
        >
          {events.map((event) => (
            <EntertainmentCard
              key={event.id}
              event={event}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default EntertainmentGrid;
