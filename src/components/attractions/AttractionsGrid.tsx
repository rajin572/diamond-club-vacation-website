"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import AttractionCard from "./AttractionCard";
import type { AttractionItem } from "./attractions.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface AttractionsGridProps {
  attractions: AttractionItem[];
  onSelectAttraction: (attraction: AttractionItem) => void;
}

export const AttractionsGrid: React.FC<AttractionsGridProps> = ({
  attractions,
  onSelectAttraction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      gsap.fromTo(
        gridRef.current.children,
        { autoAlpha: 0, y: 35 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full pb-20 md:pb-28 bg-[#FCFCFB]">
      <Container>
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
        >
          {attractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onSelect={onSelectAttraction}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AttractionsGrid;
