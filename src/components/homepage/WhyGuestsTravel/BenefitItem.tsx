"use client";

import { useRef } from "react";
import { BenefitItemData } from "./whyGuestsTravel.data";
import { gsap } from "@/lib/gsap-util";

export const BenefitItem: React.FC<{ item: BenefitItemData }> = ({ item }) => {
  const Icon = item.icon;
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tile = tileRef.current;
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(tile, {
      rotateY: px * 8,
      rotateX: -py * 8,
      transformPerspective: 700,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(tileRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power3.out" });
  };

  return (
    <div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transform-3d relative flex flex-1 flex-col gap-5 pt-7 will-change-transform"
    >
      <span className="benefit-line absolute inset-x-0 top-0 h-px origin-left bg-base-color/10" />
      <Icon className="benefit-icon size-7 stroke-[1.6] text-[#BD9343]" />
      <div className="flex flex-col gap-2">
        <h3 className="benefit-title font-cormorant text-3xl font-medium leading-9 text-base-color">{item.title}</h3>
        <p className="benefit-desc font-outfit text-base text-base-secondary-color">{item.description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
