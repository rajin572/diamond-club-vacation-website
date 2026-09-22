"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../ui/CustomUi/Container";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const PlanWedding = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !boxRef.current || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 100%",
          toggleActions: "restart none none reverse",
        },
      });

      // The banner itself opens like a curtain from the center -- the
      // container is what reveals here, not text animating independently
      // inside an already-visible box, unlike every other section.
      tl.fromTo(
        boxRef.current,
        { clipPath: "inset(42% 50% 42% 50% round 6px)" },
        { clipPath: "inset(0% 0% 0% 0% round 6px)", duration: 1.1, ease: "power4.inOut" },
        0
      );

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "premiumOut" },
          0.55
        );
      }
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "premiumOut" },
          0.72
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.2)" },
          0.85
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-8">
      <Container>
        <div
          ref={boxRef}
          className="flex flex-col gap-12 rounded-sm bg-[#F2F0EC] px-6 py-14 sm:gap-16 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <h2
            ref={titleRef}
            className="max-w-4xl font-cormorant text-[clamp(2.5rem,6vw,6rem)] font-light leading-[1.02] tracking-[-0.03em] text-base-color"
          >
            Planning a wedding or <em className="italic">private event?</em>
          </h2>

          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <p ref={descRef} className="max-w-sm font-outfit text-base text-base-secondary-color">
              From intimate celebrations to destination weddings, our team designs and produces every detail with
              you, at the resort of your choice.
            </p>

            <Link
              ref={ctaRef}
              href="/inquire"
              className="inline-flex shrink-0 items-center gap-3.5 rounded-sm bg-secondary-color py-2 pl-4 pr-2 font-outfit text-base font-medium text-white transition-colors hover:bg-[#00427c]"
            >
              Plan your event
              <span className="flex size-6 items-center justify-center rounded-[3px] bg-white">
                <ArrowRight className="size-3.5 stroke-[2.2] text-secondary-color" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PlanWedding;
