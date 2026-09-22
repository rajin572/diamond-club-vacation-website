import { INQUIRE_STEPS } from "./inquire.data";
import { cn } from "@/lib/utils";

interface InquireStepperProps {
  currentStep: number;
}

export const InquireStepper: React.FC<InquireStepperProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Inquiry steps" className="flex w-64 shrink-0 flex-col gap-1">
      {INQUIRE_STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isComplete = step.id < currentStep;

        return (
          <div key={step.id} className="flex items-center gap-3.5 py-2.5">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full font-outfit text-sm font-medium",
                isActive
                  ? "bg-secondary-color text-white"
                  : isComplete
                    ? "border border-secondary-color/40 bg-secondary-color/10 text-secondary-color"
                    : "border border-base-color/20 text-base-secondary-color"
              )}
            >
              {step.id}
            </span>
            <span
              className={cn(
                "font-outfit text-base",
                isActive ? "font-medium text-base-color" : "font-normal text-base-secondary-color"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
};

export default InquireStepper;
