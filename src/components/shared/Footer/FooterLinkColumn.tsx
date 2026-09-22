import React from "react";
import Link from "next/link";
import HoverStaggerText from "@/components/ui/CustomUi/animation/HoverStaggerText";
import { cn } from "@/lib/utils";
import { NavFooterColumn } from "../Navbar/navbar.types";

interface FooterLinkColumnProps {
  column: NavFooterColumn;
  className?: string;
}

export const FooterLinkColumn: React.FC<FooterLinkColumnProps> = ({ column, className }) => {
  return (
    <div className={cn("flex flex-col items-start gap-3 sm:gap-4", className)}>
      <span className="select-none font-outfit text-[clamp(0.8125rem,1vw,0.875rem)] font-normal leading-5 text-[#8C877E]">
        {column.title}
      </span>
      <div className="flex flex-col items-start gap-2">
        {column.links.map((link) => {
          const isExternal = link.isExternal || link.href.startsWith("http");
          const isTelOrMail = link.href.startsWith("tel:") || link.href.startsWith("mailto:");
          const linkClassName =
            "group inline-flex font-outfit text-[clamp(0.9375rem,1.05vw,1rem)] font-normal leading-6 transition-colors duration-200";

          if (isExternal || isTelOrMail) {
            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={linkClassName}
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
            <Link key={link.label} href={link.href} className={linkClassName}>
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
  );
};

export default FooterLinkColumn;
