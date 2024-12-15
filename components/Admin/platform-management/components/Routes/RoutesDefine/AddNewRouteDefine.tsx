"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form, FormikHelpers } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import {
  useAddCampRouteMutation,
  useGetArrivalLocationQuery,
  useGetLocationsSelectQuery,
} from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import AddButton from "@/components/shared/AddButton";

// Define form values type
interface FormValues {
  camp_route: string; // Input field
  // camp_services_price: string;
  first_hotel_location_id: any; // MultiSelect
  last_hotel_location_id: any; // MultiSelect
  return_departure_location_id: any; // MultiSelect
  outbound_arrival_location_id: any; // MultiSelect
}

// Initial form values
const INITIAL_VALUES: FormValues = {
  camp_route: "",
  // camp_services_price: "",
  first_hotel_location_id: "",
  last_hotel_location_id: "",
  return_departure_location_id: "",
  outbound_arrival_location_id: "",
};

const AddNewRouteDefine = () => {
  const [open, setOpen] = useState(false);
  const [addNewRoute, { isLoading: isAddingNewRoute }] =
    useAddCampRouteMutation();
  const { data: locations } = useGetLocationsSelectQuery({});
  const { data: arrival } = useGetArrivalLocationQuery({});
  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const sendValues = {
        camp_route: values.camp_route, // Input value
        // camp_services_price: values.camp_services_price,
        first_hotel_location_id: values.first_hotel_location_id.value,
        last_hotel_location_id: values.last_hotel_location_id.value,
        return_departure_location_id: values.return_departure_location_id.value,
        outbound_arrival_location_id: values.outbound_arrival_location_id.value,
      };

      const response = await addNewRoute(sendValues).unwrap();

      if (response.status === "success") {
        toast.success("Route defined successfully");
        setOpen(false);
        actions.resetForm(); // Reset the form upon successful submission
      } else {
        toast.error("Failed to define route");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while defining the route");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add Routes" />
      </DialogTrigger>
      <DialogContent
        className="md:min-w-[680px] max-h-[85vh] overflow-auto w-full border-none bg-white rounded-[22px] "
        style={{ zIndex: 50 }}
      >
        {/* Header */}
        <div className="p-4  w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold text-lg">
            Add Routes Define
            <span className="block text-dgray text-base font-normal">
              Add a new country to your website
            </span>
          </h2>
          <DialogClose asChild>
            <button className="p-2 rounded hover:bg-gray-200">
              <XIcon className="text-dgray" />
            </button>
          </DialogClose>
        </div>

        {/* Body */}
        <div className="p-5 pt-0">
          <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
            {(formik) => (
              <Form className="space-y-5">
                {/* Input Fields */}
                <CustomInput
                  type="text"
                  name="camp_route"
                  title="camp route"
                  placeholder="Enter Camp Route "
                />
                {/* <CustomInput
                  type="number"
                  name="camp_services_price"
                  title="Camp Services Price"
                  placeholder="Enter Camp Services Price "
                /> */}
                <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                  <CustomMultiSelect
                    data={arrival?.data || []} // Update with dynamic data
                    formik={formik}
                    isMultiSelect={false}
                    name="outbound_arrival_location_id"
                    placeholder="Select "
                    title="Outbound Arrival Location"
                    value={formik.values.outbound_arrival_location_id}
                  />

                  <CustomMultiSelect
                    data={locations?.data || []} // Update with dynamic data
                    formik={formik}
                    isMultiSelect={false}
                    name="first_hotel_location_id"
                    placeholder="Select "
                    title="First Hotel Location"
                    value={formik.values.first_hotel_location_id}
                  />
                </div>
                <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                  <CustomMultiSelect
                    data={locations?.data || []} // Update with dynamic data
                    formik={formik}
                    isMultiSelect={false}
                    name="last_hotel_location_id"
                    placeholder="Select "
                    title="Last Hotel Location"
                    value={formik.values.last_hotel_location_id}
                  />{" "}
                  <CustomMultiSelect
                    data={arrival?.data || []} // Update with dynamic data
                    formik={formik}
                    isMultiSelect={false}
                    name="return_departure_location_id"
                    placeholder="Select "
                    title="Return Departure Location"
                    value={formik.values.return_departure_location_id}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center items-center gap-4">
                  <DialogClose asChild>
                    <button
                      type="button"
                      className="bg-gray h-12 w-full rounded-lg text-dgray font-semibold hover:bg-gray/80"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    type="submit"
                    className={`w-full h-12 rounded-lg text-white font-semibold ${
                      isAddingNewRoute
                        ? "bg-primaryColor/70 cursor-not-allowed"
                        : "bg-primaryColor hover:bg-primaryColor/80"
                    }`}
                    disabled={isAddingNewRoute}
                  >
                    {isAddingNewRoute ? "Adding..." : "Add"}
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

export default AddNewRouteDefine;
