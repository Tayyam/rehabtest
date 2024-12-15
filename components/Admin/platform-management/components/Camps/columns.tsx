"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import editIcon from "@/public/images/Icons/editIcon.svg";
import Image from "next/image";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useDeleteCampMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
// Define the data type for our rows
interface CampData {
  id: string;
  name: string;
  services_price: number;
  kidanah_price: number;
  status: boolean;
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Name" />
      ),
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "services_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Services Price" />
      ),
      cell: ({ row }) => <div>{row.original.services_price} SAR</div>,
    },
    {
      accessorKey: "kidanah_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Kidanah Price" />
      ),
      cell: ({ row }) => <div>{row.original.kidanah_price} SAR</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="status & Hide" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Switch
            checked={row.original.status}
            onCheckedChange={(checked) =>
              handleStatusChange(row.original.id, checked)
            }
          />
          <span className="ml-2">{row.original.status ? "Show" : "Hide"}</span>
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
