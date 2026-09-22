"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { InquireButtonProps } from "./navbar.types";

export const InquireButton: React.FC<InquireButtonProps> = ({
  className,
  label = "Inquire",
  openInNewTab = true,
  onClick,
}) => {
  return (
    <Link
      href="/inquire"
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-between gap-3.5",
        "bg-[#00549C] hover:bg-[#00427c] text-white",
        "pl-4 pr-2 py-2 rounded-[4px] transition-all duration-300 ease-out",
        "shadow-sm hover:shadow-md active:scale-[0.98]",
        "font-[family-name:var(--font-outfit)] font-outfit font-medium text-[15px] leading-5 tracking-normal select-none",
        className
      )}
    >
      <span className="font-[family-name:var(--font-outfit)] font-outfit">{label}</span>
      <div className="size-[26px] bg-white rounded-[3px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight className="size-3.5 text-[#00549C] stroke-[2.2]" />
      </div>
    </Link>
  );
};

export default InquireButton;
