"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Switch from "@/components/shared/Switch/Switch";
import editIcon from "@/public/images/Icons/editIcon.svg";
import Image from "next/image";
import { useDeleteHotelMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
// Define the data type for our rows
interface TableData {
  id: string;
  location: {
    name: string;
  };
  name: string;
  category: {
    name: string;
  };
  status: boolean;
}

export const getColumns = (): ColumnDef<TableData>[] => {
  const [deleteHotel] = useDeleteHotelMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteHotel({ id });
      toast.success("Hotel deleted successfully");
    } catch (error) {
      toast.error("Failed to delete hotel");
    }
  };
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel ID" />
      ),
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "hotelLocation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Location" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`
            ${
              row.original.location.name === "Madinah"
                ? "bg-[#019444]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#019444]"
                : "bg-[#F04438]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#F04438]"
            }
          `}
        >
          {row.original.location.name}
        </Badge>
      ),
    },
    {
      accessorKey: "hotelName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name" />
      ),
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "hotelCategory",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Category" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="bg-[#F8871C]/15 text-[12px] font-[500] px-[15px] py-[2px] text-[#F8871C]"
        >
          {row.original.category.name}
        </Badge>
      ),
    },
    {
      accessorKey: "isVisible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide The Hotel" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch onCheckedChange={() => {}} checked={row.original.status} />
          <span>Show</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Image
            src={editIcon}
            alt="edit"
            className=" w-[40px] h-[40px] cursor-pointer"
            width={20}
            height={20}
          />
          <DeleteDialog deleteFunction={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];
};
