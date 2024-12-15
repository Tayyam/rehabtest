"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";

// Define the data type for our rows
interface Pilgrim {
  serialNumber: string;
  pilgrimName: string;
  guide: {
    name: string;
    username: string;
    avatar: string;
  };
}

export const getColumns = (): ColumnDef<Pilgrim>[] => {
  return [
    {
      accessorKey: "serialNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Serial Number" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("serialNumber")}</div>,
    },
    {
      accessorKey: "pilgrimName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pilgrim Name" />
      ),
      cell: ({ row }) => <div className="">{row.getValue("pilgrimName")}</div>,
    },
    {
      accessorKey: "guide",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Guide" />
      ),
      cell: ({ row }) => {
        const guide = row.getValue("guide") as Pilgrim["guide"];
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={guide.avatar} />
              <AvatarFallback>{guide.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-[16px] font-medium">{guide.name}</span>
              <span className="text-[14px] text-[#999EB2] ">
                @{guide.username}
              </span>
            </div>
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
        <div className="flex gap-3">
          <Button
            onClick={() => console.log("Approved", row.original)}
            className=" bg-[#28C76F] text-white hover:bg-[#28C76F]/80  transition-all  w-[80px] rounded-[6px] h-[40px] "
          >
            Approve
          </Button>
          <Button
            onClick={() => console.log("Declined", row.original)}
            variant="destructive"
            className=" bg-[#FF0A0A]/15 text-[#FF0A0A] hover:bg-[#FF0A0A]/30  transition-all  w-[80px] rounded-[6px] h-[40px] "
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];
};

export const pilgrims: Pilgrim[] = [
  {
    serialNumber: "64812",
    pilgrimName: "Nazia Aktar Sharmin",
    guide: {
      name: "sabrina",
      username: "sabrina",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=sabrina`,
    },
  },
  {
    serialNumber: "64812",
    pilgrimName: "Peayra Khanum",
    guide: {
      name: "sabrina",
      username: "sabrina",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=sabrina`,
    },
  },
  {
    serialNumber: "64812",
    pilgrimName: "Peayra Khanum",
    guide: {
      name: "sabrina",
      username: "sabrina",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=sabrina`,
    },
  },
  {
    serialNumber: "64812",
    pilgrimName: "Peayra Khanum",
    guide: {
      name: "sobaan",
      username: "sobaan",
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=sobaan`,
    },
  },
];
