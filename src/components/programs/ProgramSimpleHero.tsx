import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/CustomUi/Container";
import type { ProgramData } from "./programs.types";

interface ProgramSimpleHeroProps {
  data: ProgramData;
  inquireHref: string;
}

export const ProgramSimpleHero: React.FC<ProgramSimpleHeroProps> = ({ data, inquireHref }) => {
  return (
    <section className="relative w-full pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 overflow-hidden">
      <Container>
        <div className="relative w-full min-h-[460px] sm:min-h-[520px] rounded-xl md:rounded-2xl overflow-hidden flex flex-col justify-end items-start px-6 sm:px-10 md:px-16 pb-10 sm:pb-14 shadow-2xl">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={data.images.primary.src}
              alt={data.images.primary.alt}
              fill
              priority
              sizes="(max-width: 1550px) 100vw, 1550px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-slate-950/45 to-slate-950/90" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 select-none">
              <span className="size-[5px] rounded-full bg-stone-200 shrink-0" />
              <span className="font-outfit text-sm font-medium leading-5 text-stone-200">{data.badge}</span>
            </div>

            <h1 className="text-white font-cormorant font-light tracking-tight leading-[1.08] text-[clamp(2.5rem,5vw,5rem)] text-left">
              <span>{data.title.part1}</span>
              <span className="italic font-normal">{data.title.part2}</span>
            </h1>

            <p className="text-white/90 font-outfit text-base sm:text-lg md:text-xl font-normal leading-relaxed">
              {data.subtitle}
            </p>

            <div className="pt-2">
              <Link
                href={inquireHref}
                className="group relative inline-flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-sm bg-[#00549c] hover:bg-[#00427c] transition-all duration-300 text-white font-outfit text-sm sm:text-base font-medium leading-5 active:scale-98 shadow-lg shadow-black/20"
              >
                <span>Inquire about this program</span>
                <span className="size-6 bg-white rounded-[3px] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="size-3.5 text-[#00549c] stroke-[2.2]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramSimpleHero;
