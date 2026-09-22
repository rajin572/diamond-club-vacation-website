"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, MessageSquare } from "lucide-react";
import { AllImages } from "../../public/images/AllImages";

export default function NotFound() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a2540] px-4 py-16 sm:px-6">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-[#BD9343]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-[#00549C]/25 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[44rem] rounded-full bg-[#0c2e50]/40 blur-[160px]" />

      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            href="/"
            className="relative inline-block transition-transform duration-300 hover:scale-105"
          >
            <div className="relative size-20 overflow-hidden rounded-full border border-[#BD9343]/30 bg-white/5 p-2 shadow-inner">
              <Image
                src={AllImages.logo}
                alt="Diamond Club Vacations Logo"
                fill
                className="object-contain p-1 invert"
                priority
              />
            </div>
          </Link>
        </div>

        {/* 404 Accent */}
        <div className="relative mb-2">
          <span className="font-cormorant text-8xl sm:text-9xl font-light tracking-widest text-[#BD9343]/90 select-none">
            404
          </span>
          <div className="mx-auto mt-2 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#BD9343] to-transparent" />
        </div>

        {/* Heading */}
        <h1 className="mt-4 font-cormorant text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-white">
          Destination Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md font-outfit text-sm font-light leading-relaxed text-stone-300 sm:text-base">
          The page or destination you are seeking cannot be found or may have been relocated.
          Allow our concierge to guide you back to our curated vacations.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#00549C] bg-[#00549C] px-6 py-3 font-outfit text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[#00437d] hover:border-[#00437d] active:scale-[0.98]"
          >
            <Home className="size-4" />
            Return to Home
          </Link>

          <Link
            href="/inquire"
            className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-3 font-outfit text-sm font-medium text-stone-200 transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
          >
            <MessageSquare className="size-4 text-[#BD9343]" />
            Talk to Concierge
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex cursor-pointer items-center gap-2 font-outfit text-xs font-medium tracking-widest text-stone-400 uppercase transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
}