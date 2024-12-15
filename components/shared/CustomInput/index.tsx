import { ErrorMessage, Field, FormikProps } from "formik";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  icon?: LucideIcon;
  error?: any;
  formikProps?: FormikProps<any>;
  title?: string;
  subTitle?: string;
  disabled?: boolean;
  value?: string;
  className?: string;
  required?: boolean;
  min?: string;
  max?: string;
}

export default function CustomInput({
  type,
  name,
  placeholder,
  icon: Icon,
  title,
  subTitle,
  disabled = false,
  value,
  className = "",
  required = false,
  formikProps,
  min,
  max,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Custom validation for numbers
  const validateNumber = (value: string) => {
    if (type === "number") {
      const numValue = value === "" ? NaN : parseFloat(value);

      if (value !== "" && (isNaN(numValue) || typeof numValue !== "number")) {
        return "Please enter a valid number";
      }

      if (value !== "" && numValue < 0) {
        return "Please enter a non-negative number";
      }

      if (min !== undefined && value !== "" && numValue < parseFloat(min)) {
        return `Value must be at least ${min}`;
      }

      if (max !== undefined && value !== "" && numValue > parseFloat(max)) {
        return `Value must be at most ${max}`;
      }
    }
    return undefined;
  };

  return (
    <div className="w-full">
      {title && (
        <p className="mb-2 text-base text-secondaryColor">
          {title} {required && <span className="text-destructive">*</span>}
        </p>
      )}
      {subTitle && (
        <p className="mb-2 text-sm text-muted-foreground">{subTitle}</p>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon size={18} />
          </div>
        )}
        <Field
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          min={type === "number" ? min : undefined}
          max={max}
          step={type === "number" ? "any" : undefined}
          validate={type === "number" ? validateNumber : undefined}
          className={`h-[50px] w-full rounded-[8px] bg-gray ps-3 pe-10 text-sm font-medium text-[#68769F] placeholder:text-dgray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
            Icon ? "ps-10" : "ps-3"
          } ${disabled && "cursor-not-allowed"} ${className}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="text-secondaryColor" size={18} />
            ) : (
              <Eye className="text-secondaryColor" size={18} />
            )}
          </button>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm font-semibold text-red-400"
      />
    </div>
  );
}
