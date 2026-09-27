"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";
import { offeringHref, programHref } from "@/lib/routes";

interface ExperienceBreadcrumbProps {
  offeringId: string;
  offeringLabel?: string;
  programId: string;
  programTitle: string;
  categoryLabel: string;
}

export const ExperienceBreadcrumb: React.FC<ExperienceBreadcrumbProps> = ({
  offeringId,
  offeringLabel = "Passover 2027",
  programId,
  programTitle,
  categoryLabel,
}) => {
  return (
    <nav aria-label="Breadcrumb" className="w-full py-4 sm:py-5 border-b border-neutral-100 bg-[#FCFCFB]">
      <Container>
        <ol className="flex items-center flex-wrap gap-2 text-sm font-outfit text-neutral-500">
          <li>
            <Link href="/" className="hover:text-neutral-900 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li>
            <Link href={offeringHref(offeringId)} className="hover:text-neutral-900 transition-colors duration-200">
              {offeringLabel}
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li>
            <Link
              href={programHref(offeringId, programId)}
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              {programTitle}
            </Link>
          </li>
          <li className="text-stone-300 select-none">/</li>
          <li className="text-neutral-900 font-medium">{categoryLabel}</li>
        </ol>
      </Container>
    </nav>
  );
};

export default ExperienceBreadcrumb;
