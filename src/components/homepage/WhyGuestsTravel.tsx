"use client";

import { useRef } from "react";
import Container from "../ui/CustomUi/Container";
import BenefitItem from "./WhyGuestsTravel/BenefitItem";
import { BENEFIT_ITEMS } from "./WhyGuestsTravel/whyGuestsTravel.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const WhyGuestsTravel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      // Title reveals word-by-word out of a soft blur and masked rise
      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "words", mask: "words" })
        : null;

      // Benefit titles still split, but as a light word-fade rather than the
      // heavier masked rise used on Our Offering's card titles.
      const splitItemTitles = SplitText.create(".benefit-title", { type: "words", mask: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
      });

      // A. Eyebrow badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "premiumOut" },
          0
        );
      }

      // B. Title -- words focus in from a blur and rise
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { autoAlpha: 0, yPercent: 40, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.1
        );
      }

      // C. Description -- slides in from the right, matching where it sits
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, x: 32 },
          { autoAlpha: 1, x: 0, duration: 0.9, ease: "premiumOut" },
          0.25
        );
      }

      // D. Benefit top-border lines draw in left to right
      const lines = gsap.utils.toArray<HTMLElement>(".benefit-line");
      if (lines.length) {
        tl.fromTo(
          lines,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, stagger: 0.08, ease: "power3.inOut" },
          0.55
        );
      }

      // E. Icons draw themselves in stroke-by-stroke, like a pen tracing the
      // outline, rather than popping in as an already-solid shape -- reads
      // as "hand-drawn" and works for any icon regardless of how many
      // sub-paths it's built from.
      const iconSvgs = gsap.utils.toArray<SVGSVGElement>(".benefit-icon");
      const iconShapes: SVGGeometryElement[] = [];
      iconSvgs.forEach((svg) => {
        svg
          .querySelectorAll<SVGGeometryElement>("path, circle, line, rect, polyline, polygon")
          .forEach((shape) => {
            if (typeof shape.getTotalLength !== "function") return;
            const length = shape.getTotalLength();
            gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
            iconShapes.push(shape);
          });
      });
      if (iconShapes.length) {
        tl.to(iconShapes, { strokeDashoffset: 0, duration: 0.8, stagger: 0.02, ease: "power2.inOut" }, 0.62);
      }

      // F. Benefit titles -- light word fade
      if (splitItemTitles?.words?.length) {
        tl.fromTo(
          splitItemTitles.words,
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, stagger: 0.015, ease: "premiumOut" },
          0.75
        );
      }

      // G. Benefit descriptions fade up last
      const descs = gsap.utils.toArray<HTMLElement>(".benefit-desc");
      if (descs.length) {
        tl.fromTo(
          descs,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
          0.9
        );
      }

      return () => {
        splitTitle?.revert();
        splitItemTitles.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full overflow-hidden py-20 sm:py-28 lg:py-36">
      <Container className="flex flex-col gap-16 sm:gap-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex w-full max-w-2xl flex-col items-start gap-2 text-left">
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 font-outfit text-sm font-medium text-[#BD9343]"
            >
              <span className="size-1.25 shrink-0 rounded-full bg-[#BD9343]" />
              Why guests travel with us
            </span>

            <h2
              ref={titleRef}
              className="font-cormorant text-[clamp(2.25rem,5vw,4.75rem)] font-medium leading-[1.05] tracking-[-0.03em] text-base-color"
            >
              Every detail<span className="font-light">, </span><em className="italic">handled</em><span className="font-light"> for you</span>
            </h2>
          </div>

          <p ref={descRef} className="max-w-sm font-outfit text-base text-base-secondary-color lg:text-right">
            From private airport transfers to your dining reservations, our hospitality team takes care of the
            details so you can enjoy every moment.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFIT_ITEMS.map((item) => (
            <BenefitItem key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyGuestsTravel;
