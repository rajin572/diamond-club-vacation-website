"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";

interface HoverStaggerTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
  idleColor?: string;
  stagger?: number;
  duration?: number;
  variant?: "default" | "display";
}

/**
 * Letter-by-letter vertical rolling stagger animation on hover.
 * - "default": Mechanical 100% vertical roll tuned for small UI labels (Menu, Close, footer links).
 * - "display": Luxury fluid glide tuned for large serif display typography (Home, Passover 2027, etc.)
 *   with natural kerning preservation and subtle opacity feathering.
 */
export function HoverStaggerText({
  text,
  className,
  hoverColor = "#00549C",
  idleColor = "#131313",
  stagger,
  duration,
  variant = "default",
}: HoverStaggerTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const isDisplay = variant === "display";
  const animStagger = stagger ?? (isDisplay ? 0.014 : 0.022);
  const animDuration = duration ?? (isDisplay ? 0.46 : 0.38);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const trigger =
        containerRef.current.closest("a, button, [data-hover-trigger]") ||
        containerRef.current;

      const primaryChars = containerRef.current.querySelectorAll(".char-primary");
      const secondaryChars = containerRef.current.querySelectorAll(".char-secondary");

      if (!primaryChars.length || !secondaryChars.length) return;

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Set initial positions
      if (isDisplay) {
        gsap.set(primaryChars, { yPercent: 0, opacity: 1 });
        gsap.set(secondaryChars, { yPercent: 65, opacity: 0 });
      } else {
        gsap.set(primaryChars, { yPercent: 0, opacity: 1 });
        gsap.set(secondaryChars, { yPercent: 100, opacity: 1 });
      }

      const tl = gsap.timeline({ paused: true });

      if (isDisplay) {
        // Luxury display animation: smoother travel, tight stagger, elegant dissolve
        tl.to(
          primaryChars,
          {
            yPercent: -65,
            opacity: 0,
            duration: reduceMotion ? 0.01 : animDuration,
            ease: "power3.out",
            stagger: reduceMotion ? 0 : animStagger,
          },
          0
        );

        tl.to(
          secondaryChars,
          {
            yPercent: 0,
            opacity: 1,
            duration: reduceMotion ? 0.01 : animDuration,
            ease: "power3.out",
            stagger: reduceMotion ? 0 : animStagger,
          },
          0
        );
      } else {
        // Compact UI animation: crisp mechanical roll
        tl.to(
          primaryChars,
          {
            yPercent: -100,
            duration: reduceMotion ? 0.01 : animDuration,
            ease: "power3.out",
            stagger: reduceMotion ? 0 : animStagger,
          },
          0
        );

        tl.to(
          secondaryChars,
          {
            yPercent: 0,
            duration: reduceMotion ? 0.01 : animDuration,
            ease: "power3.out",
            stagger: reduceMotion ? 0 : animStagger,
          },
          0
        );
      }

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mouseleave", onLeave);

      return () => {
        trigger.removeEventListener("mouseenter", onEnter);
        trigger.removeEventListener("mouseleave", onLeave);
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [text, hoverColor, idleColor, animStagger, animDuration, isDisplay],
    }
  );

  return (
    <span
      ref={containerRef}
      className={cn("inline-flex flex-wrap items-baseline select-none", className)}
      aria-label={text}
    >
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline">
        {text.split(" ").map((word, wordIndex, wordsArray) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap items-baseline">
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={cn(
                  "char-slot relative inline-block overflow-hidden",
                  isDisplay ? "align-baseline" : "align-top"
                )}
                style={{
                  height: isDisplay ? "1.12em" : "1.18em",
                  lineHeight: isDisplay ? "1.12em" : "1.18em",
                  paddingRight: isDisplay ? "0px" : "0.025em",
                }}
              >
                <span
                  className="char-primary block select-none"
                  style={{ color: idleColor }}
                >
                  {char}
                </span>
                <span
                  aria-hidden="true"
                  className="char-secondary absolute inset-0 block select-none"
                  style={{ color: hoverColor }}
                >
                  {char}
                </span>
              </span>
            ))}
            {wordIndex !== wordsArray.length - 1 && (
              <span className="inline-block whitespace-pre select-none">
                {" "}
              </span>
            )}
          </span>
        ))}
      </span>
    </span>
  );
}

export default HoverStaggerText;
