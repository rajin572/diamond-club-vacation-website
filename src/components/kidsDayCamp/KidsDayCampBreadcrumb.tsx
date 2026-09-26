"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";

interface KidsDayCampBreadcrumbProps {
  programId?: string;
  programName?: string;
}

export const KidsDayCampBreadcrumb: React.FC<KidsDayCampBreadcrumbProps> = ({
  programId = "diamond-club-reserve",
  programName = "Diamond Club Reserve",
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full py-4 sm:py-5 border-b border-neutral-100 bg-[#FCFCFB]"
    >
      <Container>
        <ol className="flex items-center flex-wrap gap-2 text-sm font-outfit text-neutral-500">
          <li>
            <Link
              href="/"
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li>
            <Link
              href="/passover-collection-2027"
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              Passover 2027
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li>
            <Link
              href={`/passover-collection-2027/${programId}`}
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              {programName}
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li>
            <Link
              href={`/passover-collection-2027/${programId}/experiences/kids-program`}
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              Kids Program
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li className="text-neutral-900 font-medium truncate">
            Day Camp &amp; Teen Program
          </li>
        </ol>
      </Container>
    </nav>
  );
};

export default KidsDayCampBreadcrumb;
