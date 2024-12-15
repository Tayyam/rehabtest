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
import { useAddCampMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import AddButton from "@/components/shared/AddButton";

export const AddNewCamps = () => {
  const [open, setOpen] = useState(false);
  const [addCampRoute, { isLoading }] = useAddCampMutation();
  const handleSubmit = async (values: {
    name: string;
    services_price: string;
    kidanah_price: string;
  }) => {
    try {
      const sendValues = {
        name: values.name,
        services_price: values.services_price,
        kidanah_price: values.kidanah_price,
      };
      const response = await addCampRoute(sendValues).unwrap();
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
        <AddButton onOpenChange={setOpen} title="Add New Camp" />
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
        <div className="p-4 w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            Add New Camp{" "}
            <span className="text-dgray text-base font-normal">
              Add New country in your Website{" "}
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
              name: "",
              services_price: "0",
              kidanah_price: "0",
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="add camp name Here"
                    title="camp name"
                  />
                  <div className="flex gap-5 w-full ">
                    <CustomInput
                      type="text"
                      name="services_price"
                      placeholder="0"
                      title="Camp services price"
                    />
                    <CustomInput
                      type="text"
                      name="kidanah_price"
                      title="Camp kidanah price"
                      placeholder="0"
                    />
                  </div>
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
