"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import Image from "next/image";
import editIcon from "@/public/images/Icons/editIcon.svg";
import { formatDate } from "@/utils/formatDate";
import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useDeleteCompanyMutation } from "@/redux/features/api/admin/company";
import { toast } from "sonner";
// Define the data type for our rows
interface CompanyData {
  id: string;
  name: string;
  company_ditails: {
    maneger: string;
  };
  email: string;
  employees: number;
  created_at: string;
  active: boolean;
  img_url: string;
}

export const getColumns = (): ColumnDef<CompanyData>[] => {
  const [deleteFunction] = useDeleteCompanyMutation();
  const handleStatusChange = (id: string, newStatus: boolean) => {
    // Add your status update logic here
    console.log("Status changed for company", id, "to", newStatus);
  };

  const handelDelete = async (id: string) => {
    try {
      await deleteFunction({ id: id }).unwrap();
      toast.success("Company deleted successfully");
    } catch (error) {
      toast.error("Failed to delete company");
    }
  };
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company ID" />
      ),
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Company Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-6  rounded-lg">
            <Image
              src={row.original.img_url}
              width={50}
              height={50}
              alt="company"
            />
          </div>
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "manager",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Manager" />
      ),
      // cell: ({ row }) => <div>{row.original.manager}</div>,
      cell: ({ row }) => (
        <div>{row.original?.company_ditails?.maneger ?? ""}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "employees",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Employes" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-gray-200 border-2 bg-gray border-dgray"
              />
            ))}
          </div>
          {/* <span>{row.original.employees} employes</span> */}
          <span> Static </span>
        </div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created Date" />
      ),
      cell: ({ row }) => <div>{formatDate(row.original.created_at)}</div>,
    },
    {
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Active" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={true}
            onCheckedChange={(checked) =>
              handleStatusChange(row.original.id, checked)
            }
          />
          <span>{row.original.active ? "Active" : "Not Active"}</span>
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
          <DeleteDialog deleteFunction={() => handelDelete(row.original.id)} />
        </div>
      ),
    },
  ];
};
