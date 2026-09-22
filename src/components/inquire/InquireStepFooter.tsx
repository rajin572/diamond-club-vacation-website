import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InquireStepFooterProps {
  onBack: () => void;
  backDisabled?: boolean;
  /** Only the final step submits the form -- every earlier step just advances local state. */
  onContinue?: () => void;
  submitLabel?: string;
  isLastStep?: boolean;
}

export const InquireStepFooter: React.FC<InquireStepFooterProps> = ({
  onBack,
  backDisabled,
  onContinue,
  submitLabel = "Continue",
  isLastStep,
}) => {
  return (
    <div className="flex w-full items-center justify-between border-t border-base-color/10 pt-7">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className={cn(
          "inline-flex items-center gap-3.5 rounded-sm border py-2 pl-4 pr-2 font-outfit text-base font-medium transition-opacity",
          backDisabled ? "border-base-color/40 text-base-color opacity-40" : "border-base-color text-base-color"
        )}
      >
        <span className="flex size-6 items-center justify-center rounded-[3px] bg-base-color">
          <ArrowLeft className="size-3.5 stroke-[2.2] text-white" />
        </span>
        Back
      </button>

      <button
        type={isLastStep ? "submit" : "button"}
        onClick={isLastStep ? undefined : onContinue}
        className="inline-flex items-center gap-3.5 rounded-sm bg-secondary-color py-2 pl-4 pr-2 font-outfit text-base font-medium text-white transition-colors hover:bg-[#00427c]"
      >
        {isLastStep ? submitLabel : "Continue"}
        <span className="flex size-6 items-center justify-center rounded-[3px] bg-white">
          <ArrowRight className="size-3.5 stroke-[2.2] text-secondary-color" />
        </span>
      </button>
    </div>
  );
};

export default InquireStepFooter;
