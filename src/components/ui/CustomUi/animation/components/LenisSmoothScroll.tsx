"use client";
// Pulled from the shared gsap-util, not gsap/dist/ScrollTrigger — that's a
// separate build with its own module instance, so the ScrollTrigger imported
// here has to be the one every other component registers its triggers on, or
// updates fired from this file would reach nothing.
import { gsap, ScrollTrigger } from "@/lib/gsap-util";
import { useEffect, useRef } from "react";
import { ReactLenis, LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

const LenisSmoothScroll = () => {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        // gsap.ticker reports seconds; lenis.raf expects milliseconds. The 500
        // that was here told Lenis half the real time had passed, so its
        // frame-rate normalisation was computed against a distorted delta —
        // the source of the intermittent sluggishness.
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // GSAP rewrites the time it reports after a long frame to keep tweens
        // looking smooth. That is the wrong thing to do to a scroll clock: it
        // hands Lenis a time that never happened and the scroll position jumps.
        gsap.ticker.lagSmoothing(0);

        // Without this ScrollTrigger updates off native scroll events, a frame
        // behind the transform Lenis applies in its rAF pass. Every scrubbed
        // animation then trails the page by a frame, which reads as stutter.
        const lenis = lenisRef.current?.lenis;
        lenis?.on("scroll", ScrollTrigger.update);

        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(update);
            gsap.ticker.lagSmoothing(500, 33);
            lenis?.off("scroll", ScrollTrigger.update);
        };
    }, []);

    return <ReactLenis root options={{ autoRaf: false, duration: 1.2 }} ref={lenisRef} />;
};

export default LenisSmoothScroll;