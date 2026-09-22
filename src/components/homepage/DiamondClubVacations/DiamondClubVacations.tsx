"use client";

import React from "react";
import Container from "@/components/ui/CustomUi/Container";
import DiamondClubVacationsContent from "./DiamondClubVacationsContent";
import DiamondClubVacationsImage from "./DiamondClubVacationsImage";
import { DIAMOND_CLUB_VACATIONS_DATA } from "./diamondClubVacations.data";

interface DiamondClubVacationsProps {
  className?: string;
}

export const DiamondClubVacations: React.FC<DiamondClubVacationsProps> = ({
  className,
}) => {
  const data = DIAMOND_CLUB_VACATIONS_DATA;

  return (
    <section
      id="about"
      className="relative z-10 w-full overflow-hidden bg-background-color py-[clamp(4.5rem,9.7vw,8.75rem)]"
    >
      <Container className={className}>
        <div className="grid grid-cols-2 items-center justify-between gap-6 sm:gap-8 lg:flex lg:flex-row lg:gap-6 xl:gap-12">
          {/* 1. Left Pool Image */}
          <div className="col-span-1 flex justify-center lg:shrink-0 lg:justify-start">
            <DiamondClubVacationsImage
              src={data.images.left.src}
              alt={data.images.left.alt}
              direction="left"
              className="w-full max-w-[13.5rem] sm:max-w-[16rem] lg:w-[clamp(14rem,20vw,18.75rem)] lg:max-w-[18.75rem]"
            />
          </div>

          {/* 2. Center Text Content Column */}
          <div className="order-first col-span-2 flex w-full flex-1 justify-center lg:order-none">
            <DiamondClubVacationsContent
              badge={data.badge}
              headline={data.headline}
              paragraphs={data.paragraphs}
            />
          </div>

          {/* 3. Right Pool Image */}
          <div className="col-span-1 flex justify-center lg:shrink-0 lg:justify-end">
            <DiamondClubVacationsImage
              src={data.images.right.src}
              alt={data.images.right.alt}
              direction="right"
              className="w-full max-w-[13.5rem] sm:max-w-[16rem] lg:w-[clamp(14rem,20vw,18.75rem)] lg:max-w-[18.75rem]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DiamondClubVacations;
