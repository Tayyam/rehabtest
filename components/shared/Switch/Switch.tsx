import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  value?: any;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className,
  value,
}) => {
  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        value={value}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="group relative">
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? "bg-primaryColor" : "bg-dgray/70"
          }`}
        />
        <div
          className={`absolute left-1 top-1 bg-white rounded-full h-4 w-4 shadow transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};

export default Switch;
