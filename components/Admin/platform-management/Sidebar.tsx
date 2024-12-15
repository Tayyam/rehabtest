import React, { useState } from "react";
import { menuItems } from "@/public/static data/PlatformManagementMenuItems";

type Props = {
  activeTab: number;
  setActiveTab: (value: number) => void;
};

function Sidebar({ activeTab, setActiveTab }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden px-2 py-1  fixed top-[130px] left-3 z-1 bg-primaryColor text-white rounded-full shadow-lg"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 min-h-screen bg-white p-5 min-w-[265px] border rounded-[12px] border-[#F5F5F7] transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 absolute top-4 right-4 text-dgray"
        >
          ✕
        </button>

        {/* Header */}
        <div className="pb-[19px] border-b border-[#F5F5F7] ">
          <h2 className="text-secondaryColor font-[500] mb-1">
            Platform Management
          </h2>
          <h5 className="text-dgray">All Database on The Site</h5>
        </div>

        {/* Navigations */}
        <div className="mt-[19px] flex flex-col gap-2.5">
          {menuItems.map((item, index) => (
            <div
              onClick={() => {
                setActiveTab(index);
                setIsSidebarOpen(false); // Close sidebar after selection on mobile
              }}
              key={index}
              className={`${
                activeTab === index
                  ? "text-primaryColor bg-primaryColor/20"
                  : ""
              }
              hover:bg-primaryColor/10
              rounded-lg p-2.5 flex items-center gap-2.5 cursor-pointer transition-colors`}
            >
              <span>{item.icon(activeTab === index)}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}

export default Sidebar;
