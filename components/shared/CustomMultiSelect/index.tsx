import React from "react";
import Select from "react-select";
import { FormikProps } from "formik";

interface CustomSelectProps {
  formik: FormikProps<any>;
  name: string;
  placeholder: string;
  data: { id: string | number; name?: string; title?: string }[];
  value?: any;
  title?: string;
  required?: boolean;
  onChange?: (selectedValues: any) => void;
  isMultiSelect?: boolean;
}

const CustomMultiSelect: React.FC<CustomSelectProps> = ({
  formik,
  name,
  placeholder,
  data,
  value,
  title,
  required,
  onChange,
  isMultiSelect = false,
}) => {
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? isMultiSelect
        ? selectedOptions.map((option: any) => ({
            value: option.value,
            label: option.label,
          }))
        : {
            value: selectedOptions.value,
            label: selectedOptions.label,
          }
      : isMultiSelect
      ? []
      : null;

    formik.setFieldValue(name, selectedValues);
    if (onChange) {
      onChange(selectedValues);
    }
  };

  const options = data?.map((item) => ({
    value: item?.id?.toString() || "",
    label: item?.name || item?.title,
  }));

  // Updated styles
  const selectStyle = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "#F9F9FC",
      border: "1px solid #F9F9FC",
      height: "50px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#999",
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#405390" : base.backgroundColor,
      color: state.isSelected ? "white" : base.color,
      "&:hover": {
        backgroundColor: state.isSelected ? "#405390" : "#3F529",
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: "#405390",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: "white",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#999EB2",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: "white",
      "&:hover": {
        backgroundColor: "#405390",
        color: "white",
      },
    }),
  };

  return (
    <div>
      {title && (
        <p className="mb-2 text-base  text-secondaryColor">
          {title} {required && <span className="text-red-500">*</span>}
        </p>
      )}
      <Select
        isMulti={isMultiSelect}
        isSearchable
        placeholder={placeholder}
        options={options}
        value={
          Array.isArray(value)
            ? value.map((val: any) => ({
                value: val?.value?.toString(),
                label: val?.label,
              }))
            : value
            ? { value: value.value, label: value.label }
            : null
        }
        onChange={handleChange}
        styles={selectStyle}
        classNamePrefix="select"
      />
    </div>
  );
};

export default CustomMultiSelect;
