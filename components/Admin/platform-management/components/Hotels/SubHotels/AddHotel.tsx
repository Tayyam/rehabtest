import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import { XIcon } from "lucide-react";
import CustomInput from "@/components/shared/CustomInput";
import { toast } from "sonner";
import {
  useAddHotelMutation,
  useGetHotelsSelectCategoryQuery,
  useGetLocationsSelectQuery,
} from "@/redux/features/api/admin/platform-management";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import AddButton from "@/components/shared/AddButton";

const AddNewHotel = () => {
  const [open, setOpen] = useState(false);
  const [addHotel, { isLoading }] = useAddHotelMutation();
  //get  Locations
  const { data: locations } = useGetLocationsSelectQuery({});
  const LocationsOptions = locations?.data || [];

  // get hotels categories
  const { data: categories } = useGetHotelsSelectCategoryQuery({});
  const CategoriesOptions = categories?.data || [];

  const handleSubmit = async (values: any) => {
    try {
      const SendVales = {
        name: values.name,
        location_id: values.location_id?.value,
        category_id: values.category_id?.value,
      };
      const response = await addHotel(SendVales).unwrap();
      if (response.status === "success") {
        toast.success("Hotel added successfully");
        setOpen(false);
      } else {
        toast.error("Failed to add hotel");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add hotel");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add New Hotel" />
      </DialogTrigger>
      <DialogContent
        style={{
          borderRadius: "22px",
          border: "10px solid rgba(255, 255, 255, 0.05)",
          padding: "0px",
          zIndex: "50",
        }}
        className="md:w-[680px] w-full border-none bg-white"
      >
        <div className="p-4  w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            Add New Hotel
            <span className="text-dgray text-base font-normal">
              Add New Hotel in your Website
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
              name: "",
              category_id: "",
              location_id: "",
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 pt-0 space-y-[30px]">
                <div className="space-y-[20px]">
                  <CustomMultiSelect
                    data={LocationsOptions}
                    formik={FormikProps}
                    isMultiSelect={false}
                    name="location_id"
                    placeholder="Select Hotel Location "
                    title="Hotel Location"
                    value={FormikProps.values.location_id}
                  />
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Write Hotel Name"
                    title="Hotel Name"
                  />
                  <CustomMultiSelect
                    data={CategoriesOptions}
                    formik={FormikProps}
                    isMultiSelect={false}
                    value={FormikProps.values.category_id}
                    name="category_id"
                    placeholder="Select Hotel Category "
                    title="Hotel Category"
                  />
                </div>

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
                    {isLoading ? "Loading..." : "Add"}
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

export default AddNewHotel;
