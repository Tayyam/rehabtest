"use client";
import React, { useState } from "react";
import { toast } from "sonner";

import { Formik, Form } from "formik";
import CustomInput from "@/components/shared/CustomInput";
import CustomFileInputNew from "@/components/shared/CustomFileInputNew/CustomFileInputNew";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";

type Props = {
  file: any;
  setFile: any;
  formikProps: any;
};

function UsersTab({ file, setFile, formikProps }: Props) {
  return (
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
          formikProps={formikProps}
        />
        <CustomMultiSelect
          data={[
            { id: "1", name: "Admin" },
            { id: "2", name: "Manager" },
          ]}
          formik={formikProps}
          name="role"
          title="Role"
          placeholder="Select"
          value={formikProps.values.role}
        />
      </div>
      <CustomInput
        type="email"
        name="email"
        placeholder="User Email"
        title="User Email"
        formikProps={formikProps}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full ">
        <CustomInput
          type="password"
          name="password"
          placeholder="Password"
          title="Password"
          formikProps={formikProps}
        />
        <CustomInput
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          title="Confirm Password"
          formikProps={formikProps}
        />
      </div>
    </div>
  );
}

export default UsersTab;
