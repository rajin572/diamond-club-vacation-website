import React from "react";
import { cn } from "@/lib/utils";

interface DiamondClubVacationsBadgeProps {
  label: string;
  className?: string;
}

export const DiamondClubVacationsBadge: React.FC<DiamondClubVacationsBadgeProps> = ({
  label,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 justify-center select-none",
        className
      )}
    >
      <span
        className="size-[5px] rounded-full bg-[#BD9343] shrink-0 inline-block"
        aria-hidden="true"
      />
      <span className="font-outfit text-sm font-medium leading-5 text-[#BD9343] tracking-normal">
        {label}
      </span>
    </div>
  );
};

export default DiamondClubVacationsBadge;

