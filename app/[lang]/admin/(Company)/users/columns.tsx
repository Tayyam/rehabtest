"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";

import { useGetHotelsSelectTypeQuery } from "@/redux/features/api/company/hotels";
import editIcon from "@/public/images/Icons/editIcon.svg";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import AdminImage from "@/public/images/AdminImage.png";
// Define the data type for our rows
interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  createdDate: string;
}

export const getColumns = (): ColumnDef<Employee>[] => {
  const { data: hotelType } = useGetHotelsSelectTypeQuery({});

  const hotelsTypesOptions = hotelType?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
  const handleVisibilityChange = (id: string, newStatus: boolean) => {
    console.log("Visibility changed for hotel", id, "to", newStatus);
  };

  const handleContractChange = (id: string, value: string) => {
    console.log("Contract changed for hotel", id, "to", value);
  };

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Location ID" />
      ),
      cell: ({ row }) => <div className="text-sm">{row.getValue("id")}</div>,
    },

    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name" />
      ),
      cell: ({ row }) => (
        <div className="flex w-full items-center gap-3 ">
          <Avatar className="h-10 w-10">
            <AvatarImage src={AdminImage.src} alt="Admin" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-[16px] font-medium ">{row.original.name}</p>
            <p className="text-[14px] text-[#999EB2]">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "Role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <h2> {row.original.role}</h2>,
    },

    {
      accessorKey: "Created Date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => <h2> {row.original.createdDate}</h2>,
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
          <DeleteDialog deleteFunction={() => {}} />
        </div>
      ),
    },
  ];
};

export const employees: Employee[] = [
  {
    id: 1,
    name: "hassan souroji",
    email: "hassan@rehabco.com",
    role: "Leader",
    createdDate: "24/11/2024",
  },
  {
    id: 2,
    name: "mazen aleisa",
    email: "mazen@rehabco.com",
    role: "Leader",
    createdDate: "24/11/2024",
  },
  {
    id: 3,
    name: "tayyam hany",
    email: "tayyam@rehabco.com",
    role: "IT Support",
    createdDate: "24/11/2024",
  },
  {
    id: 4,
    name: "Omran Villa",
    email: "Omran@rehabco.com",
    role: "IT Support",
    createdDate: "24/11/2024",
  },
  {
    id: 5,
    name: "hany adel",
    email: "hany@rascoda.com",
    role: "Packages Manger",
    createdDate: "24/11/2024",
  },
  {
    id: 6,
    name: "abo aseel",
    email: "aboaseel@rascoda.com",
    role: "Flight Manger",
    createdDate: "24/11/2024",
  },
];
