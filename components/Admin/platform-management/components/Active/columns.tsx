"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import editIcon from "@/public/images/Icons/editIcon.svg";
import Image from "next/image";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useDeleteCampMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import { formatDate } from "@/utils/formatDate";
// Define the data type for our rows
interface CampData {
  id: string;
  min_hotel: string;
  max_hotel: string;
  min_contract: string;
  max_contract: string;
}

export const getColumns = (): ColumnDef<CampData>[] => {
  const [deleteCampRoute] = useDeleteCampMutation();
  const handleStatusChange = (id: string, newStatus: boolean) => {
    // Add your status update logic here
    console.log("Status changed for camp", id, "to", newStatus);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteCampRoute({ id });
      toast.success("Camp deleted successfully");
    } catch (error) {
      toast.error("Failed to delete camp");
    }
  };

  const handleEdit = (id: string) => {
    // Add your edit logic here
    console.log("Edit camp", id);
  };

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp ID" />
      ),
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "min_hotel",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Minimum Start Date for Hotels"
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.min_hotel)}</div>,
    },
    {
      accessorKey: "max_hotel",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Maximum End Date for Hotels"
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.max_hotel)}</div>,
    },
    {
      accessorKey: "min_contract",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Minimum Start Date for Contracts"
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.min_contract)}</div>,
    },
    {
      accessorKey: "max_contract",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Maximum End Date for Contracts"
        />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.max_contract)}</div>,
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
          {/* <Image
            src={DeleteIcon}
            alt="delete"
            className=" w-[40px] h-[40px] cursor-pointer"
            width={20}
            height={20}
          /> */}
        </div>
      ),
    },
  ];
};
