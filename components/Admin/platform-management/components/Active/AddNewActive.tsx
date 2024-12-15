"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import AddButton from "@/components/shared/AddButton";
import CustomInput from "@/components/shared/CustomInput";
import { useAddActiveMutation } from "@/redux/features/api/admin/platform-management";

const validationSchema = Yup.object().shape({
  hotel_start_date: Yup.date().required("Start date is required"),
  hotel_end_date: Yup.date()
    .min(Yup.ref("hotel_start_date"), "End date cannot be before start date")
    .required("End date is required"),
  contract_start_date: Yup.date().required("Start date is required"),
  contract_end_date: Yup.date()
    .min(Yup.ref("contract_start_date"), "End date cannot be before start date")
    .required("End date is required"),
});

export const AddNewActive = () => {
  const [open, setOpen] = useState(false);
  const [addActive, { isLoading }] = useAddActiveMutation();

  const handleSubmit = async (values: {
    hotel_start_date: string;
    hotel_end_date: string;
    contract_start_date: string;
    contract_end_date: string;
  }) => {
    try {
      // Your API call here
      console.log(values);
      toast.success("Dates updated successfully");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update dates");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add Active" />
      </DialogTrigger>
      <DialogContent
        style={{
          borderRadius: "22px",
          border: "10px solid rgba(255, 255, 255, 0.05)",
          padding: "0px",
          zIndex: "50",
        }}
        className="lg:min-w-[780px] w-full border-none bg-white"
      >
        {" "}
        {/* Header */}
        <div className="p-4 w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            Global Variables Management
            <span className="text-dgray text-base font-normal">
              Add New Country In Your Website
            </span>
          </h2>{" "}
          <DialogClose asChild>
            <span className="p-2 rounded-[5px] cursor-pointer">
              <XIcon className="text-dgray" />
            </span>
          </DialogClose>
        </div>
        {/* Body */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <Formik
            initialValues={{
              hotel_start_date: "",
              hotel_end_date: "",
              contract_start_date: "",
              contract_end_date: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="grid grid-cols-2 gap-5">
                  {/* Hotels Date Range */}
                  <CustomInput
                    type="date"
                    name="hotel_start_date"
                    placeholder="Select Date"
                    title="Minimum Start Date For Hotels"
                    value={formikProps.values.hotel_start_date}
                    max={formikProps.values.hotel_end_date}
                  />
                  <CustomInput
                    type="date"
                    name="hotel_end_date"
                    placeholder="Select Date"
                    title="Maximum End Date For Hotels"
                    value={formikProps.values.hotel_end_date}
                    min={formikProps.values.hotel_start_date}
                  />

                  {/* Contracts Date Range */}
                  <CustomInput
                    type="date"
                    name="contract_start_date"
                    placeholder="Select Date"
                    title="Minimum Start Date For Contracts"
                    value={formikProps.values.contract_start_date}
                    max={formikProps.values.contract_end_date}
                  />
                  <CustomInput
                    type="date"
                    name="contract_end_date"
                    placeholder="Select Date"
                    title="Maximum End Date For Contracts"
                    value={formikProps.values.contract_end_date}
                    min={formikProps.values.contract_start_date}
                  />
                </div>

                {/* Error messages */}
                {/* {Object.keys(formikProps.errors).map((key) => (
                  <div key={key} className="text-red-500 text-sm">
                    {formikProps.errors[key as keyof typeof formikProps.errors]}
                  </div>
                ))} */}

                <div className="flex justify-center items-center gap-2.5 pb-4">
                  <DialogClose asChild>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="bg-gray hover:bg-gray/80 h-[50px] w-full py-4 px-6 rounded-[6px] transition-all text-dgray text-base font-semibold leading-none"
                    >
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80"
                  >
                    {isLoading ? "Adding..." : "Add Camp"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};
