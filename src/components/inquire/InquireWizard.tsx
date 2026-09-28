"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import ReuseableForm from "@/components/ui/CustomUi/ReuseForm/ReuseableForm";
import Container from "@/components/ui/CustomUi/Container";
import { InquireFormValues } from "./inquire.types";
import { INQUIRE_DEFAULT_VALUES, INQUIRE_HOLIDAYS } from "./inquire.data";
import InquireStepper from "./InquireStepper";
import InquireSummaryCard from "./InquireSummaryCard";
import InquireSuccess from "./InquireSuccess";
import StepChooseVacation from "./steps/StepChooseVacation";
import StepYourTrip from "./steps/StepYourTrip";
import StepAddOns from "./steps/StepAddOns";
import StepAboutYou from "./steps/StepAboutYou";
import StepContactDetails from "./steps/StepContactDetails";
import StepReview from "./steps/StepReview";

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// import {
//   useSubmitInquiryMutation,
// } from "@/redux/features/inquiry/inquiryApi";
// =============================================================================

const LAST_STEP = 6;

export const InquireWizard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasInitializedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<InquireFormValues>({ defaultValues: INQUIRE_DEFAULT_VALUES });
  const { control, setValue } = form;

  // Clear query parameters from URL without a full page reload
  const clearUrlParams = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", pathname);
      router.replace(pathname, { scroll: false });
    }
  };

  // Pre-fill holiday and destination/program from search params on initial mount
  useEffect(() => {
    if (hasInitializedRef.current) return;

    const holidayParam = searchParams.get("holiday");
    const destinationParam =
      searchParams.get("destination") || searchParams.get("program");

    if (holidayParam || destinationParam) {
      hasInitializedRef.current = true;

      const targetHoliday = holidayParam || "passover-2027";
      const matched = INQUIRE_HOLIDAYS.find((h) => h.id === targetHoliday);
      if (matched) {
        setValue("holiday", matched.id);
      }

      if (destinationParam) {
        const normalized = destinationParam.toLowerCase().trim();
        if (
          normalized === "reserve" ||
          normalized === "diamond-club-reserve"
        ) {
          setValue("destinationId", "diamond-club-reserve");
        } else if (
          normalized === "guttaway" ||
          normalized === "guttaway-a-dcv-program" ||
          normalized === "gold" ||
          normalized === "diamond-club-gold"
        ) {
          setValue("destinationId", "guttaway");
        } else if (
          normalized === "blue" ||
          normalized === "diamond-club-blue" ||
          normalized === "diamond-club-blue-by-dcv"
        ) {
          setValue("destinationId", "diamond-club-blue");
        } else {
          setValue("destinationId", normalized);
        }
      }
    }
  }, [searchParams, setValue]);

  const holidayId = form.watch("holiday");
  const holiday = INQUIRE_HOLIDAYS.find((h) => h.id === holidayId);

  const goNext = () => setStep((s) => Math.min(LAST_STEP, s + 1));
  const goBack = () => {
    clearUrlParams();
    setStep((s) => Math.max(1, s - 1));
  };
  const goToStep = (target: number) => setStep(target);
  const handleChangeVacation = () => {
    clearUrlParams();
    goToStep(1);
  };

  const onSubmit = (values: InquireFormValues) => {
    // Design phase: no backend yet -- just show the success state.
    console.log("Inquiry submitted (design phase):", values);
    setSubmitted(true);

    // When API is ready, uncomment:
    // const [submitInquiry] = useSubmitInquiryMutation();
    // await submitInquiry(values).unwrap();
  };

  if (submitted) {
    return (
      <Container className="pb-20 pt-16 sm:pt-20">
        <InquireSuccess firstName={form.getValues("firstName")} />
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-4 pb-28 pt-16 sm:pt-20">
      <div className="flex items-center gap-2.5">
        <span className="size-1.25 rounded-full bg-[#BD9343]" />
        <span className="font-outfit text-sm font-medium text-[#BD9343]">Inquiry</span>
      </div>

      <h1 className="font-cormorant text-[clamp(2.75rem,6vw,4.75rem)] font-light leading-[1.1] text-base-color">
        Plan your <em className="italic">{holiday ? holiday.label : "vacation"}</em>
      </h1>

      <p className="font-outfit text-lg text-base-secondary-color">
        Six short steps. Our team replies within one business day.
      </p>

      <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <InquireStepper currentStep={step} />

        <ReuseableForm
          form={form}
          onSubmit={onSubmit}
          className="flex flex-1 flex-col gap-8 rounded-md border border-base-color/10 bg-white px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8"
        >
          {step === 1 && (
            <StepChooseVacation control={control} setValue={setValue} onBack={goBack} onContinue={goNext} />
          )}
          {step === 2 && (
            <StepYourTrip
              control={control}
              setValue={setValue}
              onBack={goBack}
              onContinue={goNext}
              onChangeVacation={handleChangeVacation}
            />
          )}
          {step === 3 && (
            <StepAddOns control={control} onBack={goBack} onContinue={goNext} onChangeVacation={handleChangeVacation} />
          )}
          {step === 4 && (
            <StepAboutYou control={control} onBack={goBack} onContinue={goNext} onChangeVacation={handleChangeVacation} />
          )}
          {step === 5 && (
            <StepContactDetails
              control={control}
              onBack={goBack}
              onContinue={goNext}
              onChangeVacation={handleChangeVacation}
            />
          )}
          {step === 6 && (
            <StepReview control={control} onBack={goBack} onChangeVacation={handleChangeVacation} onEditStep={goToStep} />
          )}
        </ReuseableForm>

        <InquireSummaryCard control={control} />
      </div>
    </Container>
  );
};

export default InquireWizard;
