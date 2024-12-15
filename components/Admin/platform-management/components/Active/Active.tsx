"use client";

import {
  useGetActiveQuery,
  useGetCampsQuery,
} from "@/redux/features/api/admin/platform-management";
import { useState } from "react";
import TableToolbar from "@/components/Admin/DataTable/TableToolbar";
import { DataTable } from "@/components/Admin/DataTable/data-table";
import { getColumns } from "./columns";
import Loader from "@/components/shared/Loader/Loader";
import { AddNewActive } from "./AddNewActive";

type Props = {};

function Active({}: Props) {
  const [paginationPage, setPaginationPage] = useState(1);
  // const { data, error, isLoading } = useGetActiveQuery({ paginationPage });

  const columns = getColumns();

  // Handle loading state
  // if (isLoading) {
  //   return (
  //     <div className="p-5 w-full min-h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  // Handle error state
  // if (error) {
  //   return (
  //     <div className="p-5 w-full min-h-screen flex justify-center items-center">
  //       <p className="text-red-500">
  //         Failed to load Active. Please try again later.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-5 w-full min-h-screen flex flex-col gap-5  border rounded-[12px] border-[#F5F5F7]">
      {/* header */}
      <TableToolbar
        LeftSection={
          <div className="px-4 flex font-[500] justify-center items-center gap-2.5">
            Global Variables Management{" "}
            <span className="text-dgray justify-center items-center flex min-w-[50px] text-center bg-gray px-[10px] rounded-full ">
              {/* {data?.data?.paginationLinks?.total ?? 0} */}
            </span>
          </div>
        }
        RightSection={<AddNewActive />}
      />
      {/* table */}
      <div>
        <DataTable
          // data={data?.data?.rows || []}
          data={[]}
          // pagenation={{
          //   setpagenationPage: setPaginationPage,
          //   lastPage: data?.data?.paginationLinks?.perPage || 1,
          //   currentPages: data?.data?.paginationLinks?.currentPages || 1,
          // }}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default Active;
