import { Control, useWatch } from "react-hook-form";
import { FormCheckbox } from "@/components/ui/CustomUi/ReuseForm/Form";
import { InquireFormValues } from "../inquire.types";
import { INQUIRE_HOLIDAYS } from "../inquire.data";
import InquireSelectionBar from "../InquireSelectionBar";
import InquireStepFooter from "../InquireStepFooter";

interface StepReviewProps {
  control: Control<InquireFormValues>;
  onBack: () => void;
  onChangeVacation: () => void;
  onEditStep: (step: number) => void;
}

const yesNo = (value: string) => (value === "yes" ? "Yes" : value === "no" ? "No" : "Not set");

const ReviewCard: React.FC<{ title: string; onEdit: () => void; rows: { label: string; value: string }[] }> = ({
  title,
  onEdit,
  rows,
}) => (
  <div className="flex w-full flex-col gap-3.5 rounded-md border border-base-color/10 p-6">
    <div className="flex items-center justify-between">
      <h3 className="font-cormorant text-2xl font-normal text-base-color">{title}</h3>
      <button type="button" onClick={onEdit} className="font-outfit text-sm font-medium text-secondary-color underline underline-offset-2">
        Edit
      </button>
    </div>
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={
            "flex items-start justify-between py-2.5" + (i === rows.length - 1 ? "" : " border-b border-base-color/10")
          }
        >
          <span className="font-outfit text-base text-base-secondary-color">{row.label}</span>
          <span className="w-80 text-right font-outfit text-base font-medium text-base-color">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export const StepReview: React.FC<StepReviewProps> = ({ control, onBack, onChangeVacation, onEditStep }) => {
  const values = useWatch({ control });
  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === values.holiday);
  const destination = holiday?.destinations.find((d) => d.id === values.destinationId);

  const childAges = values.childAges ?? [];

  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-outfit text-xs font-medium text-base-secondary-color">Step 6 of 6</p>
        <h2 className="font-cormorant text-4xl font-normal text-base-color">Review your inquiry</h2>
        <p className="font-outfit text-base text-base-secondary-color">Please check your details before submitting.</p>
      </div>

      {holiday && destination && (
        <InquireSelectionBar
          holidayLabel={holiday.label}
          destinationName={destination.name}
          dates={destination.dates}
          onChange={onChangeVacation}
        />
      )}

      <div className="flex w-full flex-col gap-5">
        <ReviewCard
          title="Selected vacation"
          onEdit={() => onEditStep(1)}
          rows={[
            { label: "Holiday", value: holiday?.label ?? "Not set" },
            { label: "Destination", value: destination?.name ?? "Not set" },
            { label: "Dates", value: destination?.dates ?? "Not set" },
          ]}
        />

        <ReviewCard
          title="Group"
          onEdit={() => onEditStep(2)}
          rows={[
            { label: "Adults", value: String(values.adults ?? 0) },
            {
              label: "Children",
              value: (values.children ?? 0) > 0 ? `${values.children} (${childAges.join(", ")})` : "0",
            },
            { label: "Rooms", value: String(values.rooms ?? 0) },
            { label: "Connecting rooms", value: yesNo(values.connectingRooms ?? "") },
          ]}
        />

        <ReviewCard
          title="Add-ons"
          onEdit={() => onEditStep(3)}
          rows={[
            { label: "Additional room", value: yesNo(values.additionalRoom ?? "") },
            { label: "Early arrival", value: yesNo(values.earlyArrival ?? "") },
          ]}
        />

        <ReviewCard
          title="About you"
          onEdit={() => onEditStep(4)}
          rows={[
            {
              label: "Joined before",
              value:
                values.joinedBefore === "yes"
                  ? `Yes — ${values.previousPrograms || "Not specified"}`
                  : yesNo(values.joinedBefore ?? ""),
            },
            { label: "Callback", value: yesNo(values.wantsCallback ?? "") },
            { label: "Heard about us", value: values.heardAboutUs || "Not set" },
            { label: "Community style", value: values.communityStyle || "Not set" },
          ]}
        />

        <ReviewCard
          title="Contact"
          onEdit={() => onEditStep(5)}
          rows={[
            { label: "Name", value: `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim() || "Not set" },
            { label: "Email", value: values.email || "Not set" },
            { label: "Phone", value: values.phone || "Not set" },
            { label: "Country", value: values.country || "Not set" },
          ]}
        />
      </div>

      <FormCheckbox
        control={control}
        name="agreeToContact"
        label="I agree to be contacted by Diamond Club Vacations about this inquiry."
      />

      <InquireStepFooter onBack={onBack} isLastStep submitLabel="Submit inquiry" />
    </>
  );
};

export default StepReview;
