import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DataTablePaginationProps<TData> {
  pagenation: {
    setpagenationPage: (page: number) => void;
    lastPage: number;
    currentPages: number;
  };
}

const PagenationButton = ({
  isActive = false,
  children,
  onClick,
}: {
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div
      onClick={onClick}
      className={
        isActive
          ? "bg-primaryColor text-white rounded-[8px] px-4 py-2 cursor-pointer"
          : "bg-white hover:bg-primaryColor/10 text-secondaryColor border border-[#F5F5F7] rounded-[8px] px-4 py-2 cursor-pointer"
      }
    >
      {children}
    </div>
  );
};

export function DataTablePagination<TData>({
  pagenation,
}: DataTablePaginationProps<TData>) {
  const { setpagenationPage, lastPage, currentPages } = pagenation;

  if (lastPage <= 1 || !lastPage) {
    return null; // No pagination needed
  }

  const createPageNumbers = () => {
    const pages = [];
    const visiblePages = 3; // Number of pages to show

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 ||
        i === lastPage ||
        (i >= currentPages - visiblePages && i <= currentPages + visiblePages)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PagenationButton
              isActive={currentPages === i}
              onClick={() => setpagenationPage(i)}
            >
              {i}
            </PagenationButton>
          </PaginationItem>
        );
      } else if (
        i === currentPages - visiblePages - 1 ||
        i === currentPages + visiblePages + 1
      ) {
        pages.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
      }
    }
    return pages;
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 mt-4 ">
      <div className="w-full text-secondaryColor ">
        Currently showing{" "}
        <span className=" text-primaryColor">{currentPages}</span> page out of{" "}
        <span className=" text-primaryColor">{lastPage}</span> total pages
      </div>
      <Pagination className="flex items-center justify-end space-x-2">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              className={` ${
                currentPages === 1
                  ? "cursor-not-allowed text-dgray"
                  : " cursor-pointer "
              } `}
              onClick={(e) => {
                e.preventDefault();
                if (currentPages > 1) setpagenationPage(currentPages - 1);
              }}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-800" />
            </PaginationPrevious>
          </PaginationItem>

          {/* Page Numbers */}
          {createPageNumbers()}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              className={` ${
                currentPages === lastPage
                  ? "cursor-not-allowed text-dgray"
                  : " cursor-pointer "
              } `}
              onClick={(e) => {
                e.preventDefault();
                if (currentPages < lastPage)
                  setpagenationPage(currentPages + 1);
              }}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-500 hover:text-gray-800" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>{" "}
    </div>
  );
}
