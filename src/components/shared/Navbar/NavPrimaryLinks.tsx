"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV_ITEMS } from "./navbar.data";
import { NavLinkItem } from "./navbar.types";
import { cn } from "@/lib/utils";
import { HoverStaggerText } from "@/components/ui/CustomUi/animation/HoverStaggerText";

interface NavPrimaryLinksProps {
  onLinkClick?: () => void;
  className?: string;
}

// Splits "/#casa-nizuc" into its path ("/") and hash ("casa-nizuc") so an
// item's active state can be checked against the current pathname + hash
// instead of being hardcoded on a single item.
const parseHref = (href: string) => {
  const [path, hash = ""] = href.split("#");
  return { path: path || "/", hash };
};

export const NavPrimaryLinks: React.FC<NavPrimaryLinksProps> = ({
  onLinkClick,
  className,
}) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.slice(1));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "flex flex-col justify-center items-start gap-1.5 sm:gap-2.5 my-auto py-4 sm:py-6",
        className
      )}
    >
      {PRIMARY_NAV_ITEMS.map((item: NavLinkItem) => {
        const { path, hash: itemHash } = parseHref(item.href);
        const isActive = path === pathname && (itemHash ? itemHash === hash : !hash);

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
                idleColor={isActive ? "#131313" : "rgba(19,19,19,0.9)"}
                hoverColor="#00549C"
                variant="display"
              />
              {isActive && (
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
