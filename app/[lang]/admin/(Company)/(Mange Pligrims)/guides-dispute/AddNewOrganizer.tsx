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
import CustomInput from "@/components/shared/CustomInput";
import AddButton from "@/components/shared/AddButton";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import {
  useAddHotelsMutation,
  useGetHotelsSelectCompanyQuery,
  useGetHotelsSelectTypeQuery,
} from "@/redux/features/api/company/hotels";
import { toast } from "sonner";
// import Dropdown from "@/components/shared/Dropdown";

export const AddNewOrganizer = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetHotelsSelectCompanyQuery({});
  const { data: hotelType } = useGetHotelsSelectTypeQuery({});
  const hotelsOptions = data?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
  const hotelsTypesOptions = hotelType?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  const [addHotels, { isLoading }] = useAddHotelsMutation();
  const handleSubmit = async (values: any) => {
    const sendData = {
      hotel_id: values.hotel_name?.value,
      hotel_type_id: values.contract_type?.value,
      coler: values.hotel_color,
    };
    // Add your submit logic here

    try {
      const response = await addHotels({ data: sendData }).unwrap();
      if (response.status === "success") {
        toast.success(response?.data?.message || "Hotel added successfully");
      } else {
        toast.error(response?.data?.message || "Failed to add hotel");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add hotel");
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add Organizer" />
      </DialogTrigger>
      <DialogContent
        style={{
          borderRadius: "22px",
          border: "10px solid rgba(255, 255, 255, 0.05)",
          padding: "0px",
          zIndex: "50",
        }}
        className="lg:min-w-[680px] w-full border-none bg-white"
      >
        {/* Header */}
        <div className="p-4 w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7]">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            Import Hotel
            <span className="text-dgray text-base font-normal">
              Import Hotel In Your Company
            </span>
          </h2>
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
              hotel_name: "",
              contract_type: "",
              hotel_color: "",
            }}
            onSubmit={handleSubmit}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  {/* Import Hotel Field */}
                  <CustomMultiSelect
                    placeholder="import Hotel"
                    title="import Hotel"
                    data={hotelsOptions || []}
                    formik={FormikProps}
                    name="hotel_name"
                    value={FormikProps.values.hotel_name}
                    isMultiSelect={false}
                  />

                  {/* Hotel Contract Type Field */}
                  <CustomMultiSelect
                    title="Hotel Contract Type"
                    placeholder="Hotel Contract Type"
                    data={hotelsTypesOptions || []}
                    formik={FormikProps}
                    name="contract_type"
                    value={FormikProps.values.contract_type}
                    isMultiSelect={false}
                  />

                  {/* Hotel Color Input */}
                  <CustomInput
                    type="text"
                    name="hotel_color"
                    placeholder="#"
                    title="Hotel Color"
                    value={FormikProps.values.hotel_color}
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex justify-center items-center gap-2.5 pb-4">
                  <DialogClose asChild>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="bg-gray hover:bg-gray/80 h-[50px] w-full py-4 px-6 rounded-[6px] transition-all text-dgray text-base font-semibold leading-none"
                    >
                      Close
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80"
                  >
                    {isLoading ? "Loading..." : "Submit"}
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
