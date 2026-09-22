"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ReuseableForm,
  FormInput,
  FormSelect,
  SelectItem,
  FormDatePicker,
  FormTimePicker,
  FormTextarea,
} from "@/components/ui/CustomUi/ReuseForm/Form";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// =============================================================================
// REDUX / RTK QUERY API INTEGRATION HOOKS (Commented for immediate integration)
// =============================================================================
// Uncomment when Redux slice & RTK Query endpoints are added to the store:
//
// import {
//   useGetInquiryTiersQuery,
//   useSubmitInquiryMutation,
//   useUpdateInquiryMutation,
//   useDeleteInquiryMutation,
// } from "@/redux/features/inquiry/inquiryApi";
// =============================================================================

export interface InquireFormValues {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  guestsCount: string;
  travelDate?: Date;
  consultationTime?: Date;
  specialRequests: string;
}

export const InquireForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  // ---------------------------------------------------------------------------
  // API Integration Placeholders
  // ---------------------------------------------------------------------------
  // // 1. GET: Fetch available tiers or prefill current member data
  // const { data: destinationTiers, isLoading: isTiersLoading } = useGetInquiryTiersQuery();
  //
  // // 2. POST: Submit vacation inquiry
  // const [submitInquiry, { isLoading: isSubmitting }] = useSubmitInquiryMutation();
  //
  // // 3. PATCH: Update existing inquiry draft
  // const [updateInquiry, { isLoading: isUpdating }] = useUpdateInquiryMutation();
  //
  // // 4. DELETE: Cancel/delete reservation inquiry
  // const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();
  // ---------------------------------------------------------------------------

  const form = useForm<InquireFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      destination: "passover-2027",
      guestsCount: "2",
      specialRequests: "",
    },
  });

  const onSubmit = (values: InquireFormValues) => {
    // Design phase: Log values and show confirmation state without mandatory API call
    console.log("Inquiry Submitted (Design Phase):", values);
    setSubmitted(true);

    // When API is ready, uncomment:
    // await submitInquiry(values).unwrap();
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 px-6 sm:px-10 text-center bg-white rounded-xl shadow-xs border border-[#131313]/10">
        <div className="size-14 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="size-8 stroke-[2]" />
        </div>
        <h3 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl text-[#131313] font-light mb-2">
          Thank You for Inquiring
        </h3>
        <p className="font-['Outfit'] text-[#8C877E] text-base max-w-md mx-auto mb-6">
          Our VIP concierge team will reach out promptly to customize your Diamond Club Vacation experience.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00549C] text-white rounded font-['Outfit'] text-sm hover:bg-[#00427c] transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-6 sm:p-10 lg:p-12 rounded-xl shadow-xs border border-[#131313]/10">
      <ReuseableForm form={form} onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Full Name */}
          <FormInput
            control={form.control}
            name="fullName"
            label="Full Name"
            placeholder="e.g. Jonathan Klein"
          />

          {/* Email Address */}
          <FormInput
            control={form.control}
            name="email"
            type="email"
            label="Email Address"
            placeholder="e.g. j.klein@example.com"
          />

          {/* Phone Number */}
          <FormInput
            control={form.control}
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="+1 (555) 010-0142"
          />

          {/* Destination / Tier Selection */}
          <FormSelect
            control={form.control}
            name="destination"
            label="Destination or Program"
            placeholder="Select a destination"
          >
            <SelectItem value="passover-2027">Passover 2027</SelectItem>
            <SelectItem value="reserve">Diamond Club Reserve</SelectItem>
            <SelectItem value="gold">Diamond Club Gold</SelectItem>
            <SelectItem value="blue">Diamond Club Blue</SelectItem>
            <SelectItem value="casa-nizuc">Casa Nizuc</SelectItem>
            <SelectItem value="weddings-events">Weddings &amp; Events</SelectItem>
            <SelectItem value="private-events">Private Events</SelectItem>
          </FormSelect>

          {/* Preferred Travel Date */}
          <FormDatePicker
            control={form.control}
            name="travelDate"
            label="Preferred Travel Date"
            placeholder="Select travel date"
          />

          {/* Preferred Consultation Time */}
          <FormTimePicker
            control={form.control}
            name="consultationTime"
            label="Preferred Call Time"
            placeholder="Select consultation time"
          />
        </div>

        {/* Special Requests / Notes */}
        <FormTextarea
          control={form.control}
          name="specialRequests"
          label="Special Inquiries or Requests"
          placeholder="Please let us know about family size, villa preferences, kosher dietary requirements, or event details..."
          rows={4}
        />

        {/* Action Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="group inline-flex items-center justify-between gap-3.5 bg-[#00549C] hover:bg-[#00427c] text-white pl-6 pr-3 py-3 rounded-[4px] font-['Outfit'] font-medium text-base transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Submit VIP Inquiry</span>
            <div className="size-7 bg-white rounded-[3px] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="size-4 text-[#00549C] stroke-[2.2]" />
            </div>
          </button>
        </div>
      </ReuseableForm>
    </div>
  );
};

export default InquireForm;

