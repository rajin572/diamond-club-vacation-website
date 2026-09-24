"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../../ui/CustomUi/Container";
import { RESERVE_NAV_TABS } from "../diamondClubReserve.data";
import { cn } from "@/lib/utils";

export const ReserveTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("about-this-event");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = RESERVE_NAV_TABS.map((t) => t.id);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveTab(sectionIds[i]);
            return;
          }
        }
      }
      setActiveTab("about-this-event");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveTab(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full border-t border-b border-neutral-900/10 bg-[#FCFCFB] sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
      <Container>
        <div className="w-full flex items-center justify-between gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* Navigation Links */}
          <nav
            aria-label="Reserve In-page Sections"
            className="flex items-center gap-6 sm:gap-10 shrink-0"
          >
            {RESERVE_NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "py-5 relative font-outfit text-sm sm:text-base transition-colors duration-200 cursor-pointer shrink-0 whitespace-nowrap",
                    isActive
                      ? "text-neutral-900 font-medium"
                      : "text-zinc-600 font-normal hover:text-neutral-900"
                  )}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00549c]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Inquire Button */}
          <div className="py-2.5 shrink-0 hidden sm:block">
            <Link
              href="/inquire?program=reserve"
              className="group relative inline-flex items-center gap-3 pl-4 pr-2 py-2 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm font-medium leading-5 active:scale-98"
            >
              <span>Inquire</span>
              <span className="size-5 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-3 text-[#00549c] stroke-[2.2]" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ReserveTabs;
