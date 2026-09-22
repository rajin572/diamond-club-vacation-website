"use client";

import { useRef } from "react";
import Container from "../ui/CustomUi/Container";
import SplitTextReveal from "../ui/CustomUi/animation/SplitTextReveal";
import HeroVideoBackground from "./Hero/HeroVideoBackground";
import HeroCta from "./Hero/HeroCta";
import { HERO_CONTENT } from "./Hero/hero.data";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoParallaxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ctaRef.current) return;

      gsap.from(ctaRef.current, {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        delay: 0.5,
        ease: "premiumOut",
      });

      const boxEl = boxRef.current;
      const videoEl = videoParallaxRef.current;
      const contentEl = contentRef.current;

      if (prefersReducedMotion() || !sectionRef.current || !boxEl || !videoEl || !contentEl) {
        return;
      }

      const sectionEl = sectionRef.current;
      const boxRect = boxEl.getBoundingClientRect();
      const targetScale =
        Math.max(window.innerWidth / boxRect.width, window.innerHeight / boxRect.height) * 1.02;

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: "+=" + sectionEl.offsetHeight,
          pin: true,
          scrub: 0.1,
        },
      })
        .to(contentEl, { yPercent: -0, ease: "none" }, 0)
        .to(videoEl, { scale: 1, ease: "none" }, 0)
        .to(boxEl, { scale: targetScale, borderRadius: 0, ease: "none" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex h-screen w-full flex-col items-center justify-center bg-background-color"
    >
      <Container>
        <div
          ref={boxRef}
          className="relative h-[clamp(28rem,85vh,47.5rem)] w-full overflow-hidden rounded-3xl sm:rounded-[40px] lg:rounded-[50px]"
        >
          <div ref={videoParallaxRef} className="absolute inset-0 scale-110">
            <HeroVideoBackground src={HERO_CONTENT.video.src} poster={HERO_CONTENT.video.poster} />
          </div>

          <div
            ref={contentRef}
            className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center sm:gap-7 sm:px-10"
          >
            <h1 className="max-w-4xl text-[clamp(2.25rem,6vw,6rem)] font-semibold leading-[1.1] text-white">
              <SplitTextReveal text={HERO_CONTENT.headline} type="lines" />
            </h1>

            <p className="max-w-xl font-outfit text-[clamp(0.9375rem,1.6vw,1.125rem)] font-normal leading-7 text-white/90">
              <SplitTextReveal text={HERO_CONTENT.subtext} type="lines" delay={0.15} />
            </p>

            <div ref={ctaRef}>
              <HeroCta label={HERO_CONTENT.cta.label} href={HERO_CONTENT.cta.href} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
