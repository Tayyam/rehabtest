import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormikProps } from "formik";
import { ErrorMessage } from "formik"; // for error handling

const CustomSelect = ({
  FormikProps,
  name,
  placeholder,
  data,
  value,
  title,
  required,
  disabled = false,
  onChange, // Accept onChange as a prop
}: {
  FormikProps: any;
  name: string;
  placeholder: string;
  data: { id: string | number; name?: string; title?: string }[];
  value?: string;
  title?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: any; // onChange prop definition
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredData, setFilteredData] = useState(data); // State for filtered data

  // Update filtered data when data or searchTerm changes
  useEffect(() => {
    setFilteredData(
      data?.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (value: string | number) => {
    FormikProps.setFieldValue(name, value); // Update Formik value
    if (onChange) {
      onChange(value); // Call the onChange prop if provided
    }
    // Clear the search term when an item is selected
    setSearchTerm("");
  };

  return (
    <div className="w-full z-[2000] ">
      {title && (
        <p className="text-[16px] text-black font-[700] mb-1">
          {title} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <Select onValueChange={handleChange} value={value?.toString()}>
        <SelectTrigger className="w-full rounded-[8px] bg-gray-100 h-[50px] border border-[#CBD5E1] text-sm text-[#68769F] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
          <SelectValue
            placeholder={placeholder}
            className="text-14 text-[#94A3B8] "
          />
        </SelectTrigger>
        <SelectContent>
          {/* Search input */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded border border-[#CBD5E1] px-3 h-10 py-2 text-14"
              aria-label="Search options" // Accessibility improvement
            />
          </div>
          {filteredData?.length > 0 ? (
            filteredData?.map((item, index) => (
              <SelectItem key={index} value={item.id.toString()}>
                {item.name ? item.name : item.title}
              </SelectItem>
            ))
          ) : (
            <p className="p-2">لا يوجد عناصر</p>
          )}
        </SelectContent>
      </Select>
      {/* Error message */}
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-destructive"
      />
    </div>
  );
};

export default CustomSelect;
