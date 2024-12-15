"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import { XIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import {
  useAddPriceRouteMutation,
  useGetCampRoutesSelectQuery,
  useGetCampsSelectQuery,
} from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import AddButton from "@/components/shared/AddButton";

export const AddNewRoutePrice = () => {
  const [open, setOpen] = useState(false);

  const [addNewRoute, { isLoading: isAddingNewRoute }] =
    useAddPriceRouteMutation();
  const { data: camps } = useGetCampsSelectQuery({});
  const { data: campsRoute } = useGetCampRoutesSelectQuery({});
  const CampsRouteOptions = campsRoute?.data?.map((item: any) => ({
    id: item.id,
    name: item.camp_route,
  }));
  const handleSubmit = async (values: any) => {
    try {
      const sendValues = {
        camp_id: values.camp_name.value,
        camp_route_id: values.camp_route.value,
        price: values.camp_route_price,
      };
      const response = await addNewRoute(sendValues).unwrap();
      if (response.status === "success") {
        toast.success("Camp added successfully");
        setOpen(false);
      } else {
        toast.error("Failed to add camp");
      }
    } catch (error) {
      console.log(error); // Handle any errors during submission
      toast.error("Failed to add camps");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add routes price" />
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
        {/* Header */}
        <div className="p-4  w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            routes price{" "}
            <span className="text-dgray text-base font-normal">
              Add New country in your Website{" "}
            </span>
          </h2>
          <div className="flex gap-2 items-center">
            <DialogClose asChild>
              <span className="p-2 rounded-[5px] cursor-pointer">
                <XIcon className="text-dgray" />
              </span>
            </DialogClose>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 items-center justify-center">
          <Formik
            initialValues={{
              camp_name: "",
              camp_route: "",
              camp_route_price: "0",
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 pt-0 space-y-[30px]">
                <div className="space-y-[20px]">
                  <CustomMultiSelect
                    data={camps?.data || []}
                    formik={FormikProps}
                    isMultiSelect={false}
                    value={FormikProps.values.camp_name}
                    name="camp_name"
                    placeholder="Select Camp Name"
                    title="Camp Name"
                  />
                  <CustomMultiSelect
                    data={CampsRouteOptions || []}
                    formik={FormikProps}
                    isMultiSelect={false}
                    value={FormikProps.values.camp_route}
                    name="camp_route"
                    placeholder="Select Camp Route"
                    title="Camp Route"
                  />
                  <CustomInput
                    type="text"
                    name="camp_route_price"
                    title="camp route price"
                    placeholder="0"
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
                    disabled={isAddingNewRoute}
                    type="submit"
                    className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80"
                  >
                    {isAddingNewRoute ? "Adding..." : "Add"}{" "}
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
