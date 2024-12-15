"use client";
import React, { useState } from "react";
import TableToolbar from "@/components/Admin/DataTable/TableToolbar";
import { DataTable } from "@/components/Admin/DataTable/data-table";
import { fakePackageData, getColumns } from "./columns";
import { useGetcompaniesQuery } from "@/redux/features/api/admin/company";
import Loader from "@/components/shared/Loader/Loader";
import { useGetHotelsQuery } from "@/redux/features/api/company/hotels";
type Props = {};

function page({}: Props) {
  const [paginationPage, setPaginationPage] = useState(1);

  const coulumns = getColumns();
  // const { data, error, isLoading } = useGetHotelsQuery({ paginationPage });

  // Handle loading state
  // if (isLoading) {
  //   return (
  //     <div className="p-5 w-full min-h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  // // Handle error state
  // if (error) {
  //   return (
  //     <div className="p-5 w-full min-h-screen flex justify-center items-center">
  //       <p className="text-red-500">
  //         Failed to load Contry. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-5 w-full min-h-screen flex flex-col gap-5  border rounded-[12px] border-[#F5F5F7]">
      {/* header */}
      <TableToolbar
        onDownload={() => {}}
        onFilter={() => {}}
        LeftSection={
          <div className="px-4 flex font-[500] justify-center items-center gap-2.5">
            PNR{" "}
            <span className="text-dgray justify-center items-center flex min-w-[50px] text-center bg-gray px-[10px] rounded-full ">
              {/* {data?.data?.paginationLinks?.total || 0} */}
            </span>
          </div>
        }
      />
      {/* table */}
      <div className="">
        <DataTable
          data={fakePackageData || []}
          // data={data?.data?.rows || []}
          // pagenation={{
          //   setpagenationPage: setPaginationPage,
          //   lastPage: data?.data?.paginationLinks?.perPage || 1,
          //   currentPages: data?.data?.paginationLinks?.currentPages || 1,
          // }}
          // setSearch={setSearch}
          columns={coulumns}
        />
      </div>
    </div>
  );
}

export default page;
