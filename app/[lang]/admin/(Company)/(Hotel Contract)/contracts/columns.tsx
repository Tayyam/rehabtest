"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import { Badge } from "@/components/ui/badge";
import editIcon from "@/public/images/Icons/editIcon.svg";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { useDeleteContractsMutation } from "@/redux/features/api/company/contracts";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
// Define the data type for our rows
interface HotelData {
  id: string;
  contract: {
    type: {
      name: string;
    };
    hotel: {
      name: string;
      location: {
        name: string;
      };
    };
  };
  start_date: string;
  end_date: string;
  from_to: string;
  double_rooms: string;
  quadruple_rooms_price: string;
  triple_rooms: string;
  triple_rooms_price: string;
  quadruple_rooms: string;
  double_rooms_price: string;
  food_price: string;
  status: boolean;
}

export const getColumns = (): ColumnDef<HotelData>[] => {
  const [deleteContract] = useDeleteContractsMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteContract({ id });
      toast.success("Contract deleted successfully");
    } catch (error) {
      toast.error("Failed to delete contract");
    }
  };
  const handleVisibilityChange = (id: string, newStatus: boolean) => {
    console.log("Visibility changed for hotel", id, "to", newStatus);
  };

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contract ID" />
      ),
      cell: ({ row }) => <div className="text-sm">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "contractType",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contract Type" />
      ),
      cell: ({ row }) => {
        const type = row.original.contract.type.name as string;
        return (
          <Badge
            variant="secondary"
            className={`${
              type === "Fixed"
                ? "bg-[#E0E7FF]  border border-[#1E3A8A]/30 text-[#1E3A8A]"
                : "bg-[#EFF8FF]  border border-[#019444]/30 text-[#019444]"
            } px-4 py-2 rounded-[16px]`}
          >
            {type}
          </Badge>
        );
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Location" />
      ),
      cell: ({ row }) => (
        <Badge
          className={`${
            row.original.contract.hotel.location.name === "Madinah"
              ? "bg-[#019444]/10 text-[#019444]"
              : "bg-[#F04438]/10 text-[#F04438]"
          } px-3 py-1 text-sm`}
        >
          {row.original.contract.hotel.location.name}
        </Badge>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name" />
      ),
      cell: ({ row }) => <div>{row.original.contract.hotel.name}</div>,
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Date" />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.start_date)}</div>,
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Date" />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.end_date)}</div>,
    },
    // {
    //   accessorKey: "from_to",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="From To" />
    //   ),
    //   cell: ({ row }) => <div>{formatDate(row.original.from_to)}</div>,
    // },
    {
      accessorKey: "double_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Double Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5 ">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {" "}
            {row.original.double_rooms}{" "}
          </span>

          <p>{row.original.double_rooms_price} SAR</p>
        </div>
      ),
    },
    {
      accessorKey: "tripleRooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Triple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5 ">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {" "}
            {row.original.triple_rooms}{" "}
          </span>

          <p>{row.original.triple_rooms_price} SAR</p>
        </div>
      ),
    },
    {
      accessorKey: "quadrupleRooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quadruple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5 ">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {" "}
            {row.original.quadruple_rooms}{" "}
          </span>

          <p>{row.original.quadruple_rooms_price} SAR</p>
        </div>
      ),
    },
    {
      accessorKey: "food_price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Food Price" />
      ),
      cell: ({ row }) => <div>{row.original.food_price}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.getValue("status")}
            onCheckedChange={(checked) =>
              handleVisibilityChange(row.original.id, checked)
            }
          />
          <span className="text-sm">Show</span>
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
