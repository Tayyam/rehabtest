"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";

const Header: React.FC = () => {
  const { lang } = useTranslation();
  const pathname = usePathname(); // Get the current pathname

  // Function to get dynamic task title and path based on the current URL
  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter((part) => part); // Split and filter empty parts
    const isDashboard = parts[1] === "admin";

    // Construct breadcrumb and routes
    const breadcrumbs = parts.map((part, index) => {
      const path = `/${parts.slice(0, index + 1).join("/")}`; // Create the path
      return {
        name: part.charAt(0).toUpperCase() + part.slice(1), // Capitalize the first letter
        path,
      };
    });

    return (
      <>
        {isDashboard && (
          <Link
            href={`/${lang}/admin`}
            className="text-dgray text-[16px] hover:underline"
          >
            Dashboard
          </Link>
        )}
        {breadcrumbs.map(
          (crumb, index) =>
            index > 1 && (
              <span className="text-[16px]  " key={index}>
                <span className="text-gray-200 mx-1">{">"}</span>
                <Link
                  href={`/${lang}${crumb.path}`}
                  className="text-dgray hover:underline"
                >
                  {crumb.name}
                </Link>
              </span>
            )
        )}
      </>
    );
  };

  return (
    <section className="bg-gray  text-dgray  flex justify-between items-center  w-full">
      <div className="flex items-center space-x-4">
        {/* Dynamic breadcrumb */}
        <span className="text-sm hidden sm:inline">{getBreadcrumb()}</span>
      </div>
      <div className="flex items-center space-x-3">
        <LanguageSwitcher />
      </div>
    </section>
  );
};

export default Header;
