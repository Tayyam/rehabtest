"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Admin/platform-management/Sidebar";
import Country from "@/components/Admin/platform-management/components/Country/Country";
import Hotels from "@/components/Admin/platform-management/components/Hotels/Hotels";
import Camps from "@/components/Admin/platform-management/components/Camps/Camps";
import Routes from "@/components/Admin/platform-management/components/Routes/Routes";
import Active from "@/components/Admin/platform-management/components/Active/Active";

type Props = {};

function page({}: Props) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex relative w-full justify-start gap-6 ">
      {/* sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="lg:w-[calc(100%-265px)] w-full ">
        {activeTab === 0 && <Country />}
        {activeTab === 1 && <Hotels />}
        {activeTab === 2 && <Camps />}
        {activeTab === 3 && <Routes />}
        {activeTab === 4 && <Active />}
      </div>
    </div>
  );
}

export default page;
