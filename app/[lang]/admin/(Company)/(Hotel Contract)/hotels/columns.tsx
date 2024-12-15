"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import editIcon from "@/public/images/Icons/editIcon.svg";

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteHotelsMutation,
  useGetHotelsSelectTypeQuery,
} from "@/redux/features/api/company/hotels";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import Image from "next/image";
import { toast } from "sonner";

// Define the data type for our rows
interface HotelData {
  id: string;
  hotel: {
    name: string;
    location: {
      name: string;
    };
    category: { name: string };
  };
  // category: string;
  coler: string;
  status: boolean;
  hotel_type_id: string;
  contractorImage?: string;
}

export const getColumns = (): ColumnDef<HotelData>[] => {
  const { data: hotelType } = useGetHotelsSelectTypeQuery({});

  const hotelsTypesOptions = hotelType?.data?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  const [deleteHotel] = useDeleteHotelsMutation();
  const handleDelete = async (id: string) => {
    try {
      await deleteHotel({ id });
      toast.success("Hotel deleted successfully");
    } catch (error) {
      toast.error("Failed to delete hotel");
    }
  };
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
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Location" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={`
            ${
              row.original.hotel.location.name === "Madinah"
                ? "bg-[#019444]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#019444]"
                : "bg-[#F04438]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#F04438]"
            }
          `}
        >
          {row.original.hotel.location.name}
        </Badge>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name" />
      ),
      cell: ({ row }) => (
        <div className="" style={{ color: `${row.original.coler}` }}>
          {row.original.hotel.name}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Category" />
      ),
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className="bg-[#F8871C]/15 text-[12px] font-[500] px-[15px] py-[2px] text-[#F8871C]"
        >
          {row.original.hotel.category.name}
        </Badge>
      ),
    },
    {
      accessorKey: "color",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Color" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <div
            className="w-[22px] h-[22px] rounded"
            style={{ backgroundColor: row.original.coler }}
          />
          <span className="text-[16px] text-[#3F528E] font-[500] ">
            {row.original.coler}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide The Hotel" />
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
      accessorKey: "contract",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel contract type" />
      ),
      cell: ({ row }) => {
        const contract = row.original.hotel_type_id as string;
        return (
          <div className="flex items-center gap-2">
            <Select
              defaultValue={contract}
              onValueChange={(value) =>
                handleContractChange(row.original.id, value)
              }
            >
              <SelectTrigger
                className={`w-[100px] ${
                  contract == "1"
                    ? "bg-[#E0E7FF] text-[#1E3A8A] border-[#1E3A8A]/30 "
                    : "bg-[#EFF8FF] text-[#019444] border-[#019444]/30 "
                }`}
              >
                <SelectValue placeholder="Select contract" />
              </SelectTrigger>
              <SelectContent className=" bg-white">
                {hotelsTypesOptions.map(
                  (option: { id: string; name: string }) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      className="text-[#1E3A8A] cursor-pointer font-bold"
                    >
                      {option.name}
                    </SelectItem>
                  )
                )}
                {/* <SelectItem
                  value="Fixed"
                  className="text-[#1E3A8A] cursor-pointer font-bold"
                >
                  Fixed
                </SelectItem>
                <SelectItem
                  value="Flexible"
                  className="text-[#019444] cursor-pointer font-bold"
                >
                  Flexible
                </SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        );
      },
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
