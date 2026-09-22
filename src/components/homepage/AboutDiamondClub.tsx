"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "../ui/CustomUi/Container";
import RevealText from "../ui/CustomUi/animation/RevealText";

export const AboutDiamondClub = () => {
  return (
    <section className="w-full bg-[#0a2540] py-20 sm:py-28 lg:py-36">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="lg:w-96 lg:shrink-0">
          <span className="inline-flex items-center gap-2.5 font-outfit text-sm font-medium text-stone-200">
            <span className="size-1.25 shrink-0 rounded-full bg-stone-200" />
            About Diamond Club
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-10">
          <RevealText
            text="Diamond Club Vacations brings together five-diamond resorts, exceptional kosher dining and thoughtful programming for every generation, so every guest feels cared for from the moment they book until they return home."
            className="font-cormorant text-[clamp(1.75rem,3.5vw,3rem)] font-normal leading-[1.2]"
          />

          <div className="flex w-full justify-end">
            <Link
              href="/inquire"
              className="inline-flex items-center gap-3.5 rounded-sm border border-white py-2 pl-4 pr-2 font-outfit text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Talk to our concierge
              <span className="flex size-6 items-center justify-center rounded-[3px] bg-white">
                <ArrowRight className="size-3.5 stroke-[2.2] text-base-color" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutDiamondClub;
