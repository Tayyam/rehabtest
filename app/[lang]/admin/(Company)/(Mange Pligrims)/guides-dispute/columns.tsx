"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Form, Formik } from "formik";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";

interface Pilgrim {
  id: string;
  serialNumber: string;
  serialNumber2: string;
  packageNickName: string;
  passportNumber: string;
  pilgrimName: string;
  mobileNumber: string;
  guides: {
    selected?: string;
    count: number;
  };
}

export const getColumns = (): ColumnDef<Pilgrim>[] => {
  return [
    {
      accessorKey: "serialNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Number" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-medium">
          {row.getValue("serialNumber")}
        </div>
      ),
    },
    {
      accessorKey: "serialNumber2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Number" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("serialNumber2")}</div>
      ),
    },
    {
      accessorKey: "packageNickName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package NickName" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("packageNickName")}</div>
      ),
    },
    {
      accessorKey: "passportNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Passport Number" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("passportNumber")}</div>
      ),
    },
    {
      accessorKey: "pilgrimName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pilgrim Name" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("pilgrimName")}</div>
      ),
    },
    {
      accessorKey: "mobileNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mobile Number" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("mobileNumber")}</div>
      ),
    },
    {
      accessorKey: "guides",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Guides" />
      ),
      cell: ({ row }) => {
        const guides = row.getValue("guides") as Pilgrim["guides"];
        return (
          <div className="flex min-w-[250px] w-full gap-2">
            <Formik
              initialValues={{
                pno_no: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {(FormikProps) => (
                <Form className="w-full ">
                  <CustomMultiSelect
                    placeholder="select "
                    title=""
                    data={[
                      { id: "1", name: "hassan" },
                      { id: "2", name: "mazen" },
                      { id: "3", name: "tayyam" },
                      { id: "4", name: "Omran" },
                    ]}
                    formik={FormikProps}
                    name="pno_no"
                    value={FormikProps.values.pno_no}
                    isMultiSelect={true}
                  />
                </Form>
              )}
            </Formik>
          </div>
        );
      },
    },
  ];
};

export const pilgrims: Pilgrim[] = [
  {
    id: "1",
    serialNumber: "554788",
    serialNumber2: "64812",
    packageNickName: "ithraa al khair 01",
    passportNumber: "532867136",
    pilgrimName: "Nazia Aktar Sharmin",
    mobileNumber: "+447873224464",
    guides: {
      count: 3,
    },
  },
  {
    id: "2",
    serialNumber: "554788",
    serialNumber2: "64812",
    packageNickName: "ithraa al khair 02",
    passportNumber: "532867136",
    pilgrimName: "Peayra Khanum",
    mobileNumber: "+447873224464",
    guides: {
      selected: "Sobaan",
      count: 3,
    },
  },
];
