import React from "react";
import TableToolbar from "@/components/Admin/DataTable/TableToolbar";
import { DataTable } from "@/components/Admin/DataTable/data-table";
import { getColumns } from "./columns";
import { useGetCountriesQuery } from "@/redux/features/api/admin/platform-management";
import Loader from "@/components/shared/Loader/Loader";
type Props = {};

function Country({}: Props) {
  const coulumns = getColumns();
  const { data, error, isLoading } = useGetCountriesQuery({});

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
          Failed to load country. Please try again later.
        </p>
      </div>
    );
  }
  return (
    <div className="p-5 w-full min-h-screen flex flex-col gap-5  border rounded-[12px] border-[#F5F5F7]">
      {/* header */}
      <TableToolbar
        LeftSection={
          <div className="px-4 flex font-[500] justify-center items-center gap-2.5">
            country{" "}
            <span className="text-dgray justify-center items-center flex min-w-[50px] text-center bg-gray px-[10px] rounded-full ">
              {/* {data?.data?.paginationLinks?.total ?? 0} */}
            </span>
          </div>
        }
      />
      {/* table */}
      <div className="">
        <DataTable
          data={data?.data || []}
          // pagenation={{
          //   setpagenationPage,
          //   paginationLinks: data?.data?.paginationLinks
          //     ? data?.data?.paginationLinks
          //     : [],
          // }}
          // setSearch={setSearch}
          columns={coulumns}
        />
      </div>
    </div>
  );
}

export default Country;
