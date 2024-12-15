"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Badge } from "@/components/ui/badge";

// Define the data type for our rows
interface TableData {
  id: string;
  hotelLocationId: string;
  name: string;
  areas: { name: string }[];
}

export const getColumns = (): ColumnDef<TableData>[] => {
  return [
    {
      accessorKey: "hotelLocationId",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Location ID" />
      ),
      cell: ({ row }) => <div className=" ">{row.original.id}</div>,
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
              row.original.name === "Madinah"
                ? "bg-[#019444]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#019444]"
                : "bg-[#F04438]/10 text-[12px] font-[500] px-[15px] py-[5px] text-[#F04438]"
            }
          `}
        >
          {row.original.name}
        </Badge>
      ),
    },
    {
      accessorKey: "hotelArea",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Area" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original?.areas?.map(({ name }, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`
                ${
                  name == "Madinah"
                    ? "bg-[#019444]/5 text-[#019444] p-2 border border-[#D9EFE3] "
                    : name == "Main"
                    ? "bg-[#F04438]/5 text-[#F04438] p-2 border border-[#E9D7FE] "
                    : "bg-[#3538CD]/5 text-[#3538CD] p-2 border border-[#C7D7FE] "
                }
              `}
            >
              {name}
            </Badge>
          ))}
        </div>
      ),
    },
  ];
};

// Sample data matching the image
// export const sampleData: TableData[] = [
//   {
//     id: "1",
//     hotelLocationId: "547785",
//     hotelLocation: "Madinah",
//     hotelArea: ["Madinah"],
//   },
//   {
//     id: "2",
//     hotelLocationId: "547785",
//     hotelLocation: "Makkah",
//     hotelArea: ["Main Makkah", "Shifting Makkah"],
//   },
// ];
