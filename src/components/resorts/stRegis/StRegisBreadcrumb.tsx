"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StRegisBreadcrumbProps {
  programId?: string;
  programTitle?: string;
  resortName?: string;
  detailLabel?: string;
}

export const StRegisBreadcrumb: React.FC<StRegisBreadcrumbProps> = ({
  programId = "diamond-club-reserve",
  programTitle = "Diamond Club Reserve",
  resortName = "The St. Regis Kanai Resort",
  detailLabel,
}) => {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Passover 2027", href: "/passover-collection-2027" },
    { label: programTitle, href: `/passover-collection-2027/${programId}` },
    {
      label: resortName,
      href: detailLabel
        ? `/passover-collection-2027/${programId}/resorts/st-regis`
        : undefined,
    },
  ];

  if (detailLabel) {
    items.push({ label: detailLabel });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full py-4 sm:py-5 border-b border-[rgba(19,19,19,0.06)] bg-[#FCFCFB]"
    >
      <Container>
        <ol className="flex items-center flex-wrap gap-2 text-sm text-[#8C877E] font-outfit">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-[#C6C2BA] select-none text-xs" aria-hidden="true">
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#131313] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      isLast
                        ? "text-[#131313] font-medium"
                        : "text-[#8C877E]"
                    }
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
};

export default StRegisBreadcrumb;
