"use client";

import { useRef } from "react";
import Container from "../ui/CustomUi/Container";
import OfferingCard from "./OurOffering/OfferingCard";
import { OFFERING_ITEMS } from "./OurOffering/offering.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const OurOffering = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      // 1. SplitText on Section Header
      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      // 2. SplitText on All Offering Card Titles
      const splitCardTitles = SplitText.create(".offering-card-title", {
        type: "lines,words",
        mask: "lines",
      });

      // 3. SplitText on All Offering Card Descriptions
      const splitCardDescs = SplitText.create(".offering-card-desc", {
        type: "lines",
        mask: "lines",
      });

      // Master Timeline triggered when entering Our Offering
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
        },
      });

      // A. Header Badge
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "premiumOut",
          },
          0
        );
      }

      // B. Header Title (words rising up through overflow line mask)
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, rotate: 2, autoAlpha: 0 },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1.2,
            stagger: 0.06,
            ease: "premiumOut",
          },
          0.15
        );
      }

      // C. Cards: tilt up out of a 3D perspective as they rise in, while
      // each card's own curtain simultaneously wipes off-frame and its
      // photo settles down from a zoomed-in start -- three layers moving
      // at once instead of a flat fade+scale.
      const cards = gsap.utils.toArray<HTMLElement>(".offering-card");
      if (cards.length) {
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 70, rotateX: -18, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.3,
            stagger: 0.18,
            ease: "premiumOut",
            transformPerspective: 1000,
            transformOrigin: "50% 100%",
          },
          0.3
        );
      }

      const wipes = gsap.utils.toArray<HTMLElement>(".offering-card-wipe");
      if (wipes.length) {
        tl.to(
          wipes,
          { xPercent: 100, duration: 0.95, stagger: 0.18, ease: "power4.inOut" },
          0.55
        );
      }

      const images = gsap.utils.toArray<HTMLElement>(".offering-card-image");
      if (images.length) {
        tl.fromTo(
          images,
          { scale: 1.35 },
          { scale: 1, duration: 1.4, stagger: 0.18, ease: "power3.out" },
          0.5
        );
      }

      // D. Card Logos Fade-in
      const logos = gsap.utils.toArray<HTMLElement>(".offering-card-logo");
      if (logos.length) {
        tl.fromTo(
          logos,
          { autoAlpha: 0, y: -10, scale: 0.9 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: "power2.out",
          },
          0.45
        );
      }

      // E. Card Arrow Buttons Pop-in
      const arrows = gsap.utils.toArray<HTMLElement>(".offering-card-arrow");
      if (arrows.length) {
        tl.fromTo(
          arrows,
          { autoAlpha: 0, scale: 0, rotate: -35 },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.16,
            ease: "back.out(2)",
          },
          0.6
        );
      }

      // F. Card Titles SplitText reveal (lines/words rising out of mask)
      if (splitCardTitles?.words?.length) {
        tl.fromTo(
          splitCardTitles.words,
          { yPercent: 115, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.035,
            ease: "premiumOut",
          },
          0.5
        );
      }

      // G. Card Descriptions SplitText reveal (lines rising out of mask)
      if (splitCardDescs?.lines?.length) {
        tl.fromTo(
          splitCardDescs.lines,
          { yPercent: 100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.03,
            ease: "power2.out",
          },
          0.65
        );
      }

      return () => {
        splitTitle?.revert();
        splitCardTitles.revert();
        splitCardDescs.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-20 lg:py-28 overflow-hidden">
      <Container className="flex flex-col gap-10 sm:gap-14">
        {/* Section Header */}
        <div className="flex flex-col gap-2 w-full max-w-3xl items-start text-left mr-auto">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 font-outfit text-sm font-medium text-[#BD9343]"
          >
            <span className="size-1.25 shrink-0 rounded-full bg-[#BD9343]" />
            Our offering
          </span>

          <h2
            ref={titleRef}
            className="font-cormorant font-medium text-base-color text-[clamp(2.25rem,5.5vw,4.75rem)] leading-[1.05] tracking-[-0.03em]"
          >
            Curated stays for every <em className="italic">occasion</em>
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4"
        >
          {OFFERING_ITEMS.map((item) => (
            <OfferingCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurOffering;
