"use client";

import { useRef } from "react";
import Container from "../ui/CustomUi/Container";
import { useGSAP, gsap, ScrollTrigger } from "@/lib/gsap-util";
import FooterBrand from "./Footer/FooterBrand";
import FooterLinkColumn from "./Footer/FooterLinkColumn";
import FooterWordmark from "./Footer/FooterWordmark";
import FooterBottomBar from "./Footer/FooterBottomBar";
import { FOOTER_COLUMNS } from "./Footer/footer.data";

/**
 * The footer content starts shifted up by half its own height and clipped by
 * the wrapper overflow-hidden, so only the bottom half shows. Scrolling
 * scrubs it back to yPercent 0, sliding the rest down into view -- the
 * footer appears to uncover itself rather than simply scrolling into frame.
 */
const buildFooterRevealTrigger = (
    footerEl: HTMLElement,
    containerEl: HTMLElement
): ScrollTrigger => {
    gsap.set(containerEl, { yPercent: -50 });

    const uncover = gsap.timeline({ paused: true });
    uncover.to(containerEl, { yPercent: 0, ease: "none" });

    return ScrollTrigger.create({
        trigger: footerEl,
        start: "top bottom",
        end: "+=75%",
        animation: uncover,
        scrub: true,
    });
};

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!footerRef.current || !containerRef.current) return;

            const trigger = buildFooterRevealTrigger(footerRef.current, containerRef.current);
            return () => trigger.kill();
        },
        { scope: footerRef }
    );

    return (
        <footer
            ref={footerRef}
            className="relative z-10 w-full overflow-hidden bg-[#F2F0EC]"
        >
            <div ref={containerRef}>
                <Container className="flex flex-col gap-8 pb-6 pt-16 sm:gap-10 sm:pb-8 sm:pt-20 lg:pt-24">
                    {/* Brand + sitemap / collection / social / contact columns */}
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
                        <FooterBrand />

                        <nav
                            aria-label="Footer"
                            className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:flex lg:flex-1 lg:gap-8"
                        >
                            {FOOTER_COLUMNS.map((column) => (
                                <FooterLinkColumn key={column.id} column={column} className="lg:flex-1" />
                            ))}
                        </nav>
                    </div>

                    <div className="h-px w-full bg-base-color/20" />

                    <FooterWordmark />

                    <FooterBottomBar />
                </Container>
            </div>
        </footer>
    );
};

export default Footer;
