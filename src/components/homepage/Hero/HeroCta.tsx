import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroCtaProps {
  label: string;
  href: string;
}

export const HeroCta: React.FC<HeroCtaProps> = ({ label, href }) => {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3.5 rounded-sm border border-white py-2 pl-4 pr-2 transition-colors duration-300 hover:bg-white/10"
    >
      <span className="font-outfit text-[clamp(0.875rem,1vw,1rem)] font-medium leading-5 text-white">
        {label}
      </span>
      <span className="flex size-6 shrink-0 items-center justify-center rounded-[3px] bg-white transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight className="size-3.5 stroke-[2.2] text-base-color" />
      </span>
    </Link>
  );
};

export default HeroCta;
