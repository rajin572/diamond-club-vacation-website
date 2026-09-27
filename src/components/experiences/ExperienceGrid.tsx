"use client";

import React, { useRef } from "react";
import Container from "@/components/ui/CustomUi/Container";
import ExperienceCard from "./ExperienceCard";
import type { ExperienceItem } from "./experiences.types";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface ExperienceGridProps {
  items: ExperienceItem[];
  columns?: 2 | 3;
  onSelect: (item: ExperienceItem, index: number) => void;
}

export const ExperienceGrid: React.FC<ExperienceGridProps> = ({ items, columns = 2, onSelect }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;

      gsap.fromTo(
        gridRef.current.children,
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

  const columnsClass = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";

  return (
    <section className="w-full pb-20 sm:pb-28 bg-[#FCFCFB]">
      <Container>
        <div ref={gridRef} className={`grid grid-cols-1 ${columnsClass} gap-6 sm:gap-8`}>
          {items.map((item, idx) => (
            <ExperienceCard key={item.id} item={item} index={idx} onSelect={onSelect} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ExperienceGrid;
