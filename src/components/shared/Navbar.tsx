"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-util";
import { AllImages } from "../../../public/images/AllImages";
import Container from "../ui/CustomUi/Container";
import InquireButton from "./Navbar/InquireButton";
import NavMenu from "./Navbar/NavMenu";
import HoverStaggerText from "../ui/CustomUi/animation/HoverStaggerText";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const hiddenRef = useRef(false);
    const isMenuOpenRef = useRef(false);

    useEffect(() => {
        isMenuOpenRef.current = isMenuOpen;
    }, [isMenuOpen]);

    useGSAP(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 15);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        // Same scroll-direction logic as the previous navbar: pinned near the
        // top, hidden while scrolling down, revealed while scrolling back up.
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                const shouldHide =
                    self.scroll() < 10 ? false : self.direction === 1;

                if (shouldHide === hiddenRef.current || isMenuOpenRef.current) return;
                hiddenRef.current = shouldHide;

                gsap.to(headerRef.current, {
                    yPercent: shouldHide ? -100 : 0,
                    duration: 0.4,
                    ease: "power3.out",
                });
            },
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Never leave the bar hidden behind an open fullscreen menu
    useGSAP(() => {
        if (!isMenuOpen || !hiddenRef.current) return;
        hiddenRef.current = false;
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.3, ease: "power3.out" });
    }, [isMenuOpen]);

    return (
        <>
            <header
                ref={headerRef}
                className={cn(
                    "w-full transition-colors duration-300 ease-out z-50",
                    isScrolled
                        ? "bg-[#FCFCFB]/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-black/[0.04]"
                        : "bg-[#FCFCFB]/00 backdrop-blur-xs"
                )}
            >
                <Container className="py-2">
                    <div className="w-full flex items-center justify-between gap-4">
                        {/* Left Column: Menu Button */}
                        <div className="w-40 sm:w-56 md:w-60 flex justify-start items-center">
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(true)}
                                aria-label="Open Navigation Menu"
                                aria-expanded={isMenuOpen}
                                className={cn(
                                    "group flex items-center gap-2.5 cursor-pointer py-1.5 px-1",
                                    "text-[#131313] hover:text-[#00549C] transition-colors duration-200",
                                    "outline-none focus-visible:ring-2 focus-visible:ring-[#00549C] rounded"
                                )}
                            >
                                <HoverStaggerText
                                    text="Menu"
                                    idleColor="#131313"
                                    hoverColor="#00549C"
                                    className="font-[family-name:var(--font-outfit)] font-outfit font-medium text-sm sm:text-base leading-6 tracking-normal"
                                />
                                <div className="size-4 sm:size-[18px] flex items-center justify-center relative">
                                    <Plus className="size-4 stroke-[2.2] transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
                                </div>
                            </button>
                        </div>

                        {/* Center Column: Circular Logo */}
                        <div className="flex-1 flex justify-center items-center">
                            <Link
                                href="/"
                                aria-label="Diamond Club Vacations Home"
                                className="group inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
                            >
                                <Image
                                    src={AllImages.logo}
                                    alt="Diamond Club Vacations"
                                    width={64}
                                    height={64}
                                    priority
                                    className="size-12 sm:size-14 md:size-16 object-contain"
                                />
                            </Link>
                        </div>

                        {/* Right Column: Inquire Action */}
                        <div className="w-40 sm:w-56 md:w-60 flex justify-end items-center">
                            <InquireButton />
                        </div>
                    </div>
                </Container>
            </header>

            {/* Fullscreen Overlay Navigation Menu */}
            <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Navbar;
