"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import ScholarCard from "./ScholarCard";
import { Scholar } from "./scholars.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ScholarsGridProps {
  scholars: Scholar[];
  onReadBio: (index: number) => void;
}

export const ScholarsGrid: React.FC<ScholarsGridProps> = ({
  scholars,
  onReadBio,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".scholar-card");
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 35, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "premiumOut",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section ref={gridRef} className="w-full pb-20 sm:pb-28 bg-[#FCFCFB]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {scholars.map((scholar, idx) => (
            <ScholarCard
              key={scholar.id}
              scholar={scholar}
              index={idx}
              onReadBio={onReadBio}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ScholarsGrid;
