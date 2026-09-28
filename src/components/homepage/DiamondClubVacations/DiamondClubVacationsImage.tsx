"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

interface DiamondClubVacationsImageProps {
  src: StaticImageData | string;
  alt: string;
  direction?: "left" | "right";
  className?: string;
  priority?: boolean;
}

export const DiamondClubVacationsImage: React.FC<DiamondClubVacationsImageProps> = ({
  src,
  alt,
  direction = "left",
  className,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current || !imageWrapperRef.current) {
        return;
      }

      // Smooth entrance reveal with toggleActions
      gsap.fromTo(
        containerRef.current,
        {
          autoAlpha: 0,
          y: direction === "left" ? 40 : 60,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "restart none none reverse",
          },
        }
      );

      // Subtle parallax scrub within the frame
      gsap.fromTo(
        imageWrapperRef.current,
        { yPercent: direction === "left" ? -20 : 20 },
        {
          yPercent: direction === "left" ? 20 : -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-[18.75rem] overflow-hidden rounded-md will-change-transform",
        "aspect-[5/7]",
        className
      )}
    >
      <div ref={imageWrapperRef} className="absolute inset-x-0 -top-[10%] h-[120%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 75vw, (max-width: 1200px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default DiamondClubVacationsImage;

