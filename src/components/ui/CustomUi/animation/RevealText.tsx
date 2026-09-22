"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string | string[];
  className?: string;
  idleColor?: string;
  revealColor?: string;
  idleOpacity?: number;
  start?: string;
  end?: string;
  scrub?: number | boolean;
}

export function RevealText({
  text,
  className,
  idleColor = "rgba(255, 255, 255, 0.28)",
  revealColor = "#ffffff",
  idleOpacity = 0.25,
  start = "top 80%",
  end = "bottom 40%",
  scrub = 0.8,
}: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const paragraphs = Array.isArray(text)
    ? text
    : typeof text === "string"
      ? text.split(/\n\s*\n/).filter(Boolean)
      : [];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll(".reveal-word");
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { opacity: 1, color: revealColor });
        return;
      }

      gsap.fromTo(
        words,
        {
          opacity: idleOpacity,
          color: idleColor,
        },
        {
          opacity: 1,
          color: revealColor,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [text, idleColor, revealColor, idleOpacity, start, end, scrub],
    }
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-3 md:gap-3.5">
      {paragraphs.map((para, pIdx) => {
        const words = para.split(/\s+/).filter(Boolean);
        return (
          <p key={pIdx} className={cn(className)}>
            {words.map((word, i) => (
              <span key={`${word}-${pIdx}-${i}`}>
                <span
                  className="reveal-word inline-block will-change-[color,opacity]"
                  style={{ opacity: idleOpacity, color: idleColor }}
                >
                  {word}
                </span>
                {i !== words.length - 1 && " "}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export default RevealText;
