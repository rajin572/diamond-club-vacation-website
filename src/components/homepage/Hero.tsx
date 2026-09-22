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
        duration: 0.8,
        delay: 0.9,
        ease: "premiumOut",
      });

      if (
        prefersReducedMotion() ||
        !sectionRef.current ||
        !boxRef.current ||
        !videoParallaxRef.current ||
        !contentRef.current
      ) {
        return;
      }

      // Scroll-scrubbed exit: as the hero scrolls off screen, the video
      // drifts/zooms slower than the box around it (parallax depth) while
      // the box itself recedes and the text fades a touch faster than both
      // -- three layers moving at different rates reads as "premium" instead
      // of everything sliding off together as one flat plane.
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
        .to(videoParallaxRef.current, { yPercent: 12, scale: 1.05, ease: "none" }, 0)
        .to(boxRef.current, { scale: 0.94, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -18, autoAlpha: 0, ease: "none" }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative z-10 flex h-screen w-full flex-col items-center justify-center">
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
