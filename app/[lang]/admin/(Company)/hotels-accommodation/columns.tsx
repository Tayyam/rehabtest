"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Pencil, Trash2, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import fileImage from "@/public/images/Icons/fileImage.svg";
import Image from "next/image";
interface Hotel {
  id: number;
  hotelName: string;
  hotelTabelName: string;
  rooms: {
    template: string;
    quota: number;
    filed: number;
  };
  pilgrims: {
    quota: number;
    filed: number;
  };
}

export const getColumns = (): ColumnDef<Hotel>[] => {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Table ID" />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "hotelName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("hotelName")}</div>
      ),
    },
    {
      accessorKey: "hotelTabelName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Tabel Name" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.getValue("hotelTabelName")}</div>
      ),
    },
    {
      accessorKey: "rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rooms" />
      ),
      cell: ({ row }) => {
        const rooms = row.getValue("rooms") as Hotel["rooms"];
        return (
          <div className="flex items-center gap-2 px-4">
            <Image src={fileImage} alt="fileImage" width={30} height={30} />
            <p> {rooms.template}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "rooms.quota",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rooms Quota" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          {(row.getValue("rooms") as Hotel["rooms"]).quota}
        </div>
      ),
    },
    {
      accessorKey: "rooms.filed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rooms Filed" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          {(row.getValue("rooms") as Hotel["rooms"]).filed}
        </div>
      ),
    },
    {
      accessorKey: "pilgrims.quota",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pilgrims Quota" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.original.pilgrims.quota}</div>
      ),
    },
    {
      accessorKey: "pilgrims.filed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pilgrims Filed" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">{row.original.pilgrims.filed}</div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => console.log("View", row.original)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => console.log("Download", row.original)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => console.log("Edit", row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => console.log("Delete", row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
};

export const hotels: Hotel[] = [
  {
    id: 1,
    hotelName: "Voco",
    hotelTabelName: "Voco Building",
    rooms: {
      template: "template.csv",
      quota: 400,
      filed: 0,
    },
    pilgrims: {
      quota: 1300,
      filed: 0,
    },
  },
  {
    id: 2,
    hotelName: "Al Jaber Tower",
    hotelTabelName: "Jaber Tower 1",
    rooms: {
      template: "template.csv",
      quota: 300,
      filed: 40,
    },
    pilgrims: {
      quota: 1200,
      filed: 60,
    },
  },
  {
    id: 3,
    hotelName: "Al Jaber Tower",
    hotelTabelName: "Jaber Tower 2",
    rooms: {
      template: "template.csv",
      quota: 300,
      filed: 40,
    },
    pilgrims: {
      quota: 1200,
      filed: 60,
    },
  },
];
