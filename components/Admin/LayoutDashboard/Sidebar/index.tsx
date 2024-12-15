"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, PlusCircle } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/useTranslation";
import mainLogo from "@/public/images/logo.svg";

import { getCookie } from "cookies-next";
import UserCard from "./UserCard";
import SidbarItems from "./SidbarItems";

type SubMenuItem = {
  label: string;
  href: string;
};

type MenuItemProps = {
  icon: any;
  iconActive: any;
  label: string;
  href?: string;
  soon?: boolean;
  children?: SubMenuItem[];
  depth?: number;
  isSelected?: boolean;
  onSelect?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  chidSelect?: string;
  setChidSelect?: (value: string) => void;
  ischild?: boolean;
  onMobileItemClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  iconActive: IconActive,
  label,
  href,
  soon = false,
  children,
  depth = 0,
  isSelected = false,
  onSelect,
  isExpanded = false,
  onToggleExpand,
  setChidSelect,
  chidSelect,
  ischild = false,
  onMobileItemClick,
}) => {
  const hasChildren = children && children.length > 0;
  const handleItemClick = () => {
    if (!soon) {
      if (!hasChildren && onSelect) {
        onSelect();
        if (window?.innerWidth < 1024 && onMobileItemClick) {
          onMobileItemClick();
        }
      }
      if (hasChildren && onToggleExpand) {
        onToggleExpand();
      }
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className={`justify-start  text-[#405390] items-center rounded-lg w-full h-auto
          ${depth > 0 ? "pl-8" : ""} 
          ${
            ischild
              ? "border-l-2 border-[#EEF0F5] px-4 py-2.5 rounded-none  mb-0"
              : "mb-2 h-14"
          } 
          ${
            isExpanded || isSelected
              ? "bg-primaryColor hover:text-white  text-white"
              : "hover:bg-primaryColor/10"
          }  
          ${
            ischild && isSelected
              ? " border-primaryColor bg-transparent hover:bg-transparent hover:text-primaryColor text-secondaryColor"
              : ""
          }
          ${soon ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleItemClick}
        asChild={!!href && !hasChildren}
        disabled={soon}
      >
        {href && !hasChildren ? (
          <Link href={href}>
            {!ischild &&
              (isSelected ? (
                <Image src={IconActive} alt="icon" width={24} height={24} />
              ) : (
                <Image src={Icon} alt="icon" width={24} height={24} />
              ))}
            <span className="flex-grow text-left">{label}</span>
          </Link>
        ) : (
          <>
            {!ischild &&
              (isExpanded || isSelected ? (
                <Image src={IconActive} alt="icon" width={24} height={24} />
              ) : (
                <Image src={Icon} alt="icon" width={24} height={24} />
              ))}
            <span className="flex-grow text-left ml-2.5">{label}</span>
            {hasChildren &&
              (isExpanded ? (
                <ChevronUp className="ml-auto h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200" />
              ))}
          </>
        )}
      </Button>
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-[10px] ms-3 ">
            {children.map((child, index) => (
              <MenuItem
                key={index}
                icon={Icon}
                iconActive={IconActive}
                label={child.label}
                href={child.href}
                depth={depth + 1}
                ischild={true}
                isSelected={chidSelect === child.label}
                onSelect={() => {
                  onSelect && onSelect();
                  setChidSelect && setChidSelect(child.label);
                }}
                isExpanded={false}
                onToggleExpand={onToggleExpand}
                onMobileItemClick={onMobileItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { lang } = useTranslation();
  const pathname = usePathname();
  const userPermission = getCookie("type"); // This could be dynamically set based on user data

  const sidebarItems = SidbarItems({ lang });

  const filteredSidebarItems = sidebarItems.filter(
    (item) => !item.permission || item.permission === userPermission
  );

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set<string>()
  );
  const [chidSelect, setChidSelect] = useState("");

  const handleToggleExpand = (label: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  return (
    <Sidebar variant="inset" {...props} className="p-0">
      <div className="flex px-6 py-2 items-center space-x-2 h-[72px] border-b border-b-dgray/10">
        <Image src={mainLogo} alt="Rehabco" />
      </div>
      <ScrollArea className="flex-grow p-4">
        <nav>
          {filteredSidebarItems.map((item, index) => (
            <MenuItem
              key={index}
              {...item}
              isSelected={item.href === pathname}
              onSelect={() => {}}
              isExpanded={expandedItems.has(item.label)}
              onToggleExpand={() => handleToggleExpand(item.label)}
              setChidSelect={setChidSelect}
              chidSelect={chidSelect}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="flex w-full flex-col items-center gap-3 p-4 mt-auto">
        <Button
          className="w-full bg-[#405390] hover:bg-[#405390]/90 text-white"
          onClick={() => {}}
        >
          Add New
          <PlusCircle className="ml-2 h-5 w-5" />
        </Button>
        <UserCard />

        <div className="flex w-full rounded-lg bg-[#405390] p-1">
          <Button
            variant="ghost"
            className="flex-1 text-sm text-white bg-[#4A5D9A] rounded-[10px]"
          >
            Gregorian Month
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-sm text-white hover:bg-[#4A5D9A] rounded-[10px]"
          >
            Hijri Month
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
