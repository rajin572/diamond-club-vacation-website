"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import { offeringHref, programHref, resortHref } from "@/lib/routes";

interface ResortBreadcrumbProps {
  offeringId: string;
  offeringLabel?: string;
  programId: string;
  programTitle: string;
  resortId: string;
  resortName: string;
  currentPage?: string;
}

export const ResortBreadcrumb: React.FC<ResortBreadcrumbProps> = ({
  offeringId,
  offeringLabel = "Passover 2027",
  programId,
  programTitle,
  resortId,
  resortName,
  currentPage,
}) => {
  return (
    <div className="w-full py-4 sm:py-5 border-b border-[rgba(19,19,19,0.06)] bg-[#FCFCFB]">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-outfit text-[#5E6062] flex-wrap"
        >
          <Link
            href="/"
            className="hover:text-[#131313] transition-colors duration-150 focus:outline-none focus-visible:underline"
          >
            Home
          </Link>

          <span className="text-[#8C877E] select-none" aria-hidden="true">
            /
          </span>

          <Link
            href={offeringHref(offeringId)}
            className="hover:text-[#131313] transition-colors duration-150 focus:outline-none focus-visible:underline"
          >
            {offeringLabel}
          </Link>

          <span className="text-[#8C877E] select-none" aria-hidden="true">
            /
          </span>

          <Link
            href={programHref(offeringId, programId)}
            className="hover:text-[#131313] transition-colors duration-150 focus:outline-none focus-visible:underline"
          >
            {programTitle}
          </Link>

          <span className="text-[#8C877E] select-none" aria-hidden="true">
            /
          </span>

          {currentPage ? (
            <>
              <Link
                href={resortHref(offeringId, programId, resortId)}
                className="hover:text-[#131313] transition-colors duration-150 focus:outline-none focus-visible:underline"
              >
                {resortName}
              </Link>
              <span className="text-[#8C877E] select-none" aria-hidden="true">
                /
              </span>
              <span className="text-[#131313] font-medium" aria-current="page">
                {currentPage}
              </span>
            </>
          ) : (
            <span className="text-[#131313] font-medium" aria-current="page">
              {resortName}
            </span>
          )}
        </nav>
      </Container>
    </div>
  );
};

export default ResortBreadcrumb;
