"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/CustomUi/Container";
import ExperienceCard from "./ExperienceCarousel/ExperienceCard";
import { EXPERIENCE_ITEMS } from "./ExperienceCarousel/experience.data";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap-util";

const MAGNET_STRENGTH = 0.4;

export const ExperienceCarousel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // GSAP-eased scroll to the next/previous card's exact snap position,
  // instead of the browser's native smooth-scroll curve, so the slide
  // transition matches the site's premium easing everywhere else. CSS
  // scroll-snap fights a JS-driven scrollLeft tween (it snaps instantly
  // instead of letting the value interpolate), so snapping is switched off
  // for the duration of the animation and restored once it settles -- and
  // because the target is the real card position, there's no leftover
  // correction jump once snap comes back.
  const scrollByStep = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".experience-card"));
    if (!cards.length) return;

    const trackLeft = track.getBoundingClientRect().left;
    const positions = cards.map((card) => card.getBoundingClientRect().left - trackLeft + track.scrollLeft);
    const current = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    const next =
      direction === 1 ? positions.find((p) => p > current + 8) : [...positions].reverse().find((p) => p < current - 8);
    const target = gsap.utils.clamp(0, max, next ?? (direction === 1 ? max : 0));

    const restoreSnap = () => {
      track.style.scrollSnapType = "";
    };
    track.style.scrollSnapType = "none";
    gsap.to(track, {
      scrollLeft: target,
      duration: 0.9,
      ease: "premiumOut",
      overwrite: true,
      onComplete: restoreSnap,
      onInterrupt: restoreSnap,
    });
  };

  // Nav buttons pull toward the cursor within their own bounds and spring
  // back on exit -- a "magnetic" micro-interaction unique to this section's
  // controls, not used on any other button in the site.
  const handleMagnetMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: relX * MAGNET_STRENGTH, y: relY * MAGNET_STRENGTH, duration: 0.4, ease: "power2.out" });
  };

  const handleMagnetLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      // Title wipes open left-to-right via clip-path per word -- a
      // horizontal reveal, echoing the carousel's own horizontal motion,
      // instead of the vertical rise or blur-focus used elsewhere.
      const splitTitle = titleRef.current ? SplitText.create(titleRef.current, { type: "words" }) : null;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "restart none none reverse",
        },
      });

      if (badgeRef.current) {
        tl.fromTo(badgeRef.current, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: "premiumOut" }, 0);
      }

      if (splitTitle?.words?.length) {
        gsap.set(splitTitle.words, { display: "inline-block" });
        tl.fromTo(
          splitTitle.words,
          { clipPath: "inset(0% 100% 0% 0%)", xPercent: -6 },
          { clipPath: "inset(0% 0% 0% 0%)", xPercent: 0, duration: 0.85, stagger: 0.12, ease: "power4.inOut" },
          0.1
        );
      }

      if (controlsRef.current) {
        tl.fromTo(
          controlsRef.current.children,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2)" },
          0.5
        );
      }

      // Cards rise gently into place, one after another.
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
      if (cards.length) {
        tl.fromTo(
          cards,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15, ease: "premiumOut" },
          0.4
        );
      }

      // Photos settle in from a zoomed-in start, in step with their card.
      // clearProps hands the transform back to the CSS hover-scale once the
      // intro finishes, so hovering still works afterward.
      const images = gsap.utils.toArray<HTMLElement>(".experience-card-image");
      if (images.length) {
        tl.fromTo(
          images,
          { scale: 1.3 },
          { scale: 1, duration: 1.1, stagger: 0.16, ease: "power3.out", clearProps: "scale" },
          0.4
        );
      }

      return () => splitTitle?.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-full overflow-hidden py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end">
          <div className="flex w-full max-w-xl flex-col items-start gap-2 text-left">
            <span
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 font-outfit text-sm font-medium text-[#BD9343]"
            >
              <span className="size-1.25 shrink-0 rounded-full bg-[#BD9343]" />
              Experiences
            </span>
            <h2
              ref={titleRef}
              className="font-cormorant text-[clamp(2.25rem,5vw,4.75rem)] font-light leading-[1.05] tracking-[-0.03em] text-base-color"
            >
              Programs for <em className="italic">every</em> generation
            </h2>
          </div>

          <div ref={controlsRef} className="flex shrink-0 items-center gap-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                aria-label="Scroll experiences left"
                className="flex size-11 items-center justify-center rounded-full border border-base-color/10 text-base-color/30 transition-colors hover:border-base-color/40 hover:text-base-color"
              >
                <ChevronLeft className="size-4 stroke-[1.75]" />
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                aria-label="Scroll experiences right"
                className="flex size-11 items-center justify-center rounded-full border border-base-color/40 text-base-color transition-colors hover:border-base-color"
              >
                <ChevronRight className="size-4 stroke-[1.75]" />
              </button>
            </div>
            <Link href="/#experiences" className="font-outfit text-base font-medium text-base-color underline underline-offset-2">
              All experiences
            </Link>
          </div>
        </div>
      </Container>

      {/* Bleeds past the right edge of Container on purpose -- the row hints
          there's more to scroll to instead of stopping flush with the page margin. */}
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pl-6 sm:pl-10 lg:pl-16"
      >
        {EXPERIENCE_ITEMS.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
        <div className="shrink-0 basis-6 sm:basis-10 lg:basis-16" aria-hidden="true" />
      </div>
    </section>
  );
};

export default ExperienceCarousel;
