"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/Admin/DataTable/data-table-column-header";
import Switch from "@/components/shared/Switch/Switch";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

import editIcon from "@/public/images/Icons/editIcon.svg";
import { formatDate } from "@/utils/formatDate";
import { useDeletePackageMutation } from "@/redux/features/api/company/package";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

// Define the data type for our rows
interface TransformedHotelData {
  id: string;
  package_nickname: string;
  hotel_area_1: string;
  hotel_name_1: string;
  hotel_contract_1_start_date: string;
  hotel_contract_1_end_date: string;
  hotel_contract_1_double_rooms: string;
  hotel_contract_1_triple_rooms: string;
  hotel_contract_1_quadruple_rooms: string;
  hotel_contract_1_pilgrims: string;
  hotel_area_2: string;
  hotel_name_2: string;
  hotel_contract_2_start_date: string;
  hotel_contract_2_end_date: string;
  hotel_contract_2_double_rooms: string;
  hotel_contract_2_triple_rooms: string;
  hotel_contract_2_quadruple_rooms: string;
  hotel_contract_2_pilgrims: string;
  hotel_area_3: string;
  hotel_name_3: string;
  hotel_contract_3_start_date: string;
  hotel_contract_3_end_date: string;
  hotel_contract_3_double_rooms: string;
  hotel_contract_3_triple_rooms: string;
  hotel_contract_3_quadruple_rooms: string;
  hotel_contract_3_pilgrims: string;
  package_type: {
    name: string;
  };
  camp: {
    name: string;
  };
  countries: {
    name_en: string;
    flag: string;
  }[];
  showHide: boolean;
}

export const getColumns = (): ColumnDef<TransformedHotelData>[] => {
  const [deletePackage] = useDeletePackageMutation();
  const handleDelete = async (id: string) => {
    try {
      await deletePackage({ id: id }).unwrap();
      toast.success("Package deleted successfully");
    } catch (error) {
      toast.error("Failed to delete package");
    }
  };
  const handleVisibilityChange = (id: string, newStatus: boolean) => {
    console.log("Visibility changed for hotel", id, "to", newStatus);
  };

  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package ID" />
      ),
      cell: ({ row }) => <div className="text-sm">{row.original.id}</div>,
    },
    {
      accessorKey: "package_nickname",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package Nickname" />
      ),
      cell: ({ row }) => <div>{row.original.package_nickname}</div>,
    },
    {
      accessorKey: "hotel_area_1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Area 1" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge
            variant="secondary"
            className={`
                ${
                  row.original.hotel_area_1 == "Madinah"
                    ? "bg-[#019444]/5 text-[#019444] p-2 border border-[#D9EFE3] "
                    : row.original.hotel_area_1 == "Main"
                    ? "bg-[#F04438]/5 text-[#F04438] p-2 border border-[#E9D7FE] "
                    : "bg-[#3538CD]/5 text-[#3538CD] p-2 border border-[#C7D7FE] "
                }
              `}
          >
            {row.original.hotel_area_1}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "hotel_name_1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name 1" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge>{row.original.hotel_name_1}</Badge>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_1_double_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Double Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_1_double_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_1_triple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Triple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_1_triple_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_1_quadruple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quadruple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_1_quadruple_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel date 1",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Date 1" />
      ),
      cell: ({ row }) => (
        <div>
          {formatDate(row.original.hotel_contract_1_start_date)} -{" "}
          {formatDate(row.original.hotel_contract_1_end_date)}
        </div>
      ),
    },
    // /////////hotel 2
    {
      accessorKey: "hotel_area_2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Area 2" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge
            variant="secondary"
            className={`
                ${
                  row.original.hotel_area_2 == "Madinah"
                    ? "bg-[#019444]/5 text-[#019444] p-2 border border-[#D9EFE3] "
                    : row.original.hotel_area_2 == "Main"
                    ? "bg-[#F04438]/5 text-[#F04438] p-2 border border-[#E9D7FE] "
                    : "bg-[#3538CD]/5 text-[#3538CD] p-2 border border-[#C7D7FE] "
                }
              `}
          >
            {row.original.hotel_area_2}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "hotel_name_2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name 2" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge>{row.original.hotel_name_2}</Badge>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_2_double_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Double Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_2_double_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_2_triple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Triple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_2_triple_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_2_quadruple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quadruple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_2_quadruple_rooms}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "hotel date 2",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Date 2" />
      ),
      cell: ({ row }) => (
        <div>
          {formatDate(row.original.hotel_contract_2_start_date)} -{" "}
          {formatDate(row.original.hotel_contract_2_end_date)}
        </div>
      ),
    },

    // /////////hotel 3
    {
      accessorKey: "hotel_area_3",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Area 3" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.hotel_area_3?.length > 0 ? (
            <Badge
              variant="secondary"
              className={`
                ${
                  row.original.hotel_area_3 == "Madinah"
                    ? "bg-[#019444]/5 text-[#019444] p-2 border border-[#D9EFE3] "
                    : row.original.hotel_area_3 == "Main"
                    ? "bg-[#F04438]/5 text-[#F04438] p-2 border border-[#E9D7FE] "
                    : "bg-[#3538CD]/5 text-[#3538CD] p-2 border border-[#C7D7FE] "
                }
              `}
            >
              {row.original.hotel_area_3}
            </Badge>
          ) : (
            <span>-----</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "hotel_name_3",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Name 3" />
      ),
      cell: ({ row }) => (
        <div>
          <Badge>
            {row.original.hotel_name_3?.length > 0
              ? row.original.hotel_name_3
              : "-----"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_3_double_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Double Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_3_double_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_3_triple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Triple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-2 px-4 rounded-[12px]">
            {row.original.hotel_contract_3_triple_rooms}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "hotel_contract_3_quadruple_rooms",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quadruple Rooms" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="bg-gray py-3 px-4 rounded-[12px]">
            {row.original.hotel_contract_3_quadruple_rooms}
          </span>
        </div>
      ),
    },

    {
      accessorKey: "hotel date 3",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Hotel Date 3" />
      ),
      cell: ({ row }) => (
        <div>
          {row.original.hotel_contract_3_start_date &&
          row.original.hotel_contract_3_end_date ? (
            <span>
              {formatDate(row.original.hotel_contract_3_start_date)} -{" "}
              {formatDate(row.original.hotel_contract_3_end_date)}
            </span>
          ) : (
            <span>-----</span>
          )}
        </div>
      ),
    },

    {
      accessorKey: "package_type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package Type" />
      ),
      cell: ({ row }) => <div>{row.original.package_type.name}</div>,
    },
    {
      accessorKey: "camp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Camp Name" />
      ),
      cell: ({ row }) => <div>{row.original.camp.name}</div>,
    },

    {
      accessorKey: "Countrys",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Countrys" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col gap-2 items-start">
          {row.original.countries.map((item) => (
            <div className=" flex gap-1 items-center" key={item.name_en}>
              <Image
                src={item.flag}
                alt={item.name_en}
                width={20}
                height={20}
                className="ml-2"
              />
              {item.name_en}
            </div>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "showHide",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Show & Hide" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={row.original.showHide}
            onCheckedChange={(checked) =>
              handleVisibilityChange(row.original.id, checked)
            }
          />
          <span className="text-sm">
            {row.original.showHide ? "Visible" : "Hidden"}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Image
            src={editIcon}
            alt="Edit"
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
