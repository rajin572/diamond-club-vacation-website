"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import type { ProgramWhereYouStayData } from "./programs.types";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import { resortHref } from "@/lib/routes";

interface ProgramWhereYouStayProps {
  offeringId: string;
  programId: string;
  data: ProgramWhereYouStayData;
}

export const ProgramWhereYouStay: React.FC<ProgramWhereYouStayProps> = ({
  offeringId,
  programId,
  data,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, { type: "lines,words", mask: "lines" })
        : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);
      }

      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.04 },
          0.1
        );
      }

      if (cardsContainerRef.current) {
        tl.fromTo(
          cardsContainerRef.current.children,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" },
          0.3
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="where-youll-stay"
      className="w-full pt-10 pb-24 md:pb-36 scroll-mt-20"
      aria-label="Where you'll stay"
    >
      <Container>
        <div className="w-full flex flex-col justify-start items-start gap-10 md:gap-12">
          <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-5">
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-[#BD9343] shrink-0" aria-hidden="true" />
              <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343]">{data.badge}</span>
            </div>

            <h2
              ref={titleRef}
              className="font-cormorant font-light text-neutral-900 tracking-tight leading-[1.08] text-[clamp(2.25rem,4.5vw,4.5rem)] max-w-4xl text-left"
            >
              <span>{data.headline}</span>
            </h2>
          </div>

          <div
            ref={cardsContainerRef}
            className={`w-full grid gap-8 lg:gap-6 ${data.resorts.length === 1 ? "grid-cols-1 max-w-3xl" : "grid-cols-1 lg:grid-cols-2"
              }`}
          >
            {data.resorts.map((resort) => {
              const href = resortHref(offeringId, programId, resort.id);
              return (
                <Link
                  key={resort.id}
                  href={href}
                  className="group flex flex-col justify-start items-start gap-5 w-full cursor-pointer focus:outline-none"
                >
                  <div
                    className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-md overflow-hidden bg-slate-900 block focus-visible:ring-2 focus-visible:ring-[#BD9343]"
                  >
                    <Image
                      src={resort.image}
                      alt={resort.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-slate-950/80 pointer-events-none" />
                  </div>

                  <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 pt-1">
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <h3 className="font-cormorant text-neutral-900 text-3xl sm:text-4xl font-normal leading-tight group-hover:text-[#00549c] transition-colors duration-300">
                        {resort.title}
                      </h3>
                      <p className="font-outfit text-zinc-600 text-base font-normal leading-6 max-w-md">
                        {resort.description}
                      </p>
                    </div>

                    <span className="font-outfit text-neutral-900 text-base font-medium underline leading-5 group-hover:text-[#00549c] transition-colors duration-200 shrink-0 self-start sm:self-center">
                      {resort.linkText}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramWhereYouStay;
