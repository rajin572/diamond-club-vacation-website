import { Control, useWatch } from "react-hook-form";
import { FormTagSelect, FormTextarea, FormToggleGroup } from "@/components/ui/CustomUi/ReuseForm/Form";
import { InquireFormValues } from "../inquire.types";
import { COMMUNITY_STYLE_OPTIONS, HEARD_ABOUT_OPTIONS, INQUIRE_HOLIDAYS } from "../inquire.data";
import InquireSelectionBar from "../InquireSelectionBar";
import InquireStepFooter from "../InquireStepFooter";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

interface StepAboutYouProps {
  control: Control<InquireFormValues>;
  onBack: () => void;
  onContinue: () => void;
  onChangeVacation: () => void;
}

export const StepAboutYou: React.FC<StepAboutYouProps> = ({ control, onBack, onContinue, onChangeVacation }) => {
  const { holiday: holidayId, destinationId, joinedBefore } = useWatch({ control });
  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);
  const destination = holiday?.destinations.find((d) => d.id === destinationId);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 4 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">About you</h2>
        <p className="font-outfit text-base text-base-secondary-color">A few short questions so we can serve you better.</p>
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
        <div className="flex items-start gap-1">
          <span className="font-outfit text-base font-medium text-base-color">Have you joined any of our programs before?</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>
        <FormToggleGroup control={control} name="joinedBefore" options={YES_NO} />
      </div>

      {joinedBefore === "yes" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-1">
            <span className="font-outfit text-base font-medium text-base-color">Which year(s) and program(s)?</span>
            <span className="font-outfit text-base text-red-600">*</span>
          </div>
          <FormTextarea
            control={control}
            name="previousPrograms"
            placeholder="For example: Passover 2025, Diamond Club Gold"
            rows={3}
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-1">
          <span className="font-outfit text-base font-medium text-base-color">Would you like a callback?</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>
        <FormToggleGroup control={control} name="wantsCallback" options={YES_NO} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-1">
          <span className="font-outfit text-base font-medium text-base-color">Where did you hear about us?</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>
        <FormTagSelect control={control} name="heardAboutUs" options={HEARD_ABOUT_OPTIONS} />
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-outfit text-base font-medium text-base-color">Community / family style</span>
        <FormTagSelect control={control} name="communityStyle" options={COMMUNITY_STYLE_OPTIONS} />
      </div>

      <InquireStepFooter onBack={onBack} onContinue={onContinue} />
    </>
  );
};

export default StepAboutYou;
