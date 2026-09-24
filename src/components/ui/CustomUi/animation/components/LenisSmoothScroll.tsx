"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap-util";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

const LenisSmoothScroll = () => {
    const lenisRef = useRef<LenisRef>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Ticker synchronisation: hand Lenis the real frame delta from GSAP
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // Keep standard GSAP lag smoothing active (absorbs up to 500ms lag without harsh jumps)
        gsap.ticker.lagSmoothing(500, 33);

        const lenis = lenisRef.current?.lenis;
        lenis?.on("scroll", ScrollTrigger.update);

        ScrollTrigger.refresh();

        return () => {
            gsap.ticker.remove(update);
            lenis?.off("scroll", ScrollTrigger.update);
        };
    }, []);

    // Scroll to top and refresh triggers whenever the route changes
    useEffect(() => {
        const lenis = lenisRef.current?.lenis;
        lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);

        // Small timeout allows Next.js page components to mount and calculate heights
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 120);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <ReactLenis
            root
            options={{
                autoRaf: false,
                duration: 0.9, // Responsive & silky, removes floaty/sluggish latency
                smoothWheel: true,
                wheelMultiplier: 1.05,
                touchMultiplier: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard expoOut
            }}
            ref={lenisRef}
        />
    );
};

export default LenisSmoothScroll;