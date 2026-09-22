import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VacationOptionCardProps {
  title: string;
  description?: string;
  meta?: string;
  gradientClassName: string;
  selected: boolean;
  onSelect: () => void;
}

/** Selectable image-style card -- used for both the holiday and destination pickers on step 1. */
export const VacationOptionCard: React.FC<VacationOptionCardProps> = ({
  title,
  description,
  meta,
  gradientClassName,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "relative flex h-56 w-full flex-col items-start justify-end gap-1.5 overflow-hidden rounded-md px-6 pb-6 text-left transition-shadow",
        gradientClassName,
        selected ? "outline-[3px] outline-offset-[-3px] outline-secondary-color" : "outline-none"
      )}
    >
      <h3 className="font-cormorant text-4xl font-normal text-white">{title}</h3>
      {description && <p className="font-outfit text-base text-white/90">{description}</p>}
      {meta && (
        <div className="flex items-center gap-2">
          <span className="size-1.25 rounded-full bg-white/60" />
          <span className="font-outfit text-sm text-white/80">{meta}</span>
        </div>
      )}

      {selected && (
        <span className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-secondary-color">
          <Check className="size-4 stroke-[2.5] text-white" />
        </span>
      )}
    </button>
  );
};

export default VacationOptionCard;
