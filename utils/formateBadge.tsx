import React from "react";

type Props = {
  text: string;
};

function FormateBadge({ text }: Props) {
  const getBgColor = () => {
    switch (text?.toLowerCase()) {
      case "jed":
        return "bg-red-100 text-red-600";
      case "med":
        return "bg-green-100 text-green-600";
      case "madinah":
        return "bg-green-100 text-green-600";
      case "makkah":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getBgColor()}`}
    >
      {text}
    </span>
  );
}

export default FormateBadge;
