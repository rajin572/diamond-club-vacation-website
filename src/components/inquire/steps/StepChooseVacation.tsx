import { Control, useWatch, UseFormSetValue } from "react-hook-form";
import { Check } from "lucide-react";
import { InquireFormValues } from "../inquire.types";
import { INQUIRE_HOLIDAYS } from "../inquire.data";
import VacationOptionCard from "../VacationOptionCard";
import InquireStepFooter from "../InquireStepFooter";

interface StepChooseVacationProps {
  control: Control<InquireFormValues>;
  setValue: UseFormSetValue<InquireFormValues>;
  onBack: () => void;
  onContinue: () => void;
}

export const StepChooseVacation: React.FC<StepChooseVacationProps> = ({ control, setValue, onBack, onContinue }) => {
  const holidayId = useWatch({ control, name: "holiday" });
  const destinationId = useWatch({ control, name: "destinationId" });

  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 1 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">Choose your vacation</h2>
        <p className="font-outfit text-base text-base-secondary-color">
          {holiday
            ? "Pick the destination you are interested in."
            : "Pick the holiday and destination you are interested in."}
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex items-start gap-1">
          <span className="font-outfit text-base font-medium text-base-color">Holiday</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>

        {holiday ? (
          <div className="flex items-center justify-between rounded-md border-[1.5px] border-secondary-color bg-secondary-color/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <Check className="size-5 stroke-[2.2] text-secondary-color" />
              <div className="flex flex-col gap-0.5">
                <span className="font-outfit text-base font-medium text-base-color">{holiday.label}</span>
                <span className="font-outfit text-sm text-base-secondary-color">{holiday.dates}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setValue("holiday", "");
                setValue("destinationId", "");
              }}
              className="font-outfit text-sm font-medium text-secondary-color underline underline-offset-2"
            >
              Change
            </button>
          </div>
        ) : (
          <>
            <p className="font-outfit text-sm text-base-secondary-color">
              Choose a holiday to see the destinations available.
            </p>
            <div className="flex flex-col gap-4">
              {INQUIRE_HOLIDAYS.map((h) => (
                <VacationOptionCard
                  key={h.id}
                  title={h.label}
                  description={`${h.destinations.length} destinations`}
                  gradientClassName={h.gradientClassName}
                  selected={false}
                  onSelect={() => setValue("holiday", h.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {holiday && (
        <div className="flex flex-col gap-3.5">
          <div className="flex items-start gap-1">
            <span className="font-outfit text-base font-medium text-base-color">Destination</span>
            <span className="font-outfit text-base text-red-600">*</span>
          </div>
          <p className="font-outfit text-sm text-base-secondary-color">All programs run for the full holiday.</p>
          <div className="flex flex-col gap-4">
            {holiday.destinations.map((destination) => (
              <VacationOptionCard
                key={destination.id}
                title={destination.name}
                description={destination.description}
                meta={destination.dates}
                gradientClassName={destination.gradientClassName}
                selected={destination.id === destinationId}
                onSelect={() => setValue("destinationId", destination.id)}
              />
            ))}
          </div>
        </div>
      )}

      <InquireStepFooter
        onBack={() => {
          if (holiday) {
            setValue("holiday", "");
            setValue("destinationId", "");
          } else {
            onBack();
          }
        }}
        backDisabled={!holiday}
        onContinue={onContinue}
      />
    </>
  );
};

export default StepChooseVacation;
