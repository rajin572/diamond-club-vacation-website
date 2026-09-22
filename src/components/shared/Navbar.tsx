"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap-util";
import { AllImages } from "../../../public/images/AllImages";
import Link from "next/link";
import Container from "../ui/CustomUi/Container";

// Single-page marketing site, so these are in-page anchors rather than routes —
// the app has exactly one route (`/`). The target sections still need matching
// ids as they're built.
const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Membership", href: "#membership" },
    { label: "Resorts", href: "#resorts" },
    { label: "Contact", href: "#contact" },
] as const;

const socials = [
    { label: "facebook", href: "#" },
    { label: "instagram", href: "#" },
    { label: "youtube", href: "#" },
] as const;
const Navbar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const navWrapperRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(HTMLDivElement | null)[]>([]);
    const contactRef = useRef<HTMLDivElement>(null);
    const topLineRef = useRef<HTMLSpanElement>(null);
    const bottomLineRef = useRef<HTMLSpanElement>(null);

    const navTl = useRef<gsap.core.Timeline | null>(null);
    const iconTl = useRef<gsap.core.Timeline | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [scrollHidden, setScrollHidden] = useState(false);

    useGSAP(
        () => {
            // x:0 is load-bearing. The panel ships with an inline translateX(100%)
            // so it doesn't flash on reload, but getComputedStyle reports that as a
            // pixel matrix, so GSAP parses it into `x` — and xPercent:100 would then
            // stack on top of it, parking the panel at 200% and leaving it off-screen
            // even when the menu opens. Zeroing x keeps the offset purely percentage.
            gsap.set(navRef.current, { x: 0, xPercent: 100 });
            gsap.set([linksRef.current, contactRef.current], {
                autoAlpha: 0,
                x: -20,
            });

            navTl.current = gsap
                .timeline({ paused: true })
                .to(navRef.current, {
                    xPercent: 0,
                    duration: 1,
                    ease: "power3.out",
                })
                .to(
                    linksRef.current,
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                    },
                    "<"
                )
                .to(
                    contactRef.current,
                    {
                        autoAlpha: 1,
                        x: 0,
                        duration: 0.5,
                        ease: "power2.out",
                    },
                    "<+0.2"
                );

            iconTl.current = gsap
                .timeline({ paused: true })
                .to(topLineRef.current, {
                    rotate: 45,
                    y: 3.3,
                    duration: 0.3,
                    ease: "power3.inOut",
                })
                .to(
                    bottomLineRef.current,
                    {
                        rotate: -45,
                        y: -3.3,
                        duration: 0.3,
                        ease: "power3.inOut",
                    },
                    "<"
                );

            ScrollTrigger.create({
                start: "top top",
                end: "max",
                onUpdate: (self) => {
                    if (self.scroll() < 10) { setScrollHidden(false); return; }
                    setScrollHidden(self.direction === 1);
                },
            });
        },
        { scope: containerRef }
    );

    const toggleMenu = () => {
        if (!navTl.current || !iconTl.current) return;

        if (isOpen) {
            navTl.current.reverse();
            iconTl.current.reverse();
        } else {
            navTl.current.play();
            iconTl.current.play();
        }
        setIsOpen((prev) => !prev);
    };

    const closeMenu = () => {
        if (!isOpen) return;
        navTl.current?.reverse();
        iconTl.current?.reverse();
        setIsOpen(false);
    };


    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (navRef.current?.contains(target)) return;
            if (navWrapperRef.current?.contains(target)) return;

            navTl.current?.reverse();
            iconTl.current?.reverse();
            setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);


    const showBurger = isOpen || !scrollHidden;
    const clipPath = showBurger
        ? "circle(100% at 50% 50%)"
        : "circle(0% at 50% 50%)";

    return (
        <div ref={containerRef} >


            <nav
                ref={navRef}
                // Starts off-screen in the server-rendered markup, matching the
                // xPercent:100 useGSAP applies on mount. Without it the panel paints
                // on-screen and only jumps away once React hydrates — the reload flash.
                //
                // Inline transform, not Tailwind's translate-x-full: v4 compiles that
                // to the standalone `translate` property, which composes with GSAP's
                // `transform` instead of being replaced by it, so the panel would stay
                // shifted 100% away even when the menu opens.
                style={{ transform: "translateX(100%)" }}
                className="fixed z-999999! flex flex-col justify-between w-full h-full px-6 md:px-10 uppercase bg-brand-text text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2"
            >
                <div className="flex flex-col text-4xl gap-y-2 md:text-5xl">
                    {NAV_ITEMS.map(({ label, href }, index) => (
                        <div
                            key={label}
                            ref={(el) => {
                                linksRef.current[index] = el;
                            }}
                            onClick={closeMenu}
                        >
                            <Link
                                href={href}
                                className="transition-all duration-700 cursor-pointer hover:text-white hover:tracking-[0.5rem] ease-in-out"
                            >
                                {label}
                            </Link>
                        </div>
                    ))}
                </div>

                <div
                    ref={contactRef}
                    className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
                >
                    <div className="font-light">
                        <p className="tracking-wider text-white/50">E-mail</p>
                        <p className="text-xl tracking-widest lowercase text-pretty">
                            support@diamondclubvacation.com
                        </p>
                    </div>

                    <div className="font-light">
                        <p className="tracking-wider text-white/50">Phone</p>
                        <p className="text-xl tracking-widest text-pretty">
                            +1 (555) 010-0142
                        </p>
                    </div>

                    <div className="font-light">
                        <p className="tracking-wider text-white/50">Social Media</p>
                        <div className="flex flex-wrap gap-x-3">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                                >
                                    {`[${social.label}]`}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <Container>
                <div
                    ref={navWrapperRef}
                    // Deliberately not fixed: the layout already pins the navbar to
                    // the top. Fixing it here too took it out of Container's flow —
                    // it kept its static left edge but sized w-full against the
                    // viewport, so its right edge (and the burger) overhung the
                    // screen by the container's own inset.
                    className={`relative w-full z-999999! flex flex-row items-center justify-between py-1 ${!showBurger ? "pointer-events-none" : ""}`}
                >
                    <div
                        className="transition-[clip-path] duration-500 ease-in-out pt-0.5"
                        style={{ clipPath }}
                    >
                        <Link
                            href="/"
                            className="block cursor-pointer bg-transparent border-0 p-0"
                        >
                            <Image
                                width={1000}
                                height={1000}
                                src={AllImages?.logo}
                                alt="Logo"
                                sizes="(max-width: 768px) 50vw, 100vw"
                                className="w-10 md:w-12 lg:w-14"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">

                        <button
                            type="button"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            onClick={toggleMenu}
                            className="flex flex-col items-center justify-center gap-1 transition-[clip-path] duration-500 ease-in-out bg-brand-text rounded-full cursor-pointer w-9 h-9 md:w-11 md:h-11"
                            style={{ clipPath }}
                        >
                            <span
                                ref={topLineRef}
                                className="block w-5 md:w-7 h-0.5 bg-white rounded-full origin-center"
                            />
                            <span
                                ref={bottomLineRef}
                                className="block w-5 md:w-7 h-0.5 bg-white rounded-full origin-center"
                            />
                        </button>
                    </div>
                </div>
            </Container>
        </div>

    );
};

export default Navbar;
