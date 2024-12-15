"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { Formik, Form, FormikHelpers } from "formik";
import Switch from "@/components/shared/Switch/Switch";
import AddButton from "@/components/shared/AddButton";
import CustomInput from "@/components/shared/CustomInput";
import CustomFileInputNew from "@/components/shared/CustomFileInputNew/CustomFileInputNew";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";

// Define interface for UserRole with more explicit typing
interface UserRole {
  type: string;
  permissions: {
    show: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}

// Initial roles with more explicit type
const INITIAL_ROLES: UserRole[] = [
  {
    type: "Accountant",
    permissions: { show: false, add: false, edit: false, delete: false },
  },
  {
    type: "PNR",
    permissions: { show: false, add: false, edit: false, delete: false },
  },
  {
    type: "Package",
    permissions: { show: false, add: false, edit: false, delete: false },
  },
  {
    type: "Hotel Contract",
    permissions: { show: false, add: false, edit: false, delete: false },
  },
];

interface UserFormValues {
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export function AddNewUser() {
  // State management
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [tabs, setTabs] = useState(0);
  const [roles, setRoles] = useState<UserRole[]>(INITIAL_ROLES);

  // Initial form values
  const initialValues: UserFormValues = {
    name: "",
    role: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  // Improved permission toggle function
  const togglePermission = (
    roleIndex: number,
    permission: keyof UserRole["permissions"]
  ) => {
    setRoles((prevRoles) => {
      // Create a deep copy of the previous roles
      const newRoles = prevRoles.map((role, index) => {
        if (index === roleIndex) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [permission]: !role.permissions[permission],
            },
          };
        }
        return role;
      });

      return newRoles;
    });
  };

  // Form submission handler
  const handleSubmit = (
    values: UserFormValues,
    { setSubmitting }: FormikHelpers<UserFormValues>
  ) => {
    try {
      // Combine form values with role permissions
      const submissionData = {
        ...values,
        roles: roles,
        file: file,
      };

      // Add your actual submission logic here
      console.log("Submission Data:", submissionData);

      toast.success("User created successfully");
      setSubmitting(false);
      setOpen(false);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Failed to create user");
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add User" />
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
            Add New User
            <span className="text-dgray text-base font-normal">
              Add New User In Your Company
            </span>
          </h2>
          <DialogClose asChild>
            <span className="p-2 rounded-[5px] cursor-pointer">
              <XIcon className="text-dgray" />
            </span>
          </DialogClose>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {(FormikProps) => (
            <Form className="w-full p-5 pt-[30px] pb-0 space-y-[20px]">
              {/* buttons */}
              <div className="p-2.5 border border-[#F5F5F7] rounded-[10px] w-full flex gap-2.5">
                {["User Details", "User Roles"].map((tab, index) => (
                  <div
                    key={tab}
                    onClick={() => setTabs(index)}
                    className={`w-full rounded-[10px] cursor-pointer transition-all h-[48px] flex items-center justify-center text-[16px] font-[500] ${
                      tabs === index
                        ? "bg-primaryColor/10 text-primaryColor"
                        : "bg-gray hover:bg-primaryColor/5 text-black"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* Render both tabs, but control visibility */}
              <div className={`${tabs === 0 ? "block" : "hidden"}`}>
                <div className="space-y-[20px]">
                  {/* Image Input */}
                  <CustomFileInputNew file={file} setFile={setFile} />

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomInput
                      type="text"
                      name="name"
                      placeholder="User Name"
                      title="User Name"
                    />
                    <CustomMultiSelect
                      data={[
                        { id: "1", name: "Admin" },
                        { id: "2", name: "Manager" },
                      ]}
                      formik={FormikProps}
                      name="role"
                      title="Role"
                      placeholder="Select"
                      value={FormikProps.values.role}
                    />
                  </div>
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="User Email"
                    title="User Email"
                  />

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
              </div>

              {/* User Roles Tab */}
              <div className={`space-y-4 ${tabs === 1 ? "block" : "hidden"}`}>
                <div className="grid grid-cols-6 gap-4 bg-gray text-secondaryColor h-[60px] rounded-t-[12px] items-center font-medium">
                  <div className="col-span-2 px-4">Type</div>
                  <div>Show</div>
                  <div>Add</div>
                  <div>Edit</div>
                  <div>Delete</div>
                </div>
                {roles.map((role, index) => (
                  <div
                    key={role.type}
                    className="grid grid-cols-6 text-secondaryColor border-[#F5F5F7] border-b h-[60px] gap-4 items-center"
                  >
                    <div className="col-span-2 font-[500]">{role.type}</div>
                    {(
                      Object.keys(role.permissions) as Array<
                        keyof typeof role.permissions
                      >
                    ).map((key) => (
                      <div key={key}>
                        <Switch
                          checked={role.permissions[key]}
                          onCheckedChange={() => togglePermission(index, key)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
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
                  className="w-full bg-primaryColor rounded-[6px] h-[50px] text-white hover:bg-primaryColor/80"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
