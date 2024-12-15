"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import Image from "next/image";
import DeleteIcon from "@/public/images/Icons/Delete.svg";
import editIcon from "@/public/images/Icons/editIcon.svg";
import { useDeletePriceRouteMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

// Updated interface to match the new structure
interface CampRouteData {
  id: number;
  camp: { name: string };
  camp_route: {
    camp_route: number;
  };
  price: string;
  show: boolean;
}

export const getColumns = (): ColumnDef<CampRouteData>[] => {
  const [deletePriceRoute] = useDeletePriceRouteMutation();
  const handleDelete = async (id: number) => {
    try {
      await deletePriceRoute({ id });
      toast.success("Price Route deleted successfully");
    } catch (error) {
      toast.error("Failed to delete price route");
    }
  };
  const handleStatusChange = (
    campName: string,
    route: number,
    newStatus: boolean
  ) => {
    console.log(
      "Status changed for camp",
      campName,
      "route",
      route,
      "to",
      newStatus
    );
  };

  return [
    {
      accessorKey: "campName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Name" />
      ),
      cell: ({ row }) => <div className="  ">{row.original.camp?.name}</div>,
    },
    {
      accessorKey: "campRoute",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Route" />
      ),
      cell: ({ row }) => <div>{row.original.camp_route?.camp_route}</div>,
    },
    {
      accessorKey: "campRoutePrice",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Route Price" />
      ),
      cell: ({ row }) => <div>{row.original.price} SAR</div>,
    },
    {
      accessorKey: "show",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* <Switch
            checked={row.original.show}
            onCheckedChange={(checked) =>
              handleStatusChange(
                ,
                row.original.camp?.name,
                checked
              )
            }
          /> */}
          <span className=" ">Show</span>
        </div>
      ),
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
          <DeleteDialog deleteFunction={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];
};
