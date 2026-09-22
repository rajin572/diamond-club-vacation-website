"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface InquireSuccessProps {
  firstName: string;
}

const generateReference = () => {
  const year = new Date().getFullYear();
  const suffix = Math.floor(10000 + Math.random() * 90000);
  return `DCV-${year}-${suffix}`;
};

export const InquireSuccess: React.FC<InquireSuccessProps> = ({ firstName }) => {
  const [reference] = useState(generateReference);

  return (
    <div className="flex w-full flex-col items-center gap-6 py-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary-color/10">
        <Check className="size-7 stroke-[2.2] text-secondary-color" />
      </span>

      <h1 className="font-cormorant text-[clamp(2.5rem,5vw,4rem)] font-normal text-base-color">
        Thank you, <span className="italic">{firstName || "there"}</span>
      </h1>

      <p className="max-w-md font-outfit text-base text-base-secondary-color">
        Your inquiry is with our team. We reply within one business day, usually sooner.
      </p>

      <div className="flex items-center gap-2 rounded-md bg-[#F5F4F1] px-5 py-3">
        <span className="font-outfit text-sm text-base-secondary-color">Reference</span>
        <span className="font-outfit text-sm font-semibold text-base-color">{reference}</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-3.5 rounded-sm bg-secondary-color py-2 pl-4 pr-2 font-outfit text-base font-medium text-white transition-colors hover:bg-[#00427c]"
        >
          Back to home
          <span className="flex size-6 items-center justify-center rounded-[3px] bg-white">
            <ArrowRight className="size-3.5 stroke-[2.2] text-secondary-color" />
          </span>
        </Link>
        <Link
          href="/#passover-2027"
          className="inline-flex items-center gap-3.5 rounded-sm border border-secondary-color py-2 pl-4 pr-2 font-outfit text-base font-medium text-secondary-color"
        >
          Explore the programs
          <span className="flex size-6 items-center justify-center rounded-[3px] bg-secondary-color">
            <ArrowRight className="size-3.5 stroke-[2.2] text-white" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default InquireSuccess;
