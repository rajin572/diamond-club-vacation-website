import { Minus, Plus } from "lucide-react";

interface NumberStepperFieldProps {
  label: string;
  description?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  isLast?: boolean;
}

export const NumberStepperField: React.FC<NumberStepperFieldProps> = ({
  label,
  description,
  value,
  min = 0,
  max = 20,
  onChange,
  isLast,
}) => {
  return (
    <div
      className={
        "flex w-full items-center justify-between px-5 py-4" +
        (isLast ? "" : " border-b border-base-color/10")
      }
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-outfit text-base font-medium text-base-color">{label}</span>
        {description && <span className="font-outfit text-sm text-base-secondary-color">{description}</span>}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex size-9 items-center justify-center rounded-full border border-base-color/20 text-base-color transition-colors disabled:opacity-30"
        >
          <Minus className="size-4 stroke-[2]" />
        </button>
        <span className="w-4 text-center font-outfit text-lg font-medium text-base-color">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex size-9 items-center justify-center rounded-full border border-base-color/20 text-base-color transition-colors disabled:opacity-30"
        >
          <Plus className="size-4 stroke-[2]" />
        </button>
      </div>
    </div>
  );
};

export default NumberStepperField;
