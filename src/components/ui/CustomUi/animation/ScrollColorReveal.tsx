"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { cn } from "@/lib/utils";

interface ScrollColorRevealProps {
  text: string;
  className?: string;
  /** Word color before the scroll reaches it. */
  idleColor?: string;
  /** Word color once the scroll has passed it. */
  revealColor?: string;
  /** ScrollTrigger start/end -- the scroll distance the words light up across. */
  start?: string;
  end?: string;
}

/**
 * Word-by-word color wipe, scrubbed directly to scroll position rather than
 * triggered once -- dim prose that "reads itself" in as you scroll past it,
 * distinct from SplitTextReveal's one-shot rise-through-a-mask. Suited to a
 * longer paragraph (a mission statement, a pull quote) rather than a short
 * headline, where a line-mask rise would feel too mechanical.
 */
export function ScrollColorReveal({
  text,
  className,
  idleColor = "rgba(255,255,255,0.3)",
  revealColor = "#ffffff",
  start = "top 85%",
  end = "bottom 25%",
}: ScrollColorRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll(".scroll-reveal-word");
      if (!words.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { color: revealColor });
        return;
      }

      gsap.set(words, { color: idleColor });

      gsap.to(words, {
        color: revealColor,
        stagger: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          end,
          scrub: 0.8,
        },
      });
    },
    { scope: containerRef, dependencies: [text, idleColor, revealColor, start, end] }
  );

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="scroll-reveal-word">{word}</span>
          {i !== words.length - 1 && " "}
        </span>
      ))}
    </p>
  );
}

export default ScrollColorReveal;
