"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/CustomUi/Container";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap-util";
import FooterBrand from "./Footer/FooterBrand";
import FooterLinkColumn from "./Footer/FooterLinkColumn";
import FooterWordmark from "./Footer/FooterWordmark";
import FooterBottomBar from "./Footer/FooterBottomBar";
import { FOOTER_COLUMNS } from "./Footer/footer.data";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!footerRef.current || prefersReducedMotion()) return;

      const navColumns = navRef.current
        ? navRef.current.querySelectorAll(".footer-column-item")
        : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          toggleActions: "restart none none reverse",
        },
        defaults: { ease: "premiumOut" },
      });

      // 1. Brand column (Logo + Tagline)
      if (brandRef.current) {
        tl.fromTo(
          brandRef.current,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          0
        );
      }

      // 2. Navigation Columns (Staggered entrance)
      if (navColumns.length > 0) {
        tl.fromTo(
          navColumns,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          0.12
        );
      }

      // 3. Fine divider line expands horizontally
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, autoAlpha: 0 },
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.85,
            transformOrigin: "left center",
          },
          0.25
        );
      }

      // 4. Large editorial wordmark reveals smoothly
      if (wordmarkRef.current) {
        tl.fromTo(
          wordmarkRef.current,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            clearProps: "transform",
          },
          0.35
        );
      }

      // 5. Bottom legal bar and copyright
      if (bottomBarRef.current) {
        tl.fromTo(
          bottomBarRef.current,
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0.45
        );
      }
    },
    { scope: footerRef, dependencies: [pathname] }
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full bg-[#F2F0EC] text-base-color"
    >
      <Container className="flex flex-col gap-8 pb-6 pt-16 sm:gap-10 sm:pb-8 sm:pt-20 lg:pt-24">
        {/* Brand + sitemap / collection / social / contact columns */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          <div ref={brandRef} className="w-full lg:w-80 shrink-0">
            <FooterBrand />
          </div>

          <nav
            ref={navRef}
            aria-label="Footer"
            className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:flex lg:flex-1 lg:gap-8"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div
                key={column.id}
                className="footer-column-item lg:flex-1 min-w-0"
              >
                <FooterLinkColumn column={column} />
              </div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="h-px w-full bg-base-color/20"
        />

        {/* Large Editorial Wordmark */}
        <div ref={wordmarkRef} className="w-full overflow-hidden">
          <FooterWordmark />
        </div>

        {/* Bottom Bar: Legal links & Copyright */}
        <div ref={bottomBarRef} className="w-full">
          <FooterBottomBar />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
