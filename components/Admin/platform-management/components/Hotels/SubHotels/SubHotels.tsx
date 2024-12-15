"use client";

import { useGetHotelsQuery } from "@/redux/features/api/admin/platform-management";
import { useState } from "react";
import TableToolbar from "@/components/Admin/DataTable/TableToolbar";
import { DataTable } from "@/components/Admin/DataTable/data-table";
import { getColumns } from "./columns";
import Loader from "@/components/shared/Loader/Loader";
import AddNewHotel from "./AddHotel";

type Props = {
  activBar: number;
  setActivBar: (activBar: number) => void;
};

function SubHotels({ activBar, setActivBar }: Props) {
  const [paginationPage, setPaginationPage] = useState(1);
  const { data, error, isLoading } = useGetHotelsQuery({ paginationPage });

  const columns = getColumns();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="p-5 w-full min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-5 w-full min-h-screen flex justify-center items-center">
        <p className="text-red-500">
          Failed to load locations. Please try again later.
        </p>
      </div>
    );
  }

  const LeftSections = () => {
    return (
      <div className="flex items-center gap-2.5">
        {/* Hotel Location Button */}
        <button
          onClick={() => setActivBar(0)}
          className={`px-4 h-[57px] rounded-[10px] flex font-[500] justify-center items-center gap-2.5 ${
            activBar === 0
              ? "bg-primaryColor/10 text-primaryColor"
              : " text-dgray"
          }`}
        >
          <span className="py-1">Hotel Location</span>
        </button>

        {/* SubHotels Button */}
        <button
          onClick={() => setActivBar(1)}
          className={`px-4 h-[57px] rounded-[10px] flex font-[500] justify-center items-center gap-2.5 ${
            activBar === 1
              ? "bg-primaryColor/10 text-primaryColor"
              : " text-dgray"
          }`}
        >
          <span className="py-1">Hotels</span>
          <span
            className={`justify-center items-center flex text-center py-1 px-3 rounded-full ${
              activBar === 1 ? "bg-primaryColor/20" : "bg-gray"
            }`}
          >
            {data?.data?.rows?.length}
          </span>
        </button>
      </div>
    );
  };

  return (
    <div className="p-5 w-full min-h-screen flex flex-col gap-5  border rounded-[12px] border-[#F5F5F7]">
      {/* header */}
      <TableToolbar
        onDownload={() => {}}
        onFilter={() => {}}
        LeftSection={<LeftSections />}
        RightSection={<AddNewHotel />}
      />
      {/* table */}
      <div>
        <DataTable
          data={data?.data?.rows || []}
          pagenation={{
            setpagenationPage: setPaginationPage,
            lastPage: data?.data?.paginationLinks?.perPage || 1,
            currentPages: data?.data?.paginationLinks?.currentPages || 1,
          }}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default SubHotels;
