import React from "react";
import Link from "next/link";
import Container from "@/components/ui/CustomUi/Container";

interface EntertainmentBreadcrumbProps {
  programId?: string;
  programTitle?: string;
}

export const EntertainmentBreadcrumb: React.FC<EntertainmentBreadcrumbProps> = ({
  programId = "diamond-club-reserve",
  programTitle = "Diamond Club Reserve",
}) => {
  return (
    <div className="w-full bg-[#FCFCFB] border-b border-neutral-900/5 py-4">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2.5 text-sm font-outfit"
        >
          <Link
            href="/"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href="/passover-collection-2027"
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Passover 2027
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            href={`/passover-collection-2027/${programId}`}
            className="text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            {programTitle}
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-neutral-900 font-medium">Entertainment</span>
        </nav>
      </Container>
    </div>
  );
};

export default EntertainmentBreadcrumb;
