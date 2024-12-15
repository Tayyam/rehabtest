"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import AdminImage from "@/public/images/AdminImage.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/app/hooks";
import {
  useGetLoginUserQuery,
  useGetLogoutMutation,
} from "@/redux/features/api/auth/authApiSlice";
import { setLogout } from "@/redux/features/local/auth/authSlice";
import { getCookie } from "cookies-next";

type Props = {};

const UserCardSkeleton = () => {
  return (
    <div className="flex w-full items-center gap-3 p-3 bg-[#405390] rounded-lg animate-pulse">
      <div className="h-10 w-10 bg-[#7C8FCC] rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#7C8FCC] rounded w-3/4"></div>
        <div className="h-3 bg-[#7C8FCC] rounded w-1/2"></div>
      </div>
      <div className="h-8 w-8 bg-[#4A5D9A] rounded-full"></div>
    </div>
  );
};

const UserCard: React.FC<Props> = () => {
  const type = getCookie("type") as "admin" | "company";
  const { data, isLoading: userLoading } = useGetLoginUserQuery({
    companyName: type,
  });
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useGetLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(setLogout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (userLoading) {
    return <UserCardSkeleton />;
  }

  return (
    <div className="flex w-full items-center gap-3 p-3 bg-[#405390] rounded-lg">
      <Avatar className="h-10 w-10">
        <AvatarImage src={data?.data?.img ?? AdminImage.src} alt="Admin" />
        <AvatarFallback>{data?.data?.name?.[0] || "MK"}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {data?.data?.name || "unknown"}
        </p>
        <p className="text-xs text-[#7C8FCC]">
          {data?.data?.type || "Super Admin"}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="bg-[#4A5D9A] rounded-full hover:bg-[#4A5D9A]/90"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-3 bg-white border border-[#EEF0F5] rounded-lg shadow-lg">
          <div
            onClick={handleLogout}
            className={`flex hover:bg-red-100 transition-all items-center gap-2 p-2 text-sm font-medium text-gray-700 rounded-md cursor-pointer ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            role="button"
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                Logout
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserCard;
