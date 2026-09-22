import { Control, useWatch, UseFormSetValue, useFieldArray } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { FormToggleGroup } from "@/components/ui/CustomUi/ReuseForm/Form";
import { InquireFormValues } from "../inquire.types";
import { CHILD_AGE_OPTIONS, INQUIRE_HOLIDAYS } from "../inquire.data";
import InquireSelectionBar from "../InquireSelectionBar";
import InquireStepFooter from "../InquireStepFooter";
import NumberStepperField from "../NumberStepperField";

interface StepYourTripProps {
  control: Control<InquireFormValues>;
  setValue: UseFormSetValue<InquireFormValues>;
  onBack: () => void;
  onContinue: () => void;
  onChangeVacation: () => void;
}

interface ChildAgeSelectProps {
  control: Control<InquireFormValues>;
  setValue: UseFormSetValue<InquireFormValues>;
  index: number;
}

/** Its own component (not inlined in a .map()) so `useWatch` gets a stable
 * hook call per field regardless of how many children are added/removed. */
const ChildAgeSelect: React.FC<ChildAgeSelectProps> = ({ control, setValue, index }) => {
  const value = useWatch({ control, name: `childAges.${index}` as never });

  return (
    <div className="flex min-w-40 flex-1 flex-col gap-2">
      <span className="font-outfit text-sm text-base-secondary-color">Child {index + 1}</span>
      <div className="relative">
        <select
          value={(value as string) ?? ""}
          onChange={(e) => setValue(`childAges.${index}` as never, e.target.value as never)}
          className="w-full appearance-none rounded-md border border-base-color/20 bg-primary-color px-4 py-3.5 font-outfit text-base text-base-color outline-none"
        >
          {CHILD_AGE_OPTIONS.map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-base-color" />
      </div>
    </div>
  );
};

export const StepYourTrip: React.FC<StepYourTripProps> = ({ control, setValue, onBack, onContinue, onChangeVacation }) => {
  const { holiday: holidayId, destinationId, adults, children, rooms } = useWatch({ control });
  const { fields: childAgeFields, append, remove } = useFieldArray({ control, name: "childAges" as never });

  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);
  const destination = holiday?.destinations.find((d) => d.id === destinationId);

  const setChildrenCount = (count: number) => {
    setValue("children", count);
    if (count > childAgeFields.length) {
      for (let i = childAgeFields.length; i < count; i++) append("");
    } else if (count < childAgeFields.length) {
      for (let i = childAgeFields.length - 1; i >= count; i--) remove(i);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 2 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">Your trip</h2>
        <p className="font-outfit text-base text-base-secondary-color">Tell us about your group.</p>
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
          <span className="font-outfit text-base font-medium text-base-color">Group size &amp; rooms</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>
        <p className="font-outfit text-sm text-base-secondary-color">
          Adults must be at least 1. For each child, age 0 means under 1.
        </p>

        <div className="flex flex-col rounded-md border border-base-color/10">
          <NumberStepperField
            label="Adults"
            description="Age 18+"
            value={adults ?? 1}
            min={1}
            onChange={(v) => setValue("adults", v)}
          />
          <NumberStepperField
            label="Children"
            description="Age 0–17"
            value={children ?? 0}
            onChange={setChildrenCount}
          />
          <NumberStepperField
            label="Rooms"
            value={rooms ?? 1}
            min={1}
            onChange={(v) => setValue("rooms", v)}
            isLast
          />
        </div>
      </div>

      {childAgeFields.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-1">
            <span className="font-outfit text-base font-medium text-base-color">Child ages</span>
            <span className="font-outfit text-base text-red-600">*</span>
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {childAgeFields.map((field, index) => (
              <ChildAgeSelect key={field.id} control={control} setValue={setValue} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className="font-outfit text-base font-medium text-base-color">
          Would you like connecting rooms (with adjoining doors)?
        </span>
        <FormToggleGroup
          control={control}
          name="connectingRooms"
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </div>

      <InquireStepFooter onBack={onBack} onContinue={onContinue} />
    </>
  );
};

export default StepYourTrip;
