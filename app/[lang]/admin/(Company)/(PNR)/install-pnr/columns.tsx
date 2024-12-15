"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FormateBadge from "@/utils/formateBadge";
import CustomMultiSelect from "@/components/shared/CustomMultiSelect";
import { Form, Formik } from "formik";

// Define the data type for our rows
interface PackageRecord {
  id: number;
  packageNickname: string;
  ticketsPilgrims: string;
  country: string;
  packageType: string;
  firstHotelLocation: string;
  lastHotelLocation: string;
  pnrNo: string[];
  campRoute: string;
}

export const getColumns = (): ColumnDef<PackageRecord>[] => {
  return [
    {
      accessorKey: "packageNickname",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package Nickname" />
      ),
      cell: ({ row }) => <div>{row.getValue("packageNickname")}</div>,
    },
    {
      accessorKey: "ticketsPilgrims",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tickets/Pilgrims" />
      ),
      cell: ({ row }) => <div>{row.getValue("ticketsPilgrims")}</div>,
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country" />
      ),
      cell: ({ row }) => <div>{row.getValue("country")}</div>,
    },
    {
      accessorKey: "packageType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package Type" />
      ),
      cell: ({ row }) => <div>{row.getValue("packageType")}</div>,
    },
    {
      accessorKey: "firstHotelLocation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Hotel Location" />
      ),
      cell: ({ row }) => (
        <FormateBadge text={row.getValue("firstHotelLocation")} />
      ),
    },
    {
      accessorKey: "lastHotelLocation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Hotel Location" />
      ),
      cell: ({ row }) => (
        <FormateBadge text={row.getValue("lastHotelLocation")} />
      ),
    },
    {
      accessorKey: "pnrNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNR NO" />
      ),
      cell: ({ row }) => (
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
      ),
    },
    {
      accessorKey: "campRoute",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Route" />
      ),
      cell: ({ row }) => <div>{row.getValue("campRoute")}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex w-full justify-center items-center gap-2.5 pb-4">
          <button
            type="submit"
            className=" bg-primaryColor text-white hover:bg-primaryColor/80  transition-all  w-[70px] rounded-[6px] h-[40px] "
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray w-[70px] hover:bg-gray/80 h-[40px]  rounded-[6px] transition-all text-dgray "
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];
};

export const fakePackageData: PackageRecord[] = [
  {
    id: 1,
    packageNickname: "ithraa al khair 01",
    ticketsPilgrims: "500/500",
    country: "Egypt",
    packageType: "Luxury Shifting",
    firstHotelLocation: "Madinah",
    lastHotelLocation: "Madinah",
    pnrNo: ["P65SG3", "P65SG3"],
    campRoute: "1",
  },
  {
    id: 2,
    packageNickname: "ithraa al khair 02",
    ticketsPilgrims: "300/300",
    country: "Egypt",
    packageType: "Luxury Shifting",
    firstHotelLocation: "Makkah",
    lastHotelLocation: "Makkah",
    pnrNo: ["P65SG3", "P65SG3"],
    campRoute: "1",
  },
  // Add more rows as needed
];
