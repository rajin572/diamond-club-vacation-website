"use client";

import React from "react";
import Link from "next/link";
import { FOOTER_NAV_COLUMNS } from "./navbar.data";
import { NavFooterColumn } from "./navbar.types";
import HoverStaggerText from "@/components/ui/CustomUi/animation/HoverStaggerText";
import { cn } from "@/lib/utils";

interface NavFooterLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

export const NavFooterLinks: React.FC<NavFooterLinksProps> = ({
  onLinkClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full pt-6 sm:pt-7 border-t border-[#131313]/14",
        "grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-14 xl:gap-16",
        className
      )}
    >
      {FOOTER_NAV_COLUMNS.map((col: NavFooterColumn) => (
        <div key={col.id} className="flex flex-col items-start gap-2.5 sm:gap-3">
          <span className="text-[#8C877E] text-[13px] sm:text-sm font-normal font-[family-name:var(--font-outfit)] font-outfit leading-5 select-none">
            {col.title}
          </span>
          <div className="flex flex-col items-start gap-1 sm:gap-1.5">
            {col.links.map((link) => {
              const isExternal = link.isExternal || link.href.startsWith("http");
              const isTelOrMail = link.href.startsWith("tel:") || link.href.startsWith("mailto:");

              if (isExternal || isTelOrMail) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={onLinkClick}
                    className="group inline-flex text-sm sm:text-[15px] font-normal font-[family-name:var(--font-outfit)] font-outfit leading-6 transition-colors duration-200"
                  >
                    <HoverStaggerText
                      text={link.label}
                      idleColor="#131313"
                      hoverColor="#00549C"
                      duration={0.32}
                      stagger={0.015}
                    />
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onLinkClick}
                  className="group inline-flex text-sm sm:text-[15px] font-normal font-[family-name:var(--font-outfit)] font-outfit leading-6 transition-colors duration-200"
                >
                  <HoverStaggerText
                    text={link.label}
                    idleColor="#131313"
                    hoverColor="#00549C"
                    duration={0.32}
                    stagger={0.015}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavFooterLinks;
