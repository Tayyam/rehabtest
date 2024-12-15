// "use client";
import React from "react";
import Header from "./Header";
// import Sidebar from "./Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "./Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider dir="ltr" className="p-0 shadow-none ">
      <AppSidebar />
      <SidebarInset className=" bg-white overflow-hidden  overflow-y-auto  ">
        <header className="bg-gray  text-dgray py-4 px-4 lg:px-8 flex justify-between items-center  w-full">
          <div className="flex items-center gap-2 w-full px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Header />
          </div>
        </header>
        <div className="p-6 ">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
