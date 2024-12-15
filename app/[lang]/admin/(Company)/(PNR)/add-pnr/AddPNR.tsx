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

export const AddPNR = () => {
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
        <AddButton onOpenChange={setOpen} title="Add PNR" />
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
              pnr_no: "",
              pnt_tiket_amount: 0,
              arrival_date: "",
              return_date: "",
              outbound_arrival_location: "",
              outbound_departure_location: "",
              country: "",

              pnr_route: "",
              pnr_tiket_price: "",
            }}
            onSubmit={handleSubmit}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="text"
                      name="pnr_no"
                      placeholder="PNR No"
                      title="PNR No"
                      value={FormikProps.values.pnr_no}
                    />
                    <CustomInput
                      type="number"
                      name="pnt_tiket_amount"
                      placeholder="PNT Tiket Amount"
                      title="PNT Tiket Amount"
                    />
                  </div>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="date"
                      name="arrival_date"
                      placeholder="Arrival Date"
                      title="Arrival Date"
                      value={FormikProps.values.arrival_date}
                    />
                    <CustomInput
                      type="date"
                      name="return_date"
                      placeholder="Return Date"
                      title="Return Date"
                      value={FormikProps.values.return_date}
                    />
                  </div>

                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomMultiSelect
                      placeholder="select"
                      title="Outbound Arrival Location"
                      data={hotelsOptions || []}
                      formik={FormikProps}
                      name="outbound_arrival_location"
                      value={FormikProps.values.outbound_arrival_location}
                      isMultiSelect={false}
                    />

                    <CustomMultiSelect
                      placeholder="select"
                      title="Outbound Departure Location"
                      data={hotelsOptions || []}
                      formik={FormikProps}
                      name="outbound_departure_location"
                      value={FormikProps.values.outbound_departure_location}
                      isMultiSelect={false}
                    />
                  </div>

                  <CustomMultiSelect
                    placeholder="select"
                    title="Country"
                    data={hotelsOptions || []}
                    formik={FormikProps}
                    name="country"
                    value={FormikProps.values.country}
                    isMultiSelect={false}
                  />

                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="text"
                      name="pnr_route"
                      placeholder="PNR Route"
                      title="PNR Route"
                      value={FormikProps.values.pnr_route}
                    />
                    <CustomInput
                      type="number"
                      name="pnr_tiket_price"
                      placeholder="PNR Tiket Price"
                      title="PNR Tiket Price"
                      value={FormikProps.values.pnr_tiket_price}
                    />
                  </div>
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
