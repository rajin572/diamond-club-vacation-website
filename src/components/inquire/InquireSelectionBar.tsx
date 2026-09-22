import { MapPin } from "lucide-react";

interface InquireSelectionBarProps {
  holidayLabel: string;
  destinationName: string;
  dates: string;
  onChange: () => void;
}

/** Persistent reminder of the chosen holiday/destination, shown atop steps 2-6. */
export const InquireSelectionBar: React.FC<InquireSelectionBarProps> = ({
  holidayLabel,
  destinationName,
  dates,
  onChange,
}) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-md bg-[#F5F4F1] px-4 py-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <MapPin className="size-4 shrink-0 text-secondary-color" strokeWidth={1.8} />
        <span className="font-outfit text-base font-medium text-base-color">{holidayLabel}</span>
        <span className="font-outfit text-base text-base-color/20">·</span>
        <span className="font-outfit text-base font-medium text-base-color">{destinationName}</span>
        <span className="font-outfit text-base text-base-color/20">·</span>
        <span className="font-outfit text-sm text-base-secondary-color">{dates}</span>
      </div>
      <button
        type="button"
        onClick={onChange}
        className="font-outfit text-sm font-medium text-secondary-color underline underline-offset-2"
      >
        Change
      </button>
    </div>
  );
};

export default InquireSelectionBar;
