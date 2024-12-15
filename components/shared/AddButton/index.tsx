import React from "react";

type Props = {
  title: string;
  onOpenChange: (open: boolean) => void;
};

// Use React.forwardRef to forward the ref to the div element
const AddButton = React.forwardRef<HTMLDivElement, Props>(
  ({ title, onOpenChange }: Props, ref) => {
    return (
      <div
        ref={ref} // Forward the ref to the div element
        onClick={() => onOpenChange(true)}
        className="flex cursor-pointer w-max items-normal justify-center gap-[10px] px-4 py-3 hover:bg-primaryColor/80 bg-primaryColor text-white rounded-lg transition-colors duration-200 ease-in-out"
      >
        {title}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5ZM12.75 9.5C12.75 9.08579 12.4142 8.75 12 8.75C11.5858 8.75 11.25 9.08579 11.25 9.5L11.25 11.75H9C8.58579 11.75 8.25 12.0858 8.25 12.5C8.25 12.9142 8.58579 13.25 9 13.25H11.25V15.5C11.25 15.9142 11.5858 16.25 12 16.25C12.4142 16.25 12.75 15.9142 12.75 15.5L12.75 13.25H15C15.4142 13.25 15.75 12.9142 15.75 12.5C15.75 12.0858 15.4142 11.75 15 11.75H12.75V9.5Z"
            fill="white"
          />
        </svg>
      </div>
    );
  }
);

// Ensure to give it a display name for debugging
AddButton.displayName = "AddButton";

export default AddButton;
