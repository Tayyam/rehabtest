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
import { useAddCompanyMutation } from "@/redux/features/api/admin/company";
import { toast } from "sonner";
import AddButton from "@/components/shared/AddButton";
import CustomFileInputNew from "@/components/shared/CustomFileInputNew/CustomFileInputNew";

export const AddNewCompany = () => {
  const [open, setOpen] = useState(false);
  const [addCompany, { isLoading }] = useAddCompanyMutation();
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (values: {
    name: string;
    manger_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => {
    try {
      if (values.password !== values.password_confirmation) {
        toast.error("Password and Confirm Password must be same");
        return;
      }
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("maneger", values.manger_name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      if (file) {
        formData.append("img", file); // Append the image file if available
      }

      const response = await addCompany(formData).unwrap();

      if (response.status === "success") {
        toast.success("Company added successfully");
      }
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add Company");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add New Company" />
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
        <div className="p-4 w-full bg-white flex justify-between items-center border-b border-b-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-semibold flex flex-col gap-0 text-lg items-start">
            New Company{" "}
            <span className="text-dgray text-base font-normal">
              Add a new company to your platform
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
              email: "",
              password: "",
              password_confirmation: "",
              manger_name: "",
            }}
            onSubmit={handleSubmit}
          >
            {(FormikProps) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  {/* Image Input */}
                  <CustomFileInputNew file={file} setFile={setFile} />

                  {/* Form Inputs */}
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Company Name"
                    title="Company Name"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full ">
                    <CustomInput
                      type="text"
                      name="manger_name"
                      placeholder="Manager Name"
                      title="Manager Name"
                    />
                    <CustomInput
                      type="email"
                      name="email"
                      placeholder="Manager Email"
                      title="Manager Email"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full ">
                    <CustomInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      title="Password"
                    />
                    <CustomInput
                      type="password"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      title="Confirm Password"
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
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80"
                  >
                    {isLoading ? "Adding..." : "Add Company"}
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
