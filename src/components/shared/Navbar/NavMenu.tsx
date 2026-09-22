"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap-util";
import { AllImages } from "../../../../public/images/AllImages";
import InquireButton from "./InquireButton";
import NavPrimaryLinks from "./NavPrimaryLinks";
import NavFooterLinks from "./NavFooterLinks";
import HoverStaggerText from "@/components/ui/CustomUi/animation/HoverStaggerText";
import { cn } from "@/lib/utils";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageColumnRef = useRef<HTMLDivElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Esc key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // GSAP Entrance / Exit Animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Individual primary links, so they stagger in one at a time — same
      // treatment the previous navbar gave its nav items.
      const navRoot = linksContainerRef.current?.firstElementChild ?? null;
      const linkEls = navRoot ? Array.from(navRoot.children) : [];

      // Create fresh timeline
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Set initial states
      gsap.set(overlayRef.current, { display: "flex", autoAlpha: 0 });
      gsap.set(imageColumnRef.current, { autoAlpha: 0, scale: 0.97 });
      gsap.set(menuPanelRef.current, { autoAlpha: 0, y: 15 });
      gsap.set(linkEls, { autoAlpha: 0, x: -20 });
      gsap.set(footerContainerRef.current, { autoAlpha: 0, x: -20 });

      tl.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.35,
        ease: "power2.out",
      })
        .to(
          imageColumnRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          menuPanelRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          linkEls,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.25"
        )
        .to(
          footerContainerRef.current,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "<+0.2"
        );
    } else {
      if (overlayRef.current && overlayRef.current.style.display !== "none") {
        gsap.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      style={{ display: "none" }}
      className={cn(
        "fixed inset-0 z-[999999] w-screen h-screen bg-[#FCFCFB] text-[#131313]",
        "flex flex-col lg:flex-row justify-start items-stretch overflow-hidden",
        "select-none"
      )}
    >
      {/* Left Column: Visual Image (Desktop & Large screens) */}
      <div
        ref={imageColumnRef}
        className="hidden lg:flex w-[42%] xl:w-[44%] max-w-[620px] 2xl:max-w-[700px] h-full p-5 self-stretch shrink-0"
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-sm">
          <Image
            src={AllImages.menuImage}
            alt="Diamond Club Vacations Luxury Resort"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover object-center w-full h-full transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>

      {/* Right Column: Menu Panel */}
      <div
        ref={menuPanelRef}
        className={cn(
          "flex-1 flex flex-col justify-between self-stretch",
          "px-6 pt-6 pb-14 sm:px-10 sm:pt-8 sm:pb-12 lg:pl-16 lg:pr-12 lg:pt-7 lg:pb-12 xl:pl-24 xl:pr-16",
          "overflow-y-auto scrollbar-none h-full"
        )}
      >
        {/* Top bar: Close & Inquire */}
        <div className="w-full flex items-center justify-between gap-4 self-stretch shrink-0 pb-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="group flex items-center gap-2.5 cursor-pointer text-[#131313] hover:text-[#00549C] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#00549C] rounded px-1"
          >
            <HoverStaggerText
              text="Close"
              idleColor="#131313"
              hoverColor="#00549C"
              className="font-[family-name:var(--font-outfit)] font-outfit font-medium text-base leading-6"
            />
            <div className="size-4 relative flex items-center justify-center">
              <X className="size-4 stroke-[2.2] transition-transform duration-300 group-hover:rotate-90" />
            </div>
          </button>

          <InquireButton onClick={onClose} />
        </div>

        {/* Primary Links */}
        <div ref={linksContainerRef} className="my-auto py-4">
          <NavPrimaryLinks onLinkClick={onClose} />
        </div>

        {/* Secondary 3-Column Footer */}
        <div ref={footerContainerRef} className="shrink-0 mt-auto pt-4">
          <NavFooterLinks onLinkClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
