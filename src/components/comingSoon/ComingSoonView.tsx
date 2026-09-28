"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COMING_SOON_DATA } from "./comingSoon.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";
import Container from "../ui/CustomUi/Container";

export const ComingSoonView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return;

      const splitTitle = titleRef.current
        ? SplitText.create(titleRef.current, {
          type: "lines,words",
          mask: "lines",
        })
        : null;

      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "premiumOut" },
      });

      // Background image subtle zoom settling
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.08, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "premiumSoft" },
          0
        );
      }

      // Card scale & fade in
      if (cardRef.current) {
        tl.fromTo(
          cardRef.current,
          { autoAlpha: 0, scale: 0.98 },
          { autoAlpha: 1, scale: 1, duration: 1 },
          0
        );
      }

      // Logo entrance
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.15
        );
      }

      // Badge entrance
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.25
        );
      }

      // Title reveal
      if (splitTitle?.words?.length) {
        tl.fromTo(
          splitTitle.words,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.05,
          },
          0.35
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0.65
        );
      }

      // Buttons
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
          0.8
        );
      }

      // Bottom footer bar
      if (footerRef.current) {
        tl.fromTo(
          footerRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          0.9
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen p-4 sm:p-6 md:p-10 bg-neutral-50 flex items-center justify-center"
      aria-label="Coming Soon"
    >
      {/* Inner Luxury Card Matching Figma 40015107-376 */}
      <Container>
        <div
          ref={cardRef}
          className="relative w-full min-h-[calc(100vh-10rem)] px-6 sm:px-12 md:px-20 py-10 md:py-12 rounded-xl md:rounded-2xl flex flex-col justify-between items-center overflow-hidden shadow-2xl"
        >
          {/* Background Image with Dark Luxury Overlay */}
          <div
            ref={bgImageRef}
            className="absolute inset-0 w-full h-[115%] -top-[7.5%] pointer-events-none"
          >
            <Image
              src={COMING_SOON_DATA.backgroundImage}
              alt="Coming Soon Background"
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 100vw"
              className="object-cover object-center"
            />
            {/* Dark Overlay matching Figma bg-slate-950/75 */}
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-950/80" />
          </div>

          {/* Top Logo */}
          <div ref={logoRef} className="relative z-10">
            <Link
              href="/"
              className="inline-block relative size-16 sm:size-20 transition-transform duration-300 hover:scale-105"
              aria-label="Diamond Club Vacations Home"
            >
              <Image
                src={COMING_SOON_DATA.logo}
                alt="Diamond Club Vacations"
                fill
                className="object-contain invert brightness-200 drop-shadow-md"
                priority
              />
            </Link>
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 my-auto text-center max-w-4xl py-8">
            {/* Overline Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 select-none"
            >
              <span
                className="size-[5px] rounded-full bg-stone-200 shrink-0"
                aria-hidden="true"
              />
              <span className="font-outfit text-sm font-medium leading-5 text-stone-200">
                {COMING_SOON_DATA.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              ref={titleRef}
              className="font-cormorant font-light text-white tracking-tight leading-[1.05] text-[clamp(2.5rem,6.5vw,5.75rem)] text-center max-w-[1000px]"
            >
              <span>{COMING_SOON_DATA.headline.part1}</span>
              <span>{COMING_SOON_DATA.headline.part2}</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-white/90 font-outfit text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-[620px] text-center drop-shadow-sm"
            >
              {COMING_SOON_DATA.subtitle}
            </p>

            {/* Action Buttons */}
            <div
              ref={buttonsRef}
              className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              {/* Primary Button */}
              <Link
                href={COMING_SOON_DATA.primaryCta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/20"
              >
                <span>{COMING_SOON_DATA.primaryCta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>

              {/* Secondary Button */}
              <Link
                href={COMING_SOON_DATA.secondaryCta.href}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm outline outline-1 outline-white hover:outline-white bg-white/10 hover:bg-white/20 backdrop-blur-xs transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98"
              >
                <span>{COMING_SOON_DATA.secondaryCta.label}</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-neutral-900 stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Bar matching Figma */}
          <div
            ref={footerRef}
            className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10 text-white/70 font-outfit text-sm font-normal"
          >
            <div>{COMING_SOON_DATA.brandName}</div>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
              {COMING_SOON_DATA.contacts.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target={contact.isExternal ? "_blank" : undefined}
                  rel={contact.isExternal ? "noopener noreferrer" : undefined}
                  className="hover:text-white transition-colors duration-200"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComingSoonView;

