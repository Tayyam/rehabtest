"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { XIcon } from "lucide-react";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import AddButton from "@/components/shared/AddButton";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import {
  useGetHotelsLocationsQuery,
  useGetHotelsNameByLocationIdQuery,
} from "@/redux/features/api/company/hotels";
import { useAddContractsMutation } from "@/redux/features/api/company/contracts";
import { toast } from "sonner";

// Define TypeScript interfaces for better type checking
interface HotelLocation {
  id: number;
  name: string;
}

export const AddNewContract = () => {
  const [open, setOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
  const [addContract, { isLoading }] = useAddContractsMutation();

  // Update query hooks with proper skip logic
  const { data: locationsData } = useGetHotelsLocationsQuery({});

  const { data: hotelsData, refetch } = useGetHotelsNameByLocationIdQuery(
    { id: selectedLocationId?.value },
    { skip: !selectedLocationId }
  );

  // Validation Schema
  const ContractValidationSchema = Yup.object().shape({
    hotel_location: Yup.object()
      .required("Hotel location is required")
      .nullable(),
    hotel_name: Yup.object().required("Hotel name is required").nullable(),
    start_date: Yup.date()
      .required("Start date is required")
      .max(Yup.ref("end_date"), "Start date must be before end date"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date must be after start date"),
    double_rooms: Yup.number()
      .required("Double rooms count is required")
      .positive("Rooms must be a positive number")
      .max(1000, "Rooms cannot exceed 1000")
      .test(
        "is-decimal",
        "Rooms must be a whole number",
        (value) => value === undefined || Number.isInteger(value)
      ),
    double_rooms_price: Yup.number()
      .required("Double rooms price is required")
      .positive("Price must be a positive number")
      .max(100000, "Price cannot exceed 100,000 SAR")
      .test(
        "max-two-decimals",
        "Price can have max 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
      ),
    triple_rooms: Yup.number()
      .required("Triple rooms count is required")
      .positive("Rooms must be a positive number")
      .max(1000, "Rooms cannot exceed 1000")
      .test(
        "is-decimal",
        "Rooms must be a whole number",
        (value) => value === undefined || Number.isInteger(value)
      ),
    triple_rooms_price: Yup.number()
      .required("Triple rooms price is required")
      .positive("Price must be a positive number")
      .max(100000, "Price cannot exceed 100,000 SAR")
      .test(
        "max-two-decimals",
        "Price can have max 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
      ),
    quadruple_rooms: Yup.number()
      .required("Quadruple rooms count is required")
      .positive("Rooms must be a positive number")
      .max(1000, "Rooms cannot exceed 1000")
      .test(
        "is-decimal",
        "Rooms must be a whole number",
        (value) => value === undefined || Number.isInteger(value)
      ),
    quadruple_rooms_price: Yup.number()
      .required("Quadruple rooms price is required")
      .positive("Price must be a positive number")
      .max(100000, "Price cannot exceed 100,000 SAR")
      .test(
        "max-two-decimals",
        "Price can have max 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
      ),
    food_price: Yup.number()
      .required("Food price is required")
      .positive("Price must be a positive number")
      .max(10000, "Food price cannot exceed 10,000 SAR")
      .test(
        "max-two-decimals",
        "Price can have max 2 decimal places",
        (value) =>
          value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
      ),
  });

  // Safely map location options
  const hotelsLocationOptions =
    locationsData?.data?.map((item: HotelLocation) => ({
      id: item.id,
      name: item.name,
    })) || [];

  // Safely map hotel name options
  const hotelNamesOptions =
    hotelsData?.data?.map((item: any) => ({
      id: item.id,
      name: item.hotel?.name,
    })) || [];

  // Handle location change
  const handleLocationChange = (value: number) => {
    setSelectedLocationId(value);
    refetch();
  };

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      const sendData = {
        contract_id: values.hotel_name.value,
        start_date: values.start_date,
        end_date: values.end_date,
        double_rooms: values.double_rooms,
        triple_rooms: values.triple_rooms,
        quadruple_rooms: values.quadruple_rooms,
        food_price: values.food_price,
        double_rooms_price: values.double_rooms_price,
        triple_rooms_price: values.triple_rooms_price,
        quadruple_rooms_price: values.quadruple_rooms_price,
      };

      await addContract({ data: sendData });

      toast.success("Contract added successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add contract");
      console.error("Contract submission error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add Contracts" />
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
        <div className="p-4 w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7]">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            Contracts
            <span className="text-dgray text-base font-normal">
              Add New Contract for Your Website
            </span>
          </h2>
          <DialogClose asChild>
            <span className="p-2 rounded-[5px] cursor-pointer">
              <XIcon className="text-dgray" />
            </span>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <Formik
            initialValues={{
              hotel_location: "",
              hotel_name: "",
              start_date: "",
              end_date: "",
              double_rooms: "",
              double_rooms_price: "",
              triple_rooms: "",
              triple_rooms_price: "",
              quadruple_rooms: "",
              quadruple_rooms_price: "",
              food_price: "",
            }}
            validationSchema={ContractValidationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  <CustomMultiSelect
                    placeholder="Select hotel location"
                    title="Hotel Location"
                    data={hotelsLocationOptions}
                    formik={formikProps}
                    name="hotel_location"
                    value={formikProps.values.hotel_location}
                    isMultiSelect={false}
                    onChange={(value) => {
                      formikProps.setFieldValue("hotel_location", value);
                      handleLocationChange(value as number);
                    }}
                  />

                  <CustomMultiSelect
                    title="Hotel Name"
                    placeholder="Select hotel name"
                    data={hotelNamesOptions}
                    formik={formikProps}
                    name="hotel_name"
                    value={formikProps.values.hotel_name}
                    isMultiSelect={false}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="date"
                      name="start_date"
                      placeholder="#"
                      title="Start Date"
                      value={formikProps.values.start_date}
                    />
                    <CustomInput
                      type="date"
                      name="end_date"
                      placeholder="#"
                      title="End Date"
                      value={formikProps.values.end_date}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="number"
                      name="double_rooms"
                      placeholder="0"
                      title="Double Rooms"
                      value={formikProps.values.double_rooms}
                    />
                    <CustomInput
                      type="number"
                      name="double_rooms_price"
                      placeholder="0"
                      title="Double Rooms Price"
                      value={formikProps.values.double_rooms_price}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="number"
                      name="triple_rooms"
                      placeholder="0"
                      title="Triple Rooms"
                      value={formikProps.values.triple_rooms}
                    />
                    <CustomInput
                      type="number"
                      name="triple_rooms_price"
                      placeholder="0"
                      title="Triple Rooms Price"
                      value={formikProps.values.triple_rooms_price}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="number"
                      name="quadruple_rooms"
                      placeholder="0"
                      title="Quadruple Rooms"
                      value={formikProps.values.quadruple_rooms}
                    />
                    <CustomInput
                      type="number"
                      name="quadruple_rooms_price"
                      placeholder="0"
                      title="Quadruple Rooms Price"
                      value={formikProps.values.quadruple_rooms_price}
                    />
                  </div>

                  <CustomInput
                    type="number"
                    name="food_price"
                    placeholder="0"
                    title="Food Price"
                    value={formikProps.values.food_price}
                  />
                </div>

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
                    className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80 disabled:opacity-50"
                  >
                    {isLoading ? "Save..." : "Save"}
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
