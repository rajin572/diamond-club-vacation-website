import React from "react";
import Image from "next/image";
import Container from "@/components/ui/CustomUi/Container";
import type { ProgramData } from "./programs.types";

interface ProgramSimpleAboutProps {
  data: ProgramData;
}

export const ProgramSimpleAbout: React.FC<ProgramSimpleAboutProps> = ({ data }) => {
  return (
    <section className="w-full py-12 md:py-20">
      <Container>
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <h2 className="font-cormorant font-light text-neutral-900 tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl">
              About the program
            </h2>
            <p className="text-zinc-700 font-outfit text-base sm:text-lg leading-relaxed">{data.description}</p>

            <div className="w-full pt-4 flex flex-col gap-3">
              <h3 className="font-outfit text-neutral-900 text-sm font-semibold uppercase tracking-wider">
                Program Highlights
              </h3>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {data.highlights.map((h) => (
                  <div key={h.id} className="flex items-start gap-2.5">
                    <span className="size-4 shrink-0 flex items-center justify-center relative mt-1">
                      <span className="size-2 rotate-45 border-[1.5px] border-[#00549c] shrink-0" />
                    </span>
                    <span className="text-neutral-800 font-outfit text-sm sm:text-base font-normal leading-relaxed">
                      {h.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] rounded-lg overflow-hidden shadow-md">
            <Image
              src={data.images.secondary.src}
              alt={data.images.secondary.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProgramSimpleAbout;
