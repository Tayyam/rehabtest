import React, { useState } from "react";
import { Search, Download, SlidersHorizontal, X } from "lucide-react";

type Props = {
  LeftSection?: React.ReactNode;
  RightSection?: React.ReactNode;
  onDownload?: () => void;
  onFilter?: () => void;
};

function TableToolbar({
  LeftSection,
  RightSection,
  onDownload,
  onFilter,
}: Props) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className="flex text-secondaryColor justify-between items-center">
      {/* left */}
      {LeftSection && <div>{LeftSection}</div>}

      {/* right */}
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-3">
          <SearchInput
            isExpanded={isSearchExpanded}
            setIsExpanded={setIsSearchExpanded}
          />
          {onDownload && (
            <ActionButton
              icon={<Download className="h-5 w-5" />}
              label="Download"
              onClick={onDownload}
              text={!isSearchExpanded ? "Download" : undefined}
              className={`transition-all duration-300 ease-in-out ${
                isSearchExpanded ? "w-12 px-0" : "w-auto px-4"
              }`}
            />
          )}
          {onFilter && (
            <ActionButton
              icon={<SlidersHorizontal className="h-5 w-5" />}
              label="Filters"
              onClick={onFilter}
              text={!isSearchExpanded ? "Filters" : undefined}
              className={`transition-all duration-300 ease-in-out ${
                isSearchExpanded ? "w-12 px-0" : "w-auto px-4"
              }`}
            />
          )}
          {RightSection && <div>{RightSection}</div>}
        </div>
      </div>
    </div>
  );
}

const ActionButton = ({
  icon,
  label,
  onClick,
  text,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  text?: string;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-[15px] py-3 bg-gray rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-100 ${className}`}
      aria-label={label}
    >
      {icon}
      {text && (
        <span className="text-secondaryColor hidden md:block whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out">
          {text}
        </span>
      )}
    </button>
  );
};

const SearchInput = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative">
      <div
        className={`
          flex items-center
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-[220px]" : "w-[52px]"}
          bg-slate-50 rounded-lg overflow-hidden
        `}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${isExpanded ? "w-12" : "w-full"}
            h-full px-4 py-3
          `}
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          <Search
            className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </button>

        <div
          className={`
            flex-1
            transition-all duration-300 ease-in-out
            ${isExpanded ? "opacity-100 w-full pr-3" : "opacity-0 w-0 pr-0"}
          `}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search.."
            className={`
              w-full py-3 pr-8
              bg-transparent
              text-base text-slate-700
              placeholder-slate-500
              focus:outline-none
              transition-all duration-300
            `}
            style={{
              pointerEvents: isExpanded ? "auto" : "none",
            }}
            onBlur={(e) => {
              const relatedTarget = e.relatedTarget as HTMLElement;
              if (!relatedTarget?.closest(".search-container")) {
                if (!searchValue) setIsExpanded(false);
              }
            }}
          />
        </div>

        {isExpanded && (
          <button
            onClick={() => {
              setSearchValue("");
              if (!searchValue) setIsExpanded(false);
            }}
            className={`
              absolute right-3 p-1 
              rounded-full transition-all duration-300 ease-in-out
              ${searchValue ? "opacity-100 scale-100" : "opacity-0 scale-50"}
              hover:bg-slate-200
            `}
            aria-label="Clear search"
            disabled={!searchValue}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableToolbar;
