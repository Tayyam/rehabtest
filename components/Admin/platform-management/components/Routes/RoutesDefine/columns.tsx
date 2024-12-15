"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import Image from "next/image";
import editIcon from "@/public/images/Icons/editIcon.svg";
import { useDeleteCampRouteMutation } from "@/redux/features/api/admin/platform-management";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

// Define the data type for our rows
interface CampRouteData {
  camp_route_id: number;
  camp_route: number;
  // camp_services_price: string;
  outbound_arrival_location: string;
  first_hotel_location: string;
  last_hotel_location: string;
  return_departure_location: string;
  show: boolean;
}

export const getColumns = (): ColumnDef<CampRouteData>[] => {
  const [deleteCampRoute] = useDeleteCampRouteMutation();
  const handleStatusChange = (id: number, newStatus: boolean) => {
    console.log("Status changed for route", id, "to", newStatus);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCampRoute({ id });
      toast.success("Route deleted successfully");
    } catch (error) {
      toast.error("Failed to delete route");
    }
  };

  const handleEdit = (id: number) => {
    console.log("Edit route", id);
  };

  const LocationBadge = ({
    location,
    type,
  }: {
    location: string;
    type: "arrival" | "hotel" | "departure";
  }) => {
    const getBgColor = () => {
      switch (location?.toLowerCase()) {
        case "jed":
          return "bg-red-100 text-red-600";
        case "med":
          return "bg-green-100 text-green-600";
        case "madinah":
          return "bg-green-100 text-green-600";
        case "makkah":
          return "bg-red-100 text-red-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${getBgColor()}`}
      >
        {location}
      </span>
    );
  };

  return [
    {
      accessorKey: "camp_route_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Route ID" />
      ),
      cell: ({ row }) => <div>{row.original.camp_route_id}</div>,
    },
    {
      accessorKey: "camp_route",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Route" />
      ),
      cell: ({ row }) => <div>{row.original.camp_route}</div>,
    },
    // {
    //   accessorKey: "camp_services_price",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Camp Services Price" />
    //   ),
    //   cell: ({ row }) => <div>{row.original.camp_services_price} SAR</div>,
    // },
    {
      accessorKey: "outbound_arrival_location",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Outbound Arrival Location"
        />
      ),
      cell: ({ row }) => (
        <LocationBadge
          location={row.original.outbound_arrival_location}
          type="arrival"
        />
      ),
    },
    {
      accessorKey: "first_hotel_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First Hotel Location" />
      ),
      cell: ({ row }) => (
        <LocationBadge
          location={row.original.first_hotel_location}
          type="hotel"
        />
      ),
    },
    {
      accessorKey: "last_hotel_location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last Hotel Location" />
      ),
      cell: ({ row }) => (
        <LocationBadge
          location={row.original.last_hotel_location}
          type="hotel"
        />
      ),
    },
    {
      accessorKey: "return_departure_location",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Return Departure Location"
        />
      ),
      cell: ({ row }) => (
        <LocationBadge
          location={row.original.return_departure_location}
          type="departure"
        />
      ),
    },
    {
      accessorKey: "show",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.original.show}
            onCheckedChange={(checked) =>
              handleStatusChange(row.original.camp_route_id, checked)
            }
          />
          <span className="text-blue-600">Show</span>
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
            onClick={() => handleEdit(row.original.camp_route_id)}
          />
          <DeleteDialog
            deleteFunction={() => handleDelete(row.original.camp_route_id)}
          />
        </div>
      ),
    },
  ];
};
