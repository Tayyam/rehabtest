"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form, FormikProps } from "formik";
import { XIcon } from "lucide-react";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import AddButton from "@/components/shared/AddButton";
import Switch from "@/components/shared/Switch/Switch";
import * as Yup from "yup";
import { HotelArea } from "./form/HotelArea";
import { toast } from "sonner";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import {
  useGetPackageTypeQuery,
  useGetCountriesQuery,
  useGetCampsQuery,
  useAddPackageMutation,
} from "@/redux/features/api/company/package";

export const AddNewPackage = () => {
  const [open, setOpen] = useState(false);
  const [isArea3, setIsArea3] = useState(false);
  const [addPackage, { isLoading }] = useAddPackageMutation();
  const { data: packageType } = useGetPackageTypeQuery({});
  const packageTypeOptions = packageType?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  const { data: countriesData } = useGetCountriesQuery({});
  const countries = countriesData?.data?.map((item: any) => ({
    id: item.id,
    name: item.name_en,
  }));
  const { data: camps } = useGetCampsQuery({});
  const handleSubmit = async (values: any) => {
    if (isArea3) {
      if (
        values.hotel_contract_1_pilgrims !== values.hotel_contract_2_pilgrims ||
        values.hotel_contract_1_pilgrims !== values.hotel_contract_3_pilgrims ||
        values.hotel_contract_2_pilgrims !== values.hotel_contract_3_pilgrims
      ) {
        toast.error("Sum of room occupants must be equal");
        return;
      }
    } else {
      if (
        values.hotel_contract_1_pilgrims !== values.hotel_contract_2_pilgrims
      ) {
        toast.error("Sum of room occupants must be equal");
        return;
      }
    }
    const sendValues = {
      package_nickname: values.package_nickname,
      hotel_area_1: values.hotel_area_1.label,
      contract_id_1: values.contract_id_1.value,
      hotel_name_1: values.hotel_name_1.label,
      hotel_contract_1_start_date: values.hotel_contract_1_start_date,
      hotel_contract_1_end_date: values.hotel_contract_1_end_date,
      hotel_contract_1_double_rooms: values.hotel_contract_1_double_rooms,
      hotel_contract_1_triple_rooms: values.hotel_contract_1_triple_rooms,
      hotel_contract_1_quadruple_rooms: values.hotel_contract_1_quadruple_rooms,
      hotel_contract_1_pilgrims: values.hotel_contract_1_pilgrims,

      hotel_area_2: values.hotel_area_2.label,
      contract_id_2: values.contract_id_2.value,
      hotel_name_2: values.hotel_name_2.label,
      hotel_contract_2_start_date: values.hotel_contract_2_start_date,
      hotel_contract_2_end_date: values.hotel_contract_2_end_date,
      hotel_contract_2_double_rooms: values.hotel_contract_2_double_rooms,
      hotel_contract_2_triple_rooms: values.hotel_contract_2_triple_rooms,
      hotel_contract_2_quadruple_rooms: values.hotel_contract_2_quadruple_rooms,
      hotel_contract_2_pilgrims: values.hotel_contract_2_pilgrims,

      hotel_area_3: values.hotel_area_3.label,
      contract_id_3: values.contract_id_3.value,
      hotel_name_3: values.hotel_name_3.label,
      hotel_contract_3_start_date: values.hotel_contract_3_start_date,
      hotel_contract_3_end_date: values.hotel_contract_3_end_date,
      hotel_contract_3_double_rooms: values.hotel_contract_3_double_rooms,
      hotel_contract_3_triple_rooms: values.hotel_contract_3_triple_rooms,
      hotel_contract_3_quadruple_rooms: values.hotel_contract_3_quadruple_rooms,
      hotel_contract_3_pilgrims: values.hotel_contract_3_pilgrims,
      package_type_id: values.package_type_id.value,
      camp_id: values.camp_id.value,
      contrey_ids: values.contrey_ids.map((item: any) => item.value),
    };
    try {
      await addPackage({ data: sendValues });
      toast.success("Package added successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add package");
    }
  };

  const initialValues = {
    package_nickname: "",
    hotel_area_1: "",
    contract_id_1: "",
    hotel_name_1: "",
    hotel_contract_1_start_date: "",
    hotel_contract_1_end_date: "",
    hotel_contract_1_double_rooms: 0,
    hotel_contract_1_triple_rooms: 0,
    hotel_contract_1_quadruple_rooms: 0,
    hotel_contract_1_pilgrims: 0,

    hotel_area_2: "",
    contract_id_2: "",
    hotel_name_2: "",
    hotel_contract_2_start_date: "",
    hotel_contract_2_end_date: "",
    hotel_contract_2_double_rooms: 0,
    hotel_contract_2_triple_rooms: 0,
    hotel_contract_2_quadruple_rooms: 0,
    hotel_contract_2_pilgrims: 0,

    hotel_area_3: "",
    contract_id_3: "",
    hotel_name_3: "",
    hotel_contract_3_start_date: "",
    hotel_contract_3_end_date: "",
    hotel_contract_3_double_rooms: 0,
    hotel_contract_3_triple_rooms: 0,
    hotel_contract_3_quadruple_rooms: 0,
    hotel_contract_3_pilgrims: 0,

    package_type_id: "",
    camp_id: "",
    contrey_ids: "",
    isArea3: false,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AddButton onOpenChange={setOpen} title="Add Packages" />
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
            Add Packages{" "}
            <span className="text-dgray text-base font-normal">
              Add New Packages in your Website{" "}
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
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={validationSchema}
          >
            {(formikProps: FormikProps<any>) => (
              <Form className="w-full px-5 space-y-[30px]">
                <div className="space-y-[20px]">
                  <CustomInput
                    type="text"
                    name="package_nickname"
                    placeholder="add package nickName"
                    title="Package Nickname"
                    value={formikProps.values.package_nickname}
                  />

                  {/* areas */}
                  <div className=" p-[15px] flex flex-col gap-5 rounded-[10px] border border-[#F5F5F7] ">
                    {/* switch */}
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={isArea3}
                        onCheckedChange={(checked) => {
                          setIsArea3(checked);
                          formikProps.setFieldValue("isArea3", checked);
                        }}
                      />
                      <span className="text-16 text-[#3F528E] font-[500]">
                        Have Shifting Area
                      </span>
                    </div>

                    {/* hotel area1 */}
                    <HotelArea areaNumber={1} formikProps={formikProps} />

                    {/* hotel area2 */}
                    <HotelArea areaNumber={2} formikProps={formikProps} />

                    {/* hotel area3 */}
                    {isArea3 && (
                      <HotelArea areaNumber={3} formikProps={formikProps} />
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <CustomMultiSelect
                      name="package_type_id"
                      title="Package Type"
                      placeholder="Select "
                      value={formikProps.values.package_type_id}
                      data={packageTypeOptions || []}
                      formik={formikProps}
                    />
                    <CustomMultiSelect
                      name="camp_id"
                      title="Camp"
                      data={camps.data || []}
                      formik={formikProps}
                      placeholder="Select "
                      value={formikProps.values.camp_id}
                    />
                  </div>
                  <CustomMultiSelect
                    name="contrey_ids"
                    title="Contrey"
                    data={countries || []}
                    formik={formikProps}
                    placeholder="Select "
                    value={formikProps.values.contrey_ids}
                    isMultiSelect={true}
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
                    {isLoading ? "Loading..." : "Save"}
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
