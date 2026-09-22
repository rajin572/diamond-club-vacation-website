import { Control, useWatch } from "react-hook-form";
import { InquireFormValues } from "./inquire.types";
import { INQUIRE_HOLIDAYS } from "./inquire.data";

interface InquireSummaryCardProps {
  control: Control<InquireFormValues>;
}

const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export const InquireSummaryCard: React.FC<InquireSummaryCardProps> = ({ control }) => {
  const values = useWatch({ control });

  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === values.holiday);
  const destination = holiday?.destinations.find((d) => d.id === values.destinationId);

  const holidayText = holiday?.label ?? "Not set yet";
  const destinationText = destination?.name ?? "Not set yet";

  const groupText =
    values.adults || values.children || values.rooms
      ? [
          pluralize(values.adults ?? 0, "adult"),
          values.children ? pluralize(values.children, "child", "children") : null,
          pluralize(values.rooms ?? 0, "room"),
        ]
          .filter(Boolean)
          .join(", ")
      : "Not set yet";

  const addOns = [
    values.additionalRoom === "yes" ? "Additional room requested" : null,
    values.earlyArrival === "yes" ? "Early arrival requested" : null,
  ].filter(Boolean);
  const addOnsText =
    values.additionalRoom || values.earlyArrival
      ? addOns.length > 0
        ? addOns.join(", ")
        : "None requested"
      : "Not set yet";

  const contactText =
    values.firstName || values.lastName ? `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim() : "Not set yet";

  const rows: { label: string; value: string }[] = [
    { label: "Holiday", value: holidayText },
    { label: "Destination", value: destinationText },
    { label: "Group", value: groupText },
    { label: "Add-ons", value: addOnsText },
    { label: "Contact", value: contactText },
  ];

  return (
    <aside className="w-80 shrink-0 rounded-md bg-[#F5F4F1] p-7">
      <p className="font-outfit text-sm font-medium text-base-secondary-color">Your inquiry</p>

      <dl className="mt-5 flex flex-col">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5 border-b border-base-color/10 py-3 last:border-b-0">
            <dt className="font-outfit text-xs text-base-secondary-color">{row.label}</dt>
            <dd
              className={
                row.value === "Not set yet"
                  ? "font-outfit text-base text-base-color/30"
                  : "font-outfit text-base font-medium text-base-color"
              }
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 font-outfit text-xs text-base-secondary-color">
        No payment is taken. Our team confirms availability and pricing by email.
      </p>
    </aside>
  );
};

export default InquireSummaryCard;
