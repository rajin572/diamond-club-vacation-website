import { Control, useWatch } from "react-hook-form";
import { FormInput, FormSelect, SelectItem } from "@/components/ui/CustomUi/ReuseForm/Form";
import { InquireFormValues } from "../inquire.types";
import { INQUIRE_HOLIDAYS } from "../inquire.data";
import InquireSelectionBar from "../InquireSelectionBar";
import InquireStepFooter from "../InquireStepFooter";

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Israel", "Mexico", "Other"];
const REGIONS = ["Northeast", "Southeast", "Midwest", "Southwest", "West", "Other"];

interface StepContactDetailsProps {
  control: Control<InquireFormValues>;
  onBack: () => void;
  onContinue: () => void;
  onChangeVacation: () => void;
}

export const StepContactDetails: React.FC<StepContactDetailsProps> = ({ control, onBack, onContinue, onChangeVacation }) => {
  const { holiday: holidayId, destinationId } = useWatch({ control });
  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);
  const destination = holiday?.destinations.find((d) => d.id === destinationId);

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 5 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">Contact details</h2>
        <p className="font-outfit text-base text-base-secondary-color">How should we reach you?</p>
      </div>

      {holiday && destination && (
        <InquireSelectionBar
          holidayLabel={holiday.label}
          destinationName={destination.name}
          dates={destination.dates}
          onChange={onChangeVacation}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-1">
          <span className="font-outfit text-base font-medium text-base-color">Your details</span>
          <span className="font-outfit text-base text-red-600">*</span>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <FormInput control={control} name="firstName" label="First name *" placeholder="Sarah" />
          <FormInput control={control} name="lastName" label="Last name *" placeholder="Klein" />
          <FormInput control={control} name="email" type="email" label="Email *" placeholder="sarah.klein@example.com" />
          <FormInput control={control} name="phone" type="tel" label="Phone number *" placeholder="+1 (305) 000-0000" />
          <FormSelect control={control} name="country" label="Country *" placeholder="Select a country">
            {COUNTRIES.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </FormSelect>
          <FormSelect control={control} name="region" label="State / Region" placeholder="Select a region">
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </FormSelect>
        </div>

        <p className="font-outfit text-sm text-base-secondary-color">We only use these details to answer your inquiry.</p>
      </div>

      <InquireStepFooter onBack={onBack} onContinue={onContinue} />
    </>
  );
};

export default StepContactDetails;
