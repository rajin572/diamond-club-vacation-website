"use client";

import { useRef, useState } from "react";
import Container from "../ui/CustomUi/Container";
import Accordion from "../ui/CustomUi/Accordion";
import { FAQ_ITEMS } from "./FaqSection/faq.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      // Title flips up into place word by word (rotating out of a flattened
      // 3D state) -- distinct from the flat rise, blur-focus and clip-wipe
      // treatments already used on the other section headings.
      const splitTitle = titleRef.current ? SplitText.create(titleRef.current, { type: "words" }) : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
      });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "premiumOut" },
          0
        );
      }

      if (splitTitle?.words?.length) {
        gsap.set(splitTitle.words, {
          display: "inline-block",
          transformPerspective: 500,
          transformOrigin: "50% 100%",
        });
        tl.fromTo(
          splitTitle.words,
          { autoAlpha: 0, rotateX: -80, yPercent: 35 },
          { autoAlpha: 1, rotateX: 0, yPercent: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
          0.1
        );
      }

      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "premiumOut" },
          0.45
        );
      }

      const rows = gsap.utils.toArray<HTMLElement>(".faq-row");
      if (rows.length) {
        tl.fromTo(
          rows,
          { autoAlpha: 0, x: 36 },
          { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.07, ease: "premiumOut" },
          0.35
        );
      }

      return () => splitTitle?.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full overflow-hidden py-20 sm:py-28 lg:py-36">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="flex w-full max-w-sm flex-col items-start gap-2 text-left">
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 font-outfit text-sm font-medium text-[#BD9343]"
          >
            <span className="size-1.25 shrink-0 rounded-full bg-[#BD9343]" />
            FAQs
          </span>
          <h2
            ref={titleRef}
            className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-base-color"
          >
            Looking for more information?
          </h2>
          <p ref={descRef} className="mt-1 font-outfit text-sm text-base-secondary-color/80">
            Placeholder questions. Final questions and answers to be provided by Diamond Club.
          </p>
        </div>

        <div className="flex-1 border-t border-base-color/10">
          {FAQ_ITEMS.map((item, index) => (
            <Accordion
              key={item.question}
              item={item}
              className="faq-row"
              open={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
              questionClassName="font-outfit text-lg font-normal text-base-color group-hover:text-secondary-color"
              answerClassName="max-w-xl font-outfit text-base text-base-secondary-color"
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FaqSection;
