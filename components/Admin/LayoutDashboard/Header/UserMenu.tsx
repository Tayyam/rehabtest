import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import arrowDownIcon from "@/public/images/icons/Arrow-Down.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { logout } from "@/redux/slices/userSlice";
import Link from "next/link";

import dashboardImage from "@/public/images/icons/PieChart.svg";
import notificationbing from "@/public/images/icons/notificationbing.svg";
import SettingsImage from "@/public/images/icons/Settings.svg";
import HomeAngle from "@/public/images/icons/HomeAngle.svg";
import Loader from "@/components/shared/Loader/Loader";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
}

interface UserMenuProps {
  userProfile: UserProfile | null;
  loading: boolean;
  error: any;
}

const UserMenu: React.FC<UserMenuProps> = ({ userProfile, loading, error }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   router.push("/login");
  // };

  const renderUserProfile = () => {
    if (loading) return <Loader />;
    if (error)
      return <div className="text-sm text-red-500">Error loading profile</div>;

    return (
      <>
        <div>{`${userProfile?.firstName} ${userProfile?.lastName}`}</div>
        <div className="text-[#928cb4] text-sm font-light">
          {userProfile?.email}
        </div>
      </>
    );
  };

  const renderAvatar = () => (
    <Avatar className="h-8 w-8">
      {userProfile?.image ? (
        <AvatarImage
          src={userProfile.image}
          alt={`${userProfile.firstName} ${userProfile.lastName}`}
        />
      ) : (
        <AvatarFallback className="text-CardOver">
          {userProfile?.firstName?.[0]}
          {userProfile?.lastName?.[0]}
        </AvatarFallback>
      )}
    </Avatar>
  );

  const menuItems = [
    { href: "/dashboard/", label: "Dashboard", icon: dashboardImage },
    {
      href: "/dashboard/profile",
      label: "Account Settings",
      icon: SettingsImage,
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: notificationbing,
    },
    { href: "/", label: "Home Page", icon: HomeAngle },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-2 rounded-md flex justify-end items-center gap-2 sm:gap-5 bg-CardOver cursor-pointer py-4">
          <Image src={arrowDownIcon} alt="open" className="hidden sm:inline" />
          <div className="flex gap-2.5">
            <div className="hidden sm:flex flex-col justify-start items-end">
              {renderUserProfile()}
            </div>
            {renderAvatar()}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px] flex-col flex gap-2 p-2.5 bg-CardColor text-white border-CardOver">
        {menuItems.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center px-2.5 rounded-lg h-[50px] hover:bg-CardOver gap-2.5"
          >
            <Image src={icon} alt={label} className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
        <DropdownMenuSeparator className="bg-CardOver" />
        <div
          className="flex cursor-pointer justify-between text-[#FE3A4680] items-center px-2.5 rounded-lg h-[50px] hover:bg-CardOver gap-2.5"
          // onClick={handleLogout}
        >
          <span className="">Logout</span>
          <LogOut className="mr-6 h-4 w-4  " />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
