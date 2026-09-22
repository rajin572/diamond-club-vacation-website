"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HoverStaggerTextProps {
  text: string;
  className?: string;
  hoverColor?: string;
  idleColor?: string;
  variant?: "default" | "display";
  duration?: number;
  stagger?: number;
}

/**
 * High-performance, GPU-accelerated letter-stagger animation on hover.
 * Uses pure CSS transitions with custom property delay mapping so it runs
 * on the compositor thread with zero JS/GSAP overhead on mount or scroll.
 */
export function HoverStaggerText({
  text,
  className,
  hoverColor = "#00549C",
  idleColor = "#131313",
  variant = "default",
}: HoverStaggerTextProps) {
  const isDisplay = variant === "display";

  let globalCharIndex = 0;

  return (
    <span
      className={cn(
        "hover-stagger-root inline-flex flex-wrap items-baseline select-none",
        className
      )}
      aria-label={text}
    >
      <span aria-hidden="true" className="inline-flex flex-wrap items-baseline">
        {text.split(" ").map((word, wordIndex, wordsArray) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap items-baseline">
            {word.split("").map((char, charIndex) => {
              const charIdx = globalCharIndex++;
              const delay = isDisplay ? charIdx * 14 : charIdx * 20;

              return (
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
                  {/* Primary idle character */}
                  <span
                    className={cn(
                      "block select-none transform-gpu will-change-transform",
                      isDisplay
                        ? "transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[65%] group-hover:opacity-0 [.hover-stagger-root:hover_&]:-translate-y-[65%] [.hover-stagger-root:hover_&]:opacity-0"
                        : "transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full [.hover-stagger-root:hover_&]:-translate-y-full"
                    )}
                    style={{
                      color: idleColor,
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {char}
                  </span>

                  {/* Secondary hover character */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 block select-none transform-gpu will-change-transform",
                      isDisplay
                        ? "translate-y-[65%] opacity-0 transition-all duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 [.hover-stagger-root:hover_&]:translate-y-0 [.hover-stagger-root:hover_&]:opacity-100"
                        : "translate-y-full transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 [.hover-stagger-root:hover_&]:translate-y-0"
                    )}
                    style={{
                      color: hoverColor,
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {char}
                  </span>
                </span>
              );
            })}
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
