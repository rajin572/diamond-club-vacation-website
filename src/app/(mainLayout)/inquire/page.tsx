import React, { Suspense } from "react";
import type { Metadata } from "next";
import InquireWizard from "@/components/inquire/InquireWizard";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Plan your vacation in six short steps -- Passover 2027, Sukkot 2026, or a private event with Diamond Club Vacations.",
};

export default function InquirePage() {
  return (
    <div className="w-full min-h-[calc(100vh)] bg-background-color">
      <Suspense
        fallback={
          <div className="w-full py-32 flex items-center justify-center font-outfit text-zinc-500">
            Loading inquiry form...
          </div>
        }
      >
        <InquireWizard />
      </Suspense>
    </div>
  );
}
