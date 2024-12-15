"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import editIcon from "@/public/images/Icons/editIcon.svg";
import deleteIcon from "@/public/images/Icons/Delete.svg";
import FormateBadge from "@/utils/formateBadge";

// Define the data type for our rows
interface PNRRecord {
  id: number;
  pnrNo: string;
  ticketsAmount: number;
  arrivalDate: string;
  returnDate: string;
  outboundLocation: string;
  returnLocation: string;
  route: string;
  price: string;
}

export const getColumns = (): ColumnDef<PNRRecord>[] => {
  return [
    {
      accessorKey: "pnrNo",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNR NO" />
      ),
      cell: ({ row }) => <div className=" ">{row.getValue("pnrNo")}</div>,
    },
    {
      accessorKey: "ticketsAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNR Tickets Amount" />
      ),
      cell: ({ row }) => (
        <div className=" ">{row.getValue("ticketsAmount")}</div>
      ),
    },
    {
      accessorKey: "arrivalDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Arrival Date" />
      ),
      cell: ({ row }) => <div className=" ">{row.getValue("arrivalDate")}</div>,
    },
    {
      accessorKey: "returnDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Return Date" />
      ),
      cell: ({ row }) => <div className=" ">{row.getValue("returnDate")}</div>,
    },
    {
      accessorKey: "outboundLocation",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Outbound Arrival Location"
        />
      ),
      cell: ({ row }) => (
        <FormateBadge text={row.getValue("outboundLocation")} />
      ),
    },
    {
      accessorKey: "returnLocation",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Return Departure Location"
        />
      ),
      cell: ({ row }) => <FormateBadge text={row.getValue("returnLocation")} />,
    },
    {
      accessorKey: "route",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNR Route" />
      ),
      cell: ({ row }) => <div className=" ">{row.getValue("route")}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PNR Tickets Price" />
      ),
      cell: ({ row }) => <div className=" ">{row.getValue("price")}</div>,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2 w-full">
          <Image
            src={editIcon}
            alt="edit"
            className="w-[40px] h-[40px] cursor-pointer"
            width={20}
            height={20}
          />
          <Image
            src={deleteIcon}
            alt="Delete"
            className="min-w-[40px] h-[40px] cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      ),
    },
  ];
};

export const fakePNRData: PNRRecord[] = [
  {
    id: 1,
    pnrNo: "P65SG3",
    ticketsAmount: 50,
    arrivalDate: "24/11/2024",
    returnDate: "24/11/2024",
    outboundLocation: "JED",
    returnLocation: "MED",
    route: "LHR/JED/MED/LHR",
    price: "2,000 SAR",
  },
  {
    id: 2,
    pnrNo: "P65SG3",
    ticketsAmount: 50,
    arrivalDate: "24/11/2024",
    returnDate: "24/11/2024",
    outboundLocation: "MED",
    returnLocation: "JED",
    route: "LHR/MED/JED/LHR",
    price: "2,000 SAR",
  },
  // Add more rows as needed
];
