"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Mail } from "lucide-react";
import { AllImages } from "../../public/images/AllImages";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Diamond Club Vacations runtime error:", error);
  }, [error]);

  const handleContact = () => {
    const subject = encodeURIComponent("Diamond Club Vacations - Concierge Support Request");
    const body = encodeURIComponent(
      `Dear Diamond Club Concierge,\n\nI encountered an issue on the website.\n\nError Message: ${error.message}\nDigest Code: ${error.digest || "N/A"}\nPage URL: ${typeof window !== "undefined" ? window.location.href : ""}`
    );
    window.location.href = `mailto:support@diamondclubvacation.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a2540] px-4 py-12 sm:px-6">
      {/* Subtle Ambient Decorative Glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[32rem] rounded-full bg-[#BD9343]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[32rem] rounded-full bg-[#00549C]/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[40rem] rounded-full bg-[#0c2e50]/40 blur-[140px]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Main Error Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c2e50]/90 p-7 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
          {/* Top Hairline Gold Accent Bar */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#BD9343]/70 to-transparent" />

          {/* Brand Logo */}
          <div className="mb-6 flex justify-center">
            <Link
              href="/"
              className="relative inline-block transition-transform duration-300 hover:scale-105"
            >
              <div className="relative size-16 overflow-hidden rounded-full border border-[#BD9343]/30 bg-white/5 p-2 shadow-inner">
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

          {/* Refined Luxury Icon */}
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl border border-[#BD9343]/30 bg-[#BD9343]/10 text-[#BD9343]">
            <AlertCircle className="size-6 stroke-[1.8]" />
          </div>

          {/* Heading */}
          <h1 className="mb-3 font-cormorant text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide text-white">
            An Unexpected Interruption
          </h1>

          {/* Error Message */}
          <p className="mx-auto mb-6 max-w-md font-outfit text-sm font-light leading-relaxed text-stone-300 sm:text-base">
            We encountered an unexpected issue while loading this experience.
            Our concierge team has been notified and is attending to it.
          </p>

          {/* Dev Mode Details */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-6 rounded-xl border border-white/10 bg-black/40 p-4 text-left shadow-inner">
              <div className="mb-2 flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                <span className="font-outfit text-[11px] font-semibold tracking-wider text-stone-400 uppercase">
                  Error Details (Dev Mode)
                </span>
                {error.digest && (
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] font-medium text-stone-300">
                    ID: {error.digest.slice(0, 8)}
                  </span>
                )}
              </div>
              <p className="max-h-36 overflow-y-auto font-mono text-xs leading-relaxed text-rose-400 break-words">
                {error.message || "An unknown runtime error occurred."}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              type="button"
              className="inline-flex w-full sm:flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-[#00549C] bg-[#00549C] px-5 py-3 font-outfit text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-[#00437d] hover:border-[#00437d] active:scale-[0.98]"
            >
              <RotateCcw className="size-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/5 px-5 py-3 font-outfit text-sm font-medium text-stone-200 transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
            >
              <Home className="size-4" />
              Return to Home
            </Link>
          </div>

          {/* Concierge Support Link */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-2 font-outfit text-xs font-light text-stone-400 sm:text-sm">
              Require personalized concierge assistance?
            </p>
            <button
              onClick={handleContact}
              type="button"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 font-outfit text-xs font-medium text-[#BD9343] transition-colors hover:text-[#e0b764] sm:text-sm"
            >
              <Mail className="size-4 transition-transform group-hover:scale-110" />
              <span>support@diamondclubvacation.com</span>
            </button>
          </div>
        </div>

        {/* Error Digest Footer */}
        {error.digest && (
          <div className="mt-4 text-center">
            <p className="font-mono text-xs text-stone-500">
              Reference Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
