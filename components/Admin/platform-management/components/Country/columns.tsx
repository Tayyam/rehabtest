"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import Image from "next/image";

// Define the data type for our rows
interface TableData {
  id: string;
  name_en: string;
  flag: string;
}

export const getColumns = (): ColumnDef<TableData>[] => {
  // const [updateStatus] = useUpdatecommentstatusMutation();

  const handleStatusChange = (id: string, newStatus: boolean) => {
    // updateStatus({ id, status: newStatus ? 1 : 0 });
  };

  return [
    {
      id: "index",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Index" />
      ),
      cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Image
            width={24}
            height={24}
            src={row.original.flag || ""}
            alt={`${row.original.name_en} flag`}
            className="w-6 h-4"
          />
          <span>{row.original.name_en}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show" />
      ),
      cell: ({ row }) => (
        <div className="flex justify-start">
          <Switch
            checked={true}
            onCheckedChange={(checked) =>
              handleStatusChange(row.original.id, checked)
            }
          />
        </div>
      ),
    },
  ];
};
