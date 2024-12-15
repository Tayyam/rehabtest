import TableToolbar from "@/components/Admin/DataTable/TableToolbar";
import { DataTable } from "@/components/Admin/DataTable/data-table";
import { getColumns } from "./columns";
import Loader from "@/components/shared/Loader/Loader";
import { useState } from "react";
import { useGetPriceRoutesQuery } from "@/redux/features/api/admin/platform-management";
import { AddNewRoutePrice } from "./AddNewRoutePrice";

type Props = {
  activBar: number;
  setActivBar: (activBar: number) => void;
};

const RoutesPrice = ({ activBar, setActivBar }: Props) => {
  const [paginationPage, setPaginationPage] = useState(1);
  const { data, error, isLoading } = useGetPriceRoutesQuery({ paginationPage });

  const columns = getColumns();

  // Loading state
  if (isLoading) {
    return (
      <div className="p-5 w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-5 w-full min-h-screen flex justify-center items-center">
        <p className="text-red-500">
          Failed to load locations. Please try again later.
        </p>
      </div>
    );
  }

  // Left Sections (Route Define and Route Price buttons)
  const LeftSections = () => {
    const renderButton = (label: string, value: number) => (
      <button
        onClick={() => setActivBar(value)}
        className={`px-4 h-[57px] rounded-[10px] flex font-[500] justify-center items-center gap-2.5 ${
          activBar === value
            ? "bg-primaryColor/10 text-primaryColor"
            : " text-dgray"
        }`}
      >
        <span className="py-1">{label}</span>
        <span
          className={`justify-center items-center flex text-center py-1 px-3 rounded-full ${
            activBar === value ? "bg-primaryColor/20" : "bg-gray"
          }`}
        >
          {data?.data?.paginationLinks?.total ?? 0}
        </span>
      </button>
    );

    return (
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActivBar(0)}
          className={`px-4 h-[57px] rounded-[10px] flex font-[500] justify-center items-center gap-2.5 ${
            activBar === 0
              ? "bg-primaryColor/10 text-primaryColor"
              : " text-dgray"
          }`}
        >
          <span className="py-1"> Routes Defin</span>
        </button>{" "}
        {renderButton("Routes Price", 1)}
      </div>
    );
  };

  // Main component return
  return (
    <div className="p-5 min-h-screen flex flex-col gap-5 border rounded-[12px] border-[#F5F5F7]">
      {/* Header */}
      <TableToolbar
        onDownload={() => {}}
        onFilter={() => {}}
        LeftSection={<LeftSections />}
        RightSection={<AddNewRoutePrice />}
      />
      {/* Data Table */}
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
};

export default RoutesPrice;
