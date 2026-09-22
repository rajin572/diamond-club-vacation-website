"use client";

import React from "react";
import Link from "next/link";
import { PRIMARY_NAV_ITEMS } from "./navbar.data";
import { NavLinkItem } from "./navbar.types";
import { cn } from "@/lib/utils";
import { HoverStaggerText } from "@/components/ui/CustomUi/animation/HoverStaggerText";

interface NavPrimaryLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

export const NavPrimaryLinks: React.FC<NavPrimaryLinksProps> = ({
  onLinkClick,
  className,
}) => {
  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "flex flex-col justify-center items-start gap-1.5 sm:gap-2.5 my-auto py-4 sm:py-6",
        className
      )}
    >
      {PRIMARY_NAV_ITEMS.map((item: NavLinkItem) => {
        return (
          <div key={item.id} className="group relative">
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "inline-flex items-center gap-4 sm:gap-5",
                "font-[family-name:var(--font-cormorant)] font-cormorant font-light text-[clamp(2.25rem,4.6vw,4.5rem)]",
                "leading-[clamp(2.75rem,5.2vw,5.1rem)] tracking-[-0.015em]",
                item.isItalic ? "italic" : "not-italic"
              )}
            >
              <HoverStaggerText
                text={item.label}
                idleColor={item.hasActiveDot ? "#131313" : "rgba(19,19,19,0.9)"}
                hoverColor="#00549C"
                variant="display"
              />
              {item.hasActiveDot && (
                <span
                  aria-hidden="true"
                  className="size-2 sm:size-2.5 bg-[#00549C] rounded-full inline-block shrink-0 animate-pulse"
                />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default NavPrimaryLinks;
