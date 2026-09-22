import React from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/CustomUi/Container";
import InquireForm from "@/components/inquire/InquireForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Request exclusive details, rates, and personalized itineraries for Passover 2027, luxury villas, and private events with Diamond Club Vacations.",
};

export default function InquirePage() {
  return (
    <div className="w-full min-h-[calc(100vh-100px)] pt-28 sm:pt-32 md:pt-36 pb-20 bg-[#FCFCFB]">
      <Container className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <span className="font-['Outfit'] text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C877E]">
            Diamond Club Vacations
          </span>
          <h1 className="font-['Cormorant_Garamond'] font-light text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.1] text-[#131313] tracking-[-0.015em]">
            Plan Your Exclusive Escape
          </h1>
          <p className="font-['Outfit'] text-[clamp(0.95rem,1.2vw,1.1rem)] text-[#131313]/75 leading-relaxed">
            Connect with our dedicated vacation concierges to reserve your place for Passover 2027, private buyouts, or custom celebrations.
          </p>
        </div>

        {/* Form Container */}
        <InquireForm />
      </Container>
    </div>
  );
}

