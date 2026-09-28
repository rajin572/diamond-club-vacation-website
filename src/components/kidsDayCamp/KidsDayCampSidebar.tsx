"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview" },
  { id: "our-team", label: "Our team" },
  { id: "programs", label: "Programs" },
  { id: "age-groups", label: "Age groups" },
  { id: "childrens-dining", label: "Children’s dining" },
  { id: "babysitting", label: "Babysitting" },
];

interface KidsDayCampSidebarProps {
  onAskAboutKidsProgram?: () => void;
}

export const KidsDayCampSidebar: React.FC<KidsDayCampSidebarProps> = ({
  onAskAboutKidsProgram,
}) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-28 space-y-6">
      <div className="text-neutral-500 text-sm font-medium font-outfit uppercase tracking-wider">
        On this page
      </div>

      {/* Nav List */}
      <nav aria-label="Page navigation" className="flex flex-col">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left pl-3.5 py-3 transition-colors duration-200 font-outfit text-base ${isActive
                ? "border-l-2 border-[#00549c] text-neutral-900 font-medium bg-[#00549c]/5"
                : "border-l border-neutral-900/10 text-zinc-600 font-normal hover:text-neutral-900 hover:border-neutral-900/30"
                }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Primary CTA Button matching Figma */}
      <button
        type="button"
        onClick={onAskAboutKidsProgram}
        className="group w-full inline-flex items-center justify-between pl-4 pr-2 py-2.5 bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 rounded-sm text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-sm hover:shadow"
      >
        <span>Ask about the kids program</span>
        <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
        </span>
      </button>
    </aside>
  );
};

export default KidsDayCampSidebar;
