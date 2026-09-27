"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";

interface EditionBreadcrumbProps {
  programId?: string;
  programTitle?: string;
  resortName?: string;
  currentPage?: string;
}

export const EditionBreadcrumb: React.FC<EditionBreadcrumbProps> = ({
  programId = "diamond-club-reserve",
  programTitle = "Diamond Club Reserve",
  resortName = "The Edition Resort",
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
            href="/passover-collection-2027"
            className="hover:text-[#131313] transition-colors duration-150 focus:outline-none focus-visible:underline"
          >
            Passover 2027
          </Link>

          <span className="text-[#8C877E] select-none" aria-hidden="true">
            /
          </span>

          <Link
            href={`/passover-collection-2027/${programId}`}
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
                href={`/passover-collection-2027/${programId}/resorts/edition`}
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

export default EditionBreadcrumb;
