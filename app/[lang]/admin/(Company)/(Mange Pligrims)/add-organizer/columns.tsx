"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

// Updated interface to match new requirements
interface Employee {
  id: number;
  username: string;
  organizerName: string;
  password: string;
}

export const getColumns = (): ColumnDef<Employee>[] => {
  const [showPassword, setShowPassword] = useState<Record<number, boolean>>({});

  const togglePassword = (id: number) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organizer ID" />
      ),
      cell: ({ row }) => <div className="text-sm">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${row.getValue(
                "username"
              )}`}
            />
            <AvatarFallback>
              {(row.getValue("username") as string)
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{row.getValue("username")}</span>
        </div>
      ),
    },
    {
      accessorKey: "organizerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Organizer UserName" />
      ),
      cell: ({ row }) => <div>{row.getValue("organizerName")}</div>,
    },
    {
      accessorKey: "password",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Password" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-mono">
            {showPassword[row.original.id]
              ? row.getValue("password")
              : Array.from(
                  { length: row.original.password.length },
                  (_, i) => "*"
                ).join("")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => togglePassword(row.original.id)}
            className="h-8 w-8"
          >
            {showPassword[row.original.id] ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
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
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pencil className="h-4 w-4" />
          </Button>
          <DeleteDialog
            deleteFunction={() => console.log("Delete", row.original.id)}
          />
        </div>
      ),
    },
  ];
};

export const Organizers: Employee[] = [
  {
    id: 1,
    username: "fahim",
    organizerName: "Fahim",
    password: "secretpassword123",
  },
  {
    id: 2,
    username: "farid",
    organizerName: "Farid",
    password: "secretpassword456",
  },
  {
    id: 3,
    username: "salah",
    organizerName: "Salah",
    password: "secretpassword789",
  },
];
