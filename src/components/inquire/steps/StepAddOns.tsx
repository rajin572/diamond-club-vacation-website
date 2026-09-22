import { Control, useWatch } from "react-hook-form";
import { FormToggleGroup } from "@/components/ui/CustomUi/ReuseForm/Form";
import { InquireFormValues } from "../inquire.types";
import { INQUIRE_HOLIDAYS } from "../inquire.data";
import InquireSelectionBar from "../InquireSelectionBar";
import InquireStepFooter from "../InquireStepFooter";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

interface StepAddOnsProps {
  control: Control<InquireFormValues>;
  onBack: () => void;
  onContinue: () => void;
  onChangeVacation: () => void;
}

export const StepAddOns: React.FC<StepAddOnsProps> = ({ control, onBack, onContinue, onChangeVacation }) => {
  const { holiday: holidayId, destinationId } = useWatch({ control });
  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);
  const destination = holiday?.destinations.find((d) => d.id === destinationId);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 3 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">Add-ons</h2>
        <p className="font-outfit text-base text-base-secondary-color">
          Optional requests. Final availability is confirmed by our team.
        </p>
      </div>

      {holiday && destination && (
        <InquireSelectionBar
          holidayLabel={holiday.label}
          destinationName={destination.name}
          dates={destination.dates}
          onChange={onChangeVacation}
        />
      )}

      <div className="flex flex-col gap-3">
        <span className="font-outfit text-base font-medium text-base-color">Do you need an additional room?</span>
        <FormToggleGroup control={control} name="additionalRoom" options={YES_NO} />
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-outfit text-base font-medium text-base-color">
          Are you interested in early arrival?
        </span>
        <p className="-mt-2 font-outfit text-sm text-base-secondary-color">Subject to availability at the resort.</p>
        <FormToggleGroup control={control} name="earlyArrival" options={YES_NO} />
      </div>

      <InquireStepFooter onBack={onBack} onContinue={onContinue} />
    </>
  );
};

export default StepAddOns;
